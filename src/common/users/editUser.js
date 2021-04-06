import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { filter, map } from 'lodash';
import { connect } from "react-redux";
import { Space, Input, Button, Table as DataGrid } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import SortingFilter from "../../common/components/filterComponent/sortingFilter";
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Modal,
  Table,
  DropdownButton,
  Breadcrumb,
  Glyphicon
} from "react-bootstrap";
import validation from "react-validation-mixin";
import strategy, { validator } from "react-validatorjs-strategy";
import PhoneInput from "react-phone-number-input/native";
import 'react-phone-number-input/rrui.css';
import 'react-phone-number-input/style.css';
import SideBarBuyer from "../../buyer/common/sideBar";
import SideBarSupplier from "../../supplier/common/sideBar";
import FooterSupplier from "../../supplier/common/footer";
import {
  actionUserLogout,
  actionGenerateOTPToAddUser,
  actionSupplierAddUser,
  actionLoaderHide,
  actionLoaderShow,
  actionEditProfile,
  actionGetAllAddedUser,
  actionGetApproverList,
  actionDeleteUser,
  actionDeleteAffectedUser,
  actionGetUserProfileList,
  actionGenerateOTPToEditUser,
  actionGetCompanyData,
  actionGetClassifications,
  actionResetEmailMobileVerification,
  actionGetCommodity
} from "../../common/core/redux/actions";
import Sprite from "../../img/sprite.svg";
import {
  renderMessage,
  showErrorToast,
  removeUnderScore,
  isEmptyObject,
  specialCharacter, tableLoader
} from "../../common/commonFunctions";
import CONSTANTS from "../../common/core/config/appConfig";
import _ from "lodash";
import userImage from "../../img/profile.svg";
import { Tooltip, Select as DataSelect } from 'antd';
import Select from 'react-select';
import { BuyerEditUserColumn, SupplierEditUserColumn } from '../../common/components/columnContent/columnContent';
let { validationMessages, permissionConstant, customConstant } = CONSTANTS;
let increaseRecords = 4;
let defaultCountApprover = 4;
class EditUser extends Component {
  constructor(props) {
    super(props);
    this.contactObject = {
      firstName: "",
      lastName: "",
      employeeId: "",
      email: "",
      mobile: "",
      designation: "",
      userType: "",
      userProfile: "",
      listOfOtherApprovers: [],
      defaultApprover: "",
      approverList: [],
      contactArray: [],
      timeCounter: true
    };

    this.state = {
      notFoundImage: false, showColSel: false, filtered: false,
      show: false,
      tabKey: "editUser",
      approverList: [],
      editUserDetails: [],
      contactArrayIndex: "",
      contactArray: [{ ...this.contactObject }],
      otpOption: false,
      activeGenerat: false, isRequest: true,
      OTPField: ["", "", "", "", "", ""],
      contactArrayIndex: 0,
      selectedApproverList: [],
      listOfDepartment: [],
      listOfBrands: [],
      listOfMajorCategory: [],
      listOfGlobalRegions: [],
      listOfSectorCategory: [],
      listOfFunctionalArea: [],
      defaultCountApprover: 4, userProfileCount: 4,
      visible: false,
      selectedOption: [],
      commodityList: [],
      totalRecord: 0,
      pageCount: 1, selectedPageOption: { "value": "1", "label": "All" },
      isPageCount: false, filterdColumnsForViewPart: [],
      itemsCountPerPage: 20, searchText: '',
      columnSelectForNewPart: this.props.userInfo.userData.userRole === 1 ? BuyerEditUserColumn() :
        SupplierEditUserColumn(), addressFilter: [],
      searchedColumn: '', pagination: {}, pageSizeOption: [], budgetPlannerFilter: [],
      userTypeFilter: [], userProfileFilter: [], statusFilter: [], commodityFilter: [],
      sortColumnList: this.props.userInfo.userData.userRole === 1 ? this.prepareSortColumns(BuyerEditUserColumn())
        : this.prepareSortColumns(SupplierEditUserColumn())
    };

    this.handleClose = this.handleClose.bind(this);
    this.activeTabKeyAction = this.activeTabKeyAction.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleGetUserList = this.handleGetUserList.bind(this);
    this.handleGetApproverList = this.handleGetApproverList.bind(this);
    this.handleContactFieldChange = this.handleContactFieldChange.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDefaultApproverSelect = this.handleDefaultApproverSelect.bind(
      this
    );
    this.handleApproverSelect = this.handleApproverSelect.bind(this);
    this.handleCloseModel = this.handleCloseModel.bind(this);
    this.applyValidationForBlank = this.applyValidationForBlank.bind(this);
    this.handleOTPChange = this.handleOTPChange.bind(this);
    this.handleGetRegion = this.handleGetRegion.bind(this);
    this.handleGetProductData = this.handleGetProductData.bind(this);
    this.handleGetBrand = this.handleGetBrand.bind(this);
    this.handleCheckFunctional = this.handleCheckFunctional.bind(this);
  }

  componentDidMount() {
    let _this = this;
    const userId = this.props.userInfo.userData.id;
    const roleId = this.props.userInfo.userData.userRole;
    this.props.actionLoaderShow();
    this.handleGetUserList();
    let data = {
      roleId: this.props.userInfo.userData.userRole,
      userId: this.props.userInfo.userData.id
    };

    this.props.actionGetCommodity(data)
      .then(res => {
        if (res.payload.data.status === 200) {
          let commodityList = res.payload.data.resourceData.list;
          this.setState({ commodityList });
        } else this.setState({ commodityList: [] });
      }).catch(err => this.setState({ commodityList: [] }));

    this.props
      .actionGetCompanyData(data)
      .then((result, error) => {
        let purchaseResponse = result.payload.data.resourceData;
        this.setState({
          listOfDepartmentDept: purchaseResponse.departmentResponses,
        });
        if (this.props.userInfo.userData.userRole == 1) {
          this.setState({
            listOfAddress: purchaseResponse.addresses
          });
        } else if (this.props.userInfo.userData.userRole == 2) {
          this.setState({
            listOfAddress: purchaseResponse.addresseResponse
          });
        }
      })
      .catch(e => _this.props.actionLoaderHide());

    this.handleGetApproverList();
    this.props.actionGetUserProfileList({ userId, roleId });
    if (this.props.userInfo.userData.userRole == 1) {
      this.getProductLineData()
    }
  }
  getProductLineData() {
    let _this = this;


    let data = {
      roleId: this.props.userInfo.userData.userRole,
      userId: this.props.userInfo.userData.id
    };

    this.props
      .actionGetClassifications(data)
      .then((result, error) => {
        let purchaseResponse = result.payload.data.resourceData;
        this.setState({
          listOfDepartment: purchaseResponse.listOfDepartment ? purchaseResponse.listOfDepartment : [],
          listOfBrands: purchaseResponse.listOfBrands ? purchaseResponse.listOfBrands : [],
          listOfMajorCategory: purchaseResponse.listOfCategory ? purchaseResponse.listOfCategory : [],
          listOfGlobalRegions: purchaseResponse.listOfGlobalRegions ? purchaseResponse.listOfGlobalRegions : [],
          listOfSectorCategory: purchaseResponse.listOfProductLine ? purchaseResponse.listOfProductLine : [],
          listOfFunctionalArea: purchaseResponse.listOfDepartment ? purchaseResponse.listOfDepartment : []
        });

      })
      .catch(e => _this.props.actionLoaderHide());


  }
  applyValidationForBlank() {
    let fieldObject = {};
    let errorMessage = {};
    this.validatorTypes = strategy.createInactiveSchema(
      fieldObject,
      errorMessage
    );
  }

  handleResetValidation(e) {
    let fieldObject = {};
    let errorMessage = {};
    this.validatorTypes = strategy.createInactiveSchema(fieldObject, errorMessage);
    strategy.activateRule(this.validatorTypes, '');
    this.props.handleValidation('')(e);
  }

  applyValidation(index) {
    let fieldObject = {};
    let errorMessage = {};
    let listOfOtherApprovers = [];
    if (this.state.contactArray && this.state.contactArray[index]) {

      if (!this.state.contactArray[index].mobile) {
        fieldObject["mobile" + index] = "required|min:9|max:18";
        errorMessage["required.mobile" + index] = validationMessages.mobile.required;
        errorMessage["min.mobile" + index] = validationMessages.mobile.min;
        errorMessage["max.mobile" + index] = validationMessages.mobile.max;
      } else if (this.state.contactArray[index].mobile && (this.state.contactArray[index].mobile.length < 10 || this.state.contactArray[index].mobile.length > 17)) {
        fieldObject["mobile" + index] = "min:10|max:17";
        errorMessage["min.mobile" + index] = validationMessages.mobile.min;
        errorMessage["max.mobile" + index] = validationMessages.mobile.max;
      }

      if (!this.state.contactArray[index].firstName) {
        fieldObject["firstName"] = "required";
        errorMessage["required.firstName"] =
          validationMessages.firstName.required;
      }

      if (!this.state.contactArray[index].lastName) {
        fieldObject["lastName"] = "required";
        errorMessage["required.lastName"] =
          validationMessages.lastName.required;
      }

      if (!this.state.contactArray[index].employeeId) {
        fieldObject["employeeId"] = "required";
        errorMessage["required.employeeId"] =
          validationMessages.employeeId.required;
      }

      if (!this.state.contactArray[index].email) {
        fieldObject["email"] = "required";
        errorMessage["required.email"] = validationMessages.email.required;
      }

    }

    if (!this.state.contactArray[index].userType) {
      fieldObject["userType"] = "required";
      errorMessage["required.userType"] = validationMessages.userType.required;
    }

    if (this.props.userInfo.userData.userRole == 1) {
      if (!this.state.contactArray[index].userProfile) {
        fieldObject['userProfile'] = 'required';
        errorMessage['required.userProfile'] = validationMessages.userProfile.required;
      }

      if (this.state.contactArray[index].salariedAccount) {
        if (!this.state.contactArray[index].salariedAccount.departmentId) {

          fieldObject["salariedAccount"] = "required";
          errorMessage["required.salariedAccount"] = validationMessages.salariedAccount.required;

        }
      }

      if (this.state.contactArray[index].budgetPlanner && this.state.contactArray[index].budgetCostCenter) {
        if (!this.state.contactArray[index].budgetCostCenter.departmentId) {

          fieldObject["budgetCostCenter"] = "required";
          errorMessage["required.budgetCostCenter"] = validationMessages.budgetCostCenter.required;

        }
      }
    }

    this.validatorTypes = strategy.createInactiveSchema(
      fieldObject,
      errorMessage
    );
  }

  applyValidation123(index) {
    let fieldObject = {};
    let errorMessage = {};
    let listOfOtherApprovers = [];
    if (this.state.contactArray && this.state.contactArray[index]) {
      if (!this.state.contactArray[index].firstName) {
        fieldObject["firstName"] = "required";
        errorMessage["required.firstName"] =
          validationMessages.firstName.required;
      } else {
        fieldObject["firstName"] = "";
        errorMessage["required.firstName"] = "";
      }

      if (!this.state.contactArray[index].lastName) {
        fieldObject["lastName"] = "required";
        errorMessage["required.lastName"] =
          validationMessages.lastName.required;
      } else {
        fieldObject["lastName"] = "";
        errorMessage["required.lastName"] = "";
      }

      if (!this.state.contactArray[index].email)
        fieldObject["email"] = "required";
      errorMessage["required.email"] = validationMessages.email.required;
    } else {
      fieldObject["email"] = "";
      errorMessage["required.email"] = "";
    }

    if (!this.state.contactArray[index].mobile) {
      fieldObject["mobile"] = "required";
      fieldObject["mobile"] = "required|min:10|max:18";
      errorMessage["required.mobile"] = validationMessages.mobile.required;
      errorMessage["min.mobile"] = validationMessages.mobile.min;
      errorMessage["max.mobile"] = validationMessages.mobile.max;
    } else {
      fieldObject["mobile"] = "";
      errorMessage["required.mobile"] = "";
    }

    if (!this.state.contactArray[index].userType) {
      fieldObject["userType"] = "required";
      errorMessage["required.userType"] = validationMessages.userType.required;
    } else {
      fieldObject["userType"] = "";
      errorMessage["required.userType"] = "";
    }

    if (this.props.userInfo.userData.userRole == 1) {
      if (!this.state.contactArray[index].userProfile) {
        fieldObject['userProfile'] = 'required';
        errorMessage['required.userProfile'] = validationMessages.userProfile.required;
      } else {
        fieldObject['userProfile'] = '';
        errorMessage['required.userProfile'] = '';
      }


      if (this.state.contactArray[index].salariedAccount) {
        if (!this.state.contactArray[index].salariedAccount.departmentId) {

          fieldObject["salariedAccount"] = "required";
          errorMessage["required.salariedAccount"] = validationMessages.salariedAccount.required;

        } else {
          fieldObject["salariedAccount"] = "";
          errorMessage["required.salariedAccount"] = "";
        }
      }

      if (this.state.contactArray[index].budgetPlanner && this.state.contactArray[index].budgetCostCenter) {
        if (!this.state.contactArray[index].budgetCostCenter.departmentId) {

          fieldObject["budgetCostCenter"] = "required";
          errorMessage["required.budgetCostCenter"] = validationMessages.budgetCostCenter.required;

        } else {
          fieldObject["budgetCostCenter"] = "";
          errorMessage["required.budgetCostCenter"] = "";
        }
      }
    }
    this.validatorTypes = strategy.createInactiveSchema(
      fieldObject,
      errorMessage
    );
  }
  handleClose = (e) => {
    this.handleResetValidation(e);
    this.setState(
      { show: false, otpOption: false, activeGenerat: false, selectedApproverList: [] },
      () => {
        this.handleGetUserList();
        this.applyValidationForBlank();
      }
    );
  }

  handleShow = (event, idx, data) => {
    let approverList = this.props.supplierUsers.approverList;
    let i = this.state.contactArray.findIndex((obj) => obj.id === data.id);

    let listOfOtherApprovers = [];
    let listOfOtherApproversIds = [];
    let listOfOtherDefaultApprovers = [];
    let employeeId = ''; let mobile = ''; let email = '';
    if (this.state.contactArray && this.state.contactArray[i]) {
      if (
        (listOfOtherApproversIds = this.state.contactArray[i].salariedAccount)
      ) {
      } else {
        listOfOtherApproversIds = this.state.contactArray[
          i
        ].salariedAccount = {};
      }

      if (
        (listOfOtherApproversIds = this.state.contactArray[i].budgetCostCenter)
      ) {
      } else {
        listOfOtherApproversIds = this.state.contactArray[
          i
        ].budgetCostCenter = {};
      }


      if (
        (this.state.contactArray[i].employeeId)
      ) {
        employeeId = this.state.contactArray[i].employeeId
      }
      if (
        (this.state.contactArray[i].mobile)
      ) {
        mobile = this.state.contactArray[i].mobile
      }
      if (
        (this.state.contactArray[i].email)
      ) {
        email = this.state.contactArray[i].email
      }
    }

    if (
      this.state.contactArray &&
      this.state.contactArray[i] &&
      this.state.contactArray[i].listOfApproversRes
    ) {
      listOfOtherApproversIds = this.state.contactArray[
        i
      ].listOfApproversRes.map(function (obj, index) {
        return obj.id;
      });
      listOfOtherDefaultApprovers = this.state.contactArray[
        i
      ].listOfApproversRes.map(function (obj, index) {
        if (obj.defaultApprover === true) {
          return obj.id;
        }
      });
    }

    for (let index = 0; index < approverList.length; index++) {
      let element = approverList[index];
      element.checked = false;
      if (
        listOfOtherApproversIds &&
        !isEmptyObject(listOfOtherApproversIds) &&
        listOfOtherApproversIds.indexOf(element.id) !== -1
      ) {
        element.checked = true;
      }

      if (
        listOfOtherDefaultApprovers &&
        listOfOtherDefaultApprovers.indexOf(element.id) !== -1
      ) {
        element.defaultApprover = true;
      } else {
        element.defaultApprover = false;
      }
    }
    this.setState({
      approverList,
      employeeId,
      mobile, email
    });
    this.setState({ show: true, contactArrayIndex: i });
    this.applyValidationForBlank();
  }

  handleContactFieldChange(event, index, stateName) {
    const { value } = event.target;
    this.setState((prevState, props) => {
      prevState.editUserDetails[stateName] = value;
      return {
        editUserDetails: prevState.editUserDetails,
        [stateName + index]: value
      };
    });
  }

  activeTabKeyAction(tabKey) {
    if (tabKey === "first") this.props.history.push("home");
    if (tabKey === "third")
      this.props.history.push({
        pathname: "home",
        state: { path: "third" }
      });
    this.setState({ tabKey: tabKey });
  }

  handleGetUserList() {
    let _this = this;
    let reportArray = []; let userProfileFilter = []; let userTypeFilter = [];
    let statusFilter = []; let commodityFilter = []; let budgetPlannerFilter = [];
    let addressFilter = []; let departmentFilter = [];
    const userId = this.props.userInfo.userData.id;
    let data = {
      userId: this.props.userInfo.userData.id,
      roleId: this.props.userInfo.userData.userRole,
    };
    let pageSizeOption = this.state.pageSizeOption || 0;
    this.props
      .actionGetAllAddedUser(data)
      .then((result, error) => {
        if (result && result.payload && result.payload.data) {
          if (result.payload.data && result.payload.data.status == 200) {
            pageSizeOption = Number(result.payload.data.resourceData.totalRecordCount);
            reportArray = result.payload.data.resourceData && result.payload.data.resourceData.list ?
              result.payload.data.resourceData.list : result.payload.data.resourceData;

            budgetPlannerFilter.push({ value: true, text: 'Yes' }, { value: false, text: 'No' });

            var res = []; var resDep = [];
            var addressFilterData = reportArray.reduce((a, b) => {
              if (!res.includes(b.addressResponse && b.addressResponse.id)) {
                res.push(b.addressResponse && b.addressResponse.id);
                if (b.addressResponse && b.addressResponse.id)
                  a.push({ value: b.addressResponse.id, text: b.addressResponse.address });
              }
              return a;
            }, [])

            var departmentFilterData = reportArray.reduce((a, b) => {
              if (!resDep.includes(b.departmentResponse && b.departmentResponse.id)) {
                resDep.push(b.departmentResponse && b.departmentResponse.id);
                if (b.departmentResponse && b.departmentResponse.id)
                  a.push({ value: b.departmentResponse.id, text: b.departmentResponse.department });
              }
              return a;
            }, [])

            const map = new Map();
            for (const item of reportArray) {
              item.address = item.addressResponse && item.addressResponse.address ? item.addressResponse.address : ''
              item.department = item.departmentResponse && item.departmentResponse.department ? item.departmentResponse.department : ''
              item.locationId = item.addressResponse && item.addressResponse.locationId ? item.addressResponse.locationId : ''
              item.commodity = item.assignedCommodities && item.assignedCommodities.length > 0 ? item.assignedCommodities.map((item) => { return item.name }).join(',') : ''
              item.supervisor = item.listOfApproversRes && item.listOfApproversRes.length > 0 ? item.listOfApproversRes.map((item) => { return item.fullName }).join(',') : ''

              if (!map.has(item.userType)) {
                map.set(item.userType, true);    // set any value to Map
                if (item.userType) userTypeFilter.push({ value: item.userType, text: item.userType });
              }
              if (!map.has(item.userProfile)) {
                map.set(item.userProfile, true);    // set any value to Map
                if (item.userProfileId)
                  userProfileFilter.push({
                    value: item.userProfileId, text: item.userProfile ?
                      removeUnderScore(item.userProfile) : ''
                  });
              }
              if (!map.has(item.isEnabled)) {
                map.set(item.isEnabled, true);    // set any value to Map
                if (item.isEnabled !== undefined || item.isEnabled !== '') {
                  statusFilter.push({ value: item.isEnabled, text: item.isEnabled ? 'Verified' : 'Unverified' });
                }
              }

              item && item.assignedCommodities && item.assignedCommodities.length > 0
                && item.assignedCommodities.map(function (obj, index) {
                  if (!map.has(obj.id)) {

                    map.set(obj.id, true);    // set any value to Map
                    if (obj.id && obj.id !== undefined) {
                      commodityFilter.push({
                        value: obj && obj.id,
                        text: obj && obj.name
                      });
                    }
                  }
                });



              if (!map.has(item.addressResponse)) {
                map.set(item.addressResponse, true);// set any value to Map
                addressFilter.push({
                  value: item && item.addressResponse && item.addressResponse.id,
                  text: item && item.addressResponse && item.addressResponse.address
                });
              }
            }
            console.log("addressResponse  222", addressFilter)


            var resArr = [];
            reportArray.forEach(function (item) {
              var i = resArr.findIndex(x => x.userType === item.userType);
              if (i <= -1) {
                resArr.push({ value: item.userType, text: item.userType });
              }
              return null;
            });

            for (let i = 0; i < reportArray.length; i++) {
              if (!reportArray[i].salariedAccount)
                reportArray[i].salariedAccount = {};
              if (!reportArray[i].budgetCostCenter)
                reportArray[i].budgetCostCenter = {};
            }
            this.setState({ isRequest: false })
          } else if (result.payload.data.status == 400) {
            this.setState({ notFoundImage: true })
            _this.props.actionLoaderHide();
          }
          this.setState({
            contactArray: reportArray
              ? JSON.parse(JSON.stringify(reportArray))
              : [],
            contactArrayList: reportArray
              ? JSON.parse(JSON.stringify(reportArray))
              : [],
            totalRecord: pageSizeOption,
            userProfileFilter: userProfileFilter,
            userTypeFilter: userTypeFilter, departmentFilter: departmentFilterData,
            statusFilter: statusFilter, budgetPlannerFilter: budgetPlannerFilter,
            commodityFilter: commodityFilter, addressFilter: addressFilterData,
            pagination: { pageSize: pageSizeOption, size: 'small' },
            pageSizeOption: [{ "value": pageSizeOption, "label": "All" },
            { "value": 5, "label": "5" },
            { "value": 10, "label": "10" },
            { "value": 15, "label": "15" },
            { "value": 20, "label": "20" }],
          }, () => {
            this.getBuyerColumn()
          });
        } else {
          this.getBuyerColumn()
        }
        _this.props.actionLoaderHide();
      })
      .catch();
  }
  getRecord = (record, index) => {
    console.log(record, "55555", index);
  }

  getBuyerColumn = () => {
    if (this.props.userInfo.userData.userRole == 1)
      this.setState({
        columns: [
          {
            title: 'Name',
            dataIndex: 'fullName',
            width: 200,
            show: true,
            render: (text, row, index) => {
              return <span>{row.fullName}
              </span>;
            },
            ...this.getColumnSearchProps('fullName')
          },
          {
            title: 'Email',
            dataIndex: 'email',
            show: true,
            width: 150,
            ...this.getColumnSearchProps('email')
          },
          {
            title: 'User Profile',
            dataIndex: 'userProfileId',
            width: 250,
            show: true,
            render: (text, row, index) => {
              return <span>
                {row.userProfile
                  ? removeUnderScore(row.userProfile) : "-"}
              </span>;
            },
            filters: this.state.userProfileFilter,
            filterMultiple: true,
            onFilter: (value, record) => record.userProfileId && record.userProfileId.indexOf(value) === 0,
          },
          {
            title: 'Mobile No',
            dataIndex: 'mobile',
            show: true,
            width: 300,
            ...this.getColumnSearchProps('mobile')
          },
          {
            title: 'User Type',
            dataIndex: 'userType',
            show: true,
            width: 200,
            filters: this.state.userTypeFilter,
            filterMultiple: true,
            // onFilter: (value, record, index) => {
            //   if (record.userType.indexOf(value)) {
            //     this.getRecord(record, "hhhhh", index);
            //     return true;
            //   }
            // }
          },
          {
            title: 'Employee Id',
            dataIndex: 'employeeId',
            show: true,
            width: 200,
            ...this.getColumnSearchProps('employeeId')
          },
          {
            title: 'Department',
            dataIndex: 'department',
            show: true,
            width: 340,
            render: (text, row, index) => {
              return <span>
                {row.departmentResponse && row.departmentResponse.id
                  ? row.departmentResponse.department : "-"}
              </span>;
            },
            filters: this.state.departmentFilter,
            onFilter: (value, record) => record.departmentResponse && record.departmentResponse.id.indexOf(value) === 0,

          },
          {
            title: 'Location Id',
            dataIndex: 'locationid',
            show: true,
            width: 200,
            render: (text, row, index) => {
              return <span>
                {row.addressResponse && row.addressResponse.locationId
                  ? row.addressResponse.locationId : "-"}
              </span>;
            },
          },
          {
            title: 'Budget Planner',
            dataIndex: 'budgetPlanner',
            show: true,
            width: 340,
            render: (text, row, index) => {
              return <span>
                {row.budgetPlanner ?
                  <button className=" btn-hollow text-success fill-green cursor-default">
                    <span className="ico-right">
                      <svg>
                        <use
                          xlinkHref={`${Sprite}#rightIco`}
                        />
                      </svg>
                    </span>
                  </button>
                  : <button className="btn-hollow text-danger cursor-default mmin p-l-2">
                    {/* <span className="cross">&#10005;</span> */}
                    <span class="icon-close"></span>
                  </button>}
              </span>;
            },
            filters: this.state.budgetPlannerFilter || [],
            onFilter: (value, record) => value === record.budgetPlanner,
            filterMultiple: true,
          },
          {
            title: 'Address',
            dataIndex: 'address',
            show: true,
            render: (text, row, index) => {
              return <span>
                <div className="value1">
                  {row.addressResponse && row.addressResponse.address
                    ? row.addressResponse.address : "-"}
                </div>
              </span>;
            },
            width: 350,
            filters: this.state.addressFilter || [],
            filterMultiple: true,
            onFilter: (value, record) => record.addressResponse && record.addressResponse.id.indexOf(value) === 0,

          },
          {
            title: 'Status',
            dataIndex: 'isEnabled',
            show: true,
            width: 240,
            render: (text, row, index) => {
              return <span>{text
                ? <span className="success">Verified</span>
                : <span className="unverified"> Unverified</span>}</span>;
            },
            filters: this.state.statusFilter || [],
            filterMultiple: true,
            onFilter: (value, record) => value === record.isEnabled
          },
          {
            title: 'Commodity',
            dataIndex: 'assignedCommodities',
            show: true,
            width: 300,
            render: (text, row, index) => {
              return <span>{text ? this.renderCommodity(text) : ''}</span>;
            },
            filters: this.state.commodityFilter,
            filterMultiple: true,
            onFilter: (value, record) => record.assignedCommodities && record.assignedCommodities.some(item => item.id === value),
          },
          {
            title: 'Immediate Supervisor/ Approve',
            dataIndex: 'supervisor',
            show: true,
            width: 400,
            render: (text, row, index) => {
              return <span className="flex-1 text-left">
                <ul className="list-style-none listuser m-b-0">
                  {row &&
                    row.listOfApproversRes &&
                    row.listOfApproversRes.length > 0 ?
                    (this.state.contactArrayList[
                      index
                    ].listOfApproversRes.slice(0, (this.state.contactArrayList &&
                      row && row.defaultCountApprover !== undefined ?
                      row.defaultCountApprover : defaultCountApprover)).map((val, idx) => {
                        return (
                          <li>
                            {val.firstName + " " + (val.lastName ? val.lastName : '')} |  {val.userProfile
                              ? removeUnderScore(val.userProfile) : "-"} </li>
                        );
                      })) : '-'}
                </ul>
                <div>

                  {row &&
                    row.listOfApproversRes &&
                    row.listOfApproversRes.length >
                    (row && row.defaultCountApprover !== undefined ?
                      row.defaultCountApprover : defaultCountApprover) ?
                    <div>
                      <p
                        className="blueclr moresel"
                        onClick={() => {
                          this.addMoreApproverList(index, row.defaultCountApprover);
                        }}
                      ><span className="icon-add"></span>
                        {row &&
                          row.listOfApproversRes &&
                          row.listOfApproversRes.length - (
                            row && row.defaultCountApprover !== undefined ?
                              row.defaultCountApprover : defaultCountApprover)} More  </p>
                    </div> : ''}

                </div>
              </span>;
            },
            // ...this.getColumnSearchProps('supervisor')
          },
          {
            title: '',
            dataIndex: 'id',
            show: true,
            width: 100,
            render: (text, row, index) => {
              return <span>
                <div className="more-dd action-dd">
                  <DropdownButton
                    onClick={e => this.openDropDownBtn(e)}
                    title={
                      <Glyphicon glyph="option-vertical" />
                    }
                  >
                    <li
                      className="flex align-center m-b-10"
                      onClick={event =>
                        this.handleShow(event, index, row)
                      }
                    >
                      <button
                        className="btn btn-task flex-direction-intial p0"
                        onClick={event =>
                          this.handleShow(event, index, row)
                        }
                      >
                        <span className="ico-edit">
                          <svg>
                            <use xlinkHref={`${Sprite}#editIco`} />
                          </svg>
                        </span>
                      </button>
                      <span className="flex-1 ico-txt clr-white text-center">EDIT</span>
                    </li>


                    <li
                      className="flex align-center"

                      onClick={event =>
                        this.deleteUserConfirmation(
                          event,
                          this.state.contactArrayList[index].id,
                          index, row
                        )
                      }
                    >
                      <span className="ico-action-sm ">
                        <svg>
                          <use
                            xlinkHref={`${Sprite}#deleteIco`}
                          />
                        </svg>
                      </span>
                      <span className="flex-1 text-center">DELETE</span>

                    </li>

                    {this.state.timeCounter && this.state.contactArrayList &&
                      this.state.contactArrayList[index] &&
                      this.state.contactArrayList[index]
                        .emailVerified && this.state.contactArrayList[index]
                        .mobileVerified ? ('') : this.state.number > 1 && this.state.number < 61 ?
                      <li className="ico-txt clr-white text-center countn">
                        <span>{this.state.number} Second</span>
                      </li> : (
                        <li onClick={event =>
                          this.handleVerificationReset(event, this.state.contactArrayList &&
                            this.state.contactArrayList[index] &&
                            this.state.contactArrayList[index]
                              .id)
                        }>
                          {this.state.contactArrayList[index] &&
                            this.state.contactArrayList[index]
                              .isEnabled ? '' :
                            <div className="flex align-center">
                              <button
                                className="btn btn-task flex-direction-intial p0"
                              >
                                <span className="ico-action-sm">
                                  <svg>
                                    <use xlinkHref={`${Sprite}#refresh1Ico`} />
                                  </svg>
                                </span>

                              </button>
                              <span className="flex-1  ico-txt clr-white text-center">RESEND</span>
                            </div>
                          }
                        </li>)}

                  </DropdownButton>
                </div>

              </span>;
            },
          },
        ]
      })
    else
      this.setState({
        columns: [
          {
            title: 'Name',
            dataIndex: 'fullName',
            width: 200,
            show: true,
            render: (text, row, index) => {
              return <span>{row.fullName}
              </span>;
            },
            ...this.getColumnSearchProps('fullName')
          },
          {
            title: 'Email',
            dataIndex: 'email',
            show: true,
            width: 150,
            ...this.getColumnSearchProps('email')
          },
          // {
          //   title: 'User Profile',
          //   dataIndex: 'userProfileId',
          //   width: 250,
          //   show: true,
          //   render: (text, row, index) => {
          //     return <span>
          //       {row.userProfile
          //         ? removeUnderScore(row.userProfile): "-"}
          //       </span>;
          //   },
          //   filters: this.state.userProfileFilter,
          //   filterMultiple: true,
          //   onFilter: (value, record) => record.userProfileId && record.userProfileId.indexOf(value) === 0,
          // },
          {
            title: 'Mobile No',
            dataIndex: 'mobile',
            show: true,
            width: 300,
            ...this.getColumnSearchProps('mobile')
          },
          {
            title: 'User Type',
            dataIndex: 'userType',
            show: true,
            width: 200,
            filters: this.state.userTypeFilter,
            filterMultiple: true,
            onFilter: (value, record) => record.userType.indexOf(value) === 0,
          },
          {
            title: 'Employee Id',
            dataIndex: 'employeeId',
            show: true,
            width: 200,
            ...this.getColumnSearchProps('employeeId')
          },
          // {
          //   title: 'Department',
          //   dataIndex: 'department',
          //   show: true,
          //   width: 340,
          //   // filters: [
          //   //   {
          //   //     text: 'Global cheif officer',
          //   //     value: 'Global cheif officer',
          //   //   },
          //   //   {
          //   //     text: 'Designer Scenario',
          //   //     value: 'Designer Scenario',
          //   //   },
          //   // ],
          //   // filterMultiple: false,
          //   // onFilter: (value, record) => record.name.indexOf(value) === 0,
          // },
          {
            title: 'Location Id',
            dataIndex: 'locationid',
            show: true,
            width: 200,
            render: (text, row, index) => {
              return <span>
                {row.addressResponse && row.addressResponse.locationId
                  ? row.addressResponse.locationId : "-"}
              </span>;
            },
          },
          // {
          // title: 'Budget Planner',
          //   dataIndex: 'budgetPlanner',
          //   show: true,
          //   width: 340,
          //   render: (text, row, index) => {
          //     return <span>
          //       {row.budgetPlanner ? 
          //       <button className=" btn-hollow text-success fill-green cursor-default">
          //       <span className="ico-right">
          //         <svg>
          //           <use
          //             xlinkHref={`${Sprite}#rightIco`}
          //           />
          //         </svg>
          //       </span>
          //     </button>
          //       : <button className="btn-hollow text-danger cursor-default mmin">
          //       {/* <span className="cross">&#10005;</span> */}
          //       <span class="icon-close"></span>
          //     </button>}
          //       </span>;
          //   },
          //   filters: this.state.budgetPlannerFilter || [],
          //   onFilter: (value, record) => value === record.budgetPlanner,
          //   filterMultiple: false,
          // },
          {
            title: 'Address',
            dataIndex: 'address',
            show: true,
            render: (text, row, index) => {
              return <span>
                <div className="value1">
                  {row.addressResponse && row.addressResponse.address
                    ? row.addressResponse.address : "-"}
                </div>
              </span>;
            },
            width: 350,
            // filters: [
            //   {
            //     text: 'Global Chief Financial Officer',
            //     value: 'Global Chief Financial Officer',
            //   },
            //   {
            //     text: 'New York',
            //     value: 'New York',
            //   },
            // ],
            // filterMultiple: false,
            // onFilter: (value, record) => record.address.indexOf(value) === 0,
          },
          {
            title: 'Status',
            dataIndex: 'isEnabled',
            show: true,
            width: 240,
            render: (text, row, index) => {
              return <span>{text
                ? <span className="success">Verified</span>
                : <span className="unverified"> Unverified</span>}</span>;
            },
            filters: this.state.statusFilter || [],
            filterMultiple: true,
            onFilter: (value, record) => value === record.isEnabled
          },
          {
            title: 'Commodity',
            dataIndex: 'assignedCommodities',
            show: true,
            width: 300,
            render: (text, row, index) => {
              return <span>{text ? this.renderCommodity(text) : ''}</span>;
            },
            // filters: this.state.commodityFilter,
            // onFilter: (value, record) => this.getFilteredData(value),
            //onFilter: (value, record) => record.assignedCommodities && record.assignedCommodities.indexOf(value) === 0,
          },
          {
            title: 'Immediate Supervisor/ Approve',
            dataIndex: 'supervisor',
            show: true,
            width: 400,
            render: (text, row, index) => {
              return <span className="flex-1 text-left">
                <ul className="list-style-none listuser m-b-0">
                  {row &&
                    row.listOfApproversRes &&
                    row.listOfApproversRes.length > 0 ?
                    (this.state.contactArrayList[
                      index
                    ].listOfApproversRes.slice(0, (this.state.contactArrayList &&
                      row && row.defaultCountApprover !== undefined ?
                      row.defaultCountApprover : defaultCountApprover)).map((val, idx) => {
                        return (
                          <li>
                            {val.firstName + " " + (val.lastName ? val.lastName : '')} |  {val.userProfile
                              ? removeUnderScore(val.userProfile) : "-"} </li>
                        );
                      })) : '-'}
                </ul>
                <div>

                  {row &&
                    row.listOfApproversRes &&
                    row.listOfApproversRes.length >
                    (row && row.defaultCountApprover !== undefined ?
                      row.defaultCountApprover : defaultCountApprover) ?
                    <div>
                      <p
                        className="blueclr moresel"
                        onClick={() => {
                          this.addMoreApproverList(index, row.defaultCountApprover);
                        }}
                      ><span className="icon-add"></span>
                        {row &&
                          row.listOfApproversRes &&
                          row.listOfApproversRes.length - (
                            row && row.defaultCountApprover !== undefined ?
                              row.defaultCountApprover : defaultCountApprover)} More  </p>
                    </div> : ''}

                </div>
              </span>;
            },
            // ...this.getColumnSearchProps('supervisor')
          },
          {
            title: '',
            dataIndex: 'id',
            show: true,
            width: 100,
            render: (text, row, index) => {
              return <span>
                <div className="more-dd action-dd">
                  <DropdownButton
                    onClick={e => this.openDropDownBtn(e)}
                    title={
                      <Glyphicon glyph="option-vertical" />
                    }
                  >
                    <li
                      className="flex align-center m-b-10"
                      onClick={event =>
                        this.handleShow(event, index, row)
                      }
                    >
                      <button
                        className="btn btn-task flex-direction-intial p0"
                        onClick={event =>
                          this.handleShow(event, index, row)
                        }
                      >
                        <span className="ico-edit">
                          <svg>
                            <use xlinkHref={`${Sprite}#editIco`} />
                          </svg>
                        </span>
                      </button>
                      <span className="flex-1 ico-txt clr-white text-center">EDIT</span>
                    </li>


                    <li
                      className="flex align-center"

                      onClick={event =>
                        this.deleteUserConfirmation(
                          event,
                          this.state.contactArrayList[index].id,
                          index,
                          row
                        )
                      }
                    >
                      <span className="ico-action-sm ">
                        <svg>
                          <use
                            xlinkHref={`${Sprite}#deleteIco`}
                          />
                        </svg>
                      </span>
                      <span className="flex-1 text-center">DELETE</span>

                    </li>

                    {this.state.timeCounter && this.state.contactArrayList &&
                      this.state.contactArrayList[index] &&
                      this.state.contactArrayList[index]
                        .emailVerified && this.state.contactArrayList[index]
                        .mobileVerified ? ('') : this.state.number > 1 && this.state.number < 61 ?
                      <li className="ico-txt clr-white text-center countn">
                        <span>{this.state.number} Second</span>
                      </li> : (
                        <li onClick={event =>
                          this.handleVerificationReset(event, this.state.contactArrayList &&
                            this.state.contactArrayList[index] &&
                            this.state.contactArrayList[index]
                              .id)
                        }>
                          {this.state.contactArrayList[index] &&
                            this.state.contactArrayList[index]
                              .isEnabled ? '' :
                            <div className="flex align-center">
                              <button
                                className="btn btn-task flex-direction-intial p0"
                              >
                                <span className="ico-action-sm">
                                  <svg>
                                    <use xlinkHref={`${Sprite}#refresh1Ico`} />
                                  </svg>
                                </span>

                              </button>
                              <span className="flex-1  ico-txt clr-white text-center">RESEND</span>
                            </div>
                          }
                        </li>)}

                  </DropdownButton>
                </div>

              </span>;
            },
          },
        ]
      })
  }
  handleChange(event, index, stateName) {
    let value = event.target.value;
    let checked = event.target.checked;
    const { options, selectedIndex } = event.target;
    let listOfAddress = this.state.listOfAddress;
    let allContactArray = this.state.contactArray;
    let contactArray = allContactArray[index];

    if (stateName === "departmentId") {
      contactArray.departmentResponse = [];
      contactArray.departmentResponse.department =
        options[selectedIndex].innerHTML;
      contactArray.departmentResponse.id = value;
      allContactArray[index] = contactArray;
      this.setState({
        contactArray: allContactArray
      });
    }

    if (stateName === "firstName" || stateName === "lastName" || stateName === "employeeId") {
      if (value) value = specialCharacter(value);
      else value = value;
    }

    this.setState((prevState, props) => {
      prevState.contactArray[index][stateName] = value;

      if (stateName === "userProfileId") {
        let filteredUserProfileName = _.filter(
          this.props.supplierUsers.profileList,
          function (userData) {
            return userData.id === value;
          }
        );
        if (
          filteredUserProfileName &&
          filteredUserProfileName[0] &&
          filteredUserProfileName[0].profileName &&
          filteredUserProfileName[0].profileName
        )
          prevState.contactArray[index]["userProfile"] =
            filteredUserProfileName[0].profileName;
        else prevState.contactArray[index]["userProfile"] = "";
      }

      if (stateName === "addressRequest") {

        if (contactArray.addressResponse == undefined) {
          contactArray.addressResponse = {};
        }

        let addressObj = _.filter(listOfAddress, function (data) {
          return data.id === value;
        });
        let stateNameExtra = "area";
        let locDetails =
          addressObj && addressObj[0] && addressObj[0].locationId
            ? addressObj[0].locationId
            : "";

        this.setState((prevState, props) => {
          prevState.contactArray[index][stateNameExtra] = locDetails;
          return {
            contactArray: prevState.contactArray,
            [stateNameExtra + index]: locDetails
          };
        });

        value = addressObj[0];

        this.setState({
          addressRequest: value,
          contactArray: allContactArray
        });
        if (addressObj) {
          contactArray.addressResponse = addressObj[0];
          allContactArray[index] = contactArray;
          this.setState({
            contactArray: allContactArray
          });
        } else {
          contactArray.addressResponse = '';
          allContactArray[index] = contactArray;
          this.setState({
            contactArray: allContactArray
          });
        }
      }

      if (stateName === "budgetPlanner" || stateName === "active") {
        if (checked) {
          value = true;
        } else {
          value = false;
        }
        if (stateName === "budgetPlanner")
          contactArray.budgetPlanner = value;
        if (stateName === "active")
          contactArray.active = value;
        allContactArray[index] = contactArray;
        this.setState({
          contactArray: allContactArray
        });

        this.setState((prevState, props) => {
          prevState.contactArray[index][stateName] = value;
          return {
            contactArray: prevState.contactArray,
            [stateName + index]: value,
            activeGenerat: true
          };
        });
      }
      return {
        contactArray: prevState.contactArray,
        [stateName + index]: value,
        activeGenerat: true
      };
    });
  }

  handleGetApproverList() {
    const userId = this.props.userInfo.userData.id;
    const roleId = this.props.userInfo.userData.userRole;
    this.props
      .actionGetApproverList({ userId, roleId })
      .then((result, error) => {
        if (result && result.payload) {
          let reportArray =
            result.payload.data && result.payload.data.resourceData;
          this.setState({
            approverList: reportArray
          });
        }
      })
      .catch();
  }

  handleDeleteUser(event, id, index) {
    let _this = this;
    const parentId = this.props.userInfo.userData.id;
    const roleId = this.props.userInfo.userData.userRole;
    const userId = id;
    let data = {
      parentId,
      roleId,
      userId
    };

    this.props
      .actionDeleteUser(data)
      .then((result, error) => {
        if (result.payload.data.resourceData) {
          this.setState({ showApprover: true });
        }
        let status = result.payload.data.status;
        if (status === 200) {
          this.handleGetUserList();
          // let list = _this.state.contactArrayList;
          // let contactArrayLength =
          //   _this.state.contactArrayList && _this.state.contactArrayList.length;
          // if (contactArrayLength > 0) {
          //   list.splice(index, 1);
          //   _this.setState({
          //     contactArrayList: list
          //   }, () => {
          //   });
          // }
        }
      })
      .catch();
    this.setState({
      showApproveModal: false
    });
  }

  handleDefaultApproverSelect(event, id, stateName) {
    let index = this.state.contactArrayIndex;
    let mainindex = this.state.contactArrayIndex;
    const { value } = event.target;

    let contactArrayList = this.state.contactArray;

    this.setState((prevState, props) => {
      prevState.contactArray[index][stateName] = id;
      return {
        contactArray: prevState.contactArray,
        [stateName + index]: id
      };
    });

    let approverList = this.props.supplierUsers.approverList;
    let listOfOtherApprovers = [];
    let listOfOtherDefaultApprovers = [];
    if (
      this.state.contactArray &&
      this.state.contactArray[index] &&
      this.state.contactArray[index].listOfApproversRes
    ) {
      listOfOtherDefaultApprovers = [id];
    }

    for (let index = 0; index < approverList.length; index++) {
      let element = approverList[index];
      this.setState({ contactArrayList: contactArrayList });
      if (
        listOfOtherDefaultApprovers &&
        listOfOtherDefaultApprovers.indexOf(element.id) !== -1
      ) {
        element.defaultApprover = true;
      } else {
        element.defaultApprover = false;
      }
    }
    this.setState({
      approverList
    });
  }

  handleApproverSelect(event, approverId, optionclose, defAppr) {
    const index = this.state.contactArrayIndex;
    let selected = event.target.checked;
    const approverList = this.state.approverList;
    let indexArr = this.state.approverList.findIndex(x => x.id == approverId);
    let listOfOtherApprovers = [];
    let defApprFlag = false
    if (defAppr) {
      defApprFlag = true
    }
    if (optionclose)
      selected = false
    if (selected) {
      this.setState({ activeGenerat: true });
      const result = this.state.approverList.find(
        applist => applist.id === approverId
      );
      approverList[indexArr].checked = true;
      this.setState({ approverList: approverList });
    } else {
      approverList[indexArr].checked = false;
      approverList[indexArr].defaultApprover = false;
      this.setState({ approverList: approverList });
    }

    listOfOtherApprovers = _.filter(this.state.approverList, function (
      userData
    ) {
      return userData.checked === true;
    });
    if (listOfOtherApprovers.length === 0) {
      approverList[indexArr].defaultApprover = false;
      this.setState({ approverList: approverList });
    }
    listOfOtherApprovers = _.filter(this.state.approverList, function (
      userData
    ) {
      return userData.checked === true;
    });
    if (listOfOtherApprovers.length <= 0) {
      for (let index = 0; index < approverList.length; index++) {
        approverList[index].defaultApprover = false;
        this.setState({ approverList: approverList, selectedApproverList: listOfOtherApprovers });
      }
    } else if (listOfOtherApprovers.length === 1) {
      for (let index = 0; index < approverList.length; index++) {
        if (approverList[index].checked)
          approverList[index].defaultApprover = true;
        this.setState({ approverList: approverList, selectedApproverList: listOfOtherApprovers });
      }
    } else if (listOfOtherApprovers.length > 0) {
      if (defApprFlag) {
        for (let index = 0; index < approverList.length; index++) {
          approverList[index].defaultApprover = false;
        }

        approverList[indexArr].defaultApprover = defApprFlag;
      }
      this.setState({ selectedApproverList: listOfOtherApprovers });

    }
    this.setState({ activeGenerat: true })
  }
  handleModalShown() {
    let approverList = [...this.props.supplierUsers.approverList];
    for (let index = 0; index < approverList.length; index++) {
      let element = approverList[index];
      element.checked = false;
      if (
        this.state.contactArray[this.state.contactArrayIndex] &&
        this.state.contactArray[this.state.contactArrayIndex]
          .listOfOtherApprovers &&
        this.state.contactArray[
          this.state.contactArrayIndex
        ].listOfOtherApprovers.indexOf(element.id) !== -1
      )
        element.checked = true;
    }
    this.setState({
      approverList
    });
  }

  validateData = (e, index, actionType) => {
    this.applyValidation(index);
    e.preventDefault();
    let _this = this;
    _this.props.validate(function (error) {
      if (!error) {
        switch (actionType) {
          case "generateOTP":
            const roleId = _this.props.userInfo.userData.userRole;
            const userId = _this.props.userInfo.userData.id;
            _this.props.actionLoaderShow();
            _this.props
              .actionGenerateOTPToEditUser({ userId, roleId })
              .then((result, error) => {
                _this.setState({
                  otpOption: true
                });
                _this.props.actionLoaderHide();
              })
              .catch(e => {
                _this.props.actionLoaderHide();
              });
            break;
          case "editUser":
            _this.handleEditUser(e, index);
            break;

          default:
            break;
        }
      }
    });
  };

  getValidatorData = () => {
    return this.state;
  };

  handleEditUser(event, index) {
    let userType;
    const emailOTP = this.state.OTPField.join("");
    const roleId = this.props.userInfo.userData.userRole;
    const parentUserId = this.props.userInfo.userData.id;
    let _this = this;
    let listOfOtherApproversIds = [];
    let listOfOtherApprovers = [];
    let defaultApproverIds = [];
    let listOfDefaultApprover = [];
    if (this.state.approverList) {
      listOfOtherApprovers = _.filter(this.state.approverList, function (
        userData
      ) {
        return userData.checked === true;
      });
      listOfOtherApproversIds = listOfOtherApprovers.map(function (obj, index) {
        return obj.id;
      });

      listOfDefaultApprover = _.filter(this.state.approverList, function (
        userData
      ) {
        return userData.defaultApprover === true;
      });
      defaultApproverIds = listOfDefaultApprover.map(function (obj, index) {
        return obj.id;
      });
    }
    let flag = true;
    if (isNaN(emailOTP)) {
      showErrorToast("Please enter correct otp.");
      flag = false;
    }

    if (flag) {
      let address = this.state.addressRequest;
      let budgetPlanner = this.state.contactArray[index].budgetPlanner;
      userType = this.state.contactArray[index].userType === "Admin" ? 1 : 2;
      let idx = this.props.supplierUsers && this.props.supplierUsers.profileList.findIndex(obj => obj.id === this.state.contactArray[index].userProfileId);
      if (idx >= 0 && this.props.supplierUsers.profileList[idx].profileName === 'Admin') {
        userType = 1;
      }
      let data = {
        userDetailRequests: [
          {
            userId: this.state.contactArray[index].id,
            firstName: this.state.contactArray[index].firstName,
            lastName: this.state.contactArray[index].lastName,
            employeeId: this.state.contactArray[index].employeeId,
            userType: userType,
            userProfile: this.state.contactArray[index].userProfileId,
            departmentId: this.state.contactArray[index].departmentId,
            budgetPlanner: this.state.contactArray[index].budgetPlanner,
            addressRequest: this.state.addressRequest,
            listOfOtherApprovers: listOfOtherApproversIds,
            email: this.state.contactArray[index].email,
            mobile: this.state.contactArray[index].mobile,
            defaultApprover: defaultApproverIds[0]
              ? defaultApproverIds[0]
              : listOfOtherApproversIds[0],
            salariedAccount: this.state.contactArray[index].salariedAccount,
            budgetCostCenter: this.state.contactArray[index].budgetCostCenter,
            assignedCommodities: this.state.contactArray[index].assignedCommodities ?
              this.state.contactArray[index].assignedCommodityIds ? this.state.contactArray[index].assignedCommodityIds :
                this.state.contactArray[this.state.contactArrayIndex].assignedCommodities.map(obj => obj.id) : [],
            active: this.state.contactArray[index].active,
          }
        ],
        parentUserId,
        roleId,
        emailOTP
      };


      this.props
        .actionEditProfile(data)
        .then((result, error) => {
          _this.props.actionLoaderHide();
          if (result.payload.data.status === 400) {
            showErrorToast(result.payload.data.message);
          } else {
            let UT = userType === 1 ? 'Admin' : 'Regular';
            let element = this.state.contactArray;
            element[index].userType = UT;
            element[index].listOfApproversRes = listOfOtherApprovers;
            this.setState({
              contactArrayList: element,
              show: false,
              otpOption: false,
              activeGenerat: false
            });
            /*** page reload: Need to take data-list from DB */
            this.handleGetUserList();
          }
        })
        .catch(e => _this.props.actionLoaderHide());


    }
  }

  getValidationState(stateName) {
    if (
      this.props.getValidationMessages(stateName) == "" &&
      this.state[stateName] == ""
    )
      return null;
    else if (
      this.props.getValidationMessages(stateName) == "" &&
      this.state[stateName] !== ""
    )
      return "success";
    else if (
      this.props.getValidationMessages(stateName) !== "" &&
      this.state[stateName] !== ""
    )
      return "error";
    else if (
      this.props.getValidationMessages(stateName) !== "" &&
      this.state[stateName] == ""
    )
      return "error";
  }
  deleteUserConfirmation(event, id, index, row) {
    const parentId = this.props.userInfo.userData.id;
    const roleId = this.props.userInfo.userData.userRole;
    let idx = this.state.contactArray.findIndex((obj) => obj.id === row.id);
    const userId = id;
    let data = {
      parentId,
      roleId,
      userId
    };
    this.props
      .actionDeleteAffectedUser(data)
      .then((result, error) => {
        this.setState({
          affrctedUser: result.payload.data.resourceData
        });
      })
      .catch();

    this.setState({
      showApproveModal: false
    });
    this.setState({
      showApproveModal: true,
      deleteId: id,
      deleteIndex: idx, //index
    });
  }
  handleCloseModel() {
    this.setState({ showApproveModal: false, type: "", employeeId: '', mobile: '', email: '' });
  }
  handleOTPChange(stateName, index, e) {
    const value = e.target.value;
    this.setState(
      (prevState, props) => {
        prevState[stateName][index] = value;
        return { [stateName]: prevState[stateName] };
      },
      () => {
        const OTPField = this.state.OTPField.join("");
        if (OTPField.length == 6) {
          this.setState({
            OTPError: ""
          });
        }

        const nextElementIndex = index + 1;
        if (nextElementIndex < 6 && this.state[stateName][index] !== "") {
          const elementRef = stateName + nextElementIndex;
          this[elementRef].focus();
        }
      }
    );
  }

  handleGetRegion(param) {
    let rowIndex = param.rowIndex;
    let contactArray = this.state.contactArray;
    if (param.costType == "addUserCostCenter") {
      contactArray[rowIndex].budgetCostCenter.geographyId = param.geographyId;
      contactArray[rowIndex].budgetCostCenter.geogrophyId = param.geogrophyId;
      contactArray[rowIndex].budgetCostCenter.region1 = param.region1;
      contactArray[rowIndex].budgetCostCenter.region2 = param.region2;
      contactArray[rowIndex].budgetCostCenter.region3 = param.region3;
      contactArray[rowIndex].budgetCostCenter.region4 = param.region4;
      contactArray[rowIndex].budgetCostCenter.region5 = param.region5;
      contactArray[rowIndex].budgetCostCenter.region6 = param.region6;
      contactArray[rowIndex].budgetCostCenter.region7 = param.region7;
      contactArray[rowIndex].budgetCostCenter.region8 = param.region8;
    } else {
      contactArray[rowIndex].salariedAccount.geographyId = param.geographyId;
      contactArray[rowIndex].salariedAccount.geogrophyId = param.geogrophyId;
      contactArray[rowIndex].salariedAccount.region1 = param.region1;
      contactArray[rowIndex].salariedAccount.region2 = param.region2;
      contactArray[rowIndex].salariedAccount.region3 = param.region3;
      contactArray[rowIndex].salariedAccount.region4 = param.region4;
      contactArray[rowIndex].salariedAccount.region5 = param.region5;
      contactArray[rowIndex].salariedAccount.region6 = param.region6;
      contactArray[rowIndex].salariedAccount.region7 = param.region7;
      contactArray[rowIndex].salariedAccount.region8 = param.region8;
    }

    let _this = this;
    _this.setState({ contactArray: contactArray, activeGenerat: true }, () => {
    });
  }
  handleGetProductData(param) {
    let _this = this;
    let termsAndConditions = param;
    let rowIndex = param.rowIndex;
    let contactArray = this.state.contactArray;
    if (param.costType == "addUserCostCenter") {
      contactArray[rowIndex].budgetCostCenter.sectorId = param.sectorId;
      contactArray[rowIndex].budgetCostCenter.modelFamilyId =
        param.modelFamilyId;
      contactArray[rowIndex].budgetCostCenter.productLineId =
        param.productLineId;
      contactArray[rowIndex].budgetCostCenter.productLineClassification =
        param.programId;
      contactArray[rowIndex].budgetCostCenter.modelId = param.modelId;
    } else {
      contactArray[rowIndex].salariedAccount.sectorId = param.sectorId;
      contactArray[rowIndex].salariedAccount.modelFamilyId =
        param.modelFamilyId;
      contactArray[rowIndex].salariedAccount.productLineId =
        param.productLineId;
      contactArray[rowIndex].salariedAccount.productLineClassification =
        param.programId;
      contactArray[rowIndex].salariedAccount.modelId = param.modelId;
    }

    _this.setState({ contactArray: contactArray, activeGenerat: true }, () => {
    });
  }
  handleGetBrand(param) {
    let _this = this;
    let rowIndex = param.rowIndex;
    let contactArray = this.state.contactArray;
    if (param.costType == "addUserCostCenter") {
      contactArray[rowIndex].budgetCostCenter.subBrandId = param.subBrandId;
      contactArray[rowIndex].budgetCostCenter.brandId = param.brandId;
    } else {
      contactArray[rowIndex].salariedAccount.subBrandId = param.subBrandId;
      contactArray[rowIndex].salariedAccount.brandId = param.brandId;
    }

    _this.setState({ contactArray: contactArray, activeGenerat: true }, () => {
    });
  }
  handleCheckFunctional(param) {
    let _this = this;
    let rowIndex = param.rowIndex;
    let contactArray = this.state.contactArray;
    if (param.costType == "addUserCostCenter") {
      contactArray[rowIndex].budgetCostCenter.departmentId = param.departmentId;
      contactArray[rowIndex].budgetCostCenter.subDepartmentId =
        param.subDepartmentId;
      contactArray[rowIndex].budgetCostCenter.teamId = param.teamId;
    } else {
      contactArray[rowIndex].salariedAccount.departmentId = param.departmentId;
      contactArray[rowIndex].salariedAccount.subDepartmentId =
        param.subDepartmentId;
      contactArray[rowIndex].salariedAccount.teamId = param.teamId;
    }

    _this.setState({ contactArray: contactArray, activeGenerat: true }, () => {
    });
  }
  checkExistingEmpId(event, field, existence, index) {
    
  }
  handleVerificationReset(e, userToSendId) {
    let _this = this;

    const { timer } = this.state;
    this.setState({
      number: 60,
    });

    let data = {
      parentUserId: this.props.userInfo.userData.id,
      userToSendId: userToSendId,
      roleId: this.props.userInfo.userData.userRole,
    };

    this.props
      .actionResetEmailMobileVerification(data)
      .then((result, error) => {
        if (result.payload.data.status == 200) {
          if (timer) return null;
          this.setState({
            timer: setInterval(() => {
              this.setState({
                number: this.state.number - 1,
              });
            }, 500),
          });
        } else {
          this.setState({
            number: 0,
          });
        }
        _this.props.actionLoaderHide();
      })
      .catch(e => _this.props.actionLoaderHide());
  }

  addMoreApproverList(index, defaultCount) {
    let defaultCounts = defaultCount !== undefined ? defaultCount : this.state.defaultCountApprover;
    let contactArrayList = this.state.contactArrayList;
    let countApprovers = defaultCounts + increaseRecords;
    contactArrayList[index].defaultCountApprover = countApprovers;
    this.setState({ contactArrayList: contactArrayList }, () => { })
  }

  openDropDownBtn(e) {
    this.setState({
      number: 0,
    });
  }

  showTooltip = (e) => {
    if (e.target.scrollWidth > e.target.offsetWidth)
      this.setState({ visible: true });
  }

  changeOverlay = (changes) => {
    return (<Fragment>
      {changes.map((val, i) => (
        <div className="terms bullet" key={i}>{val.name}</div>
      ))}
    </Fragment>);
  }

  renderCommodity = (list) => {
    let element = "";
    let returnElement = <div>All</div>;
    if (list) {
      list.map((obj, i) => {
        if (i <= 1)
          element = element + `${obj.name}${i === list.length - 1 ? "" : ", "}`;
      });
      if (list && list.length > 2) {
        returnElement = <Tooltip
          placement="right"
          overlayClassName="change-overlay"
          title={() => this.changeOverlay(list)}>
          <div className="p-b-10 rev-tooltip">{element + "..."}</div>
        </Tooltip>
      } else {
        returnElement = <Tooltip
          placement="right"
          overlayClassName="change-overlay"
          title={() => this.changeOverlay(list)}
          visible={this.state.visible}>
          <div
            className="p-b-10 rev-tooltip"
            onMouseEnter={this.showTooltip}
            onMouseLeave={() => this.setState({ visible: false })}>
            <p className="rev-tooltip">{_.isEmpty(element) ? "All" : element}</p>
          </div>
        </Tooltip>
      }
    }
    return returnElement;
  }

  handleSelect = (option, index) => {
    let contactArray = _.cloneDeep(this.state.contactArray);
    contactArray[index].assignedCommodityIds = option;
    contactArray[index].assignedCommodities = this.assignedCommodityList(option);
    this.setState({ contactArray, activeGenerat: true })
  }

  assignedCommodityList = (filters) => {
    let filteredIds = [];
    this.state.commodityList.map(item => {
      filters.map(fil => {
        if (fil === item.id)
          filteredIds.push(item);
      });
    });
    return filteredIds;
  }

  renderCommValue = () => {
    let values = [];
    if (this.state.contactArray && this.state.contactArray[this.state.contactArrayIndex] &&
      this.state.contactArray[this.state.contactArrayIndex].assignedCommodities)
      values = this.state.contactArray[this.state.contactArrayIndex].assignedCommodities.map(obj => obj.id);
    return values;
  }
  handlePageChange = (selectedPageOption) => {
    let pagination = {
      pageSize: selectedPageOption.value,
      size: 'small'
    }
    this.setState({
      selectedPageOption, pagination
    });
  }
  checkFilterOpen = () => {
    if (this.state.showColSel) this.showColumnSelection();
  }
  showColumnSelection = () => {
    if (!this.state.showColSel) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState({ showColSel: !this.state.showColSel })
  }
  handleOutsideClick = (e) => {
    if (this.node && this.node.contains && this.node.contains(e.target)) {
      return;
    }
    this.showColumnSelection();
  }
  selectCheckBoxForNewPart = (e, columns) => {
    columns.map(obj => {
      if (obj.dataIndex === e.target.name) {
        obj.show = e.target.checked
      }
    });

    let selectedColumns = this.state.columnSelectForNewPart.map(obj => {
      if (obj.value === e.target.name)
        obj.checked = e.target.checked
      return obj;
    });
    this.setState({
      columnSelectForNewPart: selectedColumns, filterdColumnsForViewPart: columns,
      filtered: true
    });
  }
  checkSortSelected = (sortBy) => {
    let sortSelected = false;
    sortBy.map(row => {
      if (row && row.sortColumn) {
        sortSelected = true;
        return;
      }
    });
    return sortSelected;
  }
  sortClicked = (sortBy) => {
    let _this = this;
    if (!this.checkSortSelected(sortBy)) {
      showErrorToast('Please select the option to apply sorting');
    }
    var sortColumns = sortBy.filter(value => Object.keys(value).length !== 0);
    const resourceData = this.state.contactArrayList
    resourceData.sort(function (left, right) {
      let i = 0, result = 0;
      while (i < sortColumns.length && result === 0) {
        let leftValue = left[sortColumns[i].sortColumn] ? left[sortColumns[i].sortColumn] : '';
        let rightValue = right[sortColumns[i].sortColumn] ? right[sortColumns[i].sortColumn] : '';
        result = sortColumns[i].direction * (leftValue < rightValue ? -1 : (leftValue > rightValue ? 1 : 0));
        i++;
      }
      return result;
    });

    this.setState({
      dataSourceWithFilters: resourceData,
      contactArrayList: JSON.parse(JSON.stringify(resourceData)),
      filter: true
    });
  }
  renderGridOptionsForView = () => {
    let columns = this.state.filtered ? this.state.filterdColumnsForViewPart : this.state.columns;
    let dataSource = this.state.dataSource ? this.state.dataSource : [];
    let columnSelect = this.state.columnSelectForNewPart;
    let selectedRowKeys = this.state.selectedRowKeys;
    const hasSelected = selectedRowKeys && selectedRowKeys.length > 0;
    let contactArray = this.state.contactArray;;
    let sortColumnsList = this.state.sortColumnList;
    let selectedCol = (<div className="col-select align-rgt">
      {columnSelect.map(obj => {
        return (
          <li className="flex justify-space-between check-grid">
            <div>
              <label className="flex align-center">
                <input
                  className="checkbox"
                  type="checkbox"
                  name={obj.value}
                  checked={obj.checked}
                  onChange={(e) => this.selectCheckBoxForNewPart(e, columns)}
                />
                {/* <span className="mark" /> */}
                <p className="m-t-mus4 m-b-0"> {obj.label} </p>
              </label>
            </div>
          </li>
        )
      })}
    </div>);
    return (
      <div className="filter_wr_box">
        <div className="assign-box">
          <div className="top-headaction">
            <div className="flex justify-space-between align-center">

              {this.state.processRequest === 'parts' || this.state.processRequest === 'standardPo' || this.state.processRequest === 'purchase_order'
              }
            </div>
          </div>
        </div>

        <div className="page-select">
          <SortingFilter filterData={sortColumnsList} sortClicked={this.sortClicked} isOpen={this.checkFilterOpen} />
          <p className="m-l-10 data-length">{`${contactArray.length} results`}</p>
          <p className="data-show">Show</p>
          <Select
            className="w-70 selt-drosrch"
            value={this.state.selectedPageOption}
            onChange={this.handlePageChange}
            options={this.state.pageSizeOption}
            placeholder="Select"
            onMenuOpen={this.checkFilterOpen}
          />
          <Tooltip placement="top" title="Columns">
            <button className="btn btn-noColor" onClick={this.showColumnSelection}>
              <span className="fa fa-sliders-h"></span></button>
          </Tooltip>
          {this.state.showColSel ? <div style={{ paddingRight: "50px" }}>{selectedCol}</div> : null}
        </div>
      </div >
    )
  }
  getFilteredData = (value, record) => {
    let contactArrayList = this.state.contactArrayList;
    console.log(this.state.commodityFilter, this.state.contactArrayList, "value, record", value, record)

    // record.isEnabled &&  record.isEnabled.indexOf(value) === 0
    //return contactArrayList.find(x => x.isEnabled === value).foo;
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 10 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  prepareSortColumns = (columnsList) => {
    let colDropList = [];
    columnsList.map(column => {
      const newCol = {
        name: column.label,
        key: column.key,
        isDisabled: false
      };
      colDropList.push(newCol);
    });
    return colDropList;
  }
  render() {
    let commodityList = this.state.commodityList;
    let profileList = this.props.supplierUsers.profileList;
    let defaultCountApprover = this.state.defaultCountApprover;
    let userProfileCount = this.state.userProfileCount;
    let totalRecord = this.state.totalRecord;
    const { number } = this.state;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    let getColumns = this.state.filtered ? this.state.filterdColumnsForViewPart : this.state.columns;
    let renderDataSource = filter(getColumns, obj => obj.show);
    return (
      <div {...this.props}>
        {this.props.userInfo.userData.userRole == 1 ? (
          <SideBarBuyer {...this.props} />
        ) : this.props.userInfo.userData.userRole == 2 ? (
          <div>
            <SideBarSupplier activeTabKeyAction={this.activeTabKeyAction} />
          </div>
        ) : ''}
        {this.state.tabKey === "editUser" ? (
          <section className="">
            <div className={this.props.userInfo.userData.userRole == 1 ? "content-section" : "content-body flex"}>
              <div className={this.props.userInfo.userData.userRole == 1 ? "" : "content"}>
                <div className={this.props.userInfo.userData.userRole == 1 ? "" : "container-fluid"}>
                  {this.props.userInfo.userData.isAdmin && this.props.userInfo.userData.userRole === 2 ? (
                    <div className="">
                      <Breadcrumb className="style-breadcrumb">
                        <Breadcrumb.Item>
                          <Link to="administrator">Admin Menu</Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item active>Edit Users</Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex justify-space-between align-center border-b1 m-b-10">
                    <h4 className="hero-title">Edit User </h4>
                  </div>

                  <div>

                    <div className="m-b-20 tableHeight">
                      <div className="antcustomtable table_filtersearch" ref={node => { this.node = node; }}>
                        <DataGrid
                          columns={renderDataSource}
                          dataSource={this.state.contactArrayList}
                          loading={this.state.isRequest ? tableLoader() : false}
                          tableLayout="auto"
                          bordered
                          className="editusertable"
                          size="small"
                          scroll={{ y: 500, x: '100vw' }}
                          title={() => this.renderGridOptionsForView()}
                          pagination={this.state.pagination}
                          onRow={(record, rowIndex) => {
                            return {}
                          }}
                          rowClassName={(record, index) => {
                            if (index === this.state.rowIndex) return "highlight-clr";
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {this.props.userInfo.userData.userRole === 1 ? (
                ''
              ) : (
                <FooterSupplier
                  pageTitle={permissionConstant.footer_title.edit_user}
                />
              )}
            </div>
            <Modal
              show={this.state.show}
              onHide={this.handleClose}
              className="custom-popUp edituser_popup"
            >
              <Modal.Header>
                <div className="flex justify-space-between">
                  <h4 className="text-center">Edit User </h4>
                  <button
                    onClick={this.handleClose}
                    className="btn btn-link color-light"
                  >
                    Close
                    </button>
                </div>
              </Modal.Header>

              <Modal.Body>

                <div className="style-form exitUserPop m-t-20 m-b-20">
                  <Row className="show-grid">
                    <Col md={6}>
                      <FormGroup className="group">
                        <FormControl
                          autoComplete="off"
                          type="text"
                          name="firstName"
                          maxLength={customConstant.inputTextLength}
                          minLength={customConstant.inputMinLength}
                          value={
                            this.state.contactArray &&
                            this.state.contactArray[
                            this.state.contactArrayIndex
                            ] &&
                            this.state.contactArray[
                              this.state.contactArrayIndex
                            ].firstName
                          }
                          onChange={event =>
                            this.handleChange(
                              event,
                              this.state.contactArrayIndex,
                              "firstName"
                            )
                          }
                        />
                        <FormControl.Feedback />

                        <ControlLabel>First Name <i className="text-danger">*</i></ControlLabel>
                        {renderMessage(
                          this.props.getValidationMessages("firstName")
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup className="group ">
                        <FormControl
                          autoComplete="off"
                          type="text"
                          name={"lastName"}
                          maxLength={customConstant.inputTextLength}
                          minLength={customConstant.inputMinLength}
                          value={
                            this.state.contactArray &&
                            this.state.contactArray[
                            this.state.contactArrayIndex
                            ] &&
                            this.state.contactArray[
                              this.state.contactArrayIndex
                            ].lastName
                          }
                          required
                          onChange={event =>
                            this.handleChange(
                              event,
                              this.state.contactArrayIndex,
                              "lastName"
                            )
                          }
                        />
                        <FormControl.Feedback />

                        <ControlLabel>Last Name <i className="text-danger">*</i></ControlLabel>
                        {renderMessage(
                          this.props.getValidationMessages("lastName")
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="show-grid">
                    <Col md={6}>
                      <FormGroup className="group ">
                        <FormControl
                          autoComplete="off"
                          type="text"
                          name={"email" + this.state.contactArrayIndex}
                          required
                          //disabled={true}
                          maxLength={customConstant.inputTextLength}
                          minLength={customConstant.inputMinLength}
                          value={
                            this.state.contactArray &&
                            this.state.contactArray[
                            this.state.contactArrayIndex
                            ] &&
                            this.state.contactArray[
                              this.state.contactArrayIndex
                            ].email
                          }
                          onChange={event =>
                            this.handleChange(
                              event,
                              this.state.contactArrayIndex,
                              "email"
                            )
                          }
                          onBlur={event =>
                            this.checkExistingEmpId(
                              event,
                              this.state.contactArray[this.state.contactArrayIndex].email,
                              "email",
                              this.state.contactArrayIndex
                            )
                          }
                        />
                        <FormControl.Feedback />

                        <ControlLabel>Email <i className="text-danger">*</i></ControlLabel>
                        {renderMessage(
                          this.props.getValidationMessages("email")
                        )}
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup className="group mobile-input mbgp edituserMb">
                        <span className="ico-in">
                          <svg>
                            <use xlinkHref={`${Sprite}#mobileIco`} />
                          </svg>
                        </span>

                        <PhoneInput
                          className="form-control br-0 boxShnone custom_mobile"
                          autoComplete="off"
                          placeholder="Mobile Number"
                          value={
                            this.state.contactArray &&
                            this.state.contactArray[
                            this.state.contactArrayIndex
                            ] &&
                            this.state.contactArray[
                              this.state.contactArrayIndex
                            ].mobile
                          }
                          onChange={value =>
                            this.handleChange(
                              {
                                target: { name: "mobile", value }
                              },
                              this.state.contactArrayIndex,
                              "mobile"
                            )
                          }
                          name={`mobile` + this.state.contactArrayIndex}
                          country={this.state.countryCode}
                          onBlur={event =>
                            this.checkExistingEmpId(
                              event,
                              this.state.contactArray[this.state.contactArrayIndex].mobile,
                              "mobile",
                              this.state.contactArrayIndex
                            )
                          }
                        />
                        <ControlLabel>Mobile Number <i className="text-danger">*</i></ControlLabel>
                        {renderMessage(
                          this.props.getValidationMessages("mobile" + this.state.contactArrayIndex)
                        )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="show-grid">
                    <Col md={6}>
                      <FormGroup controlId="formBasicText" className="group">
                        <FormControl
                          autoComplete="off"
                          className="br-0 s-arrow select_style"
                          type="text"
                          componentClass="select"
                          name={"userType"}
                          value={
                            this.state.contactArray &&
                            this.state.contactArray[
                            this.state.contactArrayIndex
                            ] &&
                            this.state.contactArray[
                              this.state.contactArrayIndex
                            ].userType
                          }
                          onChange={event =>
                            this.handleChange(
                              event,
                              this.state.contactArrayIndex,
                              "userType"
                            )
                          }
                        >
                          <option value="">Select user privilege</option>
                          <option value="Admin">Admin</option>
                          <option value="Regular">Regular</option>
                        </FormControl>
                        <FormControl.Feedback />
                        <ControlLabel>User Type <i className="text-danger">*</i></ControlLabel>
                        {renderMessage(
                          this.props.getValidationMessages("userType")
                        )}
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup className="group ">
                        <FormControl
                          type="text"
                          autoComplete="off"
                          name={"employeeId"}
                          maxLength={customConstant.inputTextLength}
                          minLength={customConstant.inputMinLength}
                          value={
                            this.state.contactArray &&
                            this.state.contactArray[
                            this.state.contactArrayIndex
                            ] &&
                            this.state.contactArray[
                              this.state.contactArrayIndex
                            ].employeeId
                          }
                          required
                          onChange={event =>
                            this.handleChange(
                              event,
                              this.state.contactArrayIndex,
                              "employeeId"
                            )
                          }
                          onBlur={event =>
                            this.checkExistingEmpId(
                              event,
                              this.state.contactArray[this.state.contactArrayIndex]
                                .employeeId,
                              "employeeId",
                              this.state.contactArrayIndex
                            )
                          }
                        />
                        <FormControl.Feedback />

                        <ControlLabel>Employee Id <i className="text-danger">*</i></ControlLabel>
                        {renderMessage(
                          this.props.getValidationMessages("employeeId")
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="show-grid">

                    <Col md={12}>

                      <p className="labelselect">Immediate Supervisor</p>
                      <div class="custom-dd dropdown-style selapproveDp approverSelect check-none custom_drop_btn">
                        <DropdownButton
                          title={this.state.contactArray &&
                            this.state.contactArray[
                            this.state.contactArrayIndex
                            ] &&
                            this.state.contactArray[
                              this.state.contactArrayIndex
                            ].listOfApproversRes && this.state.contactArray[
                              this.state.contactArrayIndex
                            ].listOfApproversRes.length > 0 ? (<div className="dropselectedList closeicon_multidrop"><ul>
                              {this.state.approverList &&
                                this.state.approverList.map((approver, index) => {
                                  return (
                                    approver.checked ? (<li className={approver.defaultApprover ? "defaultApp" : ''}>
                                      {approver.fullName}

                                      {approver.userProfile
                                        ? "| " + removeUnderScore(approver.userProfile)
                                        : ""}
                                      <span class="icon-close" onClick={event =>
                                        this.handleApproverSelect(event, approver.id, true)}
                                      ></span> </li>) : ("")
                                  )
                                })}
                            </ul> </div>) :
                            this.state.selectedApproverList && this.state.selectedApproverList.length > 0 ? (<div className="dropselectedList closeicon_multidrop"><ul>
                              {this.state.approverList &&
                                this.state.approverList.map((approver, index) => {
                                  return (
                                    approver.checked ? (<li className={approver.defaultApprover ? "defaultApp" : ''}>
                                      {approver.fullName}

                                      {approver.userProfile
                                        ? "| " + removeUnderScore(approver.userProfile)
                                        : ""}
                                      <span class="icon-close" onClick={event =>
                                        this.handleApproverSelect(event, approver.id, true)
                                      }></span> </li>) : ("")
                                  )
                                })}
                            </ul> </div>) :
                              this.state.contactArray &&
                                this.state.contactArray[
                                this.state.contactArrayIndex
                                ] &&
                                this.state.contactArray[
                                  this.state.contactArrayIndex
                                ].listOfApproversRes && this.state.contactArray[
                                  this.state.contactArrayIndex
                                ].listOfApproversRes.length == 0 ? ('Immediate Supervisor')
                                : ('Immediate Supervisor')}

                          name="secpeificationData"
                        >
                          <div className="flex align-center justify-space-between dropmultiheading">
                            <p>Immediate Supervisor </p>
                            <p>Default</p>
                          </div>
                          {this.state.approverList &&
                            this.state.approverList.map((approver, index) => {
                              const firstName = approver.firstName || "";
                              const lastName = approver.lastName || "";
                              const email = approver.email || "";
                              const id = approver.id || "";

                              let lastIndex = this.state.contactArray;
                              let userProfile = approver.userProfile;
                              let defaultApprover = approver.defaultApprover
                                ? true
                                : false;
                              const checked = approver.checked ? true : false;
                              if (
                                this.state.contactArray &&
                                this.state.contactArray[
                                this.state.contactArrayIndex
                                ] &&
                                this.state.contactArray[
                                  this.state.contactArrayIndex
                                ].id === id
                              ) {
                              } else {
                                return (
                                  <li className={checked ? "flex justify-space-between selecttt" : "flex justify-space-between"}>
                                    <div>
                                      {approver.isEnabled !== undefined && approver.isEnabled ?
                                        <label className="flex-1">
                                          <input
                                            className="checkbox"
                                            type="checkbox"
                                            value={id}
                                            checked={checked ? true : false}
                                            onChange={event =>
                                              this.handleApproverSelect(event, id)
                                            }
                                          />
                                          {/* <span className="mark" /> */}
                                          {firstName}

                                          {userProfile
                                            ? "| " + removeUnderScore(userProfile)
                                            : ""}
                                        </label> :

                                        <label className="label--checkbox flex-1 show-dis" >
                                          <input
                                            className="checkbox"
                                            type="checkbox"
                                            disabled={true}
                                          />
                                          <span className="mark" />
                                          {firstName}

                                          {userProfile
                                            ? "| " + removeUnderScore(userProfile)
                                            : ""}
                                        </label>
                                      }
                                    </div>
                                    &nbsp;
                                    <div>
                                      {approver.isEnabled !== undefined && approver.isEnabled ?

                                        <label className={checked ? "label--radio sm-radio " : "label--radio sm-radio customDisable "}
                                        >
                                          <input
                                            type="radio"
                                            className="radio"
                                            checked={defaultApprover ? true : false}
                                            name="m-radio"
                                            onChange={event =>
                                              !checked ? this.handleApproverSelect(event, id, false, true) :
                                                this.handleDefaultApproverSelect(
                                                  event,
                                                  id,
                                                  "defaultApprover"
                                                )
                                            }
                                          //disabled={checked ? false : true}
                                          />
                                          <span className="r-dot" />
                                        </label> : <label className={checked ? "label--radio sm-radio " : "label--radio sm-radio customDisable "}
                                        >
                                          <input
                                            type="radio"
                                            className="radio"
                                            name="m-radio"
                                            disabled={true}
                                          />
                                          <span className="r-dot" />
                                        </label>}
                                    </div>
                                  </li>
                                );
                              }
                            })}
                        </DropdownButton>



                      </div>
                    </Col>
                  </Row>
                  {this.props.userInfo.userData.userRole === 1 ? (
                    <Row>
                      <Col md={6}>
                        <FormGroup controlId="formBasicText" className="group">
                          <FormControl
                            className=" s-arrow select_style"
                            autoComplete="off"
                            type="text"
                            componentClass="select"
                            name={"userProfile"}
                            value={
                              this.state.contactArray &&
                              this.state.contactArray[
                              this.state.contactArrayIndex
                              ] &&
                              this.state.contactArray[
                                this.state.contactArrayIndex
                              ].userProfileId
                            }
                            onChange={event =>
                              this.handleChange(
                                event,
                                this.state.contactArrayIndex,
                                "userProfileId"
                              )
                            }
                          >
                            <option value="">Select user profile </option>
                            {profileList &&
                              profileList.map((val, index) => {
                                return (
                                  <option value={val.id}>
                                    {val.profileName &&
                                      removeUnderScore(val.profileName)}
                                  </option>
                                );
                              })}
                          </FormControl>
                          <FormControl.Feedback />
                          <ControlLabel>Select User Profile <i className="text-danger">*</i></ControlLabel>
                          {renderMessage(
                            this.props.getValidationMessages("userProfile")
                          )}
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup
                          controlId="formControlsSelect"
                          className="group"
                        >
                          <FormControl
                            componentClass="select"
                            placeholder="select"
                            autoComplete="off"
                            className="s-arrow br-0 select_style"
                            name={"departmentId" + this.state.contactArrayIndex}
                            value={
                              this.state.contactArray &&
                              this.state.contactArray[
                              this.state.contactArrayIndex
                              ] &&
                              this.state.contactArray[
                                this.state.contactArrayIndex
                              ].departmentResponse &&
                              this.state.contactArray[
                                this.state.contactArrayIndex
                              ].departmentResponse.id
                            }
                            onChange={event =>
                              this.handleChange(
                                event,
                                this.state.contactArrayIndex,
                                "departmentId"
                              )
                            }
                          >
                            <option value="">Select Department</option>
                            {this.state.listOfDepartmentDept &&
                              this.state.listOfDepartmentDept.map((item, index) => {
                                return (
                                  <option value={item.id} key={item.department}>
                                    {item.department}
                                  </option>
                                );
                              })}
                          </FormControl>
                          <ControlLabel>Select Department <i className="text-danger">*</i></ControlLabel>
                        </FormGroup>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}

                  <Row>
                    <Col md={6}>

                      <FormGroup
                        controlId="formControlsSelect"
                        className="group"
                      >
                        <FormControl
                          componentClass="select"
                          placeholder="select"
                          className="s-arrow br-0 select_style"
                          name={
                            "addressRequest" + this.state.contactArrayIndex
                          }
                          value={
                            this.state.contactArray &&
                            this.state.contactArray[
                            this.state.contactArrayIndex
                            ] &&
                            this.state.contactArray[
                              this.state.contactArrayIndex
                            ].addressResponse &&
                            this.state.contactArray[
                              this.state.contactArrayIndex
                            ].addressResponse.id
                          }
                          onChange={event =>
                            this.handleChange(
                              event,
                              this.state.contactArrayIndex,
                              "addressRequest"
                            )
                          }
                        >
                          <option value="">Select Address</option>
                          {this.state.listOfAddress &&
                            this.state.listOfAddress.map((item, index) => {
                              return (
                                <option value={item.id} key={index}>
                                  {item.address}
                                </option>
                              );
                            })}
                        </FormControl>
                        <ControlLabel>Select Address</ControlLabel>
                      </FormGroup>

                    </Col>

                    <Col md={6}>
                      <FormGroup controlId="formBasicText" className="group">
                        <FormControl
                          className="br-0"
                          disabled={true}
                          autoComplete="off"
                          type="text"
                          maxLength={customConstant.inputTextLength}
                          minLength={customConstant.inputMinLength}
                          name={"area" + this.state.contactArrayIndex}
                          value={
                            this.state.contactArray &&
                              this.state.contactArray[
                              this.state.contactArrayIndex
                              ] &&
                              this.state.contactArray[
                                this.state.contactArrayIndex
                              ].addressResponse &&
                              this.state.contactArray[
                                this.state.contactArrayIndex
                              ].addressResponse.locationId ? this.state.contactArray[
                                this.state.contactArrayIndex
                              ].addressResponse &&
                            this.state.contactArray[
                              this.state.contactArrayIndex
                            ].addressResponse.locationId : ''
                          }

                        />
                        <ControlLabel>Location Id</ControlLabel>
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <p className="labelselect p-b-10">Commodity <i className="text-danger">*</i></p>
                      <DataSelect
                        mode="multiple"
                        style={{ width: '100%' }}
                        value={this.renderCommValue()}
                        onChange={(opt) => this.handleSelect(opt, this.state.contactArrayIndex)}
                        className="multislider_wrap"
                        placeholder="All"
                        getPopupContainer={trigger => trigger.parentNode}
                        filterOption={(input, option) => option.children.toLowerCase().startsWith(input.toLowerCase())}
                      >
                        {commodityList && commodityList.map(
                          (item, index) => {
                            return (
                              <option value={item.id} key={item.id}>{item.name}</option>
                            );
                          }
                        )}
                      </DataSelect>
                    </Col>
                  </Row>

                  {this.props.userInfo.userData.userRole === 1 ? (
                    <div className="m-b-20 m-t-10">
                      <label className="label--checkbox">
                        <input
                          type="checkbox"
                          onChange={event =>
                            this.handleChange(
                              event,
                              this.state.contactArrayIndex,
                              "budgetPlanner"
                            )
                          }
                          className="checkbox"
                          name={"budgetPlanner" + this.state.contactArrayIndex}
                          checked={
                            this.state.contactArray &&
                              this.state.contactArray[
                              this.state.contactArrayIndex
                              ] &&
                              this.state.contactArray[
                                this.state.contactArrayIndex
                              ].budgetPlanner
                              ? "checked"
                              : ""
                          }
                        />
                        <span className="mark" />
                        Budget Planner
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                  {this.props.userInfo.userData.userRole === 1 ? (
                    <Row>
                      {this.props.userInfo.userData.userRole === 1 ? (
                        <Col md={6}>
                          <div className="custom-dd dropRf customdropdown userDrop btn-full">
                            <ControlLabel className="labelGrey m-b-10">
                              SALARY ACCOUNT
                            </ControlLabel>
                           
                          </div>
                          
                          
                        </Col>
                      ) : (
                        ""
                      )}

                      {this.state.contactArray &&
                        this.state.contactArray[this.state.contactArrayIndex] &&
                        this.state.contactArray[this.state.contactArrayIndex]
                          .budgetPlanner ? (
                        <Col md={6}>
                          <div className="custom-dd dropRf customdropdown userDrop btn-full">
                            <ControlLabel className="labelGrey m-b-10">
                              BUDGET COST CENTER
                            </ControlLabel>
                           
                          </div>{" "}
                          <FormControl.Feedback />
                          
                        </Col>
                      ) : (
                        ""
                      )}
                    </Row>
                  ) : (
                    ""
                  )}
                </div>
                {this.state.otpOption ? (
                  <div className="centeredBox m-t-40 m-b-60">
                    <h4 className="text-center">
                      Enter OTP sent to your Email
                    </h4>
                    <form>
                      <div className="otp-input">
                        <FormGroup>
                          <FormControl
                            autoComplete="off"
                            type="text"
                            placeholder=""
                            maxLength="1"
                            inputRef={element => {
                              this.OTPField0 = element;
                            }}
                            onChange={e => {
                              this.handleOTPChange("OTPField", 0, e);
                            }}
                          />
                          <FormControl
                            type="text"
                            autoComplete="off"
                            placeholder=""
                            maxLength="1"
                            inputRef={element => {
                              this.OTPField1 = element;
                            }}
                            onChange={e => {
                              this.handleOTPChange("OTPField", 1, e);
                            }}
                          />
                          <FormControl
                            type="text"
                            autoComplete="off"
                            placeholder=""
                            maxLength="1"
                            inputRef={element => {
                              this.OTPField2 = element;
                            }}
                            onChange={e => {
                              this.handleOTPChange("OTPField", 2, e);
                            }}
                          />
                          <span>▬</span>
                          <FormControl
                            type="text"
                            autoComplete="off"
                            placeholder=""
                            maxLength="1"
                            inputRef={element => {
                              this.OTPField3 = element;
                            }}
                            onChange={e => {
                              this.handleOTPChange("OTPField", 3, e);
                            }}
                          />
                          <FormControl
                            type="text"
                            placeholder=""
                            autoComplete="off"
                            maxLength="1"
                            inputRef={element => {
                              this.OTPField4 = element;
                            }}
                            onChange={e => {
                              this.handleOTPChange("OTPField", 4, e);
                            }}
                          />
                          <FormControl
                            type="text"
                            placeholder=""
                            autoComplete="off"
                            maxLength="1"
                            inputRef={element => {
                              this.OTPField5 = element;
                            }}
                            onChange={e => {
                              this.handleOTPChange("OTPField", 5, e);
                            }}
                          />
                        </FormGroup>
                      </div>
                    </form>
                  </div>
                ) : null}
                <div className="text-center m-b-20">
                  {!this.state.otpOption ? (
                    <button
                      disabled={!this.state.activeGenerat ? true : false}
                      className={
                        this.state.activeGenerat
                          ? 'btn btn-solid-blue'
                          : 'btn btn-solid-blue'
                      }

                      onClick={event =>
                        this.validateData(
                          event,
                          this.state.contactArrayIndex,
                          "generateOTP"
                        )
                      }
                    >
                      Generate OTP
                    </button>
                  ) : null}
                  {this.state.otpOption ? (
                    <button
                      className="btn yellow-bg-btn"

                      onClick={event =>
                        this.validateData(
                          event,
                          this.state.contactArrayIndex,
                          "editUser"
                        )
                      }
                      disabled={
                        this.state.OTPField &&
                        this.state.OTPField.join("").length != 6
                      }
                    >
                      Save
                    </button>
                  ) : null}
                  <button
                    className="btn blk-border-btn"
                    onClick={this.handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </Modal.Body>

            </Modal>
            <Modal
              show={this.state.showApproveModal}
              onHide={this.handleCloseModel}
              className={
                this.state.affrctedUser && this.state.affrctedUser.length > 0
                  ? "custom-popUp"
                  : "custom-popUp confirmation-box"
              }
              bsSize={
                this.state.affrctedUser && this.state.affrctedUser.length > 0
                  ? ""
                  : "small"
              }
            >
              <Modal.Body>
                <div className="">
                  <h5 className="modal-head text-center">
                    {this.state.affrctedUser &&
                      this.state.affrctedUser.length > 0
                      ? " This user is approver in the below list of users. Are you sure you want to delete this?"
                      : "Are you sure you want to delete this?"}
                  </h5>
                  <div>
                    {this.state.affrctedUser &&
                      this.state.affrctedUser.length > 0 ? (
                      <Table bordered responsive className="custom-table">
                        <thead>
                          <tr>
                            <th />
                            <th>Name</th>
                            <th>Profile</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.affrctedUser.map((item, index) => {
                            return (
                              <tr>
                                <td>
                                  <div className="sm-avtar">
                                    <img
                                      src={
                                        item.profileImageThumbnailUrl
                                          ? item.profileImageThumbnailUrl
                                          : userImage
                                      }
                                    />
                                  </div>
                                </td>
                                <td>{item.fullName}</td>
                                <td>
                                  {item.userProfile
                                    ? removeUnderScore(item.userProfile)
                                    : ""}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="text-center">
                    <button
                      className="btn btn-solid-blue sm-btn"
                      onClick={event =>
                        this.handleDeleteUser(
                          event,
                          this.state.deleteId,
                          this.state.deleteIndex
                        )
                      }
                    >
                      OK
                    </button>
                    <button
                      className="btn btn-outline-blue sm-btn"
                      onClick={this.handleCloseModel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </section>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionGetApproverList,
      actionUserLogout,
      actionGenerateOTPToAddUser,
      actionSupplierAddUser,
      actionLoaderHide,
      actionLoaderShow,
      actionEditProfile,
      actionGetAllAddedUser,
      actionDeleteUser,
      actionDeleteAffectedUser,
      actionGetUserProfileList,
      actionGenerateOTPToEditUser,
      actionGetCompanyData,
      actionGetClassifications,
      actionResetEmailMobileVerification,
      actionGetCommodity
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.User,
    supplierUsers: state.supplierUsers
  };
};

EditUser = validation(strategy)(EditUser);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);