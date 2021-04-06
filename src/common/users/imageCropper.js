import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Button, Modal } from 'react-bootstrap';
import {
  actionLoaderHide,
  actionLoaderShow,
  actionUploadImage,
  actionUpdateUserProfile,
  actionChangeUserProfileLogo,
  actionChangeUserCompanyLogo
} from '../../common/core/redux/actions';
import CONSTANTS from '../../common/core/config/appConfig';
import { showErrorToast, profileExtension, imageSize, checkForSpecialChar } from '../../common/commonFunctions';
let { validationMessages, permissionConstant } = CONSTANTS;
class ImageCropper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cropModal: true,
      cropBoxWidth: '',
      cropBoxHeight: '',
      imageSource: '',
      imageName: '',
      imageType: '',
      modalSize: 'medium',
      aspectRatio: '', signature: {},
      uploaded: 0
    };
  }

  closeCropModal = () => {
    this.setState({ cropModal: false, imageSource: '' });
    this.props.handleCheckData(this.props.imageSource);
  };

  componentDidMount() {
    let imageSource = this.props.imageSource;
    let cropBoxWidth = this.props.cropBoxWidth;
    let cropBoxHeight = this.props.cropBoxHeight;
    let imageType = this.props.imageType;
    let imageName = this.props.imageName;
    let modalSize = this.props.modalSize;
    let aspectRatio = this.props.aspectRatio;
    let fieldType = this.props.action;
    let isSubmitOnDB = this.props.isSubmitOnDB;

    if (imageSource !== '') {
      this.setState({
        imageSource,
        imageName,
        imageType,
        cropBoxWidth,
        cropBoxHeight,
        modalSize,
        aspectRatio,
        fieldType,
        profileImageURL: '',
        companyLogoURL: ''
      });
    }
  }

  handleImageChange = event => {
    const file = event.target.files[0];
    const fileName = file.name;
    const fileType = file.type;
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = event => {
        this.setState({
          imageSource: event.target.result,
          imageName: fileName,
          imageType: fileType
        });
      };
    }
  };

  cropImage(action) {
    if (
      this.state.imageType === 'image/jpeg' ||
      'image/jpg' ||
      'image/png' ||
      'image/gif' ||
      'video/mp4' ||
      'video/webm'
    ) {
    } else {
      showErrorToast('Please enter correct image format.');
      return false;
    }

    let cropImageResult = this.refs.cropper
      .getCroppedCanvas({
        fillColor: '#fff',
        imageSmoothingEnabled: false,
        imageSmoothingQuality: 'high'
      })
      .toDataURL(this.state.imageType);

    if (cropImageResult !== '') {
      let croppedImage = this.dataURLtoFile(
        cropImageResult,
        this.state.imageName
      );

      this.handleUploadDesign(croppedImage);
      //this.props.uploadImageToAzure(croppedImage);
      this.setState({
        cropModal: false
      });
    } else {
      this.props.uploadImageToAzure('');
    }
  }

  handleUploadDesign(event) {
    let _this = this;
    let errorMsg = [];
    let showError = '';
    let fileObject = event;
    let nameString = '';
    let mediaExtension = '';
    if (fileObject.name) {
      nameString = fileObject.name.split('.')[0];
      mediaExtension = fileObject.name.split(".").pop(-1);
      if (fileObject && profileExtension(mediaExtension)
        && imageSize(fileObject.size)) {
        const formData = new FormData();
        formData.set('mFile', fileObject);
        formData.append('thumbnailHeight', 100);
        formData.append('thumbnailWidth', 100);
        formData.append('isCreateThumbnail', true);
        formData.append('fileKey', fileObject.name);
        formData.append('filePath', fileObject.name);
        this.props.actionLoaderShow();
        this.props
          .actionUploadImage(formData)
          .then((result, error) => {
            if (result.payload.data.status == 400) {
              showErrorToast(result.payload.data.responseMessage);
            }
            let reportArray = result.payload.data.resourceData;
            var reqObject = {};
            let mediaExtension = reportArray.fileName.split('.').pop(-1);
            reqObject['mediaName'] = reportArray.fileName;
            reqObject['mediaURL'] = reportArray.fileByteArray;
            reqObject['mediaSize'] = reportArray.fileSize;
            reqObject['mediaExtension'] = mediaExtension;
            reqObject['mediaType'] = reportArray.contentType;
            reqObject['isDeleted'] = false;
            reqObject['id'] = reportArray.id;
            this.props.handleCheckData(reqObject, this.state.fieldType);
            _this.props.actionLoaderHide();
          })
          .catch(e => {
            _this.props.actionLoaderHide();
          });
      } else {
        errorMsg.push(validationMessages.part.formatWrong);
      }
    }
    if (errorMsg && errorMsg.length > 0) {
      let unique = [...new Set(errorMsg)];
      showError = unique.join(',\r\n');
      showErrorToast(showError);
    }
  }

  handleSubmit(data, action) {
    let _this = this;
    this.props
      .actionUpdateUserProfile(data)
      .then((result, error) => {
        _this.props.actionLoaderHide();

        if (action === 1) {
          this.setState({
            profileImageURL:
              result.payload.data.resourceData.profileImageURL
          });
          this.props.handleCheckData(this.state.profileImageURL, 1);
          let dataProfile = {
            profilePhotoURL:
              result.payload.data.resourceData.profileImageURL
          };

          // this.props.actionChangeUserProfileLogo(dataProfile);
          if (data && data.profileImageURL)
            this.props
              .actionChangeUserProfileLogo(data && data.profileImageURL)
              .then((result, error) => { })
              .catch(e => _this.props.actionLoaderHide());

          //this.history.push.
        } else if (action === 2) {
          this.setState({
            companyLogoURL:
              result.payload.data.resourceData.companyLogoURL
          });
          this.props.handleCheckData(this.state.companyLogoURL, 2);
          let dataCompany = {
            companyProfileURL:
              result.payload.data.resourceData.profileImageURL
          };
          this.props
            .actionChangeUserCompanyLogo(dataCompany)
            .then((result, error) => { })
            .catch(e => _this.props.actionLoaderHide());
        }
      })
      .catch(e => _this.props.actionLoaderHide());
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = arr && atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  render() {
    return (
      <Modal
        bsSize={this.state.modalSize}
        show={this.state.cropModal}
        onHide={this.closeCropModal}
      >
        <Modal.Header closeButton>
          <Modal.Title className="subtitle text-center">Crop Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Cropper
            ref="cropper"
            src={this.state.imageSource}
            style={{ height: 400, width: '100%' }}
            // Cropper.js options
            aspectRatio={16 / 9}
            // guides={false}
            // Cropper.js options
            // aspectRatio={16 / 9}
            // guides={false}
            // background={false}
            // zoomable={true}
            // cropBoxMovable={false}
            // cropBoxResizable={false}
            // highlight={false}
            // strict={false}

            guides={true}
            // viewMode={1}
            // background={false}
            zoomable={true}
            cropBoxMovable={false}
            cropBoxResizable={false}
            highlight={false}
            dragMode="move"
            movable={true}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-content-between align-center">
            <div className="left">
              {/* <Button bsStyle="danger" className="no-bold no-round">
                Remove Photo
              </Button> */}
            </div>
            <div className="right flex align-center">
              <div className="custom-upload mr-1">
                <input
                  type="file"
                  accept="image/*"
                  value=""
                  onChange={this.handleImageChange.bind(this)}
                />
                {/* <Button bstyle="default" className="no-round">
                  Change Photo
                </Button> */}
              </div>
              <Button
                bsStyle="primary"
                className="no-bold no-round"
                onClick={this.cropImage.bind(this)}
              >
                Apply
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionLoaderHide,
      actionLoaderShow,
      actionUploadImage,
      actionUpdateUserProfile,
      actionChangeUserProfileLogo,
      actionChangeUserCompanyLogo
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
)(ImageCropper);
