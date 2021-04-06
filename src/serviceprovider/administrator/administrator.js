import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Panel, PanelGroup, Modal } from 'react-bootstrap';
import {
  actionLoaderHide,
  actionLoaderShow,
} from '../../common/core/redux/actions';
import Header from '../common/header';
import SideBar from '../common/sideBar';
import CONSTANTS from '../../common/core/config/appConfig';
class administrator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabKey: 'fourteen',
      noOfTable: [[]],
      noOfCategory: [{}],
      tableNo: 0,
      showHeading: [],
      showSaveRedirect: false,
      popupZonalshow: false,
      accError: 0
    };
    this.activeTabKeyAction = this.activeTabKeyAction.bind(this);
    this.handlepopupZonalHide = this.handlepopupZonalHide.bind(this);
  }
  componentWillMount() {
    let noOfCategory = this.state.noOfCategory;
    let noOfTable = this.state.noOfTable;
    for (let i = 0; i < noOfTable.length; i++) {
      noOfTable[i].noOfCategory = [{ department: '' }];
    }
    for (let i = 0; i < noOfCategory.length; i++) {
      noOfCategory[i] = [{}];
    }
    this.setState({ noOfCategory: noOfCategory });
  }
  componentDidMount() {
    let _this = this;
    this.setState({
      plantAndZonalOfficesExists: this.props.userInfo.userData.plantAndZonalOfficesExists,
      functionalClassificationExists: this.props.userInfo.userData.functionalClassificationExists
    });
    let isLogin = localStorage.getItem('oneTimeLogin');
    if (isLogin == 'yes') {
      setTimeout(() => {
        this.setState({ popupZonalshow: true })
      }, 100)
      setTimeout(() => {
        this.setState({ popupZonalshow: false })
        localStorage.setItem('oneTimeLogin', 'no');
      }, 20000)
    }
  }
  componentWillReceiveProps(next) {
    this.setState({
      plantAndZonalOfficesExists: next.userInfo.userData.plantAndZonalOfficesExists,
      functionalClassificationExists: next.userInfo.userData.functionalClassificationExists
    });
  }
  activeTabKeyAction(tabKey) {
    if (tabKey === 'first') this.props.history.push('home');
    if (tabKey === 'third')
      this.props.history.push({
        pathname: 'home',
        state: { path: 'third' }
      });
    this.setState({ tabKey: tabKey });
  }
  handlepopupZonalHide() {
    this.setState({ popupZonalshow: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  render() {
    return (
      <div className="page-container page-sidebar-fixed">
        <Header {...this.props} />
        <SideBar {...this.props} />
        <div className="content-section">
          <div className="flex align-center justify-space-between m-t-40 m-b-15">
            <div />
            <Link to="/uploadAdminSetup">
              <button className="btn btnoutline">
                Admin Setup Template
                  </button>
            </Link>
          </div>
          <div className="userAdmin">
            <h4 className=" greytxt text-center m-tmus35 m-b-60">
              User Administrator
                </h4>
            <PanelGroup accordion id="accordion-example">
              <Panel eventKey="1">
                <Panel.Heading>
                  <Panel.Title toggle>User</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <ul class="panelListing">
                    <li>
                      <Link
                        to={{
                          pathname: 'addUser',
                          state: { backURL: 'admin' }
                        }}
                      >
                        Add User
                          </Link>
                    </li>
                    <li>
                      <Link to="/editUser">Edit User</Link>
                    </li>
                    <li>
                      <Link to="/userRole">User Role And Responsibilities</Link>
                    </li>
                  </ul>
                </Panel.Body>
              </Panel>

              <Panel eventKey="2">
                <Panel.Heading>
                  <Panel.Title toggle>
                    Glossary
                      </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <ul class="panelListing">
                    <li>
                      <Link to="/glossary">Glossary</Link>
                    </li>
                  </ul>
                </Panel.Body>
              </Panel>


              <Panel eventKey="3">
                <Panel.Heading>
                  <Panel.Title toggle>
                    Spending Categories
                      </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <ul class="panelListing">
                    <li>
                      <Link to="/spendingCategory">
                        Spending Categories
                          </Link>
                    </li>
                  </ul>
                </Panel.Body>
              </Panel>

              <Panel eventKey="4">
                <Panel.Heading>
                  <Panel.Title toggle>
                    Plant/ Zonal offices
                      </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <ul class="panelListing">
                    <li>
                      <Link to="/location">
                        Plant/ Zonal offices
                          </Link>
                    </li>
                  </ul>
                </Panel.Body>
              </Panel>

              <Panel eventKey="5">
                <Panel.Heading>
                  <Panel.Title toggle>
                    Cost Center Classification
                      </Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <ul class="panelListing">
                    <li>
                      <Link to="/geographicalCostCenter">
                        Geographical Classification
                          </Link>
                    </li>
                    <li>
                      <Link to="/brandCostCenter">
                        Brand Cost Centers
                          </Link>
                    </li>
                    <li>
                      <Link to="/productLineCostCenter">
                        Product Line Classifications
                          </Link>
                    </li>
                    <li>
                      <Link to="/functionalAreaCostCenter">
                        Functional Classifications
                          </Link>
                    </li>
                  </ul>
                </Panel.Body>
              </Panel>

              <Panel eventKey="6">
                <Panel.Heading>
                  <Panel.Title toggle>Financial Year Setup</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <ul class="panelListing">
                    <li>
                      <Link to="/financialyear">
                        Financial Year & Budget Cycle
                          </Link>
                    </li>
                    <li>S&OP Set Up</li>
                    <li>Accounts Payables </li>
                    <li>
                      <Link to="/assignBudgetApproval">
                        Assign Budget Approvals By Cost Center
                          </Link>
                    </li>
                  </ul>
                </Panel.Body>
              </Panel>

              <Panel eventKey="7">
                <Panel.Heading>
                  <Panel.Title toggle>Work Flow</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <ul class="panelListing">
                    <li>
                      <Link to="/directPurchasingApproval">Purchasing Approval</Link>{' '}
                    </li>
                    <li>
                      <Link to="/supplierRegistrationApproval">
                        Supplier Registration Approval
                          </Link>{' '}
                    </li>
                    <li>Operational Budget Approval</li>
                    <li>S&OP Approval</li>
                    <li>
                      <Link to="/commodity">
                        Commodity
                          </Link>
                    </li>
                    <li>
                      <Link to="/uploadAdminSetup">
                        Admin Setup Template
                          </Link>
                    </li>
                    <li>
                      <Link to="createProgram">
                        Create Program
                          </Link>
                    </li>

                    <li>
                      <Link to="/disclosure">
                        Non Disclosure
                            </Link>
                    </li>
                    <li>
                      <Link to="#">
                        Draft Circulation
                          </Link>
                    </li>
                  </ul>
                </Panel.Body>
              </Panel>

              <Panel eventKey="8">
                <Panel.Heading>
                  <Panel.Title toggle>Warehouse</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <ul class="panelListing">
                    <li>
                      <Link to="/createWarehouse">
                        Create Warehouse
                          </Link>
                    </li>
                    <li>
                      <Link to="/editWarehouse">
                        Add/Edit Rack/Bin Id
                          </Link>
                    </li>
                  </ul>
                </Panel.Body>
              </Panel>

              <Panel eventKey="9">
                <Panel.Heading>
                  <Panel.Title toggle>PO Options</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <ul class="panelListing">
                    <li>
                      <Link to="/PoOption">
                        PO Options
                      </Link>
                    </li><li>
                      <Link to="/poDocReleaseOption">
                        PO Doc Release Option
                          </Link>

                    </li>

                  </ul>
                </Panel.Body>
              </Panel>

              <Panel eventKey="10">
                <Panel.Heading>
                  <Panel.Title toggle>Product Data Setup</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <ul class="panelListing">
                    <li>
                      <Link to="/bomOption">
                        BOM Options
                          </Link>
                    </li>
                  </ul>
                </Panel.Body>
              </Panel>

              <Panel eventKey="11">
                <Panel.Heading>
                  <Panel.Title toggle>Integration Management</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <ul class="panelListing">
                    <li>
                      <Link to="/integration">
                        View Integration
                      </Link>
                    </li>
                    <li>
                      <Link to="/integrationDraft">
                        Draft
                      </Link>
                    </li>
                    <li>
                      <Link to="/integrationArchive">
                        Archive
                      </Link>
                    </li>
                  </ul>
                </Panel.Body>
              </Panel>

              {/* <Panel eventKey="12">
                <Panel.Heading>
                  <Panel.Title toggle>Supplier Registration</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  <ul class="panelListing">
                    <li>
                      <Link to="/supplierRegistrationApproval">
                         Setup Supplier Dashboard Template
                      </Link>
                    </li>
                  </ul>
                </Panel.Body>
              </Panel> */}

            </PanelGroup>
          </div>
          {/* admin modal */}
          <div
            className={this.state.popupZonalshow && (!this.state.plantAndZonalOfficesExists
              || !this.state.functionalClassificationExists) ? "popzonalModal flex" : "popzonalModal flex hide"}
            container={this}
            aria-labelledby="contained-modal-title">
            {/* <Modal.Header closeButton></Modal.Header> */}
            <div className="innermoadldiv">
              <button
                className="btn sm-btn closemodal"
                onClick={this.handlepopupZonalHide}
              >
                <span class="icon-close"></span>
              </button>
              <div className="popuplinkwrap">
                <ul className="list-style-none p0 m0 text-center">
                  {this.state.plantAndZonalOfficesExists ? ('') :
                    (<li><Link to="/location"> Add Plant and Zonal Office </Link>  </li>)}


                  {!this.state.plantAndZonalOfficesExists &&
                    !this.state.functionalClassificationExists ? (<li className="andsign"> &  </li>) :
                    ('')}
                  {this.state.functionalClassificationExists ? ('') :
                    [<li> <Link to="/functionalAreaCostCenter">Add Functional Classification </Link> </li>]}

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionLoaderHide,
      actionLoaderShow,
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.User,
    supplierParts: state.supplierParts,
    //oneTimeLogin: state.User,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(administrator);
