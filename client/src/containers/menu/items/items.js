import React, { Component } from 'react';
import { ItemsMenuComponent } from '../../../components';
import { connect } from 'react-redux';
import { menuItemActivation, updateMenuItem, removeMenuItem, setImageInDrive, createMenuItem, updateImageForItems } from '../../../store/actions';
import { getStorage, sweetalert } from '../../../shared';
// import frozen from '../frozen/frozen';

class ItemsMenuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageFile: '',
            active: '',
            selctionToggle: '',
            selectedItemId: '',
            selecteRemoveItems: '',
            image: '',
            onPickupTimeFromFinish: '',
            onPickupTimeToFinish: '',
            selectedCategory: '',
            selectedItems: {
                title: "",
                tags_keywords: "",
                serving: 0,
                price: 0,
                description: "",
                image: "",
                time: {},
                pickuptime_from: "",
                pickuptime_to: "",
            },
            fieldNamesOfUpdatedItem: [],
            pickuptime_to_day: '',
            pickuptime_from_day: '',
        };
    }

    imageHandler = (env) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        const index = this.state.fieldNamesOfUpdatedItem.indexOf(env.target.files[0]);
        if (env.target.files[0] && env.target.files[0].size <= 5000000) {
            this.setState({
                ...this.state,
                image: env.target.files[0],
                fieldNamesOfUpdatedItem: index === -1 ? [
                    ...this.state.fieldNamesOfUpdatedItem,
                    'image'
                ] : this.state.fieldNamesOfUpdatedItem
            });
        } else {
            sweetalert('error', 'Image not Selected');
            this.setState({ image: '' });
        }
    };

    onchangeSelctionToggle = (itemId, status) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        if (this.props.isMenuItemActivation) {
            return;
        }
        let checkbox = document.getElementById(itemId);
        if (checkbox.checked) {
            this.setState({
                selctionToggle: "deactive"
            });
        }
        else {
            this.setState({
                selctionToggle: "active"
            });
        }
        this.setState({ active: [], days: [], selectedItemId: itemId });
        const token = getStorage('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            userid: this.props.userID,
            itemid: itemId,
            status: !status
        };
        this.props.menuItemActivation(headers);
    };

    inputHandler = (env) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        this.setState({ [env.target.name]: env.target.value });
    };

    daySelection = (value) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        if (value.target.name === 'pickuptime_to') {
            this.setState({ pickuptime_to_day: value.target.value });
        } else if (value.target.name === 'pickuptime_from') {
            this.setState({ pickuptime_from_day: value.target.value });
        }
    };

    timeHandlerForItems = (e) => {
        if (e.target.name === 'pickuptime_to') {
            this.setState({
                time: { ...this.state.time, pickuptime_to: e.target.value }
            });
        } else {
            this.setState({
                time: { ...this.state.time, pickuptime_from: e.target.value }
            });
        }
    };

    addItem = (value) => {
        value.preventDefault();
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        // if ((this.state.tags_keywords) && (this.state.selectedCategory) && (this.state.price) && this.state.image) {
        let itemsObject = {
            title: this.state.title,
            tags_keywords: this.state.tags_keywords.toLowerCase().split(","),
            image: this.state.image,
            serving: this.state.servings ? parseInt(this.state.servings) : '',
            // pickuptime_from: this.state.pickuptime_from_day + ' ' + this.state.time.pickuptime_from,
            // pickuptime_to: this.state.pickuptime_to_day + ' ' + this.state.time.pickuptime_to,
            price: parseInt(this.state.price),
            description: this.state.description,
            weight: this.state.weight,
            category: this.state.selectedCategory.toLowerCase(),
        };
        if (itemsObject.weight) {
            itemsObject.weight += this.state.selectedCategory === 'Cake' ? ' Pound' : ' DOZEN';
        } else {
            itemsObject.weight = '';
        }

        const FormData = require("form-data");
        let obj = new FormData();
        obj.append('file', this.state.image);
        obj.append('category', this.state.selectedCategory);

        const token = getStorage("token");
        const headers = {
            Authorization: `Bearer ${token}`,
            userid: this.props.userID,
        };
        if (this.state.image === "") {
            if (this.state.selectedCategory === "Cake") {
                itemsObject = {
                    ...itemsObject,
                    image: "1X53NZMXt9ub2SZrEnjTSs8_3b2hruSNJ"
                };
            }
            else if (this.state.selectedCategory === "Daily / Weekly") {
                itemsObject = {
                    ...itemsObject,
                    image: "1E26IdhZmdlVKH5bIT6HzYYEla0XDSHLw"
                };
            }
            else if (this.state.selectedCategory === "Frozen") {
                itemsObject = {
                    ...itemsObject,
                    image: "1dIYGx8uXyCzrLiMlX8cTFm42gvjzD8fs"
                };
            }
            else if (this.state.selectedCategory === "Occasion") {
                itemsObject = {
                    ...itemsObject,
                    image: "1luM6lepWH1LYMUu5lQe1LFBb4YE1eIaS"
                };
            }
            this.props.createMenuItem(headers, itemsObject, this.cleraState);
        }
        else {
            this.props.setImageInDrive(obj, headers, itemsObject, "items", this.cleraState);
        }
    };

    cleraState = () => {
        this.setState({
            title: '',
            tags_keywords: '',
            image: '',
            servings: '',
            weight: '',
            pickuptime_from: '',
            pickuptime_to: '',
            price: '',
            description: '',
            selectedCategory: '',
            category: '',
            selectedItems: {
                title: "",
                tags_keywords: "",
                serving: 0,
                price: 0,
                description: "",
                image: "",
                pickuptime_from: "",
                pickuptime_to: "",
            },
        });
    };

    categorySelection = (value) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        this.setState({ selectedCategory: value.target.value });
    };

    uomSelection = () => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
    };

    onSelectItems = (value) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        this.setState({ selectedItems: value, fieldNamesOfUpdatedItem: [] });
    };

    onChangeUpdateItemsHandler = (evn) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        // taking index for save field name in array of state
        const index = this.state.fieldNamesOfUpdatedItem.indexOf(evn.target.name);
        this.setState({
            ...this.state,
            selectedItems: {
                ...this.state.selectedItems,
                [evn.target.name]: evn.target.value
            },
            fieldNamesOfUpdatedItem: index === -1 ? [
                ...this.state.fieldNamesOfUpdatedItem,
                evn.target.name
            ] : this.state.fieldNamesOfUpdatedItem
        });
    };

    onUpdateItem = (value) => {
        value.preventDefault();
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        const obj = {};
        // const fileid = this.state.selectedItems.image;
        const fields = this.state.fieldNamesOfUpdatedItem;
        const category = this.state.selectedItems.category;
        const weight = category === "frozen" ? 'Dozen' : 'Pound';
        if (!fields.length) {
            return;
        }
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (field === "tags_keywords") {
                obj[field] = this.state.selectedItems[field].toLowerCase().split(",");
            } else if (field === "serving" || field === "price") {
                obj[field] = parseInt(this.state.selectedItems[field]);
            } else if (field === "weight") {
                obj[field] = parseInt(this.state.selectedItems[field]) + " " + weight;
            }
            // else if (field === "image") {
            //     obj[field] = this.state.image;
            // } 
            else {
                obj[field] = this.state.selectedItems[field];
            }
        }

        const token = getStorage('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            userid: this.props.userID,
            itemid: this.state.selectedItems._id,
        };
        if (obj.image) {
            const FormData = require("form-data");
            let formObj = new FormData();
            formObj.append("file", this.state.image);
            formObj.append("fileid", obj.image);
            if (obj.image === "1E26IdhZmdlVKH5bIT6HzYYEla0XDSHLw" && category === "daily / weekly") {
                formObj.append("category", "Daily / Weekly");
                this.props.setImageInDrive(formObj, headers, obj, "update item");
            } else if (obj.image === "1luM6lepWH1LYMUu5lQe1LFBb4YE1eIaS" && category === "occasion") {
                formObj.append("category", "Occasion");
                this.props.setImageInDrive(formObj, headers, obj, "update item");
            } else if (obj.image === "1X53NZMXt9ub2SZrEnjTSs8_3b2hruSNJ" && category === "cake") {
                formObj.append("category", "Cake");
                this.props.setImageInDrive(formObj, headers, obj, "update item");
            } else if (obj.image === "1dIYGx8uXyCzrLiMlX8cTFm42gvjzD8fs" && category === "frozen") {
                formObj.append("category", "Frozen");
                this.props.setImageInDrive(formObj, headers, obj, "update item");
            } else {
                this.props.updateImageForItems(formObj);
            }
        }
        this.setState({ isUpdating: true });
        if (obj.image !== "1E26IdhZmdlVKH5bIT6HzYYEla0XDSHLw" && obj.image !== "1luM6lepWH1LYMUu5lQe1LFBb4YE1eIaS" && obj.image !== "1X53NZMXt9ub2SZrEnjTSs8_3b2hruSNJ" && obj.image !== "1dIYGx8uXyCzrLiMlX8cTFm42gvjzD8fs") {
            this.props.updateMenuItem(headers, obj);
        }
        this.setState({ fieldNamesOfUpdatedItem: [] });
    };

    removeItems = (value, imageID) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        this.setState({ selecteRemoveItems: value });
        const token = getStorage('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            userid: this.props.userID,
            itemid: value,
        };
        this.props.removeMenuItem(headers, imageID);
    };

    isProcessingSomethingAboutMenu() {
        const { isMenuItemCreating, isMenuItemFetching, isRemoveItem, isMenuItemActivation, isMenuItemUpdate } = this.props;
        if (isMenuItemCreating || isMenuItemFetching || isRemoveItem || isMenuItemActivation || isMenuItemUpdate) {
            sweetalert("info", "Please wait, already in process");
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <ItemsMenuComponent
                inputHandler={this.inputHandler.bind(this)}
                daySelection={this.daySelection.bind(this)}
                timeHandlerForItems={this.timeHandlerForItems.bind(this)}
                onChangeUpdateItemsHandler={this.onChangeUpdateItemsHandler.bind(this)}
                onUpdateItem={this.onUpdateItem.bind(this)}
                imageHandler={this.imageHandler.bind(this)}
                onchangeSelctionToggle={this.onchangeSelctionToggle.bind(this)}
                addItem={this.addItem.bind(this)}
                categorySelection={this.categorySelection.bind(this)}
                onSelectItems={this.onSelectItems.bind(this)}
                removeItems={this.removeItems.bind(this)}
                uomSelection={this.uomSelection.bind(this)}
                isMenuItemCreating={this.props.isMenuItemCreating}
                isMenuItemFetching={this.props.isMenuItemFetching}
                isMenuItemActivation={this.props.isMenuItemActivation}
                isMenuItemUpdate={this.props.isMenuItemUpdate}
                items={this.props.items}
                isRemoveItem={this.props.isRemoveItem}
                type={this.props.type}
                selectedItemId={this.state.selectedItemId}
                selectedItems={this.state.selectedItems}
                selecteRemoveItems={this.state.selecteRemoveItems}
                selectedCategory={this.state.selectedCategory}
            />
        );
    }
}

const mapStateToProps = ({ menu, auth }) => {
    return {
        userID: auth.user._id,
        items: menu.items,
        type: auth.user.type,
        isMenuItemCreating: menu.isMenuItemCreating,
        isMenuItemFetching: menu.isMenuItemFetching,
        isRemoveItem: menu.isRemoveItem,
        isMenuItemActivation: menu.isMenuItemActivation,
        isMenuItemUpdate: menu.isMenuItemUpdate,
        imageID: menu.imageID
    };
};

// export default SupplierRegContainer
export default connect(mapStateToProps, { menuItemActivation, updateMenuItem, removeMenuItem, setImageInDrive, createMenuItem, updateImageForItems })(ItemsMenuContainer);
