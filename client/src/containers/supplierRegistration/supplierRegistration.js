import React, { Component } from "react";
import { SupplierRegComponent } from "../../components";
import { connect } from "react-redux";
import geolocation from "geolocation";
import { getStorage, sweetalert } from "../../shared";
import {
  setUser,
  addressFinder,
  addressVerification,
  setImageInDriveForSupplier,
} from "../../store/actions";
import { useAuth0 } from "../../contexts/auth0-context";

class SupplierRegContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abnSelection: "ABN",
      addresseselection: "Verified-Address",
      addresseselectionABN: "Verified-Address",
      // verifiedAddress: '',
      selectedAddress: "",
      passport_images: "",
      drivinglicense_images: "",
      any_utility_bill_images: "",
      entity_name: "",
      ABN_status: "",
      entity_type: "",
      GST: "",
      MBL: "",
      dictbusiness: [],
      mode: [],
      NonABNVerifiedaddress: {
        business: "",
        address: "",
        address_line_2: "",
        Suburb: "",
        postal_code: "",
        image: "",
        state: "",
        passport_images: "",
        drivinglicense_images: "",
        any_utility_bill_images: "",
      },
      NonABNNonVerifiedaddress: {
        business: "",
        address: "",
        address_line_2: "",
        Suburb: "",
        postal_code: "",
        state: "",
        image: "",
        passport_images: "",
        drivinglicense_images: "",
        any_utility_bill_images: "",
      },
      AbnDetails: {
        ABN_number: "",
        entity_name: "",
        ABN_status: "",
        entity_type: "",
        GST: "",
        MBL: "",
        business: "",
        isAddressVerified: "",
        passport_images: "",
        drivinglicense_images: "",
        any_utility_bill_images: "",
        address: "",
        address_line_2: "",
        Suburb: "",
        image: '',
        state: "",
        postal_code: "",
      },
      location: {
        coordinates: [0, 0],
        type: "Point",
      },
      currentAddress: [],
      verifiedAddress: {
        state_territory: "",
        address_line_2: "",
        postcode: "",
      },
      ABNFlag: false,
      abnBankTransferFlag: false,
      varfiedAddBankTransferFlag: false,
      nonVarifiedaddBankTransferFlag: false,
      abnBankTransfer: [],
      varfiedAddBankTransfer: [],
      nonVarifiedaddBankTransfer: [],
      abnAccountDetail: {
        bank_name: '',
        account_title: '',
        account_number: '',
        bsb: '',
      },
      varifiedAccountDetail: {
        bank_name: '',
        account_title: '',
        account_number: '',
        bsb: '',
      },
      nonVarifiedAccountDetail: {
        bank_name: '',
        account_title: '',
        account_number: '',
        bsb: '',
      }

      // currentAddress: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"],
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      currentAddress:
        props.findAddresses && props.findAddresses.addresses
          ? props.findAddresses.addresses
          : [],
      verifiedAddress: props.verifiedAddress,
    };
  }

  componentDidMount() {
    // alert()
    geolocation.getCurrentPosition((error, position) => {
      if (error) {
        sweetalert(
          "error",
          "You can't proceed without atteched location , Please do allow location and reload"
        );
      } else {
        this.setState({
          location: {
            coordinates: [position.coords.longitude, position.coords.latitude],
            type: "Point",
            // lat: position.coords.latitude,
            // long: position.coords.longitude,
          },
        });
      }
    });
  }

  modecheckBoxHandler = (values) => {
    let mode = this.state.mode;
    const newMode = values.target.value.toLowerCase();
    const existingMode = mode.indexOf(newMode);
    if (existingMode !== -1) {
      mode.splice(existingMode, 1);
    } else {
      mode.push(newMode);
    }
    this.setState({ mode });
  };
  abnPaymentcheckBoxHandler = (values) => {
    this.setState({ abnBankTransferFlag: false });
    let abnBankTransfer = this.state.abnBankTransfer;
    const newMode = values.target.value.toLowerCase();
    const existingMode = abnBankTransfer.indexOf(newMode);
    if (existingMode !== -1) {
      abnBankTransfer.splice(existingMode, 1);
    } else {
      abnBankTransfer.push(newMode);
    }
    console.log(abnBankTransfer);
    for (let i = 0; i < abnBankTransfer.length; i++) {
      const element = abnBankTransfer[i];
      if (element === "bank transfer") {
        this.setState({ abnBankTransferFlag: true });
      }
    }
    this.setState({ abnBankTransfer });
  };
  varifedAddressPaymentcheckBoxHandler = (values) => {
    this.setState({ varfiedAddBankTransferFlag: false });
    let varfiedAddBankTransfer = this.state.varfiedAddBankTransfer;
    const newMode = values.target.value.toLowerCase();
    const existingMode = varfiedAddBankTransfer.indexOf(newMode);
    if (existingMode !== -1) {
      varfiedAddBankTransfer.splice(existingMode, 1);
    } else {
      varfiedAddBankTransfer.push(newMode);
    }
    console.log(varfiedAddBankTransfer);
    for (let i = 0; i < varfiedAddBankTransfer.length; i++) {
      const element = varfiedAddBankTransfer[i];
      if (element === "bank transfer") {
        this.setState({ varfiedAddBankTransferFlag: true });
      }
    }
    this.setState({ varfiedAddBankTransfer });
  };
  nonVarifedPaymentcheckBoxHandler = (values) => {
    this.setState({ nonVarifiedaddBankTransferFlag: false });
    let nonVarifiedaddBankTransfer = this.state.nonVarifiedaddBankTransfer;
    const newMode = values.target.value.toLowerCase();
    const existingMode = nonVarifiedaddBankTransfer.indexOf(newMode);
    if (existingMode !== -1) {
      nonVarifiedaddBankTransfer.splice(existingMode, 1);
    } else {
      nonVarifiedaddBankTransfer.push(newMode);
    }
    console.log(nonVarifiedaddBankTransfer);
    for (let i = 0; i < nonVarifiedaddBankTransfer.length; i++) {
      const element = nonVarifiedaddBankTransfer[i];
      if (element === "bank transfer") {
        this.setState({ nonVarifiedaddBankTransferFlag: true });
      }
    }
    this.setState({ nonVarifiedaddBankTransfer });
  };

  abnAccountDetailInputHandler = (value) => {
    this.setState({
      ...this.state,
      abnAccountDetail: {
        ...this.state.abnAccountDetail,
        [value.target.name]: value.target.value
      }
    });
  };
  varifiedAccountDetailInputHandler = (value) => {
    this.setState({
      ...this.state,
      varifiedAccountDetail: {
        ...this.state.varifiedAccountDetail,
        [value.target.name]: value.target.value
      }
    });
  };
  nonVarifiedAccountDetailInputHandler = (value) => {
    this.setState({
      ...this.state,
      nonVarifiedAccountDetail: {
        ...this.state.nonVarifiedAccountDetail,
        [value.target.name]: value.target.value
      }
    });
  };

  passportImageHandler = (env) => {
    if (env.target.files[0]) {
      this.setState({
        passport_images: env.target.files[0],
      });
    } else {
      sweetalert("error", "Image not Selected");
      this.setState({ passport_images: "" });
    }
  };

  drivingImageHandler = (env) => {
    if (env.target.files[0]) {
      this.setState({ drivinglicense_images: env.target.files[0] });
    } else {
      sweetalert("error", "Image not Selected");
      this.setState({ drivinglicense_images: "" });
    }
  };
  imageHandler = (event, status) => {
    if (event.target.files[0]) {
      if (status === "abn_image") {
        this.setState({ ...this.state, AbnDetails: { ...this.state.AbnDetails, image: event.target.files[0], }, });
      } else if (status === "varified_add_image") {
        this.setState({ ...this.state, NonABNVerifiedaddress: { ...this.state.NonABNVerifiedaddress, image: event.target.files[0], }, });
      } else if (status === "non_varified_add_image") {
        this.setState({ ...this.state, NonABNNonVerifiedaddress: { ...this.state.NonABNNonVerifiedaddress, image: event.target.files[0], }, });
      }
    } else {
      sweetalert("error", "Image not Selected");
    }
    console.log(status);
  };

  billImageHandler = (env) => {
    if (env.target.files[0]) {
      // let files = env.target.files;
      // let reader = new FileReader();
      // reader.readAsDataURL(files[0]);
      // reader.onload = (e) => {
      this.setState({ any_utility_bill_images: env.target.files[0] });
      // }
    } else {
      sweetalert("error", "Image not Selected");
      this.setState({ any_utility_bill_images: "" });
    }
  };

  ABN_numberEntered = (evn) => {
    const value = evn.target.value;
    if (value.length !== 11) { return; }
    // screenLockEnable();
    this.setState({ ABNFlag: true, });
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl + "https://abr.business.gov.au/json/AbnDetails.aspx?abn=" + value + "&callback=callback&guid=4c98909f-19f2-48cf-a6bb-17f333acb4b3")
      .then((response) => response.text())
      .then((data) => {
        this.setState({ ABNFlag: false, });
        data = data.replace("callback(", "");
        data = data.replace("})", "}");
        var obj = JSON.parse(data);
        var dict = [];
        var i;
        if (obj.BusinessName) {
          for (i = 0; i < obj.BusinessName.length; i++) {
            dict.push({
              key: i,
              value: obj.BusinessName[i],
            });
          }
        }
        if (obj.AbnStatus === "Cancelled") {
          // abn status failed
          sweetalert("error", "Your ABN status not be active");
        } else {
          // abn status passed
          this.setState({
            entity_name: obj.EntityName,
            ABN_status: obj.AbnStatus,
            entity_type: obj.EntityTypeName,
            GST: obj.Gst,
            MBL: obj.AddressState + " " + obj.AddressPostcode,
            business: obj.BusinessName,
            dictbusiness: dict,
          });
        }
      })
      .catch((error) => {
        // screenLockDisable();
        this.setState({
          ABNFlag: false,
        });
        sweetalert("error", error.message);
      });
  };

  onChangeABNDetails = (e) => {
    const value = e.target.value;
    this.setState({
      AbnDetails: {
        ...this.state.AbnDetails,
        [e.target.name]: value,
      },
    });
  };

  onChangeNonABNVerifiedAddress = (e) => {
    const value = e.target.value;
    this.setState({
      NonABNVerifiedaddress: {
        ...this.state.NonABNVerifiedaddress,
        [e.target.name]: value,
      },
    });
  };

  onChangeNonABNNonVerifiedaddress = (e) => {
    this.setState({
      NonABNNonVerifiedaddress: {
        ...this.state.NonABNNonVerifiedaddress,
        [e.target.name]: e.target.value,
      },
    });
  };

  onFinishABN = (e) => {
    e.preventDefault();
    let obj = {};
    // if (this.state.passport_image !== "" || this.state.drivinglicense_images !== "" || this.state.any_utility_bill_images !== "") {
    if (this.state.mode.length) {
      if (
        this.state.passport_image ||
        this.state.drivinglicense_images ||
        this.state.any_utility_bill_images
      ) {
        if (
          this.state.location.coordinates[0] !== 0 &&
          this.state.location.coordinates[1] !== 0
        ) {
          const type = getStorage("type");
          const business = this.state.AbnDetails.business
            ? this.state.AbnDetails.business
            : this.state.business[0];
          if (this.state.addresseselectionABN === "Non-Verified-Address") {
            this.setState({
              AbnDetails: {
                ...this.state.AbnDetails,
                passport_images: this.state.passport_images,
                drivinglicense_images: this.state.drivinglicense_images,
                any_utility_bill_images: this.state.any_utility_bill_images,
                entity_name: this.state.entity_name,
                ABN_status: this.state.ABN_status,
                mode: this.state.mode,
                entity_type: this.state.entity_type,
                GST: this.state.GST,
                MBL: this.state.MBL,
                email: this.props.user.email,
                business: business,
                isAddressVerified: this.state.addresseselectionABN,
                location: this.state.location,
                isNonABNVerified: true,
                is_verified_address: false,
                type,
              },
            });
          } else {
            if (this.props.verifiedAddress.matched) {
              this.setState({
                AbnDetails: {
                  ...this.state.AbnDetails,
                  passport_images: this.state.passport_images,
                  drivinglicense_images: this.state.drivinglicense_images,
                  any_utility_bill_images: this.state.any_utility_bill_images,
                  entity_name: this.state.entity_name,
                  mode: this.state.mode,
                  ABN_status: this.state.ABN_status,
                  entity_type: this.state.entity_type,
                  GST: this.state.GST,
                  MBL: this.state.MBL,
                  email: this.props.user.email,
                  business: business,
                  isAddressVerified: this.state.addresseselectionABN,
                  location: this.state.location,
                  Suburb: this.props.verifiedAddress.address.locality_name,
                  address_line_2:
                    this.props.verifiedAddress.address.address_line_2 || "",
                  is_verified_address: true,
                  postal_code: parseInt(
                    this.props.verifiedAddress.address.postcode
                  ),
                  state: this.props.verifiedAddress.address.state_territory,
                  type,
                  isABN: true,
                },
              });
            } else {
              sweetalert("error", "address not Found");
            }
          }
          setTimeout(() => {
            this.props.setImageInDriveForSupplier(this.state.AbnDetails);
          }, 100);
        } else {
          sweetalert(
            "error",
            "You can't proceed without atteched location , Please do allow location and reload"
          );
        }
      } else {
        sweetalert("error", "You have to upload at least 1 image");
      }
    } else {
      sweetalert("error", "At least one mode must be selected");
    }
  };

  onFinishVerifiedAddress = (e) => {
    e.preventDefault();
    if (this.state.mode.length) {
      if (this.props.verifiedAddress.matched) {
        if (
          this.state.passport_image ||
          this.state.drivinglicense_images ||
          this.state.any_utility_bill_images
        ) {
          if (
            this.state.location.coordinates[0] !== 0 &&
            this.state.location.coordinates[1] !== 0
          ) {
            const type = getStorage("type");
            // const token = getStorage("token");
            const obj = {
              ...this.state.NonABNVerifiedaddress,
              passport_images: this.state.passport_images,
              drivinglicense_images: this.state.drivinglicense_images,
              mode: this.state.mode,
              location: this.state.location,
              any_utility_bill_images: this.state.any_utility_bill_images,
              Suburb: this.props.verifiedAddress.address.locality_name,
              address_line_2: this.props.verifiedAddress.address.address_line_2,
              postal_code: parseInt(
                this.props.verifiedAddress.address.postcode
              ),
              state: this.props.verifiedAddress.address.state_territory,
              email: this.props.user.email,
              type,
            };
            // this.props.setUser(obj, token);
            this.props.setImageInDriveForSupplier(obj);
          } else {
            sweetalert(
              "error",
              "You can't proceed without atteched location , Please do allow location and reload"
            );
          }
        } else {
          sweetalert("error", "You have to upload at least 1 image");
        }
      } else {
        sweetalert("error", "address not Found");
      }
    } else {
      sweetalert("error", "At least one mode must be selected");
    }
  };

  onFinishNonVerifiedAddress = (e) => {
    e.preventDefault();
    if (this.state.mode.length) {
      if (
        this.state.passport_images ||
        this.state.drivinglicense_images ||
        this.state.any_utility_bill_images
      ) {
        if (
          this.state.location.coordinates[0] !== 0 &&
          this.state.location.coordinates[1] !== 0
        ) {
          const type = getStorage("type");
          // const token = getStorage("token");
          const obj = {
            ...this.state.NonABNNonVerifiedaddress,
            passport_images: this.state.passport_images,
            drivinglicense_images: this.state.drivinglicense_images,
            any_utility_bill_images: this.state.any_utility_bill_images,
            mode: this.state.mode,
            // Suburb: this.props.verifiedAddress.address.locality_name,
            // address_line_2: this.props.verifiedAddress.address.address_line_2,
            // postal_code: parseInt(this.props.verifiedAddress.address.postcode),
            // state: this.props.verifiedAddress.address.state_territory,
            payment_mode: this.state.varfiedAddBankTransfer,
            // email: this.props.user.email,
            type,
            email: this.props.user.email,
            location: this.state.location,
            isNonABNNonVerified: true,
            is_verified_address: false,
          };
          if (obj.passport_images || obj.drivinglicense_images || obj.any_utility_bill_images) {
            this.props.setImageInDriveForSupplier(obj);
          } else {
            sweetalert("error", "You must add one file attachement");
          }
          if (this.state.varfiedAddBankTransferFlag) {
            obj.account_details = this.state.varifiedAccountDetail;
          };
          // this.props.setUser(obj, token);
          // console.log(obj);
          // this.props.setImageInDriveForSupplier(obj);
        } else {
          sweetalert(
            "error",
            "You can't proceed without atteched location , Please do allow location and reload"
          );
        }
      } else {
        sweetalert("error", "You have to upload at least 1 image");
      }
    } else {
      sweetalert("error", "At least one mode must be selected");
    }
  };

  onChangeABNSelection = () => {
    let checkbox = document.getElementById("customSwitch2");
    let nonabn = document.getElementById("abn");
    let abn = document.getElementById("nonabn");
    if (checkbox.checked) {
      abn.classList.add("toggleColor");
      nonabn.classList.remove("toggleColor");
      this.setState({
        abnSelection: "Non-ABN",
      });
    } else {
      this.setState({
        abnSelection: "ABN",
      });
      nonabn.classList.add("toggleColor");
      abn.classList.remove("toggleColor");
    }
  };

  onChangeAddressSelection = (event) => {
    let checkbox = document.getElementById("customSwitch3");
    let verfiedAdd = document.getElementById("verifiedAddNonABN");
    let nonVerfiedAdd = document.getElementById("nonVerifiedAddNonABN");
    if (checkbox.checked) {
      this.setState({
        addresseselection: "Non-Verified-Address",
      });
      nonVerfiedAdd.classList.add("toggleColor");
      verfiedAdd.classList.remove("toggleColor");
    } else {
      verfiedAdd.classList.add("toggleColor");
      nonVerfiedAdd.classList.remove("toggleColor");
      this.setState({
        addresseselection: "Verified-Address",
      });
    }
  };

  onChangeAddressSelectionABN = (event) => {
    let checkbox = document.getElementById("customSwitch4");
    let verfiedAdd = document.getElementById("verifiedAdd");
    let nonVerfiedAdd = document.getElementById("nonVerifiedAdd");
    if (checkbox.checked) {
      this.setState({
        addresseselectionABN: "Non-Verified-Address",
      });
      nonVerfiedAdd.classList.add("toggleColor");
      verfiedAdd.classList.remove("toggleColor");
    } else {
      verfiedAdd.classList.add("toggleColor");
      nonVerfiedAdd.classList.remove("toggleColor");
      this.setState({
        addresseselectionABN: "Verified-Address",
      });
    }
  };

  autocomplete = (value) => {
    const values = value.target.value;
    const id = value.target.id;
    let currentAddress = [];
    const findAddresses = this.state.currentAddress;
    for (let index = 0; index < findAddresses.length; index++) {
      const addres = findAddresses[index].full_address;
      currentAddress.push(addres);
    }
    const token = getStorage("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      address: values,
    };
    if (values.length < 5 || this.props.isAddressFinding) {
      return false;
    }
    this.props.addressFinder(headers);
    const _self = (obj) => {
      this.props.addressVerification(obj);
    };

    /*the autocomplete function takes two arguments,
        the text field element and an currentAddressay of possible autocompleted values:*/
    let addressFinder = document.getElementById(id);
    var currentFocus = 1;
    /*execute a function when someone writes in the text field:*/
    addressFinder.addEventListener("input", function (e) {
      var a,
        b,
        i,
        val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the currentAddressay...*/
      for (i = 0; i < currentAddress.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (
          currentAddress[i].substr(0, val.length).toUpperCase() ===
          val.toUpperCase()
        ) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML =
            "<strong>" + currentAddress[i].substr(0, val.length) + "</strong>";
          b.innerHTML += currentAddress[i].substr(val.length);
          /*insert a input field that will hold the current currentAddressay item's value:*/
          b.innerHTML +=
            "<input type='hidden' value='" + currentAddress[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function () {
            /*insert the value for the autocomplete text field:*/
            addressFinder.value = this.getElementsByTagName("input")[0].value;
            completeAddress(addressFinder.value);
            const obj = {
              Authorization: `Bearer ${token}`,
              address: addressFinder.value,
            };
            _self(obj);
            //
            /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
    /*execute a function presses a key on the keyboard:*/
    addressFinder.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode === 40) {
        /*If the this.state.currentAddressow DOWN key is pressed,
                increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode === 38) {
        //up
        /*If the this.state.currentAddressow UP key is pressed,
                decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode === 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x && x.length) {
            x[currentFocus].click();
          }
        }
      }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt !== x[i] && elmnt !== addressFinder) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
    const completeAddress = (value) => {
      if (id === "addressFinder2") {
        this.setState({
          NonABNVerifiedaddress: {
            ...this.state.NonABNVerifiedaddress,
            address: value,
          },
        });
      } else {
        this.setState({
          AbnDetails: {
            ...this.state.AbnDetails,
            address: value,
          },
        });
      }
    };
  };

  render() {
    // console.log(this.state.AbnDetails)
    return (
      <div>
        <SupplierRegComponent
          onChangeABNSelection={this.onChangeABNSelection.bind(this)}
          onFinishABN={this.onFinishABN.bind(this)}
          abnAccountDetailInputHandler={this.abnAccountDetailInputHandler.bind(this)}
          varifiedAccountDetailInputHandler={this.varifiedAccountDetailInputHandler.bind(this)}
          nonVarifiedAccountDetailInputHandler={this.nonVarifiedAccountDetailInputHandler.bind(this)}
          // onChangeNonABNAddress={this.onChangeNonABNAddress.bind(this)}
          // onChangeABNAddress={this.onChangeABNAddress.bind(this)}
          autoComplete={this.autocomplete.bind(this)}
          currentAddress={this.state.currentAddress}
          passportImageHandler={this.passportImageHandler.bind(this)}
          drivingImageHandler={this.drivingImageHandler.bind(this)}
          billImageHandler={this.billImageHandler.bind(this)}
          ABN_numberEntered={this.ABN_numberEntered.bind(this)}
          onChangeAddressSelection={this.onChangeAddressSelection.bind(this)}
          onChangeAddressSelectionABN={this.onChangeAddressSelectionABN.bind(this)}
          onFinishVerifiedAddress={this.onFinishVerifiedAddress.bind(this)}
          onFinishNonVerifiedAddress={this.onFinishNonVerifiedAddress.bind(this)}
          onChangeABNDetails={this.onChangeABNDetails.bind(this)}
          onChangeNonABNVerifiedAddress={this.onChangeNonABNVerifiedAddress.bind(this)}
          onChangeNonABNNonVerifiedaddress={this.onChangeNonABNNonVerifiedaddress.bind(this)}
          modecheckBoxHandler={this.modecheckBoxHandler.bind(this)}
          abnPaymentcheckBoxHandler={this.abnPaymentcheckBoxHandler.bind(this)}
          varifedAddressPaymentcheckBoxHandler={this.varifedAddressPaymentcheckBoxHandler.bind(this)}
          nonVarifedPaymentcheckBoxHandler={this.nonVarifedPaymentcheckBoxHandler.bind(this)}
          imageHandler={this.imageHandler.bind(this)}
          abnSelection={this.state.abnSelection}
          addresseselection={this.state.addresseselection}
          addresseselectionABN={this.state.addresseselectionABN}
          verifiedAddress={this.state.verifiedAddress}
          entity_name={this.state.entity_name}
          ABN_status={this.state.ABN_status}
          entity_type={this.state.entity_type}
          GST={this.state.GST}
          MBL={this.state.MBL}
          status={this.state.status}
          location={this.state.location}
          selectedAddress={this.state.selectedAddress}
          registration_date={this.state.registration_date}
          renewal_date={this.state.renewal_date}
          dictbusiness={this.state.dictbusiness}
          isLoading={this.props.isLoading}
          findAddresses={this.props.findAddresses}
          NonABNNonVerifiedaddress={this.state.NonABNNonVerifiedaddress}
          ABNFlag={this.state.ABNFlag}
          abnBankTransferFlag={this.state.abnBankTransferFlag}
          nonAbnBankTransferFlag={this.state.nonAbnBankTransferFlag}
          varfiedAddBankTransferFlag={this.state.varfiedAddBankTransferFlag}
          nonVarifiedaddBankTransferFlag={this.state.nonVarifiedaddBankTransferFlag}
          isAddressVerifying={this.props.isAddressVerifying}
          userStatus={this.props.userStatus}
        />
      </div>
    );
  }
};

const SupplierRegistration = (props) => {
  const { isAuthenticated, user } = useAuth0();
  return (
    <SupplierRegContainer
      user={user}
      userStatus={props.auth.user.status}
      isAuthenticated={isAuthenticated}
      findAddresses={props.auth.findAddresses}
      setImageInDriveForSupplier={props.setImageInDriveForSupplier}
      setUser={props.setUser}
      isLoading={props.auth.isLoading}
      addressFinder={props.addressFinder}
      addressVerification={props.addressVerification}
      verifiedAddress={props.auth.verifiedAddress}
      isAddressVerifying={props.auth.isAddressVerifying}
      isAddressFinding={props.auth.isAddressFinding}
    />
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

// export default SupplierRegContainer
export default connect(mapStateToProps, {
  setUser,
  addressFinder,
  addressVerification,
  setImageInDriveForSupplier,
})(SupplierRegistration);
