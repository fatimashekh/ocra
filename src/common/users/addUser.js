import React, { Component } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as moment from "moment";
import {
  FormGroup,
  FormControl,
  Modal,
  Table,
  Breadcrumb,
  DropdownButton,
  Button
} from "react-bootstrap";
import validation from "react-validation-mixin";
import strategy, { validator } from "react-validatorjs-strategy";
import classnames from "classnames";
import PhoneInput from "react-phone-number-input/native";
import PropTypes from "prop-types";
import "react-phone-number-input/rrui.css";
import "react-phone-number-input/style.css";
import Sprite from "../../img/sprite.svg";
import userImage from "../../img/profile.svg";
import SideBarBuyer from "../../buyer/common/sideBar";
import SideBarSupplier from "../../supplier/common/sideBar";
import {
  actionGetApproverList,
  actionUserLogout,
  actionGenerateOTPToAddUser,
  actionSupplierAddUser,
  actionLoaderHide,
  actionLoaderShow,
  actionTabClick,
  actionGetUserProfileList,
  actionGetCompanyData,
  actionGetClassifications,
  actionClearOTPToAddUser
} from "../../common/core/redux/actions";
import CONSTANTS from "../../common/core/config/appConfig";
import _ from "lodash";
import {
  renderMessage,
  showErrorToast,
  showSuccessToast,
  topPosition,
  removeUnderScore,
  specialCharacter, onlyCharacters
} from "../../common/commonFunctions";
import FooterSupplier from "../../supplier/common/footer";

let { validationMessages, permissionConstant, customConstant } = CONSTANTS;

class AddUser extends Component {
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
      departmentId: '',
      listOfOtherApprovers: [],
      defaultApprover: "",
      approverList: [],
      profileList: [],
      salariedAccount: { name: "" },
      budgetCostCenter: { name: "" },
    };
    this.state = {
      show: false,
      contactArray: [{ ...this.contactObject }],
      OTPField: ["", "", "", "", "", ""],
      OTPError: "",
      contactArrayIndex: "",
      countryCode: "IN",
      approverList: [],
      profileList: [],
      tabKey: "addUser", showDeleteUserModal: false, userIndex: '',
      existingFlag: false
    };

    this.applyValidation = this.applyValidation.bind(this);
    // this.checkApproverSelection = this.checkApproverSelection.bind(this);
    this.handleAddMoreContact = this.handleAddMoreContact.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleApproverSelect = this.handleApproverSelect.bind(this);
    this.handleApproverSelectAll = this.handleApproverSelectAll.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleContactFieldChange = this.handleContactFieldChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleModalShown = this.handleModalShown.bind(this);
    this.handleOTPChange = this.handleOTPChange.bind(this);
    this.handleShowApprovalModal = this.handleShowApprovalModal.bind(this);
    this.handleHideApprovalModal = this.handleHideApprovalModal.bind(this);
    this.activeTabKeyAction = this.activeTabKeyAction.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    this.handleDefaultApproverSelect = this.handleDefaultApproverSelect.bind(
      this
    );
    this.handleRemoveUser = this.handleRemoveUser.bind(this);
    this.handleGetRegion = this.handleGetRegion.bind(this);
    this.handleGetProductData = this.handleGetProductData.bind(this);
    this.handleGetBrand = this.handleGetBrand.bind(this);
    this.handleGetFunctional = this.handleGetFunctional.bind(this);
    this.handleDeleteClose = this.handleDeleteClose.bind(this);

    // this.getOTP = this.getOTP.bind(this);
    this.applyValidation();
  }

  componentWillMount() {
    let _this = this;
    const userId = this.props.userInfo.userData.id;
    const roleId = this.props.userInfo.userData.userRole;
    this.props.actionGetApproverList({ userId, roleId });
    this.props.actionGetUserProfileList({ userId, roleId });
    let data = {
      roleId: this.props.userInfo.userData.userRole,
      userId: this.props.userInfo.userData.id
    };
    this.props
      .actionGetCompanyData(data)
      .then((result, error) => {
        if (result.payload.data.status == 200) {
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
        } else {
          showErrorToast(result.payload.data.responseMessage);
        }
        _this.props.actionLoaderHide();
      })
      .catch(e => _this.props.actionLoaderHide());
  }

  componentDidMount() {
    if (this.props.userInfo.userData.userRole == 1)
      this.getProductLineData()
  }

  applyValidation() {
    let _this = this;
    let contanctCount = this.state.contactArray.length;
    let fieldObject = {};
    let errorMessage = {};
    for (let index = 0; index < contanctCount; index++) {
      fieldObject["mobile" + index] = "required|min:6|max:18";
      fieldObject["firstName" + index] = "required";
      fieldObject["lastName" + index] = "required";
      fieldObject["employeeId" + index] = "required";
      fieldObject["email" + index] = "required|email";
      // fieldObject['mobile' + index] = 'required';
      fieldObject["userType" + index] = "required";
      if (this.props.userInfo.userData.userRole == 1 && this.state.contactArray[index].departmentId == '')
        fieldObject["departmentId" + index] = "required";
      if (this.props.userInfo.userData.userRole == 1)
        fieldObject["userProfile" + index] = "required";
      //fieldObject["salariedAccount" + index] = "required";
      // fieldObject['designation' + index] = 'required';

      errorMessage["required.firstName" + index] =
        validationMessages.firstName.required;

      errorMessage["required.lastName" + index] =
        validationMessages.lastName.required;

      errorMessage["required.employeeId" + index] =
        validationMessages.employeeId.required;

      errorMessage["required.email" + index] =
        validationMessages.email.required;
      errorMessage["email.email" + index] = validationMessages.email.invalid;
      errorMessage["required.mobile" + index] =
        validationMessages.mobile.required;
      errorMessage["required.userType" + index] =
        validationMessages.userType.required;

      errorMessage["min.mobile" + index] = validationMessages.mobile.min;
      errorMessage["max.mobile" + index] = validationMessages.mobile.max;

      if (this.props.userInfo.userData.userRole == 1) {
        errorMessage["required.departmentId" + index] =
          validationMessages.departmentId.required;
        errorMessage["required.userProfile" + index] =
          validationMessages.userProfile.required;
        if (this.state.contactArray[index].salariedAccount) {
          if (!this.state.contactArray[index].salariedAccount.departmentId) {
            fieldObject["salariedAccount" + index] = "required";
            errorMessage["required.salariedAccount" + index] = validationMessages.salariedAccount.required;
          } else {
            fieldObject["salariedAccount" + index] = "";
            errorMessage["required.salariedAccount" + index] = "";
          }
        }

        if (this.state.contactArray[index]['budgetPlanner'] &&
          this.state.contactArray[index].budgetCostCenter) {
          if (!this.state.contactArray[index].budgetCostCenter.departmentId) {
            fieldObject["budgetCostCenter" + index] = "required";
            errorMessage["required.budgetCostCenter" + index] = validationMessages.budgetCostCenter.required;
          } else {
            fieldObject["budgetCostCenter" + index] = "";
            errorMessage["required.budgetCostCenter" + index] = "";
          }
        }
      }
    }

    this.validatorTypes = strategy.createInactiveSchema(
      fieldObject,
      errorMessage
    );

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
        if (result.payload.data.status == 200) {
          let purchaseResponse = result.payload.data.resourceData;
          this.setState({
            listOfDepartment: purchaseResponse.listOfDepartment ? purchaseResponse.listOfDepartment : [],
            listOfBrands: purchaseResponse.listOfBrands ? purchaseResponse.listOfBrands : [],
            listOfMajorCategory: purchaseResponse.listOfCategory ? purchaseResponse.listOfCategory : [],
            listOfGlobalRegions: purchaseResponse.listOfGlobalRegions ? purchaseResponse.listOfGlobalRegions : [],
            listOfSectorCategory: purchaseResponse.listOfProductLine ? purchaseResponse.listOfProductLine : [],
            listOfFunctionalArea: purchaseResponse.listOfDepartment ? purchaseResponse.listOfDepartment : []
          });
        } else if (result.payload.data.status == 404) {
          showErrorToast(result.payload.data.responseMessage);
        }
        //_this.props.actionLoaderHide();
      })
      .catch(e => _this.props.actionLoaderHide());
  }
  getClasses = field => {
    return classnames({
      error: !this.props.isValid(field)
    });
  };

  getValidatorData = () => {
    return this.state;
  };

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

  navigateTo(data) {
    this.props.actionTabClick(data);
  }

  activeTabKeyAction(tabKey) {
    if (tabKey === "first")
      this.context.router.history.push({
        pathname: "home",
        state: { path: "first" }
      });
    if (
      this.context.router.location &&
      this.context.router.location.pathname === "/supplier/adduser"
    ) {
      if (tabKey === "second") this.context.router.history.push("home");
    }
    if (tabKey === "third")
      this.context.router.history.push({
        pathname: "home",
        state: { path: "third" }
      });
    // if (tabKey === 'first') this.props.history.push('home');
    // if (tabKey === 'second') this.props.history.push('home');
    // if (tabKey === 'third') this.props.history.push('home');
    this.setState({ tabKey: tabKey });
  }

  static contextTypes = {
    router: PropTypes.object
  };

  handleAddMoreContact() {
    let addMoreContactList = this.state.contactArray;
    let lengthArr = addMoreContactList.length - 1;
    if (
      addMoreContactList[lengthArr]["firstName"] === undefined ||
      addMoreContactList[lengthArr]["firstName"] === "" ||
      addMoreContactList[lengthArr]["lastName"] === undefined ||
      addMoreContactList[lengthArr]["lastName"] === "" ||
      addMoreContactList[lengthArr]["employeeId"] === undefined ||
      addMoreContactList[lengthArr]["employeeId"] === "" ||
      addMoreContactList[lengthArr]["email"] === undefined ||
      addMoreContactList[lengthArr]["email"] === "" ||
      addMoreContactList[lengthArr]["mobile"] === undefined ||
      addMoreContactList[lengthArr]["mobile"] === "" ||
      addMoreContactList[lengthArr]["userType"] === undefined ||
      addMoreContactList[lengthArr]["userType"] === ""
    ) {
      showErrorToast("Please enter all user detail first.");
      return false;
    }

    const item = {
      firstName: "",
      lastName: "",
      employeeId: "",
      email: "",
      mobile: "",
      designation: "",
      departmentId: '',
      userType: "",
      listOfOtherApprovers: [],
      defaultApprover: "",
      approverList: [],
      budgetCostCenter: {},
      salariedAccount: {}
    };
    this.setState(
      (prevState, props) => ({
        contactArray: [...prevState.contactArray, item]
      }),
      () => {
        this.applyValidation();
      }
    );
  }

  handleAddUser() {
    const emailOTP = this.state.OTPField.join("");
    const roleId = this.props.userInfo.userData.userRole;
    const parentUserId = this.props.userInfo.userData.id;
    let _this = this;
    let data = {
      userDetailRequests: [
        {
          userId: "string",
          firstName: "string",
          lastName: "string",
          employeeId: "string",
          password: "string",
          designation: "string",
          mobile: "string",
          email: "string",
          accessToken: "string",
          isEnabled: false,
          profileImageURL: "string",
          isPrimaryUser: false,
          creatorUserId: "string",
          roleId: 0,
          createdTimestamp: 0,
          lastUpdatedTimestamp: 0,
          userType: "string",
          userProfile: "string",
          addApproval: "string",
          listOfOtherApprovers: ["string"],
          defaultApprover: 0,
          departmentId: "string",
          budgetPlanner: "string",
          addressRequest: "string",
        }
      ],
      parentUserId,
      roleId,
      emailOTP
    };

    data.userDetailRequests = this.state.contactArray;

    this.props
      .actionSupplierAddUser(data)
      .then((result, error) => {
        _this.props.actionLoaderHide();
        if (result.payload.data.status === 200) {
          //showSuccessToast(validationMessages.addUser.addUserMsg);
          setTimeout(() => {
            this.context.router.history.push({
              pathname: "editUser"
            });
          }, 1000)

        }
      })
      .catch(e => _this.props.actionLoaderHide());


  }

  handleApproverSelect(event, approverId) {
    const index = this.state.contactArrayIndex;
    const selected = event.target.checked;
    if (selected) {
      this.setState(
        (prevState, props) => {
          const approverIndex = prevState.contactArray[
            index
          ].listOfOtherApprovers.indexOf(approverId);
          if (approverIndex == -1)
            prevState.contactArray[index].listOfOtherApprovers.push(approverId);
          return { contactArray: prevState.contactArray };
        },
        () => {
          this.handleModalShown();
        }
      );
      this.setState((prevState, props) => {
        const approverIndex = (prevState.contactArray[index].defaultApprover =
          prevState.contactArray[index].listOfOtherApprovers[0]);
        return { contactArray: prevState.contactArray };
      });
    } else {
      this.setState(
        (prevState, props) => {
          const approverIndex = prevState.contactArray[
            index
          ].listOfOtherApprovers.indexOf(approverId);
          if (approverIndex !== -1)
            prevState.contactArray[index].listOfOtherApprovers.splice(
              approverIndex,
              1
            );
          return { contactArray: prevState.contactArray };
        },
        () => {
          this.handleModalShown();
        }
      );
      this.setState((prevState, props) => {
        const approverIndex = (prevState.contactArray[index].defaultApprover =
          prevState.contactArray[index].listOfOtherApprovers[0]);
        return { contactArray: prevState.contactArray };
      });
      this.setState((prevState, props) => {
        const approverIndex = (prevState.contactArray[
          index
        ].allchecked = false);
        return { contactArray: prevState.contactArray };
      });
    }

    // let approver = this.state.approverList;
    // let selectedApprover = this.state.contactArray[index].listOfOtherApprovers;
    // approver.map((item,index)=>{
    //   selectedApprover.indexOf(item.id)?this.state.contactArray[index].approverList.push(item):'';
    // })


  }

  handleApproverSelectAll(event) {
    const checked = event.target.checked;
    const index = this.state.contactArrayIndex;
    if (checked) {
      this.setState(
        (prevState, props) => {
          prevState.contactArray[index].listOfOtherApprovers = [
            ...prevState.contactArray[index].listOfOtherApprovers,
            ...this.props.supplierUsers.approverList.map(approver => {
              return approver.id;
            })
          ];
          return { contactArray: prevState.contactArray };
        },
        () => {
          this.handleModalShown();
        }
      );
      this.setState((prevState, props) => {
        const approverIndex = (prevState.contactArray[index].defaultApprover =
          prevState.contactArray[index].listOfOtherApprovers[0]);
        return { contactArray: prevState.contactArray };
      });

      this.setState((prevState, props) => {
        const approverIndex = (prevState.contactArray[index].allchecked = true);
        return { contactArray: prevState.contactArray };
      });
    } else {
      this.setState(
        (prevState, props) => {
          prevState.contactArray[index].listOfOtherApprovers = [];
          return { contactArray: prevState.contactArray };
        },
        () => {
          this.handleModalShown();
        }
      );
      this.setState((prevState, props) => {
        const approverIndex = (prevState.contactArray[index].defaultApprover =
          prevState.contactArray[index].listOfOtherApprovers[0]);
        return { contactArray: prevState.contactArray };
      });
      this.setState((prevState, props) => {
        const approverIndex = (prevState.contactArray[
          index
        ].allchecked = false);
        return { contactArray: prevState.contactArray };
      });
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleContactFieldChange(event, index, stateName) {
    let value = event.target.value;
    let checked = event.target.checked;
    let listOfAddress = this.state.listOfAddress;
    let contactArray = this.state.contactArray[index];
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

    }

    if (stateName === "employeeId") {
      if (value) value = specialCharacter(value);
      else value = value;
    } else if (stateName === "firstName" || stateName === "lastName") {
      if (value) value = specialCharacter(value);
      else value = value;
    }

    if (stateName === "budgetPlanner") {
      if (checked) {
        value = true;
      } else {
        value = false;
      }

      this.setState((prevState, props) => {
        prevState.contactArray[index][stateName] = value;
        return {
          contactArray: prevState.contactArray,
          [stateName + index]: value
        };
      });
    }

    this.setState((prevState, props) => {
      prevState.contactArray[index][stateName] = value;
      return {
        contactArray: prevState.contactArray,
        [stateName + index]: value
      };
    });
  }

  handleLogout() {
    try {
      const roleId = this.props.userInfo.userData.userRole;
      const userId = this.props.userInfo.userData.id;
      this.props.actionUserLogout({ roleId, userId });
    } catch (error) { }
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

  handleShowApprovalModal(event, index) {
    const userId = this.props.userInfo.userData.id;
    const roleId = this.props.userInfo.userData.userRole;
    this.props.actionGetApproverList({ userId, roleId });

    this.setState({
      show: true,
      contactArrayIndex: index
    });
  }

  handleHideApprovalModal() {
    this.setState({
      show: false
    });
  }

  handleModalShown() {
    let approverList = [...this.props.supplierUsers.approverList];

    for (let index = 0; index < approverList.length; index++) {
      let element = approverList[index];
      element.checked = "";
      if (
        this.state.contactArray[this.state.contactArrayIndex] &&
        this.state.contactArray[this.state.contactArrayIndex]
          .listOfOtherApprovers &&
        this.state.contactArray[
          this.state.contactArrayIndex
        ].listOfOtherApprovers.indexOf(element.id) !== -1
      )
        element.checked = "checked";
    }
    this.setState({
      approverList
    });
  }

  validateData = (e, actionType) => {
    let flag = this.state.existingFlag;

    e.preventDefault();
    let _this = this;
    this.applyValidation();
    this.props.validate(function (error) {
      if (!error && !flag) {
        switch (actionType) {
          case "generateOTP":
            let data = {
              userId: _this.props.userInfo.userData.id,
              roleId: _this.props.userInfo.userData.userRole,
              accessToken: _this.props.userInfo.userData.jti,
            }
            const roleId = _this.props.userInfo.userData.userRole;
            const userId = _this.props.userInfo.userData.id;
            _this.props.actionLoaderShow();
            _this.props
              .actionGenerateOTPToAddUser(data)
              .then((result, error) => {
                if (result.payload.data.status === 504) {
                  _this.props
                    .actionClearOTPToAddUser({ userId, roleId })
                    .then((result, error) => {
                      if (result.payload.data.status == 200) {
                        setTimeout(() => {
                          _this.props.history.push("/editUser");
                        }, 2000);
                      }
                    })
                }
                _this.props.actionLoaderHide();
              })
              .catch(e => {
                _this.props.actionLoaderHide();
              });
            break;
          case "addUser":
            _this.handleAddUser();
            break;

          default:
            break;
        }
      } else {
        showErrorToast(validationMessages.addUser.requiredField);
      }
    });
  };

  handleDefaultApproverSelect(event, id, stateName) {
    const { value } = event.target;
    const index = this.state.contactArrayIndex;
    this.setState((prevState, props) => {
      prevState.contactArray[index][stateName] = id;
      return {
        contactArray: prevState.contactArray,
        [stateName + index]: id
      };
    });
  }

  handleRemoveUser(product) {
    let contactArrayLength = this.state.contactArray.length;
    if (contactArrayLength > 1) {
      this.setState(
        (prevState, props) => ({
          contactArray: this.state.contactArray.slice(0, -1)
        }),
        () => {
          this.applyValidation();
        }
      );
    } else {
      showErrorToast("Please add more user detail first.");
    }
  }

  handleGetRegion(param) {
    let rowIndex = param.rowIndex;
    let contactArray = this.state.contactArray;
    if (param.costType == "addUserCostCenter") {

      contactArray[rowIndex].budgetCostCenter.geogrophyId = param.geogrophyId;
      contactArray[rowIndex].budgetCostCenter.geographyId = param.geographyId;
      contactArray[rowIndex].budgetCostCenter.region1 = param.region1;
      contactArray[rowIndex].budgetCostCenter.region2 = param.region2;
      contactArray[rowIndex].budgetCostCenter.region3 = param.region3;
      contactArray[rowIndex].budgetCostCenter.region4 = param.region4;
      contactArray[rowIndex].budgetCostCenter.region5 = param.region5;
      contactArray[rowIndex].budgetCostCenter.region6 = param.region6;
      contactArray[rowIndex].budgetCostCenter.region7 = param.region7;
      contactArray[rowIndex].budgetCostCenter.region8 = param.region8;
    } else {
      contactArray[rowIndex].salariedAccount.geogrophyId = param.geogrophyId;
      contactArray[rowIndex].budgetCostCenter.geographyId = param.geographyId;
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
    _this.setState({ contactArray: contactArray }, () => {
      // this.checkSalariedAccount(rowIndex)
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

    _this.setState({ contactArray: contactArray }, () => {
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

    _this.setState({ contactArray: contactArray }, () => {
    });
  }
  handleGetFunctional(param) {
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
      contactArray[rowIndex].departmentId = param.departmentId;
    }

    _this.setState({ contactArray: contactArray }, () => {
    });
  }
  checkSalariedAccount(rowIndex) {
    let contactArray = this.state.contactArray;
    let salariedAccount = contactArray[rowIndex].salariedAccount;

    // == 0

  }

  handleDeleteConfirm(event, index) {
    this.setState({ showDeleteUserModal: true, userIndex: index });
  }

  handleDeleteClose() {
    this.setState({ showDeleteUserModal: false });
  }
  deleteUser(e) {
    let contactArray = this.state.contactArray;
    let userIndex = this.state.userIndex;

    contactArray.splice(userIndex, 1);
    this.setState({
      contactArray: contactArray,
      showDeleteUserModal: false

    })
  }
  checkExistingEmpId(event, field, existence, index) {
   
  }

  render() {
    let profileList = this.props.supplierUsers.profileList;
    return (
      <div>
        {this.props.userInfo.userData.userRole == 1 ? (
          <SideBarBuyer {...this.props} />
        ) : this.props.userInfo.userData.userRole == 2 ? (
          <SideBarSupplier activeTabKeyAction={this.activeTabKeyAction} />
        ) : ''}
        {this.state.tabKey === "addUser" ? (
          <div>
            <div className={this.props.userInfo.userData.userRole == 1 ? "content-section" : "content-body flex"}>
              <div className={this.props.userInfo.userData.userRole == 1 ? "" : "content"}>
                <div className={this.props.userInfo.userData.userRole == 1 ? "" : "container-fluid"}>
                  {this.props.userInfo.userData.isAdmin
                    && this.props.userInfo.userData.userRole === 2 ? (
                      <div className="">
                        <Breadcrumb className="style-breadcrumb">
                          <Breadcrumb.Item>
                            <Link to="administrator">Admin Menu</Link>
                          </Breadcrumb.Item>

                          <Breadcrumb.Item active>Add Users</Breadcrumb.Item>
                        </Breadcrumb>
                      </div>
                    ) : (
                      ""
                    )}
                  <div className="flex justify-space-between align-center border-b1 m-b-10">
                    <h4 className="hero-title">Add Users</h4>
                    <div className="">
                      <button
                        className="btn dark-greybg-btn"
                        onClick={this.handleAddMoreContact}
                      >
                        Add User
                        </button>
                      <button
                        className="btn yellow-bg-btn"
                        disabled={this.state.OTPField.join("").length != 6}
                        onClick={event => this.validateData(event, "addUser")}
                      >
                        Submit
                      </button>
                      <button
                        className="btn dark-greybg-btn"
                        onClick={event =>
                          this.validateData(event, "generateOTP")
                        }
                      >
                        Authenticate
                      </button>
                    </div>
                  </div>

                  <div className="">
                    <Table
                      bordered
                      responsive
                      className="custom-table cell-input  borderbox inputbdNone createBugetwrap out-popper"
                    >
                      <thead>
                        <tr>
                          <th>
                            Employee Id <i className="text-danger">*</i>{" "}
                          </th>
                          <th>
                            First Name <i className="text-danger">*</i>{" "}
                          </th>
                          <th>
                            Last Name <i className="text-danger">*</i>{" "}
                          </th>
                          <th>
                            Email Address <i className="text-danger">*</i>{" "}
                          </th>
                          {this.props.userInfo.userData.userRole === 1 ? (
                            <th>User Profile <i className="text-danger">*</i>{" "}</th>
                          ) : (
                              ""
                            )}
                          <th>
                            Mobile Number<i className="text-danger">*</i>{" "}
                          </th>
                          {/* <th>Designation</th> */}
                          <th>
                            User Type <i className="text-danger">*</i>{" "}
                          </th>
                          <th>
                            Address
                            </th>
                          <th>
                            Location Id
                            </th>
                          {this.props.userInfo.userData.userRole === 1 ? (
                            <th>
                              Department <i className="text-danger">*</i>
                            </th>
                          ) : (
                              ""
                            )}

                          {this.props.userInfo.userData.userRole === 1 ? (
                            <th>Salary Account </th>
                          ) : (
                              ""
                            )}
                          {this.props.userInfo.userData.userRole === 1 ? (
                            <th>Budget Planning</th>
                          ) : (
                              ""
                            )}
                          {this.props.userInfo.userData.userRole === 1 ? (
                            <th>Budget Cost Center</th>
                          ) : (
                              ""
                            )}

                          <th>Immediate Supervisor</th>
                          <th> </th>
                          <th> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.contactArray.map((item, catIndex) => {

                          return [
                            <tr>
                              <td>
                                <FormGroup controlId="formBasicText">
                                  <FormControl
                                    className="br-0"
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Employee Id"
                                    maxLength={customConstant.inputTextLength}
                                    name={"employeeId" + catIndex}
                                    value={
                                      this.state.contactArray[catIndex]
                                        .employeeId
                                    }
                                    onChange={event =>
                                      this.handleContactFieldChange(
                                        event,
                                        catIndex,
                                        "employeeId"
                                      )
                                    }
                                    onBlur={event =>
                                      this.checkExistingEmpId(
                                        event,
                                        this.state.contactArray[catIndex]
                                          .employeeId,
                                        "employeeId",
                                        catIndex
                                      )
                                    }
                                    required
                                    autoFocus
                                  />
                                  <FormControl.Feedback />

                                  {renderMessage(
                                    this.props.getValidationMessages(
                                      "employeeId" + catIndex
                                    )
                                  )}
                                </FormGroup>
                              </td>
                              <td>
                                <FormGroup controlId="formBasicText">
                                  <FormControl
                                    className="br-0"
                                    autoComplete="off"
                                    maxLength={customConstant.inputTextLength}
                                    type="text"
                                    placeholder="First Name"
                                    name={"firstName" + catIndex}
                                    value={
                                      this.state.contactArray[catIndex]
                                        .firstName
                                    }
                                    onChange={event =>
                                      this.handleContactFieldChange(
                                        event,
                                        catIndex,
                                        "firstName"
                                      )
                                    }
                                    required
                                  />
                                  <FormControl.Feedback />

                                  {renderMessage(
                                    this.props.getValidationMessages(
                                      "firstName" + catIndex
                                    )
                                  )}
                                </FormGroup>
                              </td>
                              <td>
                                <FormGroup controlId="formBasicText">
                                  <FormControl
                                    className="br-0"
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Last Name"
                                    maxLength={customConstant.inputTextLength}
                                    name={"lastName" + catIndex}
                                    value={
                                      this.state.contactArray[catIndex]
                                        .lastName
                                    }
                                    onChange={event =>
                                      this.handleContactFieldChange(
                                        event,
                                        catIndex,
                                        "lastName"
                                      )
                                    }
                                    required
                                  />
                                  <FormControl.Feedback />

                                  {renderMessage(
                                    this.props.getValidationMessages(
                                      "lastName" + catIndex
                                    )
                                  )}
                                </FormGroup>
                              </td>
                              <td>
                                <FormGroup controlId="formBasicText">
                                  <FormControl
                                    className="br-0"
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Email"
                                    minLength={customConstant.inputMinLength}
                                    maxLength={customConstant.inputTextLength}
                                    name={"email" + catIndex}
                                    value={
                                      this.state.contactArray[catIndex].email
                                    }
                                    onChange={event =>
                                      this.handleContactFieldChange(
                                        event,
                                        catIndex,
                                        "email"
                                      )
                                    }

                                    onBlur={event =>
                                      this.checkExistingEmpId(
                                        event,
                                        this.state.contactArray[catIndex].email,
                                        "email",
                                        catIndex
                                      )
                                    }

                                    required
                                  />
                                  <FormControl.Feedback />

                                  {renderMessage(
                                    this.props.getValidationMessages(
                                      "email" + catIndex
                                    )
                                  )}
                                </FormGroup>
                              </td>
                              {this.props.userInfo.userData.userRole === 1 ? (
                                <td>
                                  <FormGroup
                                    controlId="formBasicText"
                                    className="sel-cap"
                                  >
                                    <FormControl
                                      className="br-0 s-arrow selectOverflow"
                                      type="text"
                                      autoComplete="off"
                                      componentClass="select"
                                      value={
                                        this.state.contactArray[catIndex]
                                          .userProfile
                                      }
                                      onChange={event =>
                                        this.handleContactFieldChange(
                                          event,
                                          catIndex,
                                          "userProfile"
                                        )
                                      }
                                    >
                                      <option value="">
                                        Select user profile
                                        </option>
                                      {profileList &&
                                        profileList.map((val, catIndex) => {
                                          return (
                                            <option value={val.id}>
                                              {val.profileName &&
                                                removeUnderScore(
                                                  val.profileName
                                                )}
                                            </option>
                                          );
                                        })}
                                    </FormControl>
                                    <FormControl.Feedback />

                                    {renderMessage(
                                      this.props.getValidationMessages(
                                        "userProfile" + catIndex
                                      )
                                    )}
                                  </FormGroup>
                                </td>
                              ) : (
                                  ""
                                )}
                              <td>
                                <FormGroup
                                  className="mobile-input set-l-0 no-border w-150 mdpd"
                                  controlId="formBasicText"
                                >
                                  <PhoneInput
                                    className="form-control br-0 pos-ab"
                                    placeholder="Mobile Number"
                                    autoComplete="off"
                                    maxLength="15"
                                    value={
                                      this.state.contactArray[catIndex].mobile
                                    }
                                    onChange={value =>
                                      this.handleContactFieldChange(
                                        {
                                          target: { name: "mobile", value }
                                        },
                                        catIndex,
                                        "mobile"
                                      )
                                    }
                                    name={`mobile` + catIndex}
                                    country={this.state.countryCode}
                                    onBlur={event =>
                                      this.checkExistingEmpId(
                                        event,
                                        this.state.contactArray[catIndex].mobile,
                                        "mobile",
                                        catIndex
                                      )
                                    }

                                  />
                                  {renderMessage(
                                    this.props.getValidationMessages(
                                      "mobile" + catIndex
                                    )
                                  )}
                                </FormGroup>
                              </td>
                              <td className="w-150">
                                <FormGroup controlId="formBasicText">
                                  <FormControl
                                    className="br-0 s-arrow"
                                    type="text"
                                    autoComplete="off"
                                    componentClass="select"
                                    value={
                                      this.state.contactArray[catIndex]
                                        .userType
                                    }
                                    onChange={event =>
                                      this.handleContactFieldChange(
                                        event,
                                        catIndex,
                                        "userType"
                                      )
                                    }
                                  >
                                    <option value="">
                                      Select user privilege
                                      </option>
                                    <option value="1">Admin</option>
                                    <option value="2">Regular</option>
                                  </FormControl>
                                  <FormControl.Feedback />

                                  {renderMessage(
                                    this.props.getValidationMessages(
                                      "userType" + catIndex
                                    )
                                  )}
                                </FormGroup>
                              </td>

                              <td className="w-150">
                                <FormGroup controlId="formBasicText">
                                  <FormControl
                                    className="br-0 s-arrow"
                                    type="text"
                                    autoComplete="off"
                                    componentClass="select"
                                    name={
                                      "addressRequest" + catIndex
                                    }
                                    value={
                                      this.state.contactArray &&
                                      this.state.contactArray[
                                      catIndex
                                      ] &&
                                      this.state.contactArray[
                                        catIndex
                                      ].addressRequest &&
                                      this.state.contactArray[
                                        catIndex
                                      ].addressRequest.id
                                    }
                                    onChange={event =>
                                      this.handleContactFieldChange(
                                        event,
                                        catIndex,
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
                                  <FormControl.Feedback />
                                </FormGroup>
                              </td>

                              <td>
                                <FormGroup controlId="formBasicText">
                                  <FormControl
                                    className="br-0"
                                    type="text"
                                    autoComplete="off"
                                    disabled={true}
                                    maxLength="80"
                                    name={"area" + catIndex}
                                    value={
                                      this.state.contactArray &&
                                        this.state.contactArray[
                                        catIndex
                                        ] &&
                                        this.state.contactArray[
                                          catIndex
                                        ].addressRequest &&
                                        this.state.contactArray[
                                          catIndex
                                        ].addressRequest.locationId ? this.state.contactArray[
                                          catIndex
                                        ].addressRequest &&
                                        this.state.contactArray[
                                          catIndex
                                        ].addressRequest.locationId : ''
                                    }
                                  />
                                  <FormControl.Feedback />
                                </FormGroup>
                              </td>

                              {this.props.userInfo.userData.userRole === 1 ? (
                                <td>
                                  <FormGroup controlId="formControlsSelect">
                                    <FormControl
                                      componentClass="select"
                                      autoComplete="off"
                                      placeholder="select"
                                      className="s-arrow br-0"
                                      name={"departmentId" + catIndex}
                                      value={
                                        this.state.contactArray[catIndex]
                                          .departmentId
                                      }
                                      onChange={event =>
                                        this.handleContactFieldChange(
                                          event,
                                          catIndex,
                                          "departmentId"
                                        )
                                      }
                                    >
                                      <option value="">Select Department </option>

                                      {this.state.listOfDepartmentDept &&
                                        this.state.listOfDepartmentDept.map(
                                          (item, catIndex) => {
                                            return (
                                              <option
                                                value={item.id}
                                                key={catIndex}
                                              >
                                                {item.department}
                                              </option>
                                            );
                                          }
                                        )}
                                    </FormControl>
                                    {renderMessage(
                                      this.props.getValidationMessages(
                                        "departmentId" + catIndex
                                      )
                                    )}
                                  </FormGroup>
                                </td>
                              ) : (
                                  ""
                                )}
                              {this.props.userInfo.userData.userRole === 1 ? (
                                <td className="custom-dd dropRf customdropdown">
                                 
                                </td>
                              ) : (
                                  ""
                                )}

                              {this.props.userInfo.userData.userRole === 1 ? (
                                <td>
                                  <label className="label--checkbox">
                                    <input
                                      type="checkbox"
                                      className="checkbox"
                                      onChange={event =>
                                        this.handleContactFieldChange(
                                          event,
                                          catIndex,
                                          "budgetPlanner"
                                        )
                                      }
                                      className="checkbox"
                                      name="budgetPlanner"
                                      checked={
                                        this.state.contactArray[catIndex]
                                          .budgetPlanner
                                          ? "checked"
                                          : ""
                                      }
                                    // onClick={event =>
                                    //   this.handleApproverSelect(event, id)
                                    // }
                                    />
                                    <span className="mark" />
                                  </label>
                                </td>
                              ) : (
                                  ""
                                )}

                              {this.props.userInfo.userData.userRole === 1 ? (
                                <td className="custom-dd dropRf customdropdown">
                                  {this.state.contactArray[catIndex]
                                    .budgetPlanner ? (
                                      <div>
                                       
                                       
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                </td>
                              ) : (
                                  ""
                                )}

                              <td className="w-150">
                                {this.state.approverList.map((val, idx) => {
                                  let arrayIds = this.state.contactArray[catIndex].listOfOtherApprovers.filter(vendor => (vendor === val.id));
                                  return arrayIds && arrayIds.length > 0 ? (
                                    <div className="flex tb-main">
                                      <span className="flex-1 text-center">
                                        {val.firstName} {val.lastName}
                                      </span>
                                    </div>
                                  ) : (
                                      ""
                                    );
                                })}

                              </td>
                              <td className="">
                                <Button
                                  className="btn dark-greybg-btn sm-btn show-list"
                                  onClick={e =>
                                    this.handleShowApprovalModal(e, catIndex)
                                  }
                                >
                                  add approver
                                  </Button>
                              </td>

                              <td className="">
                                {this.state.contactArray && this.state.contactArray.length > 1 ?
                                  <button
                                    className="btn btn-task"
                                    onClick={e =>
                                      this.handleDeleteConfirm(e, catIndex)
                                    }
                                  >
                                    <span className="ico-action ">
                                      <svg>
                                        <use
                                          xlinkHref={`${Sprite}#deleteIco`}
                                        />
                                      </svg>
                                    </span>
                                    <span className="ico-txt">Delete</span>
                                  </button>
                                  :
                                  <button
                                    className="btn btn-task"
                                    disabled={true}
                                  >
                                    <span className="ico-action">
                                      <svg>
                                        <use xlinkHref={`${Sprite}#deleteIco`} />
                                      </svg>
                                    </span>
                                    <span className="ico-txt">Delete</span>
                                  </button>
                                }
                              </td>
                            </tr>
                          ];
                        })}
                      </tbody>
                    </Table>
                  </div>

                  {/* <div className="text-center m-t-20">
                   
                  </div> */}
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
                  {/* <div className="text-center m-b-60">
                    <button
                      className="btn yellow-bg-btn"
                      disabled={this.state.OTPField.join("").length != 6}
                      onClick={event => this.validateData(event, "addUser")}
                    >
                      Submit
                      </button>
                  </div> */}
                </div>
              </div>
              {/* -----add approval modal------ */}
              <Modal
                className="custom-popUp"
                show={this.state.show}
                onHide={this.handleClose}
                onEntered={this.handleModalShown}
                bsSize="lg"
              >
                <Modal.Header>
                  <div className="flex justify-space-between">
                    <h4 className="p-l-5">Add Approver</h4>
                    <div className="">
                      <button
                        onClick={this.handleHideApprovalModal}
                        className="btn btn-link color-light"
                      >
                        Close
                      </button>

                    </div>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  {/* <h4 className="modal-head text-center">Add Approver</h4> */}
                  <Table bordered responsive className="custom-table">
                    <thead>
                      <tr>
                        <th>
                          <label className="label--checkbox">
                            <input
                              type="checkbox"
                              className="checkbox"
                              name="allchecked"
                              checked={
                                this.state.contactArray &&
                                  this.state.contactArray[
                                  this.state.contactArrayIndex
                                  ] &&
                                  this.state.contactArray[
                                    this.state.contactArrayIndex
                                  ].allchecked
                                  ? "checked"
                                  : ""
                              }
                              onChange={event =>
                                this.handleApproverSelectAll(event)
                              }
                            />
                            <span className="mark" />
                          </label>
                        </th>
                        <th />
                        <th>Enabled/disabled</th>
                        <th>First Name</th>
                        <th>last Name</th>
                        <th>Email</th>
                        <th>User Profile</th>
                        <th>Make Default</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.approverList.map((approver, index) => {
                        const firstName = approver.firstName || "-";
                        const lastName = approver.lastName || "-";
                        const userProfile = approver.userProfile || "-";
                        const email = approver.email || "-";
                        const id = approver.id || "";
                        const checked = approver.checked ? "checked" : "";
                        const enabledDisabled = approver.isEnabled !== undefined && approver.isEnabled ? "Enabled" : "Disabled";
                        let lastIndex = this.state.contactArray;
                        let lengthArr = lastIndex.length - 1;
                        return (
                          <tr class="show-dis">
                            <td>
                              {enabledDisabled == 'Enabled' ?
                                <label className="label--checkbox">
                                  <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={checked}
                                    onClick={event =>
                                      this.handleApproverSelect(event, id)
                                    }
                                  />
                                  <span className="mark" />
                                </label> :
                                <label className="label--checkbox">
                                  <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={false}
                                    disabled={true}
                                  />
                                  <span className="mark" />
                                </label>
                              }
                            </td>
                            <td>
                              <div className="sm-avtar">
                                <img src={userImage} />
                              </div>
                            </td>
                            <td className="text-capitalize">{enabledDisabled} </td>
                            <td className="text-capitalize">{firstName} </td>
                            <td className="text-capitalize">{lastName}</td>
                            <td>{email}</td>
                            <td className="text-capitalize">
                              {userProfile.replace(/_/g, " ")}
                            </td>
                            <td>
                              {enabledDisabled == 'Enabled' ?
                                <label className="label--radio">
                                  <input
                                    type="radio"
                                    className="radio"
                                    checked={
                                      this.state.contactArray[lengthArr]
                                        .defaultApprover === id
                                        ? "checked"
                                        : ""
                                    }
                                    name="m-radio"
                                    onChange={event =>
                                      this.handleDefaultApproverSelect(
                                        event,
                                        id,
                                        "defaultApprover"
                                      )
                                    }
                                  />
                                  <span className="r-dot" />
                                </label> :
                                <label className="label--radio">
                                  <input
                                    type="radio"
                                    className="radio"
                                    name="m-radio"
                                    checked={false}
                                    disabled={true}
                                  />
                                  <span className="r-dot" />
                                </label>
                              }
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Modal.Body>
              </Modal>

              <Modal
                show={this.state.showDeleteUserModal}
                onHide={this.handleDeleteClose}
                className="custom-popUp confirmation-box"
                bsSize="small"
              >
                <Modal.Body>
                  <div className="">
                    <h5 className="text-center">
                      Are you sure you want to delete this user?
              </h5>

                    <div className="text-center">
                      <button
                        className="btn btn-default sm-btn"
                        onClick={(e) => {
                          this.deleteUser(e);
                        }}
                      >
                        Ok
                </button>
                      <button
                        className="btn btn-success sm-btn"
                        onClick={() => {
                          this.handleDeleteClose();
                        }}
                      >
                        Cancel
                    </button>
                    </div>

                  </div>
                </Modal.Body>
              </Modal>




              {this.props.userInfo.userData.userRole === 1 ? (
                ''
              ) : (
                  <FooterSupplier
                    pageTitle={permissionConstant.footer_title.add_user}
                  />
                )}
            </div>
            {/* ) : null} */}
          </div>
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
      actionTabClick,
      actionGetUserProfileList,
      actionGetCompanyData,
      actionGetClassifications,
      actionClearOTPToAddUser
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

AddUser = validation(strategy)(AddUser);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser);
