import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Bookmark from "./bookmarks/bookmarkContainer";
import MenuBar from "./menubar/menubarContainer";
import { Tooltip } from 'antd';
import ReactStringReplace from 'react-string-replace';
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
import Images from '../../img/logo-new.png';
import duserImage from '../../img/profile.svg';
import {
  actionLoaderShow,
  actionLoaderHide,
  actionUserLogout,
  actionCheckToken,
  actionGetNavigationItem,
  actionAddNavigationBookmark,
  actionGetMenuFilter,
  actionGetMenuFilterSuccess,
  actionGetnavigationId,
  actionDeleteNavigationBookmark, actionGetNavigationItemSuccess, actionSaveNavItems
} from '../../common/core/redux/actions';
import CONSTANTS from '../../common/core/config/appConfig';
import { ToastContainer } from 'react-toastify';
import { ZoomInAndOut, getLocalStorage } from '../../common/commonFunctions';
let { customConstant } = CONSTANTS;
var sessionTime;
class SupplierHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchByPart: '',
      profilePhotoURL: '',
      partList: [],
      filterDDPartList: false,
      showLogoutPopup: false,
      showSessionPopup: false,
      menuItem: [],
      navigationItem: []
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleSerchPart = this.handleSerchPart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogoutWithPopup = this.handleLogoutWithPopup.bind(this);
    this.handleLogoutByOK = this.handleLogoutByOK.bind(this)
    this.handleLogoutWithSessionPopup = this.handleLogoutWithSessionPopup.bind(this);
  }

  componentDidMount() {
    console.log("for testinggg", window.location.hostname);
    /** For User paermission */
    sessionStorage.URL = window.location.pathname;
    let _this = this;
    const roleId = this.props.userInfo.userData.userRole;
    const userId = this.props.userInfo.userData.id;
    this.props.actionGetMenuFilter({ userId, roleId }).then(res => {
      if (res.payload.data.status === 200)
        this.props.actionGetMenuFilterSuccess(res.payload.data.resourceData);
    });

    /** Hide searched item on outSide click */
    var divToHide = document.getElementById('divToHide');
    document.onclick = function (e) {
      if (e.target.id !== 'divToHide') {
        _this.setState({ filterDDPartList: false, searchByPart: '' }, () => { })
      }
    };

    /**  user Id and Role for login chk */
    if (this.props.userInfo.userData.id && this.props.userInfo.userData.userRole) {
      if (this.props.userInfo.userData.id && this.props.userInfo.userData.userRole == 3) {
        this.props.history.push({ pathname: '/support/companyApproval' })
      }
    }

    this.idleTimer();
    if (
      this.props.userInfo &&
      this.props.userInfo.userData &&
      this.props.userInfo.userData.profilePhotoURL
    ) {
      let profilePhotoURL = this.props.userInfo.userData.profilePhotoURL;
      this.setState({
        profilePhotoURL: profilePhotoURL
      });
    }

    if (getLocalStorage('userInfo') && this.props.userInfo &&
      (this.props.userInfo.userData.id == getLocalStorage('userInfo').id)) {

    } else {
      this.handleLogout()
    }
  }
  componentWillMount() {
    this.getNavigationList()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.closeChat !== prevProps.closeChat) {
      let chatEle = document.getElementById("fc_frame");
      if (chatEle)
        chatEle.style.display = this.props.closeChat === true ? "none" : "";
    }
    if (this.props.navigationItem !== prevProps.navigationItem)
      this.setState({ navigationItem: this.props.navigationItem });
  }

  getNavigationList() {
    let _this = this;
    let data = {
      userId: this.props.userInfo.userData.id || '',
      roleId: this.props.userInfo.userData.userRole || '',
    }
    // this.props.actionLoaderShow();
    this.props
      .actionGetNavigationItem(data)
      .then((result, error) => {
        if (result.payload.data.status == 200) {
          this.props.actionSaveNavItems(result.payload.data.resourceData);
          let res = JSON.parse(JSON.stringify(result.payload.data.resourceData));
          actionGetNavigationItemSuccess(result.payload.data.resourceData);
          this.setState({ menuItem: res })
        }
        //_this.props.actionLoaderHide();
      })
      .catch(e => _this.props.actionLoaderHide());
  }

  /** For Session Timeout  */
  idleTimer() {
    document.body.addEventListener('click', () => this.resetTimer());
    document.body.addEventListener('mouseover', () => this.resetTimer());
    document.body.addEventListener('mouseout', () => this.resetTimer());
    document.body.addEventListener('keydown', () => this.resetTimer());
    document.body.addEventListener('keyup', () => this.resetTimer());
    document.body.addEventListener('keypress', () => this.resetTimer());
  }

  resetTimer() {
    clearTimeout(sessionTime);

    sessionTime = setTimeout(
      this.handleLogoutWithSessionPopup, parseInt(customConstant.minutesUntilAutoLogout, 10) * 60 * 1000);
  }

  handleLogoutWithSessionPopup() {
    this.setState({ showSessionPopup: true }, () => {
      let _this = this;
      let data = {
        userId: this.props.userInfo.userData.id || '',
        roleId: this.props.userInfo.userData.userRole || '',
      }



      if (this.props.userInfo.userData.id) {
        sessionStorage.removeItem('URL');
        sessionStorage.removeItem('supplierURL');
      }
      this.props.actionLoaderShow();
      this.props
        .actionUserLogout(data)
        .then((result, error) => {

          _this.props.actionLoaderHide();
        })
        .catch(e => _this.props.actionLoaderHide());
    })
  }

  handleSessionLogoutByOK() {
    localStorage.removeItem("filters");
    this.props.history.push('/signin');
    this.setState({ showSessionPopup: false })
  }

  /** End Session Timeout  */

  componentWillReceiveProps(nextProps) {
    let profilePhotoURL = nextProps.userInfo.userData.profilePhotoURL;
    this.setState({
      profilePhotoURL: profilePhotoURL
    });
  }

  handleLogoutWithPopup() {
    this.setState({ showLogoutPopup: true })
  }

  handleClose() {
    this.setState({ showLogoutPopup: false })
  }
  handleLogoutByOK() {
    this.handleLogout()
    this.setState({ showLogoutPopup: false })
  }

  handleLogout() {
    let _this = this;
    let data = {
      userId: this.props.userInfo.userData.id || '',
      roleId: this.props.userInfo.userData.userRole || '',
    }
    if (this.props.userInfo.userData.id) {
      sessionStorage.removeItem('URL');
      sessionStorage.removeItem('supplierURL');
    }
    this.props.actionLoaderShow();
    this.props
      .actionUserLogout(data)
      .then((result, error) => {
        this.props.history.push('/signin');
        _this.props.actionLoaderHide();
      })
      .catch(e => _this.props.actionLoaderHide());
  }

  handleSerchPart() {
   
  }

  onChangeFilterPartList(event, itemList) {
    let _this = this;
    if (itemList) {
      if (window.location.pathname == '/reviewPOApproval') {
        localStorage.setItem('partId', itemList.partId);
        localStorage.setItem('projectId', itemList.projectResponse && itemList.projectResponse.id ? itemList.projectResponse.id : '');
        localStorage.setItem('partRevisionId', itemList.partRevisionId);
        localStorage.setItem('partRFQId', itemList.partRFQId);
        localStorage.setItem('parthistoryWithNewTab', true);
        _this.props.actionLoaderShow();
        window.location.reload();
      } else {
        _this.props.history.push({
          pathname: '/reviewPOApproval',
          state: {
            partId: itemList.partId,
            projectId: itemList.projectResponse && itemList.projectResponse.id ? itemList.projectResponse.id : '',
            partRFQId: itemList.partRFQId,
            partRevisionId: itemList.partRevisionId,
            filterDDPartList: false,
          }
        });
      }

    }
  }
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleNavigationLRoute = (URL, id) => {
    if (URL) this.props.history.push(URL);
    if (id) this.props.actionGetnavigationId(id);
  }

  handleRedirectionURL = () => {
    if (this.props.userInfo.userData.isAdmin) {
      this.props.history.push('/administrator');
    } else {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    let logedUserDetails = this.props.userInfo && this.props.userInfo.userData ? this.props.userInfo.userData : {};
    let fullName = logedUserDetails.fullname ? logedUserDetails.fullname : '';
    let menuItems = this.state.menuItem;
    return (
      <div className="top-bar">
        <ToastContainer
          autoClose={3000}
          className="custom-toaster-main-cls"
          toastClassName="custom-toaster-bg"
          transition={ZoomInAndOut}
        />
        <Navbar inverse collapseOnSelect fixedTop fluid>
          <Navbar.Header>
            <Navbar.Brand className="">
              {/* <Link to="home"> */}
              <img src={Images} onClick={event => { this.handleRedirectionURL(event); }} />
              {/* </Link> */}
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className="m-l-15 left-bar">

              {/* Get MenuBar & Bookmark  */}
              <MenuBar {...this.props} navigationItem={this.state.navigationItem} />
              <Bookmark />

              <li>
                <div className="top-srch">
                  <FormGroup className="flex align-center">
                    <i className="fas fa-search"></i>
                    <FormControl
                      type="text"
                      name="searchByPart"
                      autoComplete="off"
                      id="divToHide"
                      value={this.state.searchByPart}
                      placeholder="Search Here"
                      maxLength={customConstant.inputTextLength}
                      minLength={1}
                      onKeyUp={this.handleSerchPart}
                      onChange={e => this.handleChange(e)}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                </div>

                {this.state.filterDDPartList ? (
                  <div className="searchautolist w-200 searchScroll">
                    <ul>

                      {this.state.partList &&
                        this.state.partList.map((data, sIdx) => {
                          let code = data.projectResponse && data.projectResponse.projectCode ?
                            data.projectResponse.projectCode : 'Project Code';
                          let title = data.projectResponse && data.projectResponse.projectTitle ? ' | ' +
                            data.projectResponse.projectTitle : 'Project Title';
                          let partDescription = data.partDescription ? data.partDescription : 'Part Description';
                          let itemCode = ' | ' + (data.itemCode ? data.itemCode : 'Item Code');
                          let partNumber = data.partNumber;
                          let suggestion = '';
                            suggestion = partNumber + '(' + code + title + ')';
                          return (
                            <li key={sIdx}
                              onClick={event => {
                                this.onChangeFilterPartList(
                                  event,
                                  data
                                );
                              }}
                            >
                              <span>
                                  {suggestion}
                              </span>
                              
                            </li>
                          );
                        }, this)}
                    </ul>
                  </div>
                ) : (
                    ""
                  )}

              </li>
            </Nav>

            <Nav pullRight>
              <Tooltip placement="bottom" title="Admin Console">
                {this.props.userInfo.userData.isAdmin ?
                  <NavItem>
                    <span className="icon-settings1"
                      onClick={() => this.handleNavigationLRoute('/administrator', 'level1')} ></span>
                  </NavItem> : ''}
              </Tooltip>

              <Tooltip placement="bottom" title="Action and Overview">
                <NavItem>
                  <span className="icon-actionAndtask" onClick={() => this.props.history.push('/actionAndTaskOverview')}></span>
                </NavItem>
              </Tooltip>
              <Tooltip placement="bottomRight" title="User profile">
                <NavItem className="prwrap" eventKey={2} id="user-dd">
                  <NavDropdown
                    eventKey={3}
                    title={
                      <div className="flex align-center">

                        <div className="avtar">
                          <img
                            src={
                              this.state.profilePhotoURL
                                ? this.state.profilePhotoURL
                                : duserImage
                            }
                            alt="Image"
                          />
                        </div>
                      </div>
                    }
                    id="basic-nav-dropdown"
                  >

                    <li eventKey={3.1}>
                      <Link eventKey={3.5} to="userProfile">
                        Profile
                        </Link>
                    </li>
                        <li eventKey={3.1}>
                          <Link eventKey={3.5} to="editUser">
                            Edit Users
                          </Link>
                        </li>
                    <MenuItem eventKey={3.2}>Privacy & Policy</MenuItem>
                    <MenuItem eventKey={3.3}>Terms & Condition</MenuItem>
                    <MenuItem eventKey={3.3} {...this.props} onClick={this.handleLogoutWithPopup}>
                      Logout
                      </MenuItem>
                  </NavDropdown>
                </NavItem>
              </Tooltip>
            </Nav>

          </Navbar.Collapse>
        </Navbar>

        <Modal
          show={this.state.showLogoutPopup}
          onHide={this.handleClose}
          className="custom-popUp confirmation-box"
          bsSize="small"
        >
          <Modal.Body>
            <div className="">
              <h5 className="text-center">
                Are you sure you want to logout?
              </h5>

              <div className="text-center">
                <button
                  className="btn btn-solid-blue sm-btn"
                  {...this.props}
                  onClick={() => {
                    this.handleLogoutByOK();
                  }}
                >
                  Yes
                </button>
                <button
                  className="btn btn-outline-blue sm-btn"
                  {...this.props}
                  onClick={() => {
                    this.handleClose();
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={this.state.showSessionPopup}
          className="custom-popUp confirmation-box"
          bsSize="small"
        >
          <Modal.Body>
            <div className="">
              <h5 className="text-center">
                Your session has been timed out.
              </h5>

              <div className="text-center">
                <button
                  className="btn dark-greybg-btn sm-btn"
                  {...this.props}
                  onClick={() => {
                    this.handleSessionLogoutByOK();
                  }}
                >
                  Ok
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionLoaderShow,
      actionLoaderHide,
      actionUserLogout,
      actionCheckToken,
      actionGetNavigationItem,
      actionAddNavigationBookmark,
      actionGetMenuFilter,
      actionGetMenuFilterSuccess,
      actionGetnavigationId,
      actionDeleteNavigationBookmark, actionGetNavigationItemSuccess, actionSaveNavItems
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.User,
    navigationItem: state.BuyerData.saveNavigationItem,
    navigationId: state.BuyerData.navigationId
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierHeader);
