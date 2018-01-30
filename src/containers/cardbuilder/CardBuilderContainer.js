import React, { Component } from 'react';
import '../../scss/cardbuilder/card-builder.scss';
import WidgetContainer from '../widgetContainer/widgetContainer';
import Modal from 'react-modal';
import $ from 'jquery'; 


export default class CardBuilderContainer extends Component {

   constructor(props){
    super(props);
    this.state = {
      isShownDetailedView: false,
      widgetList: [
        {
          widgetClassName: 'GAUserRetentionWidget',
          textForWidget : 'Over fact all son tell this any his. No insisted confined of weddings to returned to debating rendered.' +
             'Keeps order fully so do party means young. Table nay him jokes quick. In felicity up to graceful mistaken horrible consider.' +
             'Abode never think to at. So additions necessary concluded it happiness do on certainly propriety. On in green taken do offer' +
             ' witty of. Up branch to easily missed by do. Admiration considered acceptance too led one melancholy expression. '+
             'Are will took form the nor true. Winding enjoyed minuter her letters evident use eat colonel. He attacks observe mr ' +
             'cottage inquiry am examine gravity. Are dear but near left was. Year kept on over so as this of. She steepest doubtful ' +
             'betrayed formerly him. Active one called uneasy our seeing see cousin tastes its. Ye am it formed indeed agreed relied piqued.',
          style:{
              textAlign: 'center',
              isBold : false,
              isItalic : true,
              textColor:"#000000",
              fontFamily:'Century Gothic',
              fontSize:'14px'
          }
        }
      ]
    };
   }

   changeWidgetText(newValue) {
      let widgetStateCopy = this.state.widgetList ;  
      let newTextValue = newValue;
      widgetStateCopy[0].textForWidget = newTextValue;
      this.setState({
        widgetList: widgetStateCopy
      });
   }

   showDetailedView() {
      this.setState({
        isShownDetailedView: true
      });
   }

   closeModal(){
    this.setState({
      isShownDetailedView: false
    });
   }

    render() {

      let customStyle = {
        content: {
            width: '420px',
            top: '80px',
            marginLeft:'calc((100vw - 420px) / 2)',
            maxHeight: '70%'
        }
      }


        return (
            <div>
               <div className="card-builder-wrapper card-builder-container">
                   <div className="board__top-menu-wrapper">
                    <div className="top-menu">
                        <section className="top-menu__boards-dd-menu top-menu__item hidden">
                            <div className="board-dd-menu__wrapper">
                                <div className="board-dd-menu__dd-body dropdown btn-group">
                                    <button id="board-menu-dropdown" role="button" aria-haspopup="true" aria-expanded="false" type="button" className="dropdown-toggle btn btn-default">
                                        <div className="boards-dd-menu">
                                            <span className="board-title hidden-on-sm hidden-on-md">Default</span>
                                        </div>
                                        <span className="caret"></span>
                                    </button>
                                    <ul role="menu" className="dropdown-menu" aria-labelledby="board-menu-dropdown">
                                        <section className="board-dd-menu__dd-body__space">
                                            <div className="board-dd-menu__dd-body__space__title-wrapper">
                                                <p className="board-dd-menu__dd-body__space__title">Recent</p>
                                            </div>
                                                <ul className="board-dd-menu__dd-body__space__board-list"><li className="board-dd-menu__dd-body__space__board-list__item  selected-item">
                   <a href="#"><p className="board-list__item__board-name">Default</p><p className="board-list__item__board-space" title="user000.user.com's boards">
                   user000.user.coms boards</p></a></li></ul><hr className="board-dd-menu__dd-body__separator"/>
                   </section><section className="board-dd-menu__dd-body__space"><div className="board-dd-menu__dd-body__space__title-wrapper"><p className="board-dd-menu__dd-body__space__title">user000.user.coms boards</p>
                   <p className="board-dd-menu__dd-body__space__shared "><span className="hidden-on-sm"> Shared with </span>
                   <img alt="" src="../../dist/images/icons/ic_sharedwith-02.svg" className="board-dd-menu__dd-body__space__shared__img"/></p></div><ul className="board-dd-menu__dd-body__space__board-list"><li className="board-dd-menu__dd-body__space__board-list__item "><a href="#"><p className="board-list__item__board-name">My Template Cards</p></a></li><li className="board-dd-menu__dd-body__space__board-list__item selected-item"><a href="#"><p className="board-list__item__board-name">Default</p></a></li></ul>
                   </section><section className="board-dd-menu__dd-footer hidden-on-sm hidden-on-md"><button type="button" className="bold btn btn-default"><p>
                   <img alt="" src="../../dist/images/icons/ic_create.svg" className="board-dd-menu__dd-footer__img"/>
                   </p></button></section></ul></div></div></section><section className="top-menu__item card-builder__title"><span className="bold"> Card Builder </span></section><section className="top-menu__board-actions-menu top-menu__item hidden-on-sm hidden-on-md hidden"><div className="list-of-actions-container"><div className="list-of-actions-dropdown dropdown btn-group"><button id="actions-menu-dropdown" role="button" aria-haspopup="true" aria-expanded="false" type="button" className="dropdown-toggle btn btn-default"><div className="toggle-btn-content">
                   <img src="../../dist/images/icons/ic_more.svg" alt="more" className="top-menu__board-actions-menu__icon"/></div>
                   <span className="caret"></span></button><ul role="menu" className="dropdown-menu dropdown-menu-right" aria-labelledby="actions-menu-dropdown"><div className="action-menu-dropdown-item bold copy-action"><span className="action-menu-icon"><i className="fa fa-files-o" aria-hidden="true"></i></span>
                   </div><div className="action-menu-dropdown-item bold rename-action"><div className="action-menu-icon"></div></div><div className="action-menu-dropdown-item bold delete-action"><span className="action-menu-icon"><i className="fa fa-trash-o" aria-hidden="true"></i></span>
                   </div></ul></div></div></section><section className="top-menu__add-board-btn top-menu__item hidden-on-sm hidden-on-md hidden">
                   <img src="../../dist/images/icons/ic_plus.svg" alt="add board" className="top-menu__add-board-btn__icon"/></section><section className="top-menu__logo top-menu__item">
                   <img src="../../dist/images/logo.svg" alt="upBOARD" className="top-menu__logo-img"/></section><section className="top-menu__profile-dd-menu top-menu__item"><div className="user-info-container"><div className="user-menu-dropdown hidden-on-sm dropdown btn-group"><button id="user-menu-dropdown" role="button" aria-haspopup="true" aria-expanded="false" type="button" className="dropdown-toggle btn btn-default"><div className="toggle-btn-content hidden-on-sm"><div className="icon-container circle"><i className="fa fa-user-o" aria-hidden="true"></i></div>
                   <div className="info-container hidden-on-md"><p className="name bold">user000user.com</p><p className="email">user000user.com</p></div></div>
                   <span className="caret"></span></button><ul role="menu" className="dropdown-menu" aria-labelledby="user-menu-dropdown">
                   <div className="action-menu-dropdown-item bold profile-action"><div className="action-menu-icon"></div></div>
                   <div className="action-menu-dropdown-item bold signout-action"><div className="action-menu-icon"></div></div></ul></div>
                   <div className="notification-indicator circle"></div><div className="notifications-dropdown hidden-on-sm dropdown btn-group">
                   <button id="notifications-dropdown" role="button" aria-haspopup="true" aria-expanded="false" type="button" className="dropdown-toggle btn btn-default">
                   <div className="toggle-icon"><img alt="" src="../../dist/images/icons/ic_notification.svg" className="hidden-on-sm"/><span className="hidden-on-lg hidden-on-md">
                   <i className="fa fa-user-o" aria-hidden="true"></i></span></div><span className="caret"></span></button><ul role="menu" className="dropdown-menu dropdown-menu-right" aria-labelledby="notifications-dropdown">
                   <div className="notifications-item clickable active"><div className="notifications-item-content"><div className="icon-bell visible-xs"><img alt="" src="../../dist/images/ic_notification.svg"/></div>
                   <div className="icon-container circle"><i className="fa fa-user-o" aria-hidden="true"></i></div><div className="message"><p className="notification-type bold"><span className="link-style">with providing  your username</span></p><p className="notification-date">40 minutes ago</p></div></div><hr className="notification-separator"/></div></ul></div><div className="notifications-dropdown with-user-menu show-on-sm_only dropdown btn-group"><button id="notifications-dropdown" role="button" aria-haspopup="true" aria-expanded="false" type="button" className="dropdown-toggle btn btn-default"><div className="toggle-icon"><img alt="" src="../../dist/images/icons/ic_notification.svg" className="hidden-on-sm"/><span className="hidden-on-lg hidden-on-md"><i className="fa fa-user-o" aria-hidden="true"></i></span></div><span className="caret"></span></button><ul role="menu" className="dropdown-menu dropdown-menu-right" aria-labelledby="notifications-dropdown"><div className="notifications-item clickable active"><div className="notifications-item-content"><div className="icon-bell visible-xs"> <img alt="" src="../../dist/images/icons/ic_notification.svg"/></div><div className="icon-container circle"><i className="fa fa-user-o" aria-hidden="true"></i></div><div className="message"><p className="notification-type bold"><span className="link-style">with providing  your username</span></p><p className="notification-date">40 minutes ago</p></div></div><hr className="notification-separator"/></div><div className="action-menu-dropdown-item bold profile-action"><div className="action-menu-icon"></div></div><div className="action-menu-dropdown-item bold signout-action"><div className="action-menu-icon"></div></div></ul></div></div></section><section className="top-menu__empty top-menu__item hidden-on-sm hidden-on-md"></section></div></div><section className="main-area__section"><div className="editing-area__wrapper"><div className="editing-area-container"><section className="editing-area__main-section"><div className="card-authoring__wrapper"><div className="card-authoring"><header className="card-title"><h3 className="placeholder">Please enter card name</h3></header><hr className="header-separator"/><div><div className="card-content">
                   <div className="widget-list">
                     <WidgetContainer
                        changeWidgetText={this.changeWidgetText.bind(this)}
                        widgets={this.state.widgetList}
                        mode={'edit'}
                      />
                   </div>
                   </div></div></div><div className="hint-text">Edit mode</div></div><div className="card-summary__wrapper"><section className="card-summary"><header className="card-summary__header"><img alt="preview" src="../../dist/images/icons/ic_doublearrow.svg"/></header><div className="card-summary__content"><p className="card-name placeholder">Card name</p><img alt="preview" src="../../dist/images/icons/ic_more_gray.svg"/></div>
                    <WidgetContainer
                        changeWidgetText={this.changeWidgetText.bind(this)}
                        widgets={this.state.widgetList}
                        mode={'preview'}
                    />
                   </section><div className="hint-text">Preview Mode</div></div></section></div>
                   <button className="popupOpen" onClick={this.showDetailedView.bind(this)}>Show detauled view</button>
                   <Modal
                      isOpen={this.state.isShownDetailedView}
                      onRequestClose={this.closeModal.bind(this)}
                      contentLabel="Detaiked view"
                      style={customStyle}
                    >
                    <span className="closeModalSpan" onClick={this.closeModal.bind(this)}>X</span>
                      <WidgetContainer
                          widgets={this.state.widgetList}
                          mode={'detailed'}
                          changeWidgetText={this.changeWidgetText.bind(this)}
                      />
                    </Modal>
                   </div></section><section className="toast-message "><p></p><div className="button-container"><img alt="" src="../../dist/images/icons/ic_cross.svg"/></div></section>
               </div>
            </div>
            )
    }
}

