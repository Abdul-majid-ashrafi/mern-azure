import { httpRequst } from "../../config";
import { types } from "../types";
import { getStorage, sweetalert } from "../../shared";

export const fetchSupplier = (payload) => (dispatch) => {
  dispatch({ type: types.GET_SUPPLIER_START });
  // start type for spining on ui
  // payload = {
  // userid : admin id
  // status : none/ active/inactive
  // type : supplier
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
          dispatch({ type: types.GET_SUPPLIER_FAILED });
        } else {
          // fetchSupplier success
          const suppliers = response.data;
          dispatch({ type: types.GET_SUPPLIER_SUCCESS, suppliers });
        }
      } else {
        // fetchSupplier failed
        dispatch({ type: types.GET_SUPPLIER_FAILED });
        sweetalert("error", "Something went wrong");
      }
    })
    .catch((error) => {
      // fetchSupplier failed
      sweetalert("error", error.message ? error.message : "Prosess Failed");
      dispatch({ type: types.GET_SUPPLIER_FAILED });
    });
};

export const supplierActivation = (payload) => (dispatch) => {
  dispatch({ type: types.SET_ACTIVATION_SUPPLIER_START });
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
    type: payload.type,
    admin_type: payload.admin_type
  };

  console.log(payload);
  httpRequst.get("/admin/useractivation", { headers: obj })
    // send headers
    .then((response) => {
      if (response.data) {
        if (response.data.code) {
          // if response have code its mean got an error
          sweetalert("error", response.data.message);
          dispatch({ type: types.SET_ACTIVATION_SUPPLIER_FAILED });
        } else {
          // supplierActivation success
          const supplier = response.data;
          dispatch(sendSupplierConfirmationEmail(payload));
          dispatch({ type: types.SET_ACTIVATION_SUPPLIER_SUCCESS, supplier });
        }
      } else {
        // supplierActivation failed
        dispatch({ type: types.SET_ACTIVATION_SUPPLIER_FAILED });
        sweetalert("error", "Something went wrong");
      }
    })
    .catch((error) => {
      // supplierActivation failed
      sweetalert("error", error.message ? error.message : "Prosess Failed");
      dispatch({ type: types.SET_ACTIVATION_SUPPLIER_FAILED });
    });
};

export const supplierFeatured = (headers) => (dispatch) => {
  // headers = {
  //   Authorization: `Bearer ${token}`,
  //   userid: user._id,
  //   featured: true,
  //   adminid: this.props.adminid
  // };
  dispatch({ type: types.SET_FEATURED_SUPPLIER_START });
  httpRequst.get("/admin/isallowfeatured", { headers })
    // send headers
    .then((response) => {
      if (response.data) {
        if (response.data.code) {
          // if response have code its mean got an error
          sweetalert("error", response.data.message);
          dispatch({ type: types.SET_FEATURED_SUPPLIER_FAILED });
        } else {
          // supplierFeatured success
          const supplier = response.data;
          dispatch({ type: types.SET_FEATURED_SUPPLIER_SUCCESS, supplier });
          if (supplier.featured) {
            sweetalert("success", "Featured Active Succefully");
          } else {
            sweetalert("success", "Featured Deactive Succefully");
          }
        }
      } else {
        // supplierFeatured failed
        dispatch({ type: types.SET_FEATURED_SUPPLIER_FAILED });
      }
    })
    .catch((error) => {
      // supplierFeatured failed
      sweetalert("error", error.message ? error.message : "Prosess Failed");
      dispatch({ type: types.SET_FEATURED_SUPPLIER_FAILED });
    });
};

export const SelectedSupplier = (payload) => (dispatch) => {
  dispatch({ type: types.SET_SELECTED_SUPPLIER, payload });
};


export const sendSupplierConfirmationEmail = (payload) => (dispatch) => {
  console.log(payload);
  // payload:{
  //     email : abc@gmail.com,
  //     name: 'abc '
  // }
  const token = getStorage("token");
  let api = "";
  if (payload.statusType === "Approve") {
    api = "/supplier/sendaccoutconfirmationemail";
  } else if (payload.statusType === "Reject") {
    api = "/supplier/sendaccountrejectionemail";
  } else if (payload.statusType === "active") {
    api = "/universal/sendaccountactivationemail";
  } else if (payload.statusType === "inactive") {
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
          // sendSupplierAccountEmail success
          sweetalert("success", response.data.message);
          // sweetalert('success', response.data.message);
        }
      } else {
        // sendSupplierAccountEmail failed
        sweetalert("error", "Something went wrong");
      }
    })
    .catch((error) => {
      // sendSupplierAccountEmail failed
      sweetalert("error", error.message ? error.message : "Prosess Failed");
    });
};
