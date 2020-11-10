import { httpRequst } from "../../config";
import { types } from "../types";
import {
  sweetalert,
  removeStorage,
  screenLockEnable,
  screenLockDisable,
  getStorage,
} from "../../shared";
import Axios from "axios";

export const fetchUser = (payload, reload) => (dispatch) => {
  dispatch({ type: types.GET_USER_START });
  // start type for spining on ui
  console.log("START FETCH 1");
  screenLockEnable();
  httpRequst.get("/user/get", {
    headers: {
      email: payload.email,
      Authorization: `Bearer ${payload.token}`,
      type: payload.type,
    },
  })
    // send headers
    .then((response) => {
      screenLockDisable();
      console.log("START FETCH 2");
      if (response.data) {
        if (reload) {
          window.location.reload();
        }
        if (response.data.code) {
          if (getStorage("type")) {
            // set auth0 user
            dispatch({ type: types.SWITCHED_PROFILE, user: payload.user });
            // dispatch({ type: types.GET_USER_FAILED });
          } else {
            // if response have code its mean got an error
            // if (response.data.code !== '007') {
            //     sweetalert('error', response.data.message);
            // }
            dispatch({ type: types.GET_USER_FAILED });
          }
        } else {
          // fetchUser success
          const user = response.data;
          if (user.type === "supplier") {
            removeStorage("sid");
            removeStorage("kname");
          }
          dispatch({ type: types.GET_USER_SUCCESS, user });
          if (reload) {
            window.location.reload();
          }
          // dispatch({ type: types.SET_MENU_SUCCESS, menu: user.menu });
          // dispatch({ type: types.SET_MENU_MODAL_OFF });
        }
      } else {
        // fetchUser failed
        dispatch({ type: types.GET_USER_FAILED });
        sweetalert("error", "Something went wrong");
      }
    })
    .catch((error) => {
      screenLockDisable();
      // fetchUser failed
      sweetalert("error", error.message ? error.message : "Prosess Failed");
      dispatch({ type: types.GET_USER_FAILED });
    });
};

// export const sendVerificationEmail = (payload) => (dispatch) => {
//   // start type for spining on ui
//   dispatch({ type: types.SEND_VERIFICATION_EMAIL_START });
//   // headers:{
//   //     email : abc@gmail.com,
//   //     name: 'abc '
//   // }
//   httpRequst
//     .post("/universal/sendverificationemail", payload)
//     .then((response) => {
//       // console.log(response);
//       if (response.data) {
//         if (response.data.code) {
//           // if response have code its mean got an error
//           sweetalert("error", response.data.reason || response.data.message);
//           dispatch({ type: types.SEND_VERIFICATION_EMAIL_FAILED });
//         } else {
//           // sendVerificationEmail success
//           dispatch({ type: types.SEND_VERIFICATION_EMAIL_SUCCESS });
//           // sweetalert('success', response.data.message);
//         }
//       } else {
//         dispatch({ type: types.SEND_VERIFICATION_EMAIL_FAILED });
//         // sendVerificationEmail failed
//         sweetalert("error", "Something went wrong");
//       }
//     })
//     .catch((error) => {
//       dispatch({ type: types.SEND_VERIFICATION_EMAIL_FAILED });
//       // sendVerificationEmail failed
//       sweetalert("error", error.message ? error.message : "Prosess Failed");
//     });
// };

export const sendApprovalEmail = (payload) => (dispatch) => {
  // start type for spining on ui
  console.log(payload);
  //   dispatch({ type: types.SEND_APPROVAL_EMAIL_START });
  // payload:{
  //     email : abc@gmail.com,
  //     name: 'abc '
  // }
  const token = getStorage("token");
  httpRequst
    .post(
      "/supplier/sendaccountapprovalemail",
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
          //   dispatch({ type: types.SEND_APPROVAL_EMAIL_FAILED });
        } else {
          // sendVerificationEmail success
          //   dispatch({ type: types.SEND_APPROVAL_EMAIL_SUCCESS });
          sweetalert("success", response.data.message);
          // sweetalert('success', response.data.message);
        }
      } else {
        // dispatch({ type: types.SEND_APPROVAL_EMAIL_FAILED });
        // sendVerificationEmail failed
        sweetalert("error", "Something went wrong");
      }
    })
    .catch((error) => {
      dispatch({ type: types.SEND_APPROVAL_EMAIL_FAILED });
      // sendVerificationEmail failed
      sweetalert("error", error.message ? error.message : "Prosess Failed");
    });
};

export const setUser = (payload, token) => (dispatch) => {
  // lock screen
  screenLockEnable();
  // start type for spining on ui
  dispatch({ type: types.SET_USER_START });
  // send payload=body user data
  // send token in headers
  httpRequst
    .post("/user/create", payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    // send headers
    .then((response) => {
      screenLockDisable();
      // localStorage.removeItem("user");
      if (response.data) {
        if (response.data.code) {
          // if response have code its mean got an error
          // alert()
          sweetalert("error", response.data.message);
          dispatch({ type: types.SET_USER_FAILED });
        } else {
          // setUser success
          const user = response.data;
          console.log(user);
          if (user.type === "supplier") {
            const obj = {
              email: user.email,
              name: user.business,
            };
            console.log(obj);
            dispatch(sendApprovalEmail(obj));
          }
          dispatch({ type: types.SET_USER_SUCCESS, user });
        }
      } else {
        // setUser failed
        dispatch({ type: types.SET_USER_FAILED });
        sweetalert("error", "Something went wrong");
      }
    })
    .catch((error) => {
      screenLockDisable();
      // setUser failed
      sweetalert("error", error.message ? error.message : "Prosess Failed");
      dispatch({ type: types.SET_USER_FAILED });
    });
};

export const updateUser = (payload, headers) => (dispatch) => {
  // lock screen
  screenLockEnable();
  // start type for spining on ui
  dispatch({ type: types.UPDATE_USER_START });
  // send payload=body user data
  // send token in headers
  httpRequst
    .post("/universal/updateprofile", payload, { headers })
    // send headers
    .then((response) => {
      screenLockDisable();
      if (response.data) {
        if (response.data.code) {
          // if response have code its mean got an error
          // alert()
          sweetalert("error", response.data.message);
          dispatch({ type: types.UPDATE_USER_FAILED });
        } else {
          // updateUser success
          const user = response.data;
          // .log(user);
          dispatch({ type: types.UPDATE_USER_SUCCESS, user });
        }
      } else {
        // updateUser failed
        dispatch({ type: types.UPDATE_USER_FAILED });
        sweetalert("error", "Something went wrong");
      }
    })
    .catch((error) => {
      screenLockDisable();
      // updateUser failed
      sweetalert("error", error.message ? error.message : "Prosess Failed");
      dispatch({ type: types.UPDATE_USER_FAILED });
    });
};

export const addressFinder = (headers) => (dispatch) => {
  // start type for spining on ui
  dispatch({ type: types.ADDRESS_FINDER_START });
  // headers:{
  //     Authorization : token,
  //     address: 'karachi '
  // }
  httpRequst
    .get("/supplier/addressfinder", { headers })
    .then((response) => {
      if (response.data) {
        if (response.data.code) {
          // if response have code its mean got an error
          sweetalert("error", response.data.reason || response.data.message);
          dispatch({ type: types.ADDRESS_FINDER_FAILED });
        } else {
          // setUser success
          const findAddress = response.data;
          dispatch({ type: types.ADDRESS_FINDER_SUCCESS, findAddress });
        }
      } else {
        // setUser failed
        dispatch({ type: types.ADDRESS_FINDER_FAILED });
        sweetalert("error", "Something went wrong");
      }
    })
    .catch((error) => {
      // setUser failed
      sweetalert("error", error.message ? error.message : "Prosess Failed");
      dispatch({ type: types.ADDRESS_FINDER_FAILED });
    });
};

export const addressVerification = (headers) => (dispatch) => {
  // start type for spining on ui
  dispatch({ type: types.ADDRESS_VERIFICATION_START });
  // headers:{
  //     Authorization : token,
  //     address: 'karachi '
  // }
  httpRequst
    .get("/supplier/addressverification", { headers })
    .then((response) => {
      if (response.data) {
        if (response.data.code) {
          // if response have code its mean got an error
          sweetalert("error", response.data.message);
          dispatch({ type: types.ADDRESS_VERIFICATION_FAILED });
        } else {
          // setUser success
          const verifiedAddress = response.data;
          dispatch({
            type: types.ADDRESS_VERIFICATION_SUCCESS,
            verifiedAddress,
          });
        }
      } else {
        // setUser failed
        dispatch({ type: types.ADDRESS_VERIFICATION_FAILED });
        sweetalert("error", "Something went wrong");
      }
    })
    .catch((error) => {
      // setUser failed
      sweetalert("error", error.message ? error.message : "Prosess Failed");
      dispatch({ type: types.ADDRESS_VERIFICATION_FAILED });
    });
};

export const setImageInDriveForSupplier = (itemsObject, customer) => (dispatch) => {
  // send payload=body user data
  // send token in headers

  screenLockEnable();

  dispatch({ type: types.UPLOAD_IMAGE_IN_DRIVE_START });

  let token = getStorage("token");

  let requests = [];

  const FormData = require("form-data");

  if (itemsObject.passport_images) {
    const obj1 = new FormData();
    obj1.append("file", itemsObject.passport_images);
    obj1.append("category", "Supplier Passport");
    const requestOne = httpRequst.post("/uploadImage", obj1);
    requests.push(requestOne);
  }


  if (itemsObject.drivinglicense_images) {
    const obj2 = new FormData();
    obj2.append("file", itemsObject.drivinglicense_images);
    obj2.append("category", "Supplier Driving License");
    const requestTwo = httpRequst.post("/uploadImage", obj2);
    requests.push(requestTwo);
  }

  if (itemsObject.any_utility_bill_images) {
    const obj3 = new FormData();
    obj3.append("file", itemsObject.any_utility_bill_images);
    obj3.append("category", "Supplier Utility Bill");
    const requestThree = httpRequst.post("/uploadImage", obj3);
    requests.push(requestThree);
  }
  if (!customer) {
    if (itemsObject.image) {
      const obj4 = new FormData();
      obj4.append("file", itemsObject.image);
      obj4.append("category", "Supplier Profile");
      const requestFour = httpRequst.post("/uploadImage", obj4);
      requests.push(requestFour);
    }
  }
  if (customer) {
    const obj5 = new FormData();
    obj5.append("file", itemsObject.image);
    obj5.append("category", "Customer Profile");
    const requestFive = httpRequst.post("/uploadImage", obj5);
    requests.push(requestFive);
    console.log(requests);
  }

  let item = 0;
  Axios.all([requests])
    .then(Axios.spread((...responses) => {
      let categories = [];
      for (let i = 0; i < responses[0].length; i++) {
        responses[0][i].then((response) => {
          if (response.data.code) {
            // if response have code its mean got an error
            dispatch({ type: types.UPLOAD_IMAGE_IN_DRIVE_FAILED });
            sweetalert("error", response.data.reason || response.data.message);
          } else {
            dispatch({ type: types.UPLOAD_IMAGE_IN_DRIVE_SUCCESS });
            sweetalert("success", response.data.message);
            let key = "";
            if (response.data.category === "Supplier Passport") {
              key = "passport_images";
              categories.push(response.data.fileId);
            } else if (response.data.category === "Supplier Driving License") {
              key = "drivinglicense_images";
              categories.push(response.data.fileId);
            } else if (response.data.category === "Supplier Utility Bill") {
              key = "any_utility_bill_images";
              categories.push(response.data.fileId);
            } else if (response.data.category === "Supplier Profile") {
              key = "image";
              categories.push(response.data.fileId);
            } else if (response.data.category === "Customer Profile") {
              key = "image";
              categories.push(response.data.fileId);
            }
            itemsObject = {
              ...itemsObject,
              [key]: response.data.fileId,
            };
            item += 1;
            if (!customer) {
              if (item === responses[0].length) {
                dispatch(setUser(itemsObject, token));
              }
            } else {
              dispatch(setUser(itemsObject, token));
            }
          }
        });
      }
    })
    )
    .catch((error) => {
      //IMAGE UPLOAD FAILED
      sweetalert("error", error.message ? error.message : "Prosess Failed");
      dispatch({ type: types.UPLOAD_IMAGE_IN_DRIVE_FAILED });
    });
};
