import React, { Component } from "react";
import { CakesMenuComponent, NavigationBar } from "../../../components";
import { connect } from "react-redux";
import {
  sweetalert,
  getStorage,
  setStorage,
  NoRecordFound,
  generateOrderId,
} from "../../../shared";
import {
  updateMenuItem,
  removeMenuItem,
  orderDispatchedDailyItem,
  setMenuLocally,
  getAKitchenWithMenu,
  dispatchOrdersLocal,
  updateImageForItems,
  setImageInDrive,
  removeMenuLocally,
} from "../../../store/actions";
import { SupplierHomeContainer } from "../..";

class CakesMenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selecteRemoveItems: "",
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
      fieldNamesOfUpdatedItem: [],
      cakeMenuKitchens: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.searchBase !== 'kitchen' && props.type !== "supplier") {
      props.removeMenuLocally();
    }
    const supplierid = getStorage('sid');
    let isGetAKitchen = state.isGetAKitchen;
    if (!props.menu.supplier && supplierid && props.userID && !props.isMenuFetching && !isGetAKitchen) {
      // get menu by api
      const token = getStorage('token');
      const obj = {
        Authorization: `Bearer ${token}`,
        userid: props.userID,
        supplierid
      };
      props.getAKitchenWithMenu(obj);
      isGetAKitchen = true;
    }
    if (props.type !== "supplier" && !props.menu.supplier && !supplierid) {
      const cakeMenu = [];
      for (let i = 0; i < props.kitchens.length; i++) {
        const kitchen = props.kitchens[i];
        if (kitchen.menu.cake.items.length) {
          cakeMenu.push(kitchen);
        }
      }
      cakeMenu.sort(function (a, b) {
        if (b.featured || a.featured) {
          return b.featured - a.featured;
        }
        if (b.menu.rating.avg < a.menu.rating.avg) {
          return -1;
        }
        if (b.menu.rating.avg > a.menu.rating.avg) {
          return 1;
        }

      });
      return { cakeMenuKitchens: cakeMenu, isGetAKitchen: isGetAKitchen };
    }
    return false;
  }
  onOrder = (selectedItem) => {
    if (this.isProcessingSomethingAboutMenu()) {
      return;
    }
    let sid = getStorage("sid");
    const user = this.props.user;

    const selectedKitchen = this.props.selectedKitchen;
    let address = "";
    let mode = "";
    let kname = "";
    let supplierEmail = "";
    if (this.props.searchBase === "kitchen") {
      if (this.props.selectedKitchen.mode[0] === "pickup") {
        address = `${selectedKitchen.address ? selectedKitchen.address + ", " : ""
          }${selectedKitchen.address_line_2 !== ""
            ? selectedKitchen.address_line_2 + ", "
            : ""
          }${selectedKitchen.Suburb ? selectedKitchen.Suburb + ", " : ""} ${selectedKitchen.state ? selectedKitchen.state : ""
          }`;
        const orderItem = {
          orderId: generateOrderId(),
          menuType: selectedItem.category,
          pickupTime: "",
          kitchenName: selectedKitchen.business ? selectedKitchen.business : selectedItem.businessName,
          customerName: user.full_name,
          userid: this.props.userID,
          supplierId: sid ? sid : selectedItem.supplier,
          itemids: [selectedItem._id],
          price: selectedItem.price,
          count: 1,
          selectedItem,
          mode: "pickup",
          address: address,
          description: selectedItem.description,
          email: user.email,
          kitchenEmail: selectedKitchen.email
        };
        console.log(orderItem);
        this.props.dispatchOrdersLocal(orderItem);
      } else {
        address = `${user.address ? user.address + ", " : ""}${user.city ? user.city + ", " : ""
          }${user.state ? user.state + ", " : ""}${user.country ? user.country + "" : ""
          }`;
        const orderItem = {
          orderId: generateOrderId(),
          menuType: selectedItem.category,
          pickupTime: "",
          kitchenName: selectedKitchen.business ? selectedKitchen.business : selectedItem.businessName,
          customerName: user.full_name,
          userid: this.props.userID,
          supplierId: sid ? sid : selectedItem.supplier,
          itemids: [selectedItem._id],
          price: selectedItem.price,
          count: 1,
          mode: "delivery",
          selectedItem,
          address: address,
          description: selectedItem.description,
          email: user.email,
          kitchenEmail: selectedKitchen.email
        };
        console.log(orderItem);
        this.props.dispatchOrdersLocal(orderItem);
      }
      mode = selectedKitchen.mode[0];
      kname = getStorage("kname");
      supplierEmail = selectedKitchen.email;

    } else {
      if (selectedItem.mode[0] === "pickup") {
        address = selectedItem.address;
      } else {
        address = `${user.address ? user.address + ", " : ""}${user.city ? user.city + ", " : ""
          }${user.state ? user.state + ", " : ""}${user.country ? user.country + "" : ""
          }`;
      }
      mode = selectedItem.mode[0];
      kname = selectedItem.businessName;
      supplierEmail = selectedItem.email;
      const orderItem = {
        orderId: generateOrderId(),
        menuType: selectedItem.category,
        pickupTime: "",
        kitchenName: kname ? kname : selectedItem.businessName,
        customerName: user.full_name,
        userid: this.props.userID,
        supplierId: sid ? sid : selectedItem.supplier,
        itemids: [selectedItem._id],
        price: selectedItem.price,
        totalPrice: selectedItem.price,
        selectedItem,
        count: 1,
        mode: mode,
        address: address,
        description: selectedItem.description,
        email: user.email,
        kitchenEmail: supplierEmail
      };
      console.log(orderItem);
      // console.log(selectedItem)
      this.props.dispatchOrdersLocal(orderItem);
    };
  };
  onSelectItems = (value) => {
    if (this.isProcessingSomethingAboutMenu()) {
      return;
    }
    this.setState({ selectedItems: value, image: value.image });
  };

  onChangeUpdateItemsHandler = (value) => {
    if (this.isProcessingSomethingAboutMenu()) {
      return;
    }
    const index = this.state.fieldNamesOfUpdatedItem.indexOf(value.target.name);
    this.setState({
      ...this.state,
      selectedItems: {
        ...this.state.selectedItems,
        [value.target.name]: value.target.value,
      },
      fieldNamesOfUpdatedItem:
        index === -1
          ? [...this.state.fieldNamesOfUpdatedItem, value.target.name]
          : this.state.fieldNamesOfUpdatedItem,
    });
  };

  onUpdateItem = (value) => {
    if (this.isProcessingSomethingAboutMenu()) {
      return;
    }
    value.preventDefault();
    let obj = {};
    const fields = this.state.fieldNamesOfUpdatedItem;
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (field === "tags_keywords") {
        obj[field] = this.state.selectedItems[field].split(",");
      } else if (field === "serving" || field === "price") {
        obj[field] = parseInt(this.state.selectedItems[field]);
      } else if (field === "weight") {
        obj[field] = `${parseInt(this.state.selectedItems[field])} Pound`;
      } else {
        obj[field] = this.state.selectedItems[field];
      }
    }
    const token = getStorage("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      userid: this.props.userID,
      itemid: this.state.selectedItems._id,
    };

    if (obj.image) {
      const FormData = require("form-data");
      let formObj = new FormData();
      formObj.append("file", obj.image);
      formObj.append("fileid", this.state.image);
      if (this.state.image === "1E26IdhZmdlVKH5bIT6HzYYEla0XDSHLw") {
        formObj.append("category", "Daily / Weekly");
        this.props.setImageInDrive(formObj, headers, obj, "update item");
      } else if (this.state.image === "1luM6lepWH1LYMUu5lQe1LFBb4YE1eIaS") {
        formObj.append("category", "Occasion");
        this.props.setImageInDrive(formObj, headers, obj, "update item");
      } else if (this.state.image === "1X53NZMXt9ub2SZrEnjTSs8_3b2hruSNJ") {
        formObj.append("category", "Cake");
        this.props.setImageInDrive(formObj, headers, obj, "update item");
      } else if (this.state.image === "1dIYGx8uXyCzrLiMlX8cTFm42gvjzD8fs") {
        formObj.append("category", "Frozen");
        this.props.setImageInDrive(formObj, headers, obj, "update item");
      } else {
        this.props.updateImageForItems(formObj);
      }
    }
    if (
      this.state.image !== "1E26IdhZmdlVKH5bIT6HzYYEla0XDSHLw" &&
      this.state.image !== "1luM6lepWH1LYMUu5lQe1LFBb4YE1eIaS" &&
      this.state.image !== "1X53NZMXt9ub2SZrEnjTSs8_3b2hruSNJ" &&
      this.state.image !== "1dIYGx8uXyCzrLiMlX8cTFm42gvjzD8fs"
    ) {
      obj = {
        ...obj,
        image: this.state.image,
      };
      this.props.updateMenuItem(headers, obj);
    }
    this.setState({ fieldNamesOfUpdatedItem: [] });
  };

  imageHandler = (env) => {
    if (this.isProcessingSomethingAboutMenu()) {
      return;
    }
    const index = this.state.fieldNamesOfUpdatedItem.indexOf("image");
    if (env.target.files[0] && env.target.files[0].size <= 5000000) {
      this.setState({
        ...this.state,
        selectedItems: {
          ...this.state.selectedItems,
          image: env.target.files[0],
        },
        fieldNamesOfUpdatedItem:
          index === -1
            ? [...this.state.fieldNamesOfUpdatedItem, "image"]
            : this.state.fieldNamesOfUpdatedItem,
      });
    } else {
      sweetalert("error", "Image not Selected");
      this.setState({ image: "" });
    }
  };

  removeItems = (value, imageID) => {
    if (this.isProcessingSomethingAboutMenu()) {
      return;
    }
    this.setState({ selecteRemoveItems: value });
    const token = getStorage("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      userid: this.props.userID,
      itemid: value,
    };
    this.props.removeMenuItem(headers, imageID);
  };

  authForOrder = (type, loginWithRedirect) => {
    if (type) {
      setStorage("type", type);
      loginWithRedirect();
    }
  };

  viewKitchen = (kitchen) => {
    this.props.setMenuLocally(kitchen);
  };

  isProcessingSomethingAboutMenu() {
    const {
      isMenuItemUpdate,
      isMenuItemFetching,
      isRemoveItem,
      isKitchensFetching,
      isMenuFetching,
    } = this.props;
    if (
      isMenuItemUpdate ||
      isMenuItemFetching ||
      isRemoveItem ||
      isKitchensFetching ||
      isMenuFetching
    ) {
      sweetalert("info", "Please wait, already in process");
      return true;
    } else {
      return false;
    }
  }

  render() {
    const type = getStorage("type");
    const cakeMenuKitchens = this.state.cakeMenuKitchens;
    const cake = this.props.menu.cake;
    const cakeMenu = this.props.allKitchensMenu.cake.items;
    return (
      <div>
        {this.props.type === "supplier" ? (
          <SupplierHomeContainer />
        ) : (
            <NavigationBar />
          )}
        {this.props.isMenuItemFetching ||
          this.props.isKitchensFetching ||
          this.props.isMenuFetching ? (
            <div
              style={{ position: "absolute", top: "55%" }}
              className='text-center loader-alignment'
            >
              <span
                style={{ width: "3rem", height: "3rem" }}
                className='spinner-border myInput text-primary spinner-border-sm'
              ></span>
            </div>
          ) : cakeMenuKitchens.length ||
            cake.length ||
            cakeMenu.length ||
            type === "supplier" ? (
              <CakesMenuComponent
                onOrder={this.onOrder.bind(this)}
                viewKitchen={this.viewKitchen.bind(this)}
                removeItems={this.removeItems.bind(this)}
                onSelectItems={this.onSelectItems.bind(this)}
                onUpdateItem={this.onUpdateItem.bind(this)}
                imageHandler={this.imageHandler.bind(this)}
                authForOrder={this.authForOrder.bind(this)}
                onChangeUpdateItemsHandler={this.onChangeUpdateItemsHandler.bind(
                  this
                )}
                isMenuItemFetching={this.props.isMenuItemFetching}
                isMenuItemUpdate={this.props.isMenuItemUpdate}
                isRemoveItem={this.props.isRemoveItem}
                selectedItems={this.state.selectedItems}
                selecteRemoveItems={this.state.selecteRemoveItems}
                cakeMenuKitchens={this.state.cakeMenuKitchens}
                type={this.props.type}
                cake={this.props.menu.cake}
                isMenuFetching={this.props.isMenuFetching}
                isKitchensFetching={this.props.isKitchensFetching}
                searchBase={this.props.searchBase}
                allKitchensMenu={this.props.allKitchensMenu}
                type={this.props.type}
              />
            ) : (
              <NoRecordFound />
            )}
      </div>
    );
  }
}

const mapStateToProps = ({ menu, auth, supplierKitchens }) => {
  return {
    userID: auth.user._id,
    user: auth.user,
    menu: menu.menu,
    type: auth.user.type,
    isRemoveItem: menu.isRemoveItem,
    isMenuItemUpdate: menu.isMenuItemUpdate,
    isMenuItemFetching: menu.isMenuItemFetching,
    isMenuFetching: menu.isMenuFetching,
    orders: supplierKitchens.orders,
    isKitchensFetching: supplierKitchens.isKitchensFetching,
    kitchens: supplierKitchens.kitchens,
    allKitchensMenu: supplierKitchens.allKitchensMenu,
    searchBase: supplierKitchens.searchBase,
    selectedKitchen: supplierKitchens.selectedKitchen,
  };
};

export default connect(mapStateToProps, {
  updateMenuItem,
  removeMenuItem,
  orderDispatchedDailyItem,
  setMenuLocally,
  getAKitchenWithMenu,
  dispatchOrdersLocal,
  updateImageForItems,
  setImageInDrive,
  removeMenuLocally,
})(CakesMenuContainer);
