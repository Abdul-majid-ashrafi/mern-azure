export const types = {
  AUTH_START: "AUTH_START",
  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_FAILD: "AUTH_FAILD",

  GET_USER_START: "GET_USER_START",
  GET_USER_SUCCESS: "GET_USER_SUCCESS",
  GET_USER_FAILED: "GET_USER_FAILED",
  SWITCHED_PROFILE: "SWITCHED_PROFILE",

  SET_USER_START: "SET_USER_START",
  SET_USER_SUCCESS: "SET_USER_SUCCESS",
  SET_USER_FAILED: "SET_USER_FAILED",

  UPDATE_USER_START: "UPDATE_USER_START",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAILED: "UPDATE_USER_FAILED",

  GET_CUSTOMER_START: "GET_CUSTOMER_START",
  GET_CUSTOMER_SUCCESS: "GET_CUSTOMER_SUCCESS",
  GET_CUSTOMER_FAILED: "GET_CUSTOMER_FAILED",

  SET_ACTIVATION_CUSTOMER_START: "SET_ACTIVATION_CUSTOMER_START",
  SET_ACTIVATION_CUSTOMER_SUCCESS: "SET_ACTIVATION_CUSTOMER_SUCCESS",
  SET_ACTIVATION_CUSTOMER_FAILED: "SET_ACTIVATION_CUSTOMER_FAILED",

  GET_SUPPLIER_START: "GET_SUPPLIER_START",
  GET_SUPPLIER_SUCCESS: "GET_SUPPLIER_SUCCESS",
  GET_SUPPLIER_FAILED: "GET_SUPPLIER_FAILED",

  GET_ACTIVE_SUPPLIER_START: "GET_ACTIVE_SUPPLIER_START",
  GET_ACTIVE_SUPPLIER_SUCCESS: "GET_ACTIVE_SUPPLIER_SUCCESS",
  GET_ACTIVE_SUPPLIER_FAILED: "GET_ACTIVE_SUPPLIER_FAILED",

  GET_INACTIVE_SUPPLIER_START: "GET_INACTIVE_SUPPLIER_START",
  GET_INACTIVE_SUPPLIER_SUCCESS: "GET_INACTIVE_SUPPLIER_SUCCESS",
  GET_INACTIVE_SUPPLIER_FAILED: "GET_INACTIVE_SUPPLIER_FAILED",

  SET_ACTIVATION_SUPPLIER_START: "SET_ACTIVATION_SUPPLIER_START",
  SET_ACTIVATION_SUPPLIER_SUCCESS: "SET_ACTIVATION_SUPPLIER_SUCCESS",
  SET_ACTIVATION_SUPPLIER_FAILED: "SET_ACTIVATION_SUPPLIER_FAILED",

  SET_SINGLE_USERS_DATA: "SET_SINGLE_USERS_DATA",

  GET_MENU_ITEMS_START: "GET_MENU_ITEMS_START",
  GET_MENU_ITEMS_SUCCESS: "GET_MENU_ITEMS_SUCCESS",
  GET_MENU_ITEMS_FAILED: "GET_MENU_ITEMS_FAILED",

  SET_MENU_ITEMS_START: "SET_MENU_ITEMS_START",
  SET_MENU_ITEMS_SUCCESS: "SET_MENU_ITEMS_SUCCESS",
  SET_MENU_ITEMS_FAILED: "SET_MENU_ITEMS_FAILED",

  SET_DAILY_MENU_ITEMS_START: "SET_DAILY_MENU_ITEMS_START",
  SET_DAILY_MENU_ITEMS_SUCCESS: "SET_DAILY_MENU_ITEMS_SUCCESS",
  SET_DAILY_MENU_ITEMS_FAILED: "SET_DAILY_MENU_ITEMS_FAILED",

  UPDATE_DAILY_MENU_ITEMS_START: "UPDATE_DAILY_MENU_ITEMS_START",
  UPDATE_DAILY_MENU_ITEMS_SUCCESS: "UPDATE_DAILY_MENU_ITEMS_SUCCESS",
  UPDATE_DAILY_MENU_ITEMS_FAILED: "UPDATE_DAILY_MENU_ITEMS_FAILED",

  SET_DAILY_MENU_DEALS_START: "SET_DAILY_MENU_DEALS_START",
  SET_DAILY_MENU_DEALS_SUCCESS: "SET_DAILY_MENU_DEALS_SUCCESS",
  SET_DAILY_MENU_DEALS_FAILED: "SET_DAILY_MENU_DEALS_FAILED",

  SET_WEEKLY_MENU_DEALS_START: "SET_WEEKLY_MENU_DEALS_START",
  SET_WEEKLY_MENU_DEALS_SUCCESS: "SET_WEEKLY_MENU_DEALS_SUCCESS",
  SET_WEEKLY_MENU_DEALS_FAILED: "SET_WEEKLY_MENU_DEALS_FAILED",

  GET_MENU_START: "GET_MENU_START",
  GET_MENU_SUCCESS: "GET_MENU_SUCCESS",
  GET_MENU_FAILED: "GET_MENU_FAILED",

  SET_ACTIVATION_MENU_ITEM_START: "SET_ACTIVATION_MENU_ITEM_START",
  SET_ACTIVATION_MENU_ITEM_SUCCESS: "SET_ACTIVATION_MENU_ITEM_SUCCESS",
  SET_ACTIVATION_MENU_ITEM_FAILED: "SET_ACTIVATION_MENU_ITEM_FAILED",

  // for items update
  UPDATE_MENU_ITEM_START: "UPDATE_MENU_ITEM_START",
  UPDATE_MENU_ITEM_SUCCESS: "UPDATE_MENU_ITEM_SUCCESS",
  UPDATE_MENU_ITEM_FAILED: "UPDATE_MENU_ITEM_FAILED",

  // for items remove
  REMOVE_MENU_ITEM_START: "REMOVE_MENU_ITEM_START",
  REMOVE_MENU_ITEM_SUCCESS: "REMOVE_MENU_ITEM_SUCCESS",
  REMOVE_MENU_ITEM_FAILED: "REMOVE_MENU_ITEM_FAILED",

  // for daily menu items remove
  REMOVE_DAILY_MENU_START: "REMOVE_DAILY_MENU_START",
  REMOVE_DAILY_MENU_SUCCESS: "REMOVE_DAILY_MENU_SUCCESS",
  REMOVE_DAILY_MENU_FAILED: "REMOVE_DAILY_MENU_FAILED",

  // for deal remove
  REMOVE_MENU_DEAL_START: "REMOVE_MENU_DEAL_START",
  REMOVE_MENU_DEAL_SUCCESS: "REMOVE_MENU_DEAL_SUCCESS",
  REMOVE_MENU_DEAL_FAILED: "REMOVE_MENU_DEAL_FAILED",

  // for deal update
  UPDATE_MENU_DEAL_START: "UPDATE_MENU_DEAL_START",
  UPDATE_MENU_DEAL_SUCCESS: "UPDATE_MENU_DEAL_SUCCESS",
  UPDATE_MENU_DEAL_FAILED: "UPDATE_MENU_DEAL_FAILED",

  // for fetch kitchens
  GET_KITCHENS_START: "GET_KITCHENS_START",
  GET_KITCHENS_SUCCESS: "GET_KITCHENS_SUCCESS",
  GET_KITCHENS_FAILED: "GET_KITCHENS_FAILED",

  // for items orders
  ORDER_DISPATCH_START: "ORDER_DISPATCH_START",
  ORDER_DISPATCH_SUCCESS: "ORDER_DISPATCH_SUCCESS",
  ORDER_DISPATCH_FAILED: "ORDER_DISPATCH_FAILED",

  // for Deal orders
  DEAL_ORDER_DISPATCH_START: "DEAL_ORDER_DISPATCH_START",
  DEAL_ORDER_DISPATCH_SUCCESS: "DEAL_ORDER_DISPATCH_SUCCESS",
  DEAL_ORDER_DISPATCH_FAILED: "DEAL_ORDER_DISPATCH_FAILED",

  // for getting orders list from db
  GET_ORDERS_START: "GET_ORDERS_START",
  GET_ORDERS_SUCCESS: "GET_ORDERS_SUCCESS",
  GET_ORDERS_FAILED: "GET_ORDERS_FAILED",

  // get single order data
  GET_SINGLE_ORDER_DATA: "GET_SINGLE_ORDER_DATA",

  // for setting order status
  SET_ORDER_STATUS_START: "SET_ORDER_STATUS_START",
  SET_ORDER_STATUS_SUCCESS: "SET_ORDER_STATUS_SUCCESS",
  SET_ORDER_STATUS_FAILED: "SET_ORDER_STATUS_FAILED",

  // for dispatche and update orders locally
  ORDER_DISPATCH_LOCAL: "ORDER_DISPATCH_LOCAL",
  DELETE_ORDER_LOCAL: "DELETE_ORDER_LOCAL",
  CHANGE_QUANTITY_EXISTING_ORDER: "CHANGE_QUANTITY_EXISTING_ORDER",

  // for selected kitchen
  GET_SELECTED_KITCHEN_START: "GET_SELECTED_KITCHEN_START",
  GET_SELECTED_KITCHEN_SUCCESS: "GET_SELECTED_KITCHEN_SUCCESS",
  GET_SELECTED_KITCHEN_FAILED: "GET_SELECTED_KITCHEN_FAILED",

  ADDRESS_FINDER_START: "ADDRESS_FINDER_START",
  ADDRESS_FINDER_SUCCESS: "ADDRESS_FINDER_SUCCESS",
  ADDRESS_FINDER_FAILED: "ADDRESS_FINDER_FAILED",

  ADDRESS_VERIFICATION_START: "ADDRESS_VERIFICATION_START",
  ADDRESS_VERIFICATION_SUCCESS: "ADDRESS_VERIFICATION_SUCCESS",
  ADDRESS_VERIFICATION_FAILED: "ADDRESS_VERIFICATION_FAILED",

  ORDER_DISPATCH_LOCAL_STORAGE: "ORDER_DISPATCH_LOCAL_STORAGE",

  GET_IN_PROGRESS_ORDER: "GET_IN_PROGRESS_ORDER",
  GET_COMPLETE_ORDER: "GET_COMPLETE_ORDER",
  GET_CANCELED_ORDER: "GET_CANCELED_ORDER",

  GET_IN_PROGRESS_ORDER_FOR_ADMIN: "GET_IN_PROGRESS_ORDER_FOR_ADMIN",
  GET_COMPLETE_ORDER_FOR_ADMIN: "GET_COMPLETE_ORDER_FOR_ADMIN",
  GET_CANCELED_ORDER_FOR_ADMIN: "GET_CANCELED_ORDER_FOR_ADMIN",

  SET_KITCHEN_RATINGS_START: "SET_KITCHEN_RATINGS_START",
  SET_KITCHEN_RATINGS_SUCCESS: "SET_KITCHEN_RATINGS_SUCCESS",
  SET_KITCHEN_RATINGS_FAILED: "SET_KITCHEN_RATINGS_FAILED",

  // for uploading in image in drive
  UPLOAD_IMAGE_IN_DRIVE_START: "UPLOAD_IMAGE_IN_DRIVE_START",
  UPLOAD_IMAGE_IN_DRIVE_SUCCESS: "UPLOAD_IMAGE_IN_DRIVE_SUCCESS",
  UPLOAD_IMAGE_IN_DRIVE_FAILED: "UPLOAD_IMAGE_IN_DRIVE_FAILED",

  UPDATE_IMAGE_IN_DRIVE_START: "UPDATE_IMAGE_IN_DRIVE_START",
  UPDATE_IMAGE_IN_DRIVE_SUCCESS: "UPDATE_IMAGE_IN_DRIVE_SUCCESS",
  UPDATE_IMAGE_IN_DRIVE_FAILED: "UPDATE_IMAGE_IN_DRIVE_FAILED",

  REMOVE_MENU_ITEM_IMAGE_START: "REMOVE_MENU_ITEM_IMAGE_START",
  REMOVE_MENU_ITEM_IMAGE_SUCCESS: "REMOVE_MENU_ITEM_IMAGE_SUCCESS",
  REMOVE_MENU_ITEM_IMAGE_FAILED: "REMOVE_MENU_ITEM_IMAGE_FAILED",

  // for getting all menu irrespectfull of kitchen
  GET_ALL_KITCHENS_MENU_START: "GET_ALL_KITCHENS_MENU_START",
  GET_ALL_KITCHENS_MENU_SUCCESS: "GET_ALL_KITCHENS_MENU_SUCCESS",
  GET_ALL_KITCHENS_MENU_FAILED: "GET_ALL_KITCHENS_MENU_FAILED",

  SEARCH_KITCHEN_START: "SEARCH_KITCHEN_START",
  SEARCH_KITCHEN_SUCCESS: "SEARCH_KITCHEN_SUCCESS",
  SEARCH_KITCHEN_FAILED: "SEARCH_KITCHEN_FAILED",

  GET_COUNTRIES_START: "GET_COUNTRIES_START",
  GET_COUNTRIES_SUCCESS: "GET_COUNTRIES_SUCCESS",
  GET_COUNTRIES_FAILED: "GET_COUNTRIES_FAILED",

  GET_STATE_START: "GET_STATE_START",
  GET_STATE_SUCCESS: "GET_STATE_SUCCESS",
  GET_STATE_FAILED: "GET_STATE_FAILED",

  GET_CITY_START: "GET_CITY_START",
  GET_CITY_SUCCESS: "GET_CITY_SUCCESS",
  GET_CITY_FAILED: "GET_CITY_FAILED",

  CLEAR_SEARCH_KITCHEN_START: "CLEAR_SEARCH_KITCHEN_START",
  CLEAR_SEARCH_KITCHEN_SUCCESS: "CLEAR_SEARCH_KITCHEN_SUCCESS",
  CLEAR_SEARCH_KITCHEN_FAILED: "CLEAR_SEARCH_KITCHEN_FAILED",

  // SHOW_VERIFICATION_EMAIL_POPUP: "SHOW_VERIFICATION_EMAIL_POPUP",
  // SEND_VERIFICATION_EMAIL_START: "SEND_VERIFICATION_EMAIL_START",
  // SEND_VERIFICATION_EMAIL_SUCCESS: "SEND_VERIFICATION_EMAIL_SUCCESS",
  // SEND_VERIFICATION_EMAIL_FAILED: "SEND_VERIFICATION_EMAIL_FAILED",

  SEND_APPROVAL_EMAIL_START: "SEND_APPROVAL_EMAIL_START",
  SEND_APPROVAL_EMAIL_SUCCESS: "SEND_APPROVAL_EMAIL_SUCCESS",
  SEND_APPROVAL_EMAIL_FAILED: "SEND_APPROVAL_EMAIL_FAILED",

  SET_FEATURED_SUPPLIER_START: "SET_FEATURED_SUPPLIER_START",
  SET_FEATURED_SUPPLIER_SUCCESS: "SET_FEATURED_SUPPLIER_SUCCESS",
  SET_FEATURED_SUPPLIER_FAILED: "SET_FEATURED_SUPPLIER_FAILED",

  SET_SELECTED_SUPPLIER: "SET_SELECTED_SUPPLIER",

  SET_SUB_ADMIN_START: "SET_SUB_ADMIN_START",
  SET_SUB_ADMIN_SUCCESS: "SET_SUB_ADMIN_SUCCESS",
  SET_SUB_ADMIN_FAILED: "SET_SUB_ADMIN_FAILED",

  GET_SUB_ADMIN_START: "GET_SUB_ADMIN_START",
  GET_SUB_ADMIN_SUCCESS: "GET_SUB_ADMIN_SUCCESS",
  GET_SUB_ADMIN_FAILED: "GET_SUB_ADMIN_FAILED",

  SET_ACTIVATION_SUB_ADMIN_START: "SET_ACTIVATION_SUB_ADMIN_START",
  SET_ACTIVATION_SUB_ADMIN_SUCCESS: "SET_ACTIVATION_SUB_ADMIN_SUCCESS",
  SET_ACTIVATION_SUB_ADMIN_FAILED: "SET_ACTIVATION_SUB_ADMIN_FAILED",

  SELECTED_SUB_ADMIN_DATA: "SELECTED_SUB_ADMIN_DATA",
  
  REMOVE_SELECTED_KITCHEN_SUCCESS: "REMOVE_SELECTED_KITCHEN_SUCCESS",

  ADMIN_LOGIN_START: "ADMIN_LOGIN_START",
  ADMIN_LOGIN_SUCCESS: "ADMIN_LOGIN_SUCCESS",
  ADMIN_LOGIN_FAILED: "ADMIN_LOGIN_FAILED",

  // SET_MENU_START: "SET_MENU_START",
  // SET_MENU_SUCCESS: "SET_MENU_SUCCESS",
  // SET_MENU_FAILED: "SET_MENU_FAILED",
  // SET_MENU_MODAL_OFF: "SET_MENU_MODAL_OFF",
};
