import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Nav,
  NavItem,
  Navbar,
  MenuItem,
  NavDropdown,
  FormGroup,
  FormControl,
  Modal
} from 'react-bootstrap';
import { Tooltip } from 'antd';
import duserImage from '../img/profile.svg';
import Sprite from '../img/sprite.svg';
import * as moment from 'moment';

import {
  actionLoaderShow,
  actionLoaderHide,
  actionLoaderDisplay,
  actionLoaderRemove,
  actionPartNotification,
  sendNotification,
  actionReadNotification
} from '../common/core/redux/actions';
import CONSTANTS from '../common/core/config/appConfig';
import socketIOClient from 'socket.io-client';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  showErrorToast,
} from "../common/commonFunctions";
let { customConstant, validationMessages, permissionConstant } = CONSTANTS;
let socket;
const perPageSize = 5;
class CommonHeader extends Component {
  constructor(props) {
    super(props);

    socket = socketIOClient.connect(
      customConstant.webNotificationURL.node_server_URL
    );

    window.socket = socket;
    this.state = {
      searchByPart: '',
      notificationData: [],
      hasMore: true,
      pageCount: 1,
      isPageCount: false,
      openDropDown: false
    };

    this.getPartNotification = this.getPartNotification.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDeleteNotification = this.handleDeleteNotification.bind(this);
    this.readNotification = this.readNotification.bind(this);
  }

  componentDidMount() {
    socket.on('new-message', data => {
      if (data && data.notificationId && data.notificationId.length > 0) {
        this.getPartNotification();
        let existsNotiId = data.notificationId.indexOf(
          this.props.userInfo.userData.id
        );
        if (existsNotiId == -1) {
          this.props.sendNotification(data.notificationCount);
          this.setState({
            notificationDataLength: 0
          });
        } else {
          this.props.sendNotification(data.notificationCount);
          this.setState({
            notificationDataLength: data.notificationCount
          });
        }
      }
    });
  }

  componentWillMount() {
    this.getPartNotification();
  }

  /** Get Notification  */
  getPartNotification(e) {
    let _this = this;
    let pageCount = 1;
    this.setState({
      pageCount: pageCount,
      notificationData: [],
      isPageCount: false
    });
    let data = {
      userId: this.props.userInfo.userData.id || '',
      roleId: this.props.userInfo.userData.userRole || '',
      pageNumber: 1,
      pageSize: perPageSize
    };
    // this.props
    //   .actionPartNotification(data)
    //   .then((result, error) => {
    //     if (result.payload.data.resourceData.listOfNotification.length > 0) {
    //       let notificationResponse =
    //         result.payload.data.resourceData.notificationCount;
    //       _this.props.sendNotification(notificationResponse);
    //       let dataList = result.payload.data.resourceData.listOfNotification;
    //       if (_this.state.pageCount == 1) {
    //         _this.setState({
    //           notificationData: dataList,
    //           notificationDataLength:
    //             result.payload.data.resourceData.notificationCount,
    //           isPageCount: true
    //         });
    //       }

    //     } else {
    //       _this.setState({
    //         notificationDataLength: 0
    //       });
    //     }
    //   })
    //   .catch(e => console.log('error')
    //   );
  }

  clearAllNotification() {
    this.setState({
      clearNotificationModal: true
    });
  }

  handleClose() {
    this.setState({
      clearNotificationModal: false
    });
  }

  handleDeleteNotification(event, item, index) {
    
  }

  readNotification(nid, anyId, actionPage) {
    let _this = this;
    let data = {
      userId: this.props.userInfo.userData.id || '',
      roleId: this.props.userInfo.userData.userRole || '',
      listOfNotificationIds: [nid]
    };
    this.props.actionLoaderDisplay();
    if (this.props.userInfo.userData.userRole == 1) {
      this.props
        .actionReadNotification(data)
        .then((result, error) => {
          if (result.payload.data.status === 200) {

            if (actionPage) {
              _this.props.history.push(actionPage);
            }

            _this.setState({
              notificationDataLength:
                result.payload.data.resourceData.notificationCount
            });

            this.setState({ openDropDown: false });
          }
          _this.props.actionLoaderRemove();
        })
        .catch(e => console.log('error'));

    } else if (this.props.userInfo.userData.userRole == 2) {
      this.props
        .actionReadNotification(data)
        .then((result, error) => {
          if (result.payload.data.status === 200) {
            if (actionPage) {
              _this.props.history.push(actionPage);
            }
            _this.setState({
              notificationDataLength:
                result.payload.data.resourceData.notificationCount
            });

            this.setState({ openDropDown: false });
          }
          _this.props.actionLoaderRemove();
        })
        .catch(e => console.log('error'));
    }
    else
      showErrorToast(validationMessages.notification.permission)
  }

  fetchMoreData = () => {
    let _this = this;
    if (
      this.state.notificationData.length >= this.state.notificationDataLength
    ) {
      this.setState({ hasMore: false });
      return;
    }

    if (this.state.isPageCount == true) {
      let pageCount = this.state.pageCount;
      let IncreasePageCount = pageCount + 1;
      this.setState({ pageCount: IncreasePageCount });

      let data = {
        userId: this.props.userInfo.userData.id || '',
        roleId: this.props.userInfo.userData.userRole || '',
        pageNumber: this.state.pageCount,
        pageSize: perPageSize
      };

      _this.props
        .actionPartNotification(data)
        .then((result, error) => {
          if (result.payload.data.resourceData.listOfNotification.length > 0) {
            let notificationResponse =
              result.payload.data.resourceData.notificationCount;
            _this.props.sendNotification(notificationResponse);
            let dataList = result.payload.data.resourceData.listOfNotification;
            if (_this.state.pageCount > 1) {
              let notificationData = _this.state.notificationData;
              let concatData = notificationData.concat(dataList);
              setTimeout(() => {
                _this.setState({
                  notificationData: concatData,
                  notificationDataLength:
                    result.payload.data.resourceData.notificationCount
                });
              }, 1000);
            }
          }
        })
        .catch(e => console.log('error'));
    }
  };

  toggleDropD = () => {
    this.setState({ openDropDown: !this.state.openDropDown });
  };

  render() {
    let dropDownToggle = this.state.openDropDown;
    return (
      this.state.notificationDataLength ?
        <NavDropdown
          id="soketClient"
          open={this.state.openDropDown}
          onToggle={this.toggleDropD}
          disabled={this.state.notificationDataLength == 0}
          eventKey={1}
          className="noti-dd"
          title={
            <Tooltip placement="bottom" title={this.props.userInfo.userData.userRole === 2 ? "" : "Notifications"}>
              <div
                onClick={e => {
                  this.getPartNotification(e);
                  this.setState({ openDropDown: !dropDownToggle });
                }}
              >

                {this.state.notificationDataLength > 0 &&
                  this.props.userInfo.userData.userRole === 1 ?
                  <span className="noti-dot active">
                    {this.state.notificationDataLength > 99 ?
                      <span>99<span className="morcunt">+</span>
                      </span> : (
                        this.state.notificationDataLength
                      )}
                  </span>
                  : ""}

                {this.props.userInfo.userData.userRole === 2 ?
                  <span
                    className={
                      this.state.notificationDataLength == 0
                        ? 'noti-dot'
                        : 'noti-dot active'
                    }
                  >
                    {this.state.notificationDataLength}
                  </span>
                  : ''}



                {this.props.userInfo.userData.userRole === 1 ? (
                  <span class="icon-bell"></span>
                ) : (
                    <span className="ico-nav">
                      <svg>
                        <use xlinkHref={`${Sprite}#bellIco`} />
                      </svg>
                    </span>
                  )}

              </div>
            </Tooltip>
          }
        >
          <div className="notification-list" style={{ overflow: 'hidden' }}>
            <li className="flex justify-space-between cursor-pointer align-center">
              <span className="nt-h">Notification</span>{' '}
              <span
                className="clr-btn"
                onClick={event => this.clearAllNotification(event)}
              >
                Clear All
              </span>
            </li>
            <MenuItem>
              <InfiniteScroll className="notification_scroll"
                dataLength={this.state.notificationData.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                loader={<h4 className="loading_data">Loading...</h4>}
                height={240}
                endMessage={
                  <p style={{ textAlign: 'center', cursor: 'default' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {this.state.notificationData &&
                  this.state.notificationData.map((item, index) => {
                    let anyId = item.anyId !== undefined && item.anyId ? item.anyId : '';
                    let actionPage = item.actionPage !== undefined && item.actionPage ? item.actionPage : '';
                    return (
                      <div
                        className="notification-wrapper flex align-center"
                        onClick={() => {
                          this.readNotification(item.id, anyId, actionPage);
                        }}
                      >
                        <div className="nt-img">
                          <img
                            src={
                              item.fromUserRes &&
                                item.fromUserRes.profileImageURL
                                ? item.fromUserRes.profileImageURL
                                : duserImage
                            }
                            alt="Image"
                          />
                        </div>
                        <div className="user-info flex-1">
                          <h5 className="m-0 fs-12 fw-500 text-ellipsis w-220">
                            {item.fromUserRes && item.fromUserRes.fullName}
                            <small className="text-color text-ellipsis w-220 p-l-5 fs-10">
                            {item &&
                              item.createdTimestamp &&
                              moment(item.lastUpdatedTimestamp).format(
                                customConstant.acceptedFormat.dateFormatWithMonthName
                              )}
                          </small>
                          </h5>
                          
                          <p className="nt-message">{item && item.content}</p>
                        </div>
                      </div>
                    );
                  })}
              </InfiniteScroll>
            </MenuItem>

            <Modal
              show={this.state.clearNotificationModal}
              onHide={this.handleClose}
              className="custom-popUp confirmation-box"
              bsSize="small"
            >
              <Modal.Body>
                <div className="">
                  <h5 className="text-center">
                    Are you sure you want to delete this notification?
                  </h5>
                  <div className="text-center">
                    <button
                      className="btn dark-greybg-btn sm-btn"
                      onClick={event => this.handleDeleteNotification(event)}
                    >
                      OK
                    </button>
                    <button
                      className="btn blk-border-btn sm-btn"
                      onClick={this.handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </NavDropdown>
        : this.props.userInfo.userData.userRole === 1 ? (
          <Tooltip placement="bottom" title="Notifications">
            <NavItem id="soketClient" className="noti-dd notifctn-icon">
              <span class="icon-bell"></span>
            </NavItem>
          </Tooltip>
          ): (
            <NavItem id="soketClient" className="noti-dd notifctn-icon">
              <span className="ico-nav">
                <svg>
                  <use xlinkHref={`${Sprite}#bellIco`} />
                </svg>
              </span>
            </NavItem>
            
            )
          
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionLoaderShow,
      actionLoaderHide,
      actionLoaderDisplay,
      actionLoaderRemove,
      actionPartNotification,
      sendNotification,
      actionReadNotification
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.User
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommonHeader);
