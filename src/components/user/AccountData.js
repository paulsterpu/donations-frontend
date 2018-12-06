import React, {Component} from 'react';

import axios from "axios";

import "../../style/css/accountData.css";
import config from "../../config/dev";

export default class AccountData extends Component {

    constructor() {
        super();

        this.state = {
            profilePictureFile: null,
            currentProfilePicture: null,
            imagePreview: null,
            editData: false
        }
    }

    componentWillMount() {
        this.getCurrentProfilePictureUrl();
    }

    getCurrentProfilePictureUrl = () => {

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

        axios.get(config.api + "/profile_picture")
            .then((response) => {

                console.log("response.data");
                console.log(response.data);

                this.setState({
                    profilePictureFile: response.data,
                    currentProfilePicture: response.data
                })
            })
            .catch((error) => {
                console.log("error retrieving image");
            });

    };

    changePicture = () => {
        this.fileInput.click();
    };

    handleFile = (e) => {
        let file = e.target.files[0];

        console.log("File name:", file.name);

        this.setState({
            profilePictureFile: file
        });

        let reader  = new FileReader();

        reader.addEventListener("load", function () {
            this.setState({imagePreview: reader.result });
        }.bind(this), false);

        reader.readAsDataURL(file);

    };

    resetPicture = () => {
        this.setState({
            profilePictureFile: this.state.currentProfilePicture,
            imagePreview: null
        })
    };

    savePicture = () => {

        if (!this.state.imagePreview)
            return;

        let formData = new FormData();
        formData.append("profile_picture", this.state.profilePictureFile);

        let url = config.api + "/profile_picture";

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

        axios.post(url, formData)
            .then((response) => {
                console.log("response picture upload: ");
                console.log(response)
            })
            .catch((error) => {
                console.log("error picture upload: ");
                if (error.response)
                    console.log(error.response);
            });
    };

    render() {

        /*console.log("picture: ", this.state.profilePictureFile);*/
        console.log("my account details: ");
        console.log(this.props.user);

        return (
            <div className="accountDataContainer">

                <div className="myAccountImageContainer">

                    {
                        this.state.profilePictureFile &&

                        <img
                            src={this.state.imagePreview ? this.state.imagePreview : "data:image/png;base64," + this.state.profilePictureFile}
                            className="myAccountImage"
                        />
                    }

                    <input type="file" ref={fileInput => this.fileInput = fileInput} style={{display: "none"}} onChange={this.handleFile}/>
                    <button onClick={this.changePicture} className="changePictureButton">Schimba poza</button>
                    <button onClick={this.resetPicture} className="changePictureButton">Revino la poza initiala</button>
                    <button onClick={this.savePicture} className="changePictureButton">Salveaza poza</button>

                </div>

                {
                    this.state.editData ? this.showForm() : this.showData()
                }

            </div>
        )
    }

    showForm = () => {

        return (
            <div className="showPersonalDataFormContainer" onSubmit={(e) => this.props.submitData(e)}>

                <form className="accountDataForm">

                    <div className="accountDataInputContainer">
                        <label>Nume si prenume</label>
                        <input type="text" onChange={(e) => this.props.updateData("nume", e.event.value)} value={this.props.user.nume}/>
                    </div>

                    <div className="accountDataInputContainer">
                        <label>Telefon</label>
                        <input type="text" onChange={(e) => this.props.updateData("telefon", e.event.value)} value={this.props.user.telefon}/>
                    </div>

                    <input type="submit" value="Salveaza"/>

                </form>

            </div>
        )

    };

    showData = () => {
        return (
            <div className="showPersonalDataContainer">

                <div className="personalDataListContainer">
                    <ul className="personalDataList">
                        {
                            this.getUserDetails()
                        }
                    </ul>

                </div>

                <div className="editPersonalDataButtonContainer">
                    <button className="changePictureButton" onClick={() => this.setState({editData: true})}>
                        Editeaza datele
                    </button>
                </div>

            </div>
        )

    };

    getUserDetails = () => {
        let list = [];

        if (this.props.user["nume"]) {
            list.push(
                <li>
                    Nume: {this.props.user["nume"]}
                </li>
            )
        }

        if (this.props.user["email"]) {
            list.push(
                <li>
                    Email: {this.props.user["email"]}
                </li>
            )
        }

        if (this.props.user["telefon"]) {
            list.push(
                <li>
                    Telefon: {this.props.user["telefon"]}
                </li>
            )
        }

        return list;
    }

}