import { httpRequst } from "../../config";
import { types } from "../types";
import { sweetalert, setStorage, getStorage } from "../../shared";
import axios from "axios";

export const fetchCustomers = (payload) => (dispatch) => {
  dispatch({ type: types.GET_CUSTOMER_START });
  // start type for spining on ui
  // payload = {
  // userid : admin id
  // status : active / inactive
  // type : customer
  // Authorization: token
  // }
  httpRequst
    .get("/admin/fetchUser", { headers: payload })
    // send headers
    .then((response) => {
      if (response.data) {
        if (response.data.code) {
          // if response have code its mean got an error
          sweetalert("error", response.data.message);
          dispatch({ type: types.GET_CUSTOMER_FAILED });
        } else {
          // fetchUser success
          const customers = response.data;
          dispatch({ type: types.GET_CUSTOMER_SUCCESS, customers });
        }
      } else {
        // fetchUser failed
        dispatch({ type: types.GET_CUSTOMER_FAILED });
        sweetalert("error", "Something went wrong");
      }
    })
    .catch((error) => {
      // fetchUser failed
      sweetalert("error", error.message ? error.message : "Prosess Failed");
      dispatch({ type: types.GET_CUSTOMER_FAILED });
    });
};

export const SingleUserData = (payload) => (dispatch) => {
  dispatch({ type: types.SET_SINGLE_USERS_DATA, payload });
};

export const customerActivation = (payload) => (dispatch) => {
  dispatch({ type: types.SET_ACTIVATION_CUSTOMER_START });
  // start type for spining on ui
  // payload = {
  // userid : 'customerid'
  // adminId : admin id
  //type
  // status : active / inactive
  // Authorization: token,
  //   name,
  //   email
  // }

  const obj = {
    userid: payload.userid,
    adminid: payload.adminid,
    Authorization: payload.Authorization,
    status: payload.status,
    admin_type: payload.admin_type,
    type: payload.type,
  };
  console.log(obj);
  httpRequst.get("/admin/useractivation", { headers: obj })
    // send headers
    .then((response) => {
      if (response.data) {
        if (response.data.code) {
          // if response have code its mean got an error
          sweetalert("error", response.data.message);
          dispatch({ type: types.SET_ACTIVATION_CUSTOMER_FAILED });
        } else {
          // customerActivation success
          const customers = response.data;
          dispatch(sendCustomerConfirmationEmail(payload));
          dispatch({ type: types.SET_ACTIVATION_CUSTOMER_SUCCESS, customers });
        }
      } else {
        // customerActivation failed
        dispatch({ type: types.SET_ACTIVATION_CUSTOMER_FAILED });
        sweetalert("error", "Something went wrong");
      }
    })
    .catch((error) => {
      // customerActivation failed
      sweetalert("error", error.message ? error.message : "Prosess Failed");
      dispatch({ type: types.SET_ACTIVATION_CUSTOMER_FAILED });
    });
};

export const getCountry = () => (dispatch) => {
  // remove this line after uncommit get country api
  dispatch({ type: types.GET_STATE_START });
  // dispatch({ type: types.GET_COUNTRIES_START });
  const headers = {
    Accept: "application/json",
    "api-token":
      "ccmGQAH6D0d-cjTqCysvjXmJWU_jZZo8J4Lbr6UXbBX-O1BCv6CCPTVQ_9UvN9L3Ufg",
    "user-email": "supplier@gmail.com",
  };
  axios
    .get("https://www.universal-tutorial.com/api/getaccesstoken", { headers })
    .then((response) => {
      if (response.data.auth_token) {
        setStorage("countryApiToken", response.data.auth_token);
        // for get all countries
        // axios.get('https://www.universal-tutorial.com/api/countries', {
        //     headers: {
        //         "Authorization": `Bearer ${response.data.auth_token}`,
        //         "Accept": "application/json"
        //     }
        // })
        //     .then(response => {
        //         dispatch({ type: types.GET_COUNTRIES_SUCCESS, allCountiries: response.data });
        //     }).catch(error => {
        //         console.log(error);
        //     });

        // remove this line after uncommit get country api
        axios
          .get("https://www.universal-tutorial.com/api/states/Australia", {
            headers: {
              Authorization: `Bearer ${response.data.auth_token}`,
              Accept: "application/json",
            },
          })
          .then((response) => {
            if (response.data) {
              dispatch({
                type: types.GET_STATE_SUCCESS,
                allCountryState: response.data,
              });
            } else {
              dispatch({ type: types.GET_STATE_FAILED });
              sweetalert("error", "Get State Api Not Working");
            }
          })
          .catch((error) => {
            sweetalert("error", error);
            dispatch({ type: types.GET_STATE_FAILED });
          });
      } else {
        dispatch({ type: types.GET_COUNTRIES_FAILED });
        sweetalert("error", "Countery Api Not Working");
      }
    })
    .catch((error) => {
      sweetalert("error", "Somthing Went Wrong");
      dispatch({ type: types.GET_COUNTRIES_FAILED });
    });
};

export const getCountryState = (country) => (dispatch) => {
  // uncommit after uncommit get counter api /
  // dispatch({ type: types.GET_STATE_START });
  // const token = getStorage('countryApiToken')
  // const headers = {
  //     "Authorization": `Bearer ${token}`,
  //     "Accept": "application/json"
  // }
  // console.log(headers);
  // // axios.get(`https://www.universal-tutorial.com/api/states/${country}`, { headers })
  // axios.get('https://www.universal-tutorial.com/api/states/Australia', { headers })
  //     .then(response => {
  //         if (response.data) {
  //             dispatch({ type: types.GET_STATE_SUCCESS, allCountryState: response.data });
  //         } else {
  //             dispatch({ type: types.GET_STATE_FAILED });
  //             sweetalert('error', 'Get State Api Not Working');
  //         }
  //     }).catch(error => {
  //         sweetalert('error', error);
  //         dispatch({ type: types.GET_STATE_FAILED });
  //     });
};

export const getCountryCity = (state) => (dispatch) => {
  dispatch({ type: types.GET_CITY_START });
  const token = getStorage("countryApiToken");
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
  axios
    .get(`https://www.universal-tutorial.com/api/cities/${state}`, { headers })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: types.GET_CITY_SUCCESS,
          allCountryCities: response.data,
        });
      } else {
        dispatch({ type: types.GET_CITY_FAILED });
        sweetalert("error", "Get State Api Not Working");
      }
    })
    .catch((error) => {
      sweetalert("error", error);
      dispatch({ type: types.GET_CITY_FAILED });
    });
};

export const sendCustomerConfirmationEmail = (payload) => (dispatch) => {
  console.log(payload);
  // payload:{
  //     email : abc@gmail.com,
  //     name: 'abc '
  // }
  const token = getStorage("token");
  let api = "";
  if (payload.status === "active") {
    api = "/universal/sendaccountactivationemail";
  } else if (payload.status === "inactive") {
    api = "/universal/sendaccountinactivationemail";
  }
  httpRequst
    .post(
      api,
      {
        email: payload.email,
        name: payload.name,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      console.log(response);
      if (response.data) {
        if (response.data.code) {
          // if response have code its mean got an error
          sweetalert("error", response.data.reason || response.data.message);
        } else {
          // sendCustomerAccountEmail success
          sweetalert("success", response.data.message);
        }
      } else {
        // sendCustomerAccountEmail failed
        sweetalert("error", "Something went wrong");
      }
    })
    .catch((error) => {
      // sendCustomerAccountEmail failed
      sweetalert("error", error.message ? error.message : "Prosess Failed");
    });
};
