import React, { Component } from 'react';

let TextWidget = ''; 
const widgets = {};

export default class WidgetComponent extends Component {

	constructor(props){
		super(props);
		this.state = {
			isComponentDone: false
		}
	}

	 componentWillMount() {
        const that = this;
        window.definejs = window.define;
        window.requirejs([`${this.props.widgetName}`], (TextWidgetImported) => {
            widgets[`${this.props.widgetName}`] = TextWidgetImported.createComponent(React, Component);
            that.setState({ isComponentDone: true });
        });
    }

	render(){

        TextWidget = widgets[`${this.props.widgetName}`];
        let widgetWrapper = '';

        if (this.state.isComponentDone) {
        	widgetWrapper = <TextWidget
						clientID="[client-id]"
						viewID="[view-id]"
        		changeWidgetText={this.props.changeWidgetText}
	        	widgetStyle={this.props.widgetStyle}
	        	widgetText={this.props.widgetText}
	        	mode={this.props.mode}
        	/>
        }
		return(
			<div style={{height:'100%'}}>
				{widgetWrapper}
			</div>
		)
	}
}