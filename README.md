# ga-user-retention-widget

An upBoard widget to show Google Analytics Users Retention report

## Installation

```
git clone https://github.com/webdevcrazier/user-retention-widget
cd ga-user-retention-widget
npm install
```

Widget parameters passed from upBoard:
```
constructor(props) {
    super(props);
    this.state = {
      ...
      client_id: this.props.clientID, // Google Client ID
      view_id: `ga:${this.props.viewID}`, // Google View ID
      ...
    }
  }
```

To test locally edit /src/components/widgetComponent/widgetComponent.js and change [client-id] and [view-id] by your values:
```
    ...

    render() {

        ...

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

        ...

    }
```

Run the service at one command window:
```
npm run dev_hot
```

Run the widget in another command window:
```
npm run widget
```

Open browser at http://localhost:9000

## Possible errors

Make sure http://localhost:9000 is added to your authorized JavaScript origins for OAUTH service if widget do not working as expected.