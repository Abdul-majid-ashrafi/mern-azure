import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomerComponent from './customer';
import SupplierComponent from './supplier';
import { Redirect } from 'react-router-dom';
import { sweetalert, getStorage } from '../../shared';
import { updateUser, setImageInDrive, updateImageForItems } from '../../store/actions';


class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: '',
            change_image: '',
            mood: []
        };
    }

    static getDerivedStateFromProps(props, state) {
        let change_image = "";
        let mood = [];
        mood = state.mood;
        change_image = state.change_image;
        return { change_image, mood };
    }

    chooseFile = () => {
        const image = document.getElementById("fileInput");
        image.click();
    };


    imageHandler = (env) => {
        this.setState({ image: env.target.files[0] });
        if (env.target.files[0]) {
            let files = env.target.files;
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
                this.setState({
                    change_image: e.target.result
                });
            };
        } else {
            sweetalert('error', 'Image is to large');
            this.setState({ image: '' });
        }
    };

    updateUser = (type, fileid) => {
        if (this.state.image || this.state.mood) {
            const token = getStorage('token');
            const headers = {
                Authorization: `Bearer ${token}`,
                userid: this.props.auth.user._id,
            };
            if (this.state.image && type === "customer") {
                let obj = { image: this.state.image };
                const FormData = require("form-data");
                let imageObj = new FormData();
                imageObj.append("file", obj.image);
                imageObj.append("category", "customer Profile");
                if (fileid) {
                    imageObj.append("fileid", fileid);
                    this.props.updateImageForItems(imageObj, headers, obj, "Customer update");
                } else {
                    this.props.setImageInDrive(imageObj, headers, obj, "Customer update");
                }
            }

            let obj = {};
            if (this.state.image && type === "supplier" && !this.state.mood.length) {
                obj.image = this.state.image;
                const FormData = require("form-data");
                let imageObj = new FormData();
                imageObj.append("file", obj.image);
                imageObj.append("category", "Supplier Profile");
                if (fileid) {
                    imageObj.append("fileid", fileid);
                    this.props.updateImageForItems(imageObj, headers, obj, "supplier update");
                } else {
                    this.props.setImageInDrive(imageObj, headers, obj, "supplier update");
                }
            }
            else if (this.state.mood.length && type === "supplier" && !this.state.image) {
                obj = { mode: this.state.mood };
                this.props.updateUser(obj, headers);
            } else if (this.state.mood.length && this.state.image && type === "supplier") {
                obj.image = this.state.image;
                obj.mode = this.state.mood;
                const FormData = require("form-data");
                let imageObj = new FormData();
                imageObj.append("file", obj.image);
                imageObj.append("category", "Supplier Profile");
                if (fileid) {
                    imageObj.append("fileid", fileid);
                    this.props.updateImageForItems(imageObj, headers, obj, "supplier update");
                } else {
                    this.props.setImageInDrive(imageObj, headers, obj, "supplier update");
                }
            }
        } else {
            sweetalert('info', 'not any changes');
        }
    };

    checkBoxHandler = (values) => { // for day selection in create deal
        const newMood = values.target.value.toLowerCase();
        let mood = this.state.mood;
        const existingMood = mood.indexOf(newMood);
        if (existingMood !== -1) {
            mood.splice(existingMood, 1);
            // mood = mood;
        } else {
            mood.push(newMood);
        }
        this.setState({ mood: mood });
    };

    render() {
        let profile = "";
        if (this.props.auth.user.type === "customer") {
            profile = <CustomerComponent
                change_image={this.state.change_image}
                updateUser={this.updateUser.bind(this)}
                imageHandler={this.imageHandler.bind(this)}
                chooseFile={this.chooseFile.bind(this)}
                user={this.props.auth.user}
            />;
        } else if (this.props.auth.user.type === "supplier") {
            profile =
                <SupplierComponent
                    auth={this.props.auth}
                    imageHandler={this.imageHandler.bind(this)}
                    updateUser={this.updateUser.bind(this)}
                    checkBoxHandler={this.checkBoxHandler.bind(this)}
                    chooseFile={this.chooseFile.bind(this)}
                    change_image={this.state.change_image}
                    mood={this.state.mood}
                />;
        } else if (this.props.auth.user.type === "admin") {
            profile = <Redirect to='/list' />;
        }
        return (
            <div>
                {profile}
            </div>

        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(mapStateToProps, { updateUser, setImageInDrive, updateImageForItems })(Profile);
