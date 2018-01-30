import React from 'react';
import { Chart } from 'react-google-charts';
import moment from 'moment'
import { Button, ButtonGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/GAUserRetentionWidget/GAUserRetentionWidget.scss';

// google script
;(function(w, d, s, g, js, fjs) {
  g = w.gapi || (w.gapi = {})
  js = d.createElement(s)
  fjs = d.getElementsByTagName(s)[0]
  js.src = "https://apis.google.com/js/client:platform.js"
  fjs.parentNode.insertBefore(js, fjs)
  js.onload = function() {
    g.load("client", function() {
      window.dispatchEvent(new Event('google-loaded'))
    })
  }
})(window, document, "script")

// Buttons to change period titles
const buttons = ['Day', 'Week', 'Month']

// Options for a GoogleCharts
const options = {
  title: 'User Redention',
  titlePosition: 'out',
  titleTextStyle: {
    fontSize: 16,
    bold: false,
  },
  curveType: 'none',
  chartArea:{left:50,top:40, bottom: 60, width:"100%",height:"100%"},
  legend: { position: 'bottom' },
  vAxis: {viewWindow: {min: 0}},
  hAxis: {gridlines: {color: 'transparent'}},
  lineWidth: 2,
  colors: ['#1976D2', '#F57C00', '#388E3C'],
}

// Legend names and data types for chart
const columns = [
  {type: 'string', label: 'Day',},
  {type: 'number', label: 'Users',},
]

definejs('GAUserRetentionWidget', function create (){

  return {
    createComponent: function (React, Component) {
      return class GAUserRetentionWidget extends Component {

        constructor(props) {
          super(props);
          this.state = {
            mode: this.props.mode,
            isEditing: this.props.mode == 'edit' ? true : false,
            ready: false,
            activeAttr: 0,
            client_id: this.props.clientID, // Google Client ID
            view_id: `ga:${this.props.viewID}`, // Google View ID
            rows: [
              ['', 0]
            ],
          }
        }

        // Handle change period click
        handleClick = (activeAttr) => {
          this.setState({activeAttr})
          this.loadAnalytics(activeAttr)
        }

        // Google account authorization
        init = () => {
          gapi.auth2.init ({
            'client_id': this.state.client_id,
          }).then((onInit, onError) => {
            if (onInit) {
              gapi.signin2.render('my-signin2', {
                'scope': 'https://www.googleapis.com/auth/analytics.readonly'   ,
                'google-signin-client_id': this.state.client_id,
                'params': {client_id: this.state.client_id},
                // 'theme': 'light',
                'onsuccess': () => {
                  document.getElementById('my-signin2').style.display='none';
                  this.setState({ready: true})
                  this.loadAnalytics(this.state.activeAttr)
                }
              })
            }
          })

        }
        // Load data from Google Analytics for current active settings
        loadAnalytics = (activeAttr) => {
          const self = this

          // Metrics for GA queries
          const attr = ['cohortNthDay', 'cohortNthWeek', 'cohortNthMonth']
          const periods = [
            [1, 2, 3, 4, 5, 6, 7],
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3],
          ]
          const dateFormat = "YYYY-MM-DD"
          const query1 = query({
            "viewId": this.state.view_id,
            "samplingLevel": "SMALL",
            "includeEmptyRows": true,
            "metrics": [
              {
                "expression": "ga:cohortActiveUsers"
              }
            ],
            "dimensions": [
              {
                "name": "ga:cohort"
              },
              {
                "name": `ga:${attr[activeAttr]}`
              }
            ],
            "orderBys": [
              {
                "fieldName": "ga:cohort"
              }
            ],
            "cohortGroup": {
              "cohorts": periods[activeAttr].map((item) => {
                if (activeAttr === 0) {
                  const dayDate = moment().subtract(item, 'days').format(dateFormat)
                  return {
                    "type": "FIRST_VISIT_DATE",
                    "name": dayDate,
                    "dateRange": {
                      "startDate": dayDate,
                      "endDate": dayDate
                    }
                  }
                } else if (activeAttr === 1) {
                  const week = moment().subtract(item, 'weeks')
                  return {
                    "type": "FIRST_VISIT_DATE",
                    "name": week.startOf('week').format(dateFormat) + ' to ' + week.endOf('week').format(dateFormat),
                    "dateRange": {
                      "startDate": week.startOf('week').format(dateFormat),
                      "endDate": week.endOf('week').format(dateFormat)
                    }
                  }
                } else if (activeAttr === 2) {
                  const month = moment().subtract(item, 'months')
                  return {
                    "type": "FIRST_VISIT_DATE",
                    "name": month.startOf('month').format(dateFormat) + ' to ' + month.endOf('month').format(dateFormat),
                    "dateRange": {
                      "startDate": month.startOf('month').format(dateFormat),
                      "endDate": month.endOf('month').format(dateFormat)
                    }
                  }
                }

              })
            }
          }).then(results => {
            var data1 = results.reports[0].data.rows.map(function (row) {
              return parseInt(row.metrics[0].values[0])
            });

            var labels = results.reports[0].data.rows.map(function (row) {
              return row.dimensions[0];
            });
            const rowsSum = {}
            const rowsCol = {}
            labels.forEach((item, index) => {
              rowsSum[item] = rowsSum[item] ? rowsSum[item] + data1[index] : data1[index]
              rowsCol[item] = rowsCol[item] ? rowsCol[item] + 1 : 1
            })

            const values = Object.entries(rowsSum)
            const rows = values.map(function (item, index) {
              return [moment(item[0], 'YYYY-MM-DD').format('D MMM'), Math.round(item[1] / rowsCol[item[0]], 2)]
            })
            self.setState({rows})
          });
        }

        componentWillMount() {
          window.addEventListener('google-loaded', this.init, {'once': true});
        }

        render() {
          let widgetStyle = {
            textAlign: this.props.widgetStyle.textAlign,
            fontWeight: this.props.widgetStyle.isBold ? 'bold' : 'normal',
            color: this.props.widgetStyle.textColor,
            fontStyle: this.props.widgetStyle.isItalic ? 'italic' : 'normal',
            fontFamily: this.props.widgetStyle.fontFamily,
            fontSize: this.props.widgetStyle.fontSize
          }

          return (
            <div style={{display: 'block', width: 350, margin: 0}}>
              <div id="my-signin2"></div>
              <div>
                {this.state.ready ?
                  (<div style={{marginTop: 10}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                      <ButtonGroup size="xs" color="secondary">
                        {buttons.map((title, index) =>
                          (<Button
                            key={index}
                            outline
                            onClick={() => this.handleClick(index)}
                            active={index === this.state.activeAttr}
                            style={{height: 24}}>
                            {title}
                          </Button>))
                        }
                      </ButtonGroup>
                    </div>
                    <Chart
                      chartType="LineChart"
                      rows={this.state.rows}
                      columns={columns}
                      options={options}
                      width={'100%'}
                      legend_toggle
                    />
                  </div>)
                  : null
                }
              </div>
            </div>
          )
        }
      }
    }
  };
});

// Request for Google Analytics report
function query(params) {
  return new Promise(function(resolve, reject) {
    var data = new gapi.client.request({
      path: '/v4/reports:batchGet',
      root: 'https://analyticsreporting.googleapis.com/',
      method: 'POST',
      body: {
        reportRequests: [params]
      }})
      .then(function(response) {resolve(response.result)})
  });
}