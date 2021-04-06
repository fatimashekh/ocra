
let NODE_SERVER_URL = () => {
  let node_server_URL = "";
  switch (window.location.hostname) {
    case "localhost":
      node_server_URL = "https://dev.zumen.in/"
      break;
    default:
      node_server_URL = window.location.protocol + '//' + window.location.hostname;
      break;
  }
  return node_server_URL;
};
export default {
  excelRecordsParPage: 800,
  excelColumnParPage: 14,
  paginationPerPageSize: 15,
  minutesUntilAutoLogout: 10, // 10 Minutes
  inputTextLength: 80,
  revisionTextLength: 2,
  inputMinLength: 1,
  quantityLength: 10,
  intQuantityLength: 9,
  progressBar: 100,
  inputDescriptionLength: 150,
  taxLength: 10,
  amazonURL: '',
  publicKeyRSA: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCb6UbdaP7pIGCjWDWFxyUk/MZp0LW1aheUQ2Ggbn7Kw4QYGFK3dH5yjcIm8whjnx2qim0wreTv0KqbmGHZSHjL/Gu9mnY9bZL1CPx4mEZ8Q5qCCiU0eK/5VkDA5bwPmX2JGt0TIv3uCy7Kb6ts6CNCKyYqQK8hh81aigy2k/rZdQIDAQAB',
  acceptedFormat: {
    imageAcceptFormat:
      "jpg, jpeg, tiff and png",
    imageAcceptFormatType:
      ".jpeg, .png, .jpg, .tiff, .tif",
    documentAcceptFormat: "pdf, doc, docx, xls, xlsx, ppt, pptx, txt, rtf and msg",
    documentAcceptFormatType: ".pdf, .doc, .docx, .xls, .ppt, .pptx, .txt, .rtf, .xlsx, .msg",
    excelFormat: "xls and xlsx",
    profileImageAcceptFormat:
      "jpg, jpeg and png",
    profileImageAcceptFormatType:
      ".jpeg, .png, .jpg",
    imageAcceptFormatWithPdf:
      "jpg, jpeg, tiff, tif, png and pdf",
    imageAcceptFormatTypeWithPdf:
      ".jpeg, .png, .jpg, .tiff, .tif, .pdf",
    acceptAllFormats: ".jpeg, .png, .jpg, .tiff, .tif, .pdf, .doc, .docx, .xls, .ppt, .pptx, .txt, .rtf, .xlsx, .msg",
    acceptAllFormatsDisplay: "jpeg, png, jpg, tiff, tif, pdf, doc, docx, xls, xlsx, ppt, pptx, txt, rtf and msg",
    dateFormatWithMonthName: "DD MMM YYYY",
    dateFormatWithMonthNameForm: "DD / MM / YYYY",
    dateFormatWithMonth: "d MMM yyyy",
    dateFormat: "DD-MM-YYYY",
    dateFormatWithHoursMin: "DD MMM YYYY, HH:mm"
  },
  webNotificationURL: {
    node_server_URL: NODE_SERVER_URL()
  }
};
