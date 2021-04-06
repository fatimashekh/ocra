import { Button } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Header from "../common/header";
import SideBar from "../common/sideBar";
import CONSTANTS from "../../common/core/config/appConfig";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import validation from 'react-validation-mixin';
import strategy, { validator } from 'react-validatorjs-strategy';
import {
    actionLoaderHide,
    actionLoaderShow
} from "../../common/core/redux/actions";
import {
    FormGroup,
    FormControl
} from "react-bootstrap";
import ocraApiService from '../../common/core/api/apiService';
let { permissionConstant } = CONSTANTS;


class Glossary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            glossaryData: []
        }

        this.getGlossoryData();
    }

    getGlossoryData() {
        let roleId = this.props.userInfo.userData.userRole;
        let userId = this.props.userInfo.userData.id;
        let _this = this;
        ocraApiService('getGlossoryData', { userId: userId, roleId: roleId })
            .then(response => {
                if (response.data.status == 200) {
                    let glossaryData = response.data.resourceData;
                    _this.setState({ glossaryData: glossaryData });
                }
            })
            .catch(err => {

            });
    };

    handleChangeGlossary(index, e) {
        let glossaryData = this.state.glossaryData;
        glossaryData[index].localTerm = e.target.value
        this.setState({ glossaryData: glossaryData });
    }

    saveGlossary(e) {
        let roleId = this.props.userInfo.userData.userRole;
        let userId = this.props.userInfo.userData.id;
        let glossaryData = this.state.glossaryData;
        let listOfGlossory = [];
        glossaryData.forEach(function (data) {
            if (data.localTerm) {
                listOfGlossory.push(
                    {
                        globalGlossoryId: data.globalGlossoryId,
                        localTerm: data.localTerm,
                        localGlossoryId: data.localGlossoryId ? data.localGlossoryId : "",
                        localTermDescription: data.localTermDescription ? data.localTermDescription : ""
                    }
                )
            }
        })

        let glosData = {
            userId,
            roleId,
            listOfGlossory: listOfGlossory
        }


        ocraApiService('setLocalGlossoryData', glosData)
            .then(response => {
                if (response.data.status == 200) {
                    let glossaryData = response.data.resourceData;
                    this.setState({ glossaryData: glossaryData });
                }
            })
            .catch(err => {

            });
    }

    render() {
        let _this = this;
        return (
          <div className="page-container page-sidebar-fixed">
            <Header {...this.props} />
            <SideBar {...this.props} />
            <div className="content-section">
                <div className="m-t-20 flex justify-center align-center">
                    <h4 className="hero-title text-center">Glossary</h4>
                </div>
                <table className="custom-table borderbox table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th className="w-300"> Terminology</th>
                            <th> Definition</th>
                            <th className="w-300"> Local Terminology</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.glossaryData.map(function (data, index) {
                            return <tr>
                                <td>{data.globalTerm}</td>
                                <td>{data.globalTermDescription}</td>
                                <td>
                                    <FormGroup className="formtc">
                                        <FormControl
                                            autoComplete="off"
                                            type="text"
                                            className="br-0"
                                            name="localTerm"
                                            placeholder="localTerm"
                                            value={data.localTerm}
                                            onChange={_this.handleChangeGlossary.bind(_this, index)} /> </FormGroup>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <div className="text-center m-b-20 m-t-20">
                    <button className="btn yellow-bg-btn" onClick={this.saveGlossary.bind(this)}>Save</button>
                    <button className="btn blk-border-btn">Cancel</button>
                </div>
            </div>
          </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            actionLoaderHide,
            actionLoaderShow
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        userInfo: state.User
    };
};

Glossary = validation(strategy)(Glossary);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Glossary);