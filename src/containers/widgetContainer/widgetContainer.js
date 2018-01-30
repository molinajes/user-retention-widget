import React, { Component } from 'react';
import WidgetComponent from '../../components/widgetComponent/widgetComponent'

export default class WidgetContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			widgets: this.props.widgets
		};
	}

	componentWillMount() {
        console.log(this);

        const widgetPaths = {};
        this.props.widgets.map((widget) => {
        	widgetPaths[`${widget.widgetClassName}`] = 'http://localhost:9000/dist/GAUserRetentionWidget';
            //widgetPaths[`${widget.widgetClassName}`] = `https://lxupboarddev.leverx-group.com/api/widget/class/${widget.widgetClassName}/url?`;
            return widgetPaths;
        });
        window.requirejs.config({
            paths: widgetPaths
        });
    }
	render(){

		return(

			 <div style={{height:'100%'}}>
                {this.state.widgets.map((widget, index) => (
                    <WidgetComponent
												key={index}
                        changeWidgetText={this.props.changeWidgetText}                     
                        widgetData={widget}
                        widgetName={widget.widgetClassName}
                        widgetText={widget.textForWidget}
                        widgetStyle={widget.style}
                        mode={this.props.mode}
                    />
                ))}
            </div>
		)
	}
}