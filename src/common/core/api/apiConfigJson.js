export default {
  buyerLogin: {
    url: '/userauth/oauth/token',
    method: 'POST',
    data: {},
    showResultMessage: false,
    showErrorMessage: false
  },
  logout: {
    url: '/userauth/oauth/revokeToken/:roleId/:userId',
    method: 'DELETE',
    data: {},
    showResultMessage: false,
    showErrorMessage: false
  },
  register: {
    url: '/api/v1/user/public/register',
    method: 'POST',
    data: {
      companyName: '',
      roleId: 0,
      hostName: '',
      companyLogoURL: '',
      listOfUserUserIds: [''],
      createdTimestamp: 0,
      lastUpdatedTimestamp: 0,
      userDetailRequests: [{
        firstName: '',
        lastName: '',
        password: '',
        userProfile: '',
        mobile: '',
        email: '',
        accessToken: '',
        isEnabled: false,
        profileImageURL: '',
        isPrimaryUser: false,
        emailOTP: 0,
        mobileOTP: 0,
        creatorUserId: '',
        roleId: 0,
        createdTimestamp: 0,
        lastUpdatedTimestamp: 0,
        userType: '',
        listOfBuyerApproval: ['']
      }]
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  otpVerification: {
    url: '/api/v1/user/public/confirm/registration',
    method: 'PUT',
    data: {
      userId: '',
      roleId: '',
      emailOTP: '',
      mobileOTP: '',
      password: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getApproverList: {
    url: '/api/v1/user/unapproved?userId=:userId&roleId=:roleId',
    method: 'GET',
    data: {},
    showResultMessage: true,
    showErrorMessage: true
  },
  generateOTPToAddUser: {
    url: '/api/v1/user/add/otp',
    method: 'PUT',
    data: {
      userId: '',
      roleId: '',
      accessToken: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  supplierAddUser: {
    url: '/api/v1/user/add',
    method: 'PUT',
    data: {
      userDetailRequests: [{
        userId: 'string',
        firstName: 'string',
        lastName: 'string',
        password: 'string',
        designation: 'string',
        mobile: 'string',
        email: 'string',
        accessToken: 'string',
        isEnabled: false,
        profileImageURL: 'string',
        isPrimaryUser: false,
        emailOTP: 0,
        mobileOTP: 0,
        creatorUserId: 'string',
        roleId: 0,
        createdTimestamp: 0,
        lastUpdatedTimestamp: 0,
        userType: 'string',
        userProfile: 'string',
        addApproval: 'string',
        listOfOtherApprovers: ['string'],
        defaultApprover: 'string',
        salariedAccount: {},
        budgetCostCenter: {},
      }],
      parentUserId: 'string',
      roleId: 0,
      emailOTP: 0
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getProjectList: {
    url: '/api/v1/user/project/all',
    method: 'POST',
    data: {
      userId: '',
      roleId: ''
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  processBomParts: {
    url: '/api/v1/user/part/processBomParts',
    method: 'POST',
    data: {
      userId: '',
      roleId: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  addProject: {
    url: '/api/v1/user/project/create',
    method: 'POST',
    data: {
      projectCode: '',
      projectTitle: '',
      creatorId: '',
      totalPartsPlanned: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  addPart: {
    url: '/api/v1/user/part/create',
    method: 'PUT',
    data: {},
    showResultMessage: true,
    showErrorMessage: true
  },
  forgotPassword: {
    url: '/api/v1/user/public/forgotpassword?email=:email&roleId=:roleId',
    method: 'PUT',
    data: {},
    showResultMessage: true,
    showErrorMessage: true
  },

  resetPassword: {
    url: '/api/v1/user/public/newpassword',
    method: 'PUT',
    data: {
      roleId: '',
      password: '',
      token: ''
    },
    showResultMessage: true,
    showErrorMessage: false
  },
  editProfile: {
    url: '/api/v1/user/add/update',
    method: 'PUT',
    data: {
      userDetailRequests: [{
        userId: 'string',
        firstName: 'string',
        lastName: 'string',
        password: 'string',
        designation: 'string',
        mobile: 'string',
        email: 'string',
        accessToken: 'string',
        isEnabled: false,
        profileImageURL: 'string',
        isPrimaryUser: false,
        emailOTP: 0,
        mobileOTP: 0,
        creatorUserId: 'string',
        roleId: 0,
        createdTimestamp: 0,
        lastUpdatedTimestamp: 0,
        userType: 'string',
        userProfile: 'string',
        addApproval: 'string',
        listOfOtherApprovers: ['string'],
        defaultApprover: 'string',
        departmentId: 'string',
        budgetPlanner: 'string',
        addressRequest: []
      }],
      parentUserId: 'string',
      roleId: 0,
      emailOTP: 0
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getAllAddedUser: {
    url: '/api/v1/user/all/added',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      pageNumber: '',
      pageSize: '',
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  updateActionOverview: {
    url: '/api/v1/user/dashboard/updateOverviewActionData',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      listOfIds: [],
      commodityIds: [],
      buyerIds: [],
      supplierIds: [],
      deliveryAddressIds: [],
      buildPhases: [],
      bomIds: [],
      typeOfPart: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  getActionOverview: {
    url: '/api/v1/user/dashboard/getOverviewActionData',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      listOfIds: [],
      commodityIds: [],
      buyerIds: [],
      supplierIds: [],
      deliveryAddressIds: [],
      buildPhases: [],
      bomIds: [],
      typeOfPart: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  deleteUserProfile: {
    url: '/api/v1/user/delete/added?parentId=:parentId&roleId=:roleId&userId=:userId',
    method: 'DELETE',
    data: {},
    showResultMessage: true,
    showErrorMessage: true
  },
  getPartHistory: {
    url: '/api/v1/user/part/history/full',
    method: 'POST',
    data: {
      userId: '',
      partId: '',
      pageNumber: '',
      pageSize: '',
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  getDashboardHistory: {
    url: '/api/v1/user/project/count/summary',
    method: 'POST',
    data: {
      userId: '',
      key: '',
      projectCode: '',
      projectId: '',
      pageNumber: '',
      pageSize: '',
      quotationCount: '',
      listOfIds: [],
      commodityIds: [],
      buyerIds: [],
      supplierIds: [],
      deliveryAddressIds: [],
      buildPhases: [],
      bomIds: [],
      typeOfPart: ''
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  saveApprovalLimit: {
    url: '/api/v1/user/group',
    method: 'POST',
    data: {
      roleId: '',
      userId: '',
      currency: '',
      groupNumber: '',
      groupLimitAmount: '',
      groupMemberList: ''
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  getUserByGroup: {
    url: '/api/v1/user/group/get',
    method: 'POST',
    data: {
      roleId: '',
      userId: ''
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  updateApprovalLimit: {
    url: '/api/v1/user/group/update',
    method: 'PUT',
    data: {
      roleId: '',
      userId: '',
      id: '',
      currency: '',
      groupLimitAmount: '',
      groupMemberList: ''
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  editPartDetail: {
    url: '/api/v1/user/part/all/edit',
    method: 'POST',
    data: {
      roleId: '',
      userId: '',
      pageNumber: '',
      pageSize: '',
      createProcess: false
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  deletePartDetail: {
    url: '/api/v1/user/part/delete',
    method: 'DELETE',
    data: {
      roleId: '',
      userId: '',
      partId: '',
      listofIds: [],
      partRFQId: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  deletePartDatabase: {
    url: '/api/v1/user/part/file?fileId=:fileId&key=:key',
    method: 'DELETE',
    data: {
      roleId: '',
      userId: '',
      partId: '',
      mediaUrl: '',
      partRevisionId: '',
      keyword: '',
      id: '',
      dataFor: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  updatePart: {
    url: '/api/v1/user/part/update',
    method: 'POST',
    data: {
      partRequest: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getDiscloserData: {
    url: '/api/v1/user/list/register/approval',
    method: 'POST',
    data: {
      roleId: '',
      userId: '',
      pageNumber: '',
      pageSize: '',
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  approveRejectNonDisclosure: {
    url: '/api/v1/user/set/register/approval',
    method: 'PUT',
    data: {
      roleId: '',
      userId: '',
      approvalId: '',
      comments: '',
      status: '',
      supplierUserId: ''
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  affectedUserCheckBeforeDelete: {
    url: '/api/v1/user/ondelete/affected?userId=:parentId&roleId=:roleId&userToDeleteId=:userId',
    method: 'GET',
    data: {},
    showResultMessage: false,
    showErrorMessage: false
  },
  getPartDetailsByPartNumber: {
    url: '/api/v1/user/part/search',
    method: 'POST',
    data: {
      roleId: '',
      userId: '',
      partNumber: ''
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  getUserDetails: {
    url: '/api/v1/user/get?roleId=:roleId&userId=:userId',
    method: 'GET',
    showResultMessage: true,
    showErrorMessage: true
  },
  updateUserProfile: {
    url: '/api/v1/user/update',
    method: 'PUT',
    data: {
      userId: '',
      roleId: '',
      firstName: '',
      lastName: '',
      //userProfile: "",
      mobile: '',
      email: '',
      profileImageURL: '',
      mobileOTP: '',
      emailOTP: '',
      companyLogoUrl: '',
      globalPurchasingCode: '',
      nonDisclosureAgreement: {},
      companyLogoId: '',
      profileImageId: ''
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  // checkToken: {
  //   url: '/api/v1/user/checkToken?roleId=:roleId&userId=:userId',
  //   method: 'GET',
  //   showResultMessage: false,
  //   showErrorMessage: false
  // },
  checkToken: {
    url: '/api/v1/user/checkToken',
    method: 'GET',
    showResultMessage: false,
    showErrorMessage: false
  },
  sendOtpForUpdate: {
    url: '/api/v1/user/update/send/otp?roleId=:roleId&userId=:userId&email=:email&key=:key',
    method: 'PUT',
    showResultMessage: true,
    showErrorMessage: true
  },
  saveAudit: {
    url: '/api/v1/user/audit',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      researchAndDevRequest: '',
      qualityRequest: '',
      manufacturingRequest: '',
      environmentalAndCSRRequest: '',
      auditDocumentRequest: '',
      isOandOtherCertificateRequest: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getBusinessDetails: {
    url: '/api/v1/user/supplier/business',
    method: 'POST',
    data: {
      userId: '',
      roleId: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  uploadTestimonial: {
    url: '/api/v1/user/upload/testimonial',
    method: 'PUT',
    data: {
      userId: '',
      roleId: '',
      buyerId: '',
      testmonialDocReq: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getUserProfileList: {
    url: '/api/v1/user/userprofile',
    method: 'POST',
    data: {
      userId: '',
      roleId: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  generateOTPToEditUser: {
    url: '/api/v1/user/edit/otp?userId=:userId&roleId=:roleId',
    method: 'PUT',
    data: {},
    showResultMessage: true,
    showErrorMessage: true
  },
  getCommentDetail: {
    url: '/api/v1/user/part/comments',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      partId: '',
      partRFQId: '',
      pageNumber: '',
      pageSize: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  submitComment: {
    url: '/api/v1/user/part/add/comments',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      approvalId: '',
      status: '',
      comment: '',
      partId: '',
      partRFQId: '',
      stage: '',
      projectSourcingId: '',
      budgetId: '',
      listOfFileRequest: [],
      rawMaterialId: '',
      indirectPurchaseId: '',
      commentId: '',
      quotationId: '',
      poId: '',
      pfoId: ''
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  getPartNotification: {
    url: '/api/v1/user/notification/get',
    method: 'PUT',
    data: {
      userId: '',
      roleId: '',
      pageNumber: '',
      pageSize: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  clearNotification: {
    url: '/api/v1/user/notification/clear',
    method: 'PUT',
    data: {
      userId: '',
      roleId: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getPurchaseCategoryData: {
    url: '/api/v1/user/purchase/default/list',
    method: 'POST',
    data: {
      userId: '',
      roleId: ''
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  readNotification: {
    url: '/api/v1/user/notification/read',
    method: 'PUT',
    data: {
      userId: '',
      roleId: '',
      listOfNotificationIds: []
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  getProjectListForIndirectPurchase: {
    url: '/api/v1/user/project/indirectpurchase/all',
    method: 'PUT',
    data: {
      userId: '',
      roleId: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  getPartListByProject: {
    url: '/api/v1/user/part/indirectpurchase/refer',
    method: 'PUT',
    data: {
      userId: '',
      roleId: '',
      projectId: ''
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  submitIndirectPurchase: {
    // url: '/api/v1/user/purchase/indirect/create',
    url: '/api/v1/user/part/createNonBomRfp',
    method: 'PUT',
    data: {
      roleId: '',
      userId: '',
      indirectPurchaseRequestList: {},
      rfpDraftId: '',
      currentStage: '',
      targetDate: '',
      deliveryAddressRequest: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  checkAccountNo: {
    url: '/api/v1/user/purchase/account/check',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      accountNo: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getListOfIndirectPurchase: {
    url: '/api/v1/user/purchase/indirect/get',
    method: 'POST',
    data: {
      userId: '',
      roleId: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  deleteOfIndirectPurchase: {
    url: '/api/v1/user/purchase/indirect/delete',
    method: 'DELETE',
    data: {
      userId: '',
      roleId: '',
      listOfIds: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getCommentCount: {
    url: '/api/v1/user/part/comment/count/:partRFQId',
    method: 'GET',
    data: {},
    showResultMessage: false,
    showErrorMessage: false
  },
  savePurchaseData: {
    url: '/api/v1/user/purchase/indirect/category',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      listOfPurchaseCategories: {}
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getListOfRevisionUsers: {
    url: '/api/v1/user/unapproved?userId=:userId&roleId=:roleId',
    method: 'GET',
    data: {},
    showResultMessage: true,
    showErrorMessage: true
  },
  savebudgetOneData: {
    url: '/api/v1/user/budget/create',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      revisionNo: '',
      forecastNo: '',
      financialYear: 'string',
      budgetInputBy: 0,
      budgetGroupBy: 'string',
      budgetItemRequests: [],
      listOfApprovers: [],
      financialBudgetId: 'string',
      fromYear: '',
      toYear: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getCompanyDetails: {
    url: '/api/v1/user/company/details?userId=:userId&roleId=:roleId',
    method: 'GET',
    data: {},
    showResultMessage: false,
    showErrorMessage: false
  },
  createECOData: {
    url: '/api/v1/user/bom/eco/create',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      ecoDescription: 'string',
      priorityLevel: '',
      ecoCategory: 'string',
      ecoChangeDescription: 'string',
      otherSpecialDescription: 'string',
      designer: 'string',
      shippingPlantAddress: {},
      receivingPlantAddress: {},
      designLocation: {},
      approvers: [],
      listOfEcoRequest: [{
        ecoNumber: '',
        project: '',
        modelFamilyOfPart: '',
        modelOfPart: '',
        technicalTypeOfPart: '',
        variantOfPart: '',
        ecoBomXDataRequests: [{
          id: '',
          partNumber: '',
          oldCost: 0,
          newEstimatedCost: 0,
          actualNewCost: 0,
          estimatedManufactureCostImpact: 0,
          actualManufactureCostImpact: 0,
          estimatedManufactureInvestment: 0,
          actualManufactureInvestment: 0,
          estimatedServiceCostImpact: 0,
          actualServiceCostImpact: 0,
          estimatedVendorTooling: 0,
          actualVendorTooling: 0,
          targetImplementationDate: 0,
          actualImplementationDate: 0,
          otherMandatoryEnggChangeForImplementationId: '',
          serialNumberBreakMandatory: 'No',
          serialNumberBreak: 'No',
          stockOnHand: '',
          stockOnOrder: '',
          stockInServiceParts: '',
          totalEstimatedScrap: 0,
          totalActualScrap: 0,
          paint: '',
          specialManufacturingInstructions: [],
          specialPackagingInstructions: [],
          partsInterchangeableInService: 'No',
          scrapPartsInService: 'No',
          specialServiceInstructions: '',
          apqpDesignReviewRecord: '',
          apqpManufacturingReviewRecord: '',
          apqpValidationTestingRecord: '',
          apqpDesignerId: '',
          apqpImplementedById: '',
          apqpQualityApprovalById: '',
          oldSupplier: '',
          oldSupplierPartNumber: '',
          newSupplier: '',
          newSupplierPartNumber: '',
          currentImage: {},
          newImage: {}
        }]
      }]
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getECODropDownData: {
    url: '/api/v1/user/bom/eco/get/dropdowns',
    method: 'PUT',
    data: {
      userId: '',
      roleId: ''
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  saveGeographicalData: {
    url: '/api/v1/user/admin/create/geographical/classification',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      geoCostCenterRequests: [{}]
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getGeographicalData: {
    url: '/api/v1/user/admin/get/geographical/classification',
    method: 'POST',
    data: {
      userId: '',
      roleId: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  deleteGeographicalData: {
    url: '/api/v1/user/admin/delete/geographical/classification',
    method: 'DELETE',
    data: {
      userId: '',
      roleId: '',
      id: '',
      classificationType: ''
    },
    showResultMessage: true,
    showErrorMessage: false
  },
  getBuildPlanData: {
    url: '/api/v1/user/bom/project/buildplan/get',
    method: 'PUT',
    data: {
      userId: '',
      roleId: '',
      filterForOverview: {},
      pageNumber: '',
      pageSize: '',
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  createBuildPlanData: {
    url: '/api/v1/user/bom/project/buildplan/create',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      listOfBuildPlanRevision: [{
        revisionNumber: '',
        listOfBuildPhase: [{
          buildPhase: '',
          listOfVariantBuildPlan: [{
            bomOrVariant: '',
            refrenceVariant: '',
            variantDescription: '',
            eco: '',
            buildLocations: [{
              buildLocation: {},
              noOfUnitsInTheBuild: '',
              bufferParts: '',
              buildInCharge: '',
              materialAvailabilityTartgetDate: '',
              buildFinishTargetDate: '',
              productShipTargetDate: ''
            }]
          }]
        }],
        listOfBuildPlanApprovers: []
      }],
      project: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getECOPartDropDownData: {
    url: '/api/v1/user/part/by/project?projectId=:projectId',
    method: 'GET',
    data: {},
    showResultMessage: false,
    showErrorMessage: true
  },
  getBOMBuildPlanDropDownData: {
    url: '/api/v1/user/bom/buildplan/dropdown?project=:projectId',
    method: 'GET',
    data: {},
    showResultMessage: false,
    showErrorMessage: true
  },
 
  getProductLineData: {
    url: '/api/v1/user/bom/productLine/all',
    method: 'PUT',
    data: {
      userId: '',
      roleId: 0
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  getSAWidgetProto: {
    url: '/api/v1/user/dashboard/getSourcingApprovalDetails',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      listOfIds: [],
      commodityIds: [],
      buyerIds: [],
      supplierIds: [],
      deliveryAddressIds: [],
      buildPhases: [],
      bomIds: [],
      revised: false,
      typeOfPart: '',
      partType: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  getRFQWidget: {
    url: '/api/v1/user/dashboard/getPartRFQDetails',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      listOfIds: [],
      commodityIds: [],
      buyerIds: [],
      supplierIds: [],
      deliveryAddressIds: [],
      buildPhases: [],
      bomIds: [],
      revised: false,
      typeOfPart: '',
      partType: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  getPartStatusWidget: {
    url: '/api/v1/user/dashboard/partStatus',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      listOfIds: [],
      commodityIds: [],
      buyerIds: [],
      supplierIds: [],
      deliveryAddressIds: [],
      buildPhases: [],
      bomIds: [],
      typeOfPart: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  getModelFamilyData: {
    url: '/api/v1/user/bom/filtered/get',
    method: 'PUT',
    data: {
      userId: '',
      roleId: '',
      productLineId: '',
      parentModelFamilyId: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },

  saveLocationData: {
    url: '/api/v1/user/admin/update/locations',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      addressRequests: [{}],
      pageNumber: '',
      pageSize: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getLocationData: {
    url: '/api/v1/user/admin/get/locations',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      pageNumber: '',
      pageSize: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  getPartByKeyword: {
    url: '/api/v1/user/part/by/keyword?keyword=:keyword&projectId=:projectId&bomId=:bomId',
    method: 'GET',
    data: {},
    showResultMessage: false,
    showErrorMessage: true
  },
  getClassificationsData: {
    url: '/api/v1/user/purchase/get/classifications',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      classificationType: '',
      id: '',
      requestFromCreateProgram: false,
      requestForDPA: false
    },
    showResultMessage: false,
    showErrorMessage: false //For add User issues 
  },
  getBOMCalculationData: {
    url: '/api/v1/user/bom/get/calculation/table/?bomId=:bomId&index=:index',
    method: 'GET',
    data: {},
    showResultMessage: false,
    showErrorMessage: true
  },
  updateBOMData: {
    url: '/api/v1/user/bom/update',
    method: 'PUT',
    data: {
      userId: '',
      roleId: 0,
      billOfMaterialRequests: [{
        id: '',
        bomCode: '',
        partnumber: '',
        bomDescription: '',
        quantity: 0,
        uom: '',
        bomlevel: 0,
        levelType: '',
        levelName: '',
        oldCost: 0,
        newCost: 0,
        manufactureImpact: '',
        stock: '',
        onOrder: '',
        servicePartDepot: '',
        servicePartDisposition: '',
        specialManufaturingInstruction: '',
        specialServiceInstruction: ''
      }]
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getPurchaseData: {
    url: '/api/v1/user/purchase/all',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      pageNumber: '',
      pageSize: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  getDescriptionData: {
    url: '/api/v1/user/purchase/description',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      brandId: '',
      subBrandId: '',
      departmentId: '',
      subDepartmentId: '',
      teamId: '',
      majorCategoryId: '',
      categoryId: '',
      subCategoryId: '',
      subSubCategoryId: '',
      sectorId: '',
      productLineId: '',
      modelFamilyId: '',
      programId: '',
      modelId: '',
      geogrophyId: '',
      region1: '',
      region2: '',
      region3: '',
      region4: '',
      region5: '',
      region6: '',
      region7: '',
      region8: '',
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  deletePurchaseData: {
    url: '/api/v1/user/purchase/category/delete',
    method: 'DELETE',
    data: {
      userId: '',
      roleId: '',
      // id: '',
      listofIds: []
    },
    showResultMessage: true,
    showErrorMessage: false
  },
  getSuggessionData: {
    url: '/api/v1/user/suggession',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      firstName: '',
      budgetPlanner: '',
      checkGlobalCFO: '',
      checkPurchaseManager: '',
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  getAccountNumberData: {
    url: '/api/v1/user/purchase/get/accountNo',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      selectedBrandId: "",
      selectedProjectId: "",
      selectedPendingCategoryId: "",
      selectedDeptId: "",
      brandId: '',
      subBrandId: '',
      departmentId: '',
      subDepartmentId: '',
      teamId: '',
      majorCategoryId: '',
      categoryId: '',
      subCategoryId: '',
      subSubCategoryId: '',
      sectorId: '',
      productLineId: '',
      modelFamilyId: '',
      modelId: '',
      programId: '',
      geogrophyId: '',
      geographyId: '',
      region1: '',
      region2: '',
      region3: '',
      region4: '',
      region5: '',
      region6: '',
      region7: '',
      region8: '',
      commodityId: "",
      legalEntityId: "",
      factor1: "",
      factor2: "",
      factor3: "",
      typeOfPart: "",
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  getBudgetExtraData: {
    url: '/api/v1/user/budget/dropdowns',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      revisionNo: '',
      forecastNo: '',
      financialYear: '',
      listBy: '',
      redRevisionNo: '',
      redForecastNo: 0,
      redFinancialYear: '',
      blueRevisionNo: '',
      blueForecastNo: 0,
      blueFinancialYear: '',
      cloneRevisionNo: '',
      cloneForecastNo: 0,
      cloneFinancialYear: '',
      id: ''
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  getBOMECOFilter: {
    url: '/api/v1/user/bom/filtered/get',
    method: 'PUT',
    data: {
      userId: '',
      roleId: '',
      projectId: '',
      modelFamilyId: '',
      modelId: '',
      variantId: '',
      technnicalTypeId: ''
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  getSuggessionFilterData: {
    url: '/api/v1/user/bom/filtered/part',
    method: 'PUT',
    data: {
      userId: '',
      roleId: '',
      projectId: '',
      modelFamilyId: '',
      modelId: '',
      technnicalTypeId: '',
      variantId: '',
      searchKeyword: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  getWhereUsedData: {
    url: '/api/v1/user/bom/whereused?partId=:partId&buyerId=:buyerId',
    method: 'GET',
    data: {},
    showResultMessage: false,
    showErrorMessage: true
  },
  getFindAllBOMData: {
    url: '/api/v1/user/bom/findall',
    method: 'POST',
    data: {
      listOfBomIds: []
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  deleteOfBudget: {
    url: '/api/v1/user/budget/delete/detail',
    method: 'DELETE',
    data: {
      userId: '',
      roleId: '',
      listOfIds: []
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  getBudgetData: {
    url: '/api/v1/user/budget/get/approvals',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      revisionNo: '',
      forecastNo: '',
      financialYear: '',
      listBy: '',
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  setBudgetApprovalData: {
    url: '/api/v1/user/budget/set/approval',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      levelOfApproval: '',
      approvalStatus: '',
      id: '',
      comment: ''
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getSuggessionUserData: {
    url: '/api/v1/user/search?userId=:userId&roleId=:roleId&keyword=:keyword',
    method: 'PUT',
    data: {},
    showResultMessage: false,
    showErrorMessage: false
  },
  getProductSegmentDropDownData: {
    url: '/api/v1/user/bom/productSegment/all',
    method: 'PUT',
    data: {
      userId: '',
      roleId: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  getProductLineDropDownData: {
    url: '/api/v1/user/bom/productLine/all',
    method: 'PUT',
    data: {
      userId: '',
      roleId: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  getProductLineSegDropDownData: {
    url: '/api/v1/user/bom/productLineSeg/all?productSegmentid=:productSegmentid',
    method: 'GET',
    data: {},
    showResultMessage: false,
    showErrorMessage: false
  },
  getModelFamilyDropDownData: {
    url: '/api/v1/user/bom/modelfamily/all?productLineId=:productLineId',
    method: 'GET',
    data: {},
    showResultMessage: false,
    showErrorMessage: false
  },
  getModelDropDownData: {
    url: '/api/v1/user/bom/model/all?modelFamilyId=:modelFamilyId',
    method: 'GET',
    data: {},
    showResultMessage: false,
    showErrorMessage: false
  },
  createBOM: {
    url: '/api/v1/user/bom/create',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      parentProductLineId: '',
      parentmodelFamilyId: '',
      parentModelId: '',
      parentTechnicalType: {
        technicalTypeName: '',
        technicalTypeCode: '',
        technicalTypeDescription: ''
      },
      parentVariant: {
        variantName: '',
        variantCode: '',
        variantDescription: ''
      },
      listOfBillOfMaterialRequests: [{
        partNumber: '',
        parentPartNumber: '',
        partDescription: '',
        quantity: 0,
        uom: '',
        level: 1,
        levelType: '',
        phantom: '',
        qualitySignificanceLevel: 0,
        partWeight: 0,
        rawMaterialName: '',
      }]
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getBOM: {
    url: '/api/v1/user/bom/bomFilePath',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      productSegmentId: '',
      parentProductLineId: '',
      parentmodelFamilyId: '',
      parentModelId: '',
      parentProgramId: '',
      lastUpdatedTimeStamp: '',
      timeInterval: '',
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  getBOMLineItem: {
    url: '/api/v1/user/bom/bomLineItem',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      productSegmentId: '',
      parentProductLineId: '',
      parentmodelFamilyId: '',
      parentModelId: '',
      parentProgramId: '',
      bomCode: ''
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  deleteBOM: {
    url: '/api/v1/user/bom/delete',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      bomIds: []
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  getProfileAction: {
    url: '/api/v1/user/profile/action?userId=:userId&roleId=:roleId',
    method: 'GET',
    data: {},
    showResultMessage: false,
    showErrorMessage: true
  },

  saveProfileUpdate: {
    url: '/api/v1/user/profile/update',
    method: 'PUT',
    data: {
      userId: "",
      roleId: 0,
      listOfUserProfile: [{
        profileId: "",
        profileName: "",
        permissions: [
          ""
        ]
      }]
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  getUserProfile: {
    url: '/api/v1/user/profiles?userId=:userId&roleId=:roleId',
    method: 'GET',
    data: {},
    showResultMessage: false,
    showErrorMessage: true
  },
  createActiveNewRevision: {
    url: '/api/v1/user/budget/revision',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      approvalRequest: {}
    },
    showResultMessage: true,
    showErrorMessage: true
  },
  getFreeze: {
    url: '/api/v1/user/profiles?userId=:userId&roleId=:roleId',
    method: 'POST',
    data: {
      userId: '',
      roleId: ''
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  deletePartImage: {
    url: '/api/v1/cloud/aws/delete?filePath=:filePath',
    method: 'DELETE',
    data: {},
    showResultMessage: false,
    showErrorMessage: false
  },
  getSuggessionFilterPartNumber: {
    url: '/api/v1/user/part/by/keyword?userId=:userId&roleId=:roleId&keyword=:keyword',
    method: 'GET',
    data: {},
    showResultMessage: false,
    showErrorMessage: true
  },
 
  getTeamMembers: {
    url: '/api/v1/user/approval/get/team/member?userId=:userId&roleId=:roleId',
    method: 'GET',
    data: {
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  getLineChartData: {
    url: '/api/v1/user/dashboard/lineChart',
    method: 'POST',
    data: {
      listOfIds: [],
      commodityIds: [],
      buyerIds: [],
      supplierIds: [],
      deliveryAddressIds: [],
      buildPhases: [],
      bomIds: [],
      userId: '',
      roleId: '',
      pageNumber: '',
      pageSize: '',
      timestamp: '',
      typeOfPart: '',
    },
    showResultMessage: false,
    showErrorMessage: true
  },

  getDashboardFilterData: {
    url: '/api/v1/user/dashboard/filters',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      listOfIds: [],
      buildPhases: []
    },
    showResultMessage: false,
    showErrorMessage: false
  },

  getBookmarks: {
    url: '/api/v1/user/navigation/get/bookmarks',
    method: 'POST',
    data: {
      userId: '',
      roleId: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },

  addBookmarks: {
    url: '/api/v1/user/navigation/add/bookmarks',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      itemId: '',
      navigationMenuItemsId: []
    },
    showResultMessage: false,
    showErrorMessage: true
  },

  deleteBookmarks: {
    url: '/api/v1/user/navigation/delete/bookmarks',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      itemId: '',
      navigationMenuItemsId: []
    },
    showResultMessage: false,
    showErrorMessage: true
  },

  changeBookmarks: {
    url: '/api/v1/user/navigation/change/bookmarks',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      itemId: '',
      navigationMenuItemsId: []
    },
    showResultMessage: false,
    showErrorMessage: false
  },

  getPrimeMenuItems: {
    url: '/api/v1/user/navigation/get/bookmark/filter',
    method: 'POST',
    data: {
      userId: '',
      roleId: ''
    },
    showResultMessage: false,
    showErrorMessage: false
  },

  filterBookmarks: {
    url: '/api/v1/user/navigation/filter/bookmarks',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      itemId: '',
      navigationMenuItemsId: []
    },
    showResultMessage: false,
    showErrorMessage: false
  },

  sendDeleteAndArchive: {
    url: '/api/v1/user/approval/documentType/action',
    method: 'POST',
    data: {
      approverIds: [],
      ids: [],
      assignedKey: '',
      requestName: '',
      userId: '',
      roleId: '',
      pageNumber: 0,
      pageSize: 0,
      deleted: false,
      archive: false,
    },
    showResultMessage: false,
    showErrorMessage: false
  },
  getNavigationItem: {
    url: '/api/v1/user/navigation/get/items',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
    },
    showResultMessage: false,
    showErrorMessage: true
  },
  addNavigationBookmark: {
    url: '/api/v1/user/navigation/add/bookmarks',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
      itemId: '',
      routeItemId: '',
      navigationMenuItemsId: []
    },
    showResultMessage: false,
    showErrorMessage: true
  },  
  getAllUserProfile: {
    url: '/api/v1/user/assign/userList',
    method: 'POST',
    data: {
      userId: '',
      roleId: '',
    },
    showResultMessage: false,
    showErrorMessage: true
  }
}
