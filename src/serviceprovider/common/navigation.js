import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Bookmark from "./bookmark";
import Bookmark from "./bookmarks/bookmarkContainer";
import MenuBar from "./menuBar";
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
import Sprite from '../../img/sprite.svg';
import {
  actionLoaderShow,
  actionLoaderHide,
  actionUserLogout,
  actionCheckToken,
  actionGetNavigationItem,
  actionAddNavigationBookmark,
  actionGetMenuFilter,
  actionGetMenuFilterSuccess
} from '../../common/core/redux/actions';
import CONSTANTS from '../../common/core/config/appConfig';
import { ToastContainer } from 'react-toastify';
import { ZoomInAndOut, getLocalStorage } from '../../common/commonFunctions';

let { customConstant, validationMessages } = CONSTANTS;
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
      menuItem: []
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

  getNavigationList() {
    let _this = this;
    let data = {
      userId: this.props.userInfo.userData.id || '',
      roleId: this.props.userInfo.userData.userRole || '',
    }
    this.props.actionLoaderShow();
    this.props
      .actionGetNavigationItem(data)
      .then((result, error) => {
        if (result.payload.data.status == 200) {
          let res = result.payload.data.resourceData || [];
          this.setState({ menuItem: res })
        }
        _this.props.actionLoaderHide();
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
    let profilePhotoURL = this.props.userInfo.userData.profilePhotoURL;
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

  /** Add Bookmark */
  addBookmark = (id) => {
    let _this = this;
    let data = {
      roleId: _this.props.userInfo.userData.userRole,
      userId: _this.props.userInfo.userData.id,
      itemId: id
    };

    if (id) {
      this.props.actionLoaderShow();
      this.props
        .actionAddNavigationBookmark(data)
        .then((result, error) => {
          _this.props.actionLoaderHide();
          if (error) return;
          if (result.payload.data.status == 200) {
            this.getNavigationList()
          }
        })
        .catch(e => _this.props.actionLoaderHide());
    }
  }

  getNavigationId = (id) => {
    console.log("id11111", id);
    this.props.actionGetnavigationId(id);
  }

  render() {
    let logedUserDetails = this.props.userInfo && this.props.userInfo.userData ? this.props.userInfo.userData : {};
    let fullName = logedUserDetails.fullname ? logedUserDetails.fullname : '';
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
            <Navbar.Brand>
              <Link to="home">
                <img src={Images} />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <div>
          </div>

          <Navbar.Collapse>
            <Nav className="m-l-15 left-bar">
              <MenuBar {...this.props}
                menuItem={this.state.menuItem}
                addBookmark={this.addBookmark}
                getNavigationId={this.getNavigationId}
              />

              <Bookmark
                getNavigationId={this.getNavigationId}
              />

              <li>
                <div className="top-srch">
                  <FormGroup className="flex align-center">
                    <i class="fas fa-search"></i>
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
                                {data.partNumber + '(' + code + title + ')'}
                              </span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                ) : (
                    ""
                  )}

              </li>
            </Nav>

            <Nav pullRight>
              <NavItem>
                <span class="icon-settings1"></span>
              </NavItem>
              <NavItem disable>
                <span class="icon-actionAndtask"></span>
              </NavItem>
              <NavItem className="prwrap" eventKey={2} id="user-dd">
                <NavDropdown
                  eventKey={3}
                  title={
                    <div className="flex align-center">
                      {/* <span className="userName">
                          {this.props.userInfo.userData.fullname}
                        </span> */}
                      <div className="avtar">
                        <img
                          src={
                            this.props.userInfo.userData &&
                              this.props.userInfo.userData.profilePhotoURL
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
      actionGetMenuFilterSuccess
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.User,
    navigationItem: state.User.navigationItem,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierHeader);
