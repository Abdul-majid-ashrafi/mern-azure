import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setUser,
  getCountry,
  getCountryState,
  getCountryCity,
  setImageInDriveForSupplier
} from "../../store/actions";
import { CustomerRegComponent } from "../../components";
import { getStorage, sweetalert } from "../../shared";
import { useAuth0 } from "../../contexts/auth0-context";

class CustomerRegContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        full_name: this.props.user
          ? this.props.user.name
            ? this.props.user.name.includes("@")
              ? this.props.user.nickname
              : this.props.user.name
            : ""
          : "",
        email: this.props.user ? this.props.user.email : "",
      },
      allCountries: [],
      renderAllCountries: [],
      renderAllCountryState: [],
      renderAllCountryCity: [],
      customerDetails: {
        full_name: "",
        mobile_number: "",
        email: "",
        address: "",
        image: "",
        city: "",
        Suburb: "",
        state: "",
        postal_code: "",
        country: "Australia",
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let fullname = nextProps.user
      ? nextProps.user.name.includes("@")
        ? nextProps.user.nickname
        : nextProps.user.name
      : "";
    let email = nextProps.user ? nextProps.user.email : "";
    if (
      prevState.customerDetails.fullname !== fullname &&
      prevState.customerDetails.email !== email
    ) {
      return {
        customerDetails: {
          full_name: fullname,
          mobile_number: "",
          email: email,
          address: "",
          city: "",
          state: "",
          postal_code: "",
          country: "",
        },
      };
    }
    // Return null to indicate no change to state.
    return null;
  }
  componentDidMount() {
    this.props.getCountry();
    this.props.getCountryState();
    // for get all countries
    // this.props.getCountryState(item.name)
  }

  handleChange = (e) => {
    this.setState({
      customerDetails: {
        ...this.state.customerDetails,
        [e.target.name]: e.target.value,
      },
    });
  };

  onFormFinish = (e) => {
    e.preventDefault();
    const type = getStorage("type");
    const token = getStorage("token");
    let isVerfied = false;
    const obj = {
      ...this.state.customerDetails,
      type,
    };
    const myCity = this.state.customerDetails.city.toLocaleLowerCase();
    for (let i = 0; i < this.props.allCountryCities.length; i++) {
      const selectedCity = this.props.allCountryCities[i];
      const allCity = selectedCity.name
        ? selectedCity.name.toLocaleLowerCase()
        : "";
      if (myCity === allCity) {
        isVerfied = true;
        break;
      }
    }
    if (isVerfied) {
      // console.log(obj);
      if (
        this.state.customerDetails.full_name &&
        this.state.customerDetails.postal_code &&
        this.state.customerDetails.mobile_number &&
        this.state.customerDetails.address &&
        this.state.customerDetails.Suburb &&
        this.state.customerDetails.image
      ) {
        this.props.setImageInDriveForSupplier(obj, token);
        // console.log(obj);
      } else {
        sweetalert("error", "Please Fill Inputs Fields");
      }
    } else {
      sweetalert("error", "Please Select City");
    }
  };

  imageHandler = (event) => {
    if (event.target.files[0]) {
      this.setState({
        customerDetails: {
          ...this.state.customerDetails,
          image: event.target.files[0],
        },
      });
    } else {
      sweetalert("error", "Image not Selected");
    }
  };

  handleOnFocusInCuntry = () => {
    // for get all countries
    // const allCountries = this.props.allCountiries
    // for (let i = 0; i < allCountries.length; i++) {
    //     const ne = allCountries[i];
    //     if (ne.country_name) {
    //         const obj = {
    //             id: i,
    //             name: ne.country_name
    //         }
    //         allCountries[i] = obj
    //     }
    // }
    // this.setState({ renderAllCountries: allCountries })
  };
  handleOnFocusInState = () => {
    const allCountryState = this.props.allCountryState;
    for (let i = 0; i < allCountryState.length; i++) {
      const ne = allCountryState[i];
      if (ne.state_name) {
        const obj = {
          id: i,
          name: ne.state_name,
        };
        allCountryState[i] = obj;
      }
    }
    this.setState({ renderAllCountryState: allCountryState });
  };
  handleOnFocusInCity = () => {
    const allCountryCity = this.props.allCountryCities;
    for (let i = 0; i < allCountryCity.length; i++) {
      const ne = allCountryCity[i];
      if (ne.city_name) {
        const obj = {
          id: i,
          name: ne.city_name,
        };
        allCountryCity[i] = obj;
      }
    }
    this.setState({ renderAllCountryCity: allCountryCity });
  };

  handleOnSelectInCountry = (item) => {
    // for get all countries
    // the item selected
    // console.log(item.name);
    // this.setState({ selectedCountry: item.name })
    // this.props.getCountryState(item.name)
  };
  handleOnSelectInState = (item) => {
    // the item selected on autocomplete
    // this.setState({
    //     customerDetails: {
    //         ...this.state.customerDetails,
    //         state: item.name,
    //         country: 'Australia',
    //     }
    // })
    this.setState({
      customerDetails: {
        ...this.state.customerDetails,
        state: item.target.value,
        country: "Australia",
      },
    });
    // this.props.getCountryCity(item.name)
    this.props.getCountryCity(item.target.value);
  };
  handleOnSelectInCity = (item) => {
    // the item selected
    console.log(item.name);
    this.setState({
      customerDetails: {
        ...this.state.customerDetails,
        city: item.name,
      },
    });
    // this.setState({ selectedState: item.name })
  };

  handleOnSearchInCity = (item, cached) => {
    // onSearch returns the item searched and if
    // the values are cached. If the values are cached
    // "cached" contains the cached values, if not, returns false
    this.setState({
      customerDetails: {
        ...this.state.customerDetails,
        city: item,
      },
    });
  };

  render() {
    return (
      <div>
        <CustomerRegComponent
          onFormFinish={this.onFormFinish.bind(this)}
          customerDetails={this.state.customerDetails}
          isLoading={this.props.isLoading}
          // renderAllCountries={this.state.renderAllCountries}
          renderAllCountryState={this.state.renderAllCountryState}
          allCountryState={this.props.allCountryState}
          renderAllCountryCity={this.state.renderAllCountryCity}
          handleChange={this.handleChange.bind(this)}
          handleOnFocusInCuntry={this.handleOnFocusInCuntry.bind(this)}
          handleOnFocusInState={this.handleOnFocusInState.bind(this)}
          handleOnSelectInCountry={this.handleOnSelectInCountry.bind(this)}
          handleOnSelectInState={this.handleOnSelectInState.bind(this)}
          handleOnFocusInCity={this.handleOnFocusInCity.bind(this)}
          handleOnSelectInCity={this.handleOnSelectInCity.bind(this)}
          handleOnSearchInCity={this.handleOnSearchInCity.bind(this)}
          imageHandler={this.imageHandler.bind(this)}
          isCityFetch={this.props.isCityFetch}
          isStateFetch={this.props.isStateFetch}
          isCountryFetch={this.props.isCountryFetch}
        />
      </div>
    );
  }
}

const CustomerRegistration = (props) => {
  const { isAuthenticated, user } = useAuth0();
  return (
    <CustomerRegContainer
      allCountryCities={props.customers.allCountryCities}
      getCountryCity={props.getCountryCity}
      allCountryState={props.customers.allCountryState}
      getCountryState={props.getCountryState}
      allCountiries={props.customers.allCountiries}
      isCityFetch={props.customers.isCityFetch}
      isStateFetch={props.customers.isStateFetch}
      isCountryFetch={props.customers.isCountryFetch}
      getCountry={props.getCountry}
      setImageInDriveForSupplier={props.setImageInDriveForSupplier}
      user={user}
      isAuthenticated={isAuthenticated}
      setUser={props.setUser}
      isLoading={props.auth.isLoading}
    />
  );
};

const mapStateToProps = ({ auth, customers }) => {
  // customers.isCityFetch: false,
  // customers.isStateFetch: false,
  // customers.isCountryFetch: false,
  return { auth, customers };
};

export default connect(mapStateToProps, {
  setUser,
  getCountry,
  getCountryState,
  setImageInDriveForSupplier,
  getCountryCity,
})(CustomerRegistration);
