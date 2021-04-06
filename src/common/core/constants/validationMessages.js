export default {
  email: {
    required: 'Please enter your email address.',
    invalid: 'Please enter a valid email address.'
  },
  parentEmail: {
    required: "Please enter student's email address."
  },
  password: {
    required: 'Please enter your password.',
    newPassword: 'Please enter new password.',
    oldPassword: 'Please enter current password.',
    confirmNewPassword: 'Please enter confirm new password.',
    passwordPattern:
      'Password should be min 8 characters long with one special character, number, lower and upper case letter.',
    same: 'Mismatch new password and confirm new password.',
    confirmed: 'Password and Confirm password do not match.',
    foo_confirmation: 'Password and Confirm password do not match.'
  },
  firstName: {
    required: 'Please enter first name.',
    alphaOnly: 'Please enter a valid first name.'
  },
  lastName: {
    required: 'Please enter last name.',
    alphaOnly: 'Please enter a valid last name.'
  },
  employeeId: {
    required: 'Please enter Employee Id.',
  },
  companyName: {
    //required: 'Please enter company name.',
    required: 'Please enter name of legal entity.',
    alphaOnly: 'Please enter a valid company name.'
  },
  address: {
    required: 'Please enter both address and location Id.',
    alphaOnly: 'Please enter a valid address.'
  },
  fullName: {
    required: 'Please enter full name.',
    alphaOnly: 'Please enter a valid full name.'
  },
  mobile: {
    required: 'Please enter mobile number.',
    min: 'Mobile number should be minimum 6 number.',
    max: 'Mobile number should be maximum 15 number.'
  },
  designation: {
    required: 'Please enter designation.',
    alphaOnly: 'Please enter a valid designation.'
  },
  salariedAccount: {
    required: 'Please enter functional classification in salaried account .',
  },
  budgetCostCenter: {
    required: 'Please enter functional classification in budget cost center.',
  },
  OTP: {
    required: 'Please enter OTP value.',
    number: 'OTP should be number.',
  },
  acceptTermsCondition: {
    required: 'Please accept terms and conditions.'
  },
  projectTitle: {
    required: 'Please enter Program title.',
    alphaOnly: 'Please enter a valid Program title.'
  },
  projectCode: {
    required: 'Please enter Program code.',
    alphaOnly: 'Please enter a valid Program code.'
  },
  day: { required: 'Please select day.' },
  month: { required: 'Please select month.' },
  year: { required: 'Please select year.' },
  city: { required: 'Please enter city.' },
  state: { required: 'Please enter state.' },
  country: { required: 'Please enter country.' },
  summary: { required: 'Please enter summary.' },
  instituteName: { required: 'Please enter institute.' },
  startDate: { required: 'Please select date.' },
  endDate: { required: 'Please select date.' },
  addApproval: { required: 'Please enter add approval.' },
  departmentId: { required: 'Please enter department.' },
  userProfile: { required: 'Please enter user profile.' },
  userType: { required: 'Please enter user type.' },
  totalPartsPlanned: {
    required: 'Please enter quantity of parts.',
    numberOnly: 'Please enter a valid quantity of parts.'
  },
  vendor: {
    buyerName: {
      required: 'Buyer is required.'
    },
    nda: {
      required: 'Please upload NDA document.'
    },
    document_mes: 'Please upload all documents before submit.',
    duplicateFileItem: 'File can not be duplicate.'
  },
  part: {
    itemCode: 'Please enter ERP Item Code',
    projectId: 'Please select a Program',
    PartNumber: 'Please enter Part Number',
    shipmentError:
      'Shipment target date should be greater than previous shipment target date',
    checkForward: 'Please select list of Team first.',
    specalCharacter: 'Special characters are not allowed.',
    numericOnly: 'Field should be numeric.',
    formatWrong: 'Please select valid file format.',
    fileNameContainsSpace: 'File name contains space',
    fileNameContainsInvalidChars: 'File name contains invalid characters',
    fileSizeExceeded: 'File size has exceeded the max limit of 25MB',
    commentError: 'Cannot submit blank comment.',
    commodity: 'Please enter Commodity',
    shipmentDate: 'Please enter Shipment Date',
    shipmentQuantity: 'Please enter Shipment Quantity',
    atListOneChk: "Please Select At Least One Checkbox",
    quotationInfo: "Please send back if you want to select the different quotation.",
    quotationSendBack: "Send back approval request can only be approved by creator.",
    partRevisionNumber: 'Please enter Revision Number',
    mergeWith: 'No RFQ available for merging.',
    production: 'Please enter Proto/Production',
    userProfileReq: "Select at least one user profile.",
    shipmentTotal: "Please enter Shipment Total.",
    spendingCategory: "Please select Spending Category.",
    newBuyerNotAdded: "Please select buyer.",
    primaryUser: 'Please select primary user.'
  },
  Indirect: {
    milestoneError: 'Please select an item.',
    deleteError: 'Please select an item.',
    deleteProject: 'Please select an item.',
    projectError: 'Please enter all details first.',
    approveQuotation: 'Please select an item.',
    material: 'Please enter material total.',
    services: 'Please enter professional/process total.',
    tooling: ' Please enter equipment/tooling total.',
    total: "Please fill all the mandatory fields.",
    purchaseRequestNumber: 'Please enter purchase Request Number.',
    budgetItemId: 'Please select budget item.',
    itemDescription: 'Please enter item description.',
    extendedRate: 'Please enter extended rate.',
    deliveryLeadTime: "Please enter delivery lead time.",
    deliveryLeadTime: "Please enter delivery lead time.",
    quotationForQuantity: 'Please enter quotation for quantity.',
    uom: 'Please enter uom.',
    mandatoryFields: 'Please fill all the mandatory fields.',
    departmentId: 'Please select Functional Area classification.',
    totalCost: 'Please enter total cost.',
    quantity: 'Please enter quantity.',
    unitCost: 'Please enter unit cost.',
    itemDescription: 'Please enter item description.',
    programFilter: 'Please select program.',
    referencePartId: 'Please select reference part.',
    majorCategoryId: 'Please select spend category.',
    geographyId: 'Please select geography.',
    sectorId: 'Please select product line.',
    brandId: 'Please select brand.',
    itemCode: 'Please enter ERP item code.'
  },
  geographical: {
    deleteItem: 'Please select an item.',
    addItem: 'All region is selected. Please delete a region then add new.',
    commonErrorMsg: 'Please enter all details.',
    commonSuccessMsg: 'Geographical classification deleted successfully.',
  },
  buildPlanECO: {
    variantError: 'Please enter all variant detail first.',
    moreVariantError: 'Please add more variant detail first.',
    locationError: 'Please enter location detail first.',
    moreLocationError: 'Please add more location detail first.',
    projctError: 'Please select Program name.',
    revisionError: 'Please submit Revision First.',
    approverError: 'Please Add Approver First.',
    commentError: 'Comment is required field.',
    revisionAddSuccess: 'Revision has been added.',
    projectAddSuccess: 'Program has been added.',
    bom: 'Variant/BOM already exist.',
  },
  brand: {
    commonErrorMsg: 'Please enter all details.',
    commonDeleteSuccessMsg: 'Brand classification deleted successfully.'
  },
  functionalArea: {
    commonErrorMsg: 'Please enter all details.',
    commonDeleteSuccessMsg: 'Functional Area classification deleted successfully.'
  },
  spendingCategory: {
    commonErrorMsg: 'Please enter all correct details.',
    commonSuccessMsg: 'Spending Category classification deleted successfully.'
  },
  costCenterClassification: {
    commonErrorMsg: 'Please enter all details.',
  },
  financialYear: {
    commonErrorMsg: 'Please enter all details.',
    yearError: 'Please select month and year.'
  },
  createECO: {
    ecoDescription: 'Description is required.',
    priorityLevel: 'Priority level is required.',
    ecoCategory: 'Category is required.',
    projectDescription: 'Program description is required.',
    ecoChangeDescription: 'Change description is required.',
    designerId: 'Designer is required.',
    receivingPlantAddress: 'Receiving address is required.',
    shippingPlantAddress: 'Shipping address is required.',
    designLocation: 'Design location is required.',
    receivingPlant: 'Receiving Plant Address is Required field.',
  },
  createBillMaterial: {
    createBOMError: 'Please enter BOM detail first.',
    moreBOMError: 'Please add more BOM first.',
    productLine: ' Product Line is Required field.',
    modelFamily: ' Model Family is Required field.',
    Model: ' Model is Required field.',
    technicalType: 'Technical Type is Required field.',
    technicalTypeCode: 'Technical Type Code is Required field.',
    technicalTypeDescription: 'Technical Type Description is Required field.',
    variantName: 'Variant Name is Required field.',
    variantCode: ' Variant Code is Required field.',
    variantDescription: 'Variant Description is Required field.',
    partNumber: 'Part Number is Required field.',
    partDescription: 'Part Description is Required field.',
    quantity: 'Quantity is Required field.',
    uom: 'UOM is Required field.',
    level: 'Level is Required field.',
    levelType: 'Level Type is Required field.',
    phantom: 'Phantom is Required field.',
    qualitySignificanceLevel: 'Quality Significance Level is Required field.',
    partWeight: 'Part Weight is Required field.',
    levelShouldGrater: 'Level should not be Less then one.',
    levalNearest: 'Please enter nearest level.',
    partNumberFirst: 'Please enter part number first.',
    noDataFound: 'No data found to show.'
  },
  budget: {
    commentError: 'Comment is required field.',
    required: 'FinancialYear, forecastNo and revisionNo are required feild.',
    requiredComman: 'Please enter all detail first.',
    deleteError: 'Please select an item.',
    selectRequired: 'Please select an item.',
    copySuccess: 'Element coped successfully.',
    deleteSuccess: 'Budget request deleted successfully.',
    sequenceError: 'Please enter correct year pay and commit value. And data enter in sequence.',
    payAmount: 'Please enter pay amount.',
    commitAmount: 'Please enter commit amount.',
    accountNumber: 'Please select account number.',
    forecast: 'Please select forecast year.',
    budgetItem: "Please enter budget item.",
    totalAmount: "Please enter correct total amount.",
    sameComparision: 'Please select different comparison.',
    statusChange: 'You are not eligible for change.',
    currency: 'Please enter currency.',
    comparision: 'Please create a budget to compare.',
    clone: 'Please initiate budget revision.'
  },
  setApprover: {
    currentGroup: 'Please select group item.',
    limit: 'Please enter limit.',
    required: 'Please enter all detail first.',
    currency: 'Please select currency.',
    purchaseManagerApprover: 'Please enter purchase manager approver.',
    requiredLimt: 'Please enter Limit.',
    currentGroupCopy: 'Copied successfully.',
    NoRecords: 'No group available on this selection.',
    accountNumber: 'No account found for the selected cost center.',
    duplicateAccountNumber: "account no already exist in group.",
    copyResourceMsg: 'Are you sure you want to replace this ?.',
    limitMsg: 'Are you sure you want to delete this limit ?',
    deleteAccount: 'Are you sure you want to delete this account ?',
    skipMsg: 'Are you sure you want skip this approval process ?',
    skipStayMsg: 'Are you you want to stay on approval process ?',
    groupMsg: 'Are you sure you want to delete this group ?  Kindly ensure that there are no pending parts in approval',
    approval: 'Please enter one approver.',
    approverExists: 'Approver already exists.',
    NoApproval: 'No approval available on this selection.',
  },
  productLine: {
    required: 'This field is required.',
    commonDeleteSuccessMsg: 'ProductLine classification deleted successfully.'
  },
  contract: {
    addContractError: 'Please enter all contract detail first.',
    addClauseError: 'Please enter all Clause detail first.',
    adminAuthorised: 'Only admin can do action.',
    noContractTemplate: "No contract template found, Please ask admin to create one.",
    removeClauseError: "Please enter all Clause detail first."
  },
  purchase: {
    commonDeleteSuccessMsg: 'Purchase deleted successfully.',
    approver: 'Please enter at least one approver.',
    cfo: 'Please enter CFO.',
    costCenter: 'Please select cost center manager.',
    accountDetails: 'Please fill account number first.',
    records: 'Please add records.',
    deleteItem: 'Please select an item.',
  },
  standar: {
    hsnCode: 'Please enter hsnCode.',
    currency: 'Please enter currency.',
    leadTimeOnDeliveryAfterRelease: 'Please enter lead time on delivery .',
    billingLocation: 'Please add billing address.',
    deliveryLocation: 'Please add delivery address.',
    quantity: 'Please enter quantity.',
    purchasingProject: 'Please enter Purchasing Program.',
    targetDeliveryDate: 'Please enter correct target date.',
  },
  blanketPO: {
    minTotalQuantity: 'Please enter minimum total quantity.',
    orderPeriodValidThrough: 'Please enter order period valid through.',
  },
  spotBuy: {
    supplierContactPerson: 'Please enter supplier Contact person.',
    supplierName: 'Please enter supplier Name.',
    contactPersonDeatils: 'Please enter supplier Contact person Deatils.',
    unitPrice: 'Please enter Unit Price.',
    quantity: 'Please enter Quantity.',
    textCost: "Please enter Tax Cost first.",
    deleteError: 'Please select an item.',
    deleteProject: 'Please enter all details first.',
    account: 'Please enter account details.',
    taxId: 'Please enter tax id and description.',
    resetTaxIdDescription: 'Please clear tax id and description first.',
    packagingEnabled: 'Please select correct record.',
    tax: 'Please enter tax.',
  },
  userRole: {
    roleReq: 'Role can not be null or blank.',
    roleExists: 'Role already exists.',
    addRole: 'Role added successfully .',
    deleteMessage: 'Role deleted successfully.'
  },
  location: {
    address: 'Please enter correct google Address first.',
    locationId: 'Please enter location Id.',
    required: "Address cannot be blank",
    commonErrorMsg: 'Please enter all  correct details.',
    nameOfLegalEntity: 'Please enter legal entity.',
    region: 'Please add region.',
    locationDuplicate: 'Please enter unique location Id.',
  },
  createQuotation: {
    productionTool: 'Please fill all the mandatory fields.',
    productionPart: 'Please fill all the mandatory fields.',
    processOperation: 'Please complete Process/Operation.',
    quotation: 'Please select an item.',
    showPendingStatus: 'Registration approval pending from buyer.',
    scrapRecovery: "Scrap recovery rate should not higher than raw material rate.",
    alreadyApproved: 'This part has been already approved.',
    volume: "Volume should not lower and equal than previous record.",
    priceBreak: "Price Break should not higher previous record.",
    unitPrice: "Price Break should not higher than unit price.",

  },
  indirectCreateQuotation: {
    requiredComman: '"Please enter all contract detail first".',
    quotationForQuantity: "Please enter quotation for quantity."
  },
  partUpdate: {
    partDescription: 'Please enter part description.',
    partHSN: 'Please enter part HSN Code.',
    partRevisionNumber: 'Please enter part revision number.',
    partQuantity: 'Please enter part quantity.',
    partSupplier: 'Please select supplier.',
    partUnits: 'Please enter part units.',
    partUsage: 'Please enter usage.',
    partCommodity: 'Please enter commodity.',
    partAddress: 'Please enter address.',
    partCountry: 'Please enter country.',
    partState: 'Please enter state.',
    partDeliveryConditions: 'Please enter packaging delivery conditions.',
    partTargetDate: 'Please enter target date.',
    partProduction: 'Please enter production.',
    partPartialShipment: 'Please enter at least first partial shipment details.',
    approval: 'Please select approval.',
    shipmentTotal: 'Please enter shipment total.',
    shipmentTotalSameAsShipment: "Shipment total should be equal to shipment quantity.",
  },
  nonDisclosure: {
    noSupplier: 'Supplier address not available.',
    maxMinSuppCodeValidate: 'Supplier code should be minimum 6 character.'
  },
  support: {
    module: 'Admin module is mandatory.',
    atListOneChk: "Please Select At Least One Checkbox",
  },
  commodity: {
    emptyCommodity: 'Please add commodity.',
    selectCommodity: 'Please select an item.'
  },
  addUser: {
    addUserMsg: 'User added successfully.',
    requiredField: 'Please fill all the mandatory fields.',
    mobRequiredField: 'Mobile already exists.',
    emailRequiredField: 'Email already exists.',
    empRequiredField: 'Employee id already exists.',
    duplicateField: 'Please fill all the mandatory fields and mobile, email and employee id can not be duplicate.'
  },
  direct: {
    project: 'Please select program.',
    product: 'Please select product Line.',
    approvers: 'Please select approvers.',
    commodity: 'Please select commodity.',
    geography: 'Please select geography.',
    brand: 'Please select brand.',
    majorCategory: 'Please select spending category.',
    department: 'Please select functional area.',
    // project: 'Please select program.',
    legalEntity: 'Please select legal entity.',
    typeOfPart: 'Please select Proto/Production.',
    accountNo: 'Please enter Account No(WBS).',
    NoRecords: 'No records found.',
    required: "Please enter all user detail first."
  },
  notification: {
    permission: "You don't have permission to access this page.",
  },
  rawMaterial: {
    commercialName: 'Please enter commercial Name.',
    commodity: 'Please select commodity.',
    currency: 'Please select currency.',
    delta: 'Please enter Unit Rate Delta.',
    scrapDelta: 'Please enter Scrap Rate Delta.',
    effectiveDate: 'Please select effective Date.',
    lastContractRenewalDate: 'Please select lastContract Renewal Date.',
    lastRateChangeEffectiveDate: 'Please select last Rate Change Effective Date.',
    materialDescription: 'Please enter Material Description.',
    uom: 'Please enter Unit of Measurement.',
    materialName: 'Please enter Material Name.',
    specification: 'Please enter Specification.',
    masterRawMaterialRecordPreferredSource: 'Please enter Preferred Source.',
    materialPropertyTechnicalDocuments: 'Please enter Documents.',
    buyer: 'Please enter buyer.',
    country: 'Please enter country.',
    name: 'Please enter Preferred Source name.',
    supplier: 'Please enter correct supplier details.',
    unitRate: 'Please enter Unit Rate.',
    unitRateZero: 'Unit Rate cannot be zero.',
    scrapRate: 'Please enter Scrap Rate.',
    contactPerson: "Please enter contact person.",
    mediaName: 'Please enter document.',
    documentDescription: "Please enter document description.",
    required: "Raw material is required field.",
    requiredAll: "please enter all fields.",
    draft: 'Please save as a draft first.',
    itemSelect: "Please select item.",
    identical: 'Identical raw material cannot be selected.',
    productLine: 'Please select product line.',
    geography: 'Please select region.'
  },
  programSourcing: {
    requireField: "Please enter all required field.",
    selectOneCheckBox: "Please select at least one checkbox.",
    allMandatory: "Please enter all details.",
    sourcingExists: "Program Sourcing already exists.",
    noDocumentFound: "No document found."
  },
  blanketRenewal: {
    partDetails: "Please change Renew on current terms.",
    reevaluateRFQ: "Please change reevaluate/rfq.",
    volume: "Please enter volume.",
    date: "Please enter date.",
    orderPeriodValidThrough: "Please enter order period valid through.",
    deliveryLocation: "Please select delivery location.",
    frequency: "Please select frequency.",
    required: 'Please enter all required field.',
    requiredField: "Please fill at least one 'Renew on current terms' or 'reevaluate/rfq'.",
    greaterDate: 'Please fill correct date.'
  },
  checkBox: {
    required: 'Please Select At Least One Checkbox.',
  },
  adminTemplate: {
    confirmMessage: 'The cost center data in application will be replaced by the sheet data. Do you want to continue?',
  },
  ppap: {
    document: 'Please Enter Document Type and Document Upload.'
  },
  logoutMessage: {
    session: 'Your session has been timed out.',
    changePermisssion: 'Your permission has been changed. Please sign in again.'
  },
  createProgram: {
    program: 'Please enter program Code.',
    productLine: 'Please select product line.',
    projectManager: 'Please select project manager.',
    typeOfProject: 'Please select type of program.',
    programManager: 'Please select program manager.',
    projectCreated: 'Part already created.',
    MajorProject: 'Please add major project.',
    geography: 'Please select region.',
    totalPartsPlanned: 'Please enter No.of Parts Planned.',
    sameProgram: 'program already created.',
    productLineNotMatch: 'Please enter correct product line.',
    brand: 'Please select brand'
  },
  wareHousePage: {
    Region: 'Region is required field.',
    locationId: 'Location id is required field.',
    warehouseId: 'Warehouse id is required field.',
    required: 'Please enter all required field.',
    rackBinId: 'Please enter all required field.'
  },
  opOption: {
    conditionKey: 'Please select condition key.',
    deviationPercent: 'Please enter correct percent value.',
    region: 'Region is required field.',
    region: 'Region is required field.',
    currency: 'Please select currency.',
  },
  developmentPart: {
    required: 'Please select required field.',
    program: "Please select program."
  },
  inventory: {
    itemCode: 'Item code is required field.',
    itemCodeAssign: 'Item code are not assigned.',
    warehouseLocationAssign: 'Warehouse location are not assigned.',
    rackBinLocationAssign: 'Rack/Bin location are not assigned.',
    quantityAssign: 'Quantity are not assigned.',
    inventoryPublish: 'Inventory saved successfully.',
    noData: 'No data found.',
    uploadFileValidation: "Please select one warehouse to update the inventory"
  },

  billOfMaterail: {
    required: 'Please enter all required field.'
  },
  rfq: {
    assignedBuyer: 'User cannot be removed as part is assigned to raise cost estimate.',
    assignedValueAnalyst: 'User cannot be removed as part is assigned to create RFQ.',
    costEstimationApprover: 'User cannot be removed as part is assigned to approve cost estimate.',
    rfqApprover: 'User cannot be removed as part is assigned to approve RFQ.',
    released: 'Part already released.'
  },
  supplierRegistration: {
    saveInformation: 'Supplier Profile Information Added Sucessfully',
    formRetreivalSuccess: 'Form Page Data retrieved successfully',
    noData: 'No Data Found'
  },
  supplierEvaluation: {
    weightage: "Please enter weightage.",
    fieldName: "Please enter field name.",
    rating: "Please select rating.",
    evaluationItem: "Please enter evaluation item.",
    evaluationCriteria: "Please enter evaluation criteria.",
    evaluationInstruction: "Please enter evaluation instruction.",
    mandatoryFields: 'Please fill all the mandatory fields.',
  },
  incomingInspection: {
    forPercentage: "Parts Inspected should not be greater than parts received ",
    partsReceived: "Please enter parts received.",
    matchValue: "Inspected value, accept value and tolerance should not be match.",
    dupliactePartSerailNo: "Part serial numbers cannot be duplicate.",
  }
};

