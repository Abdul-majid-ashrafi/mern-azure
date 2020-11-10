import { types } from "../types";

let initialState = {
  isLoading: false,
  isUserExist: false,
  isProfileSwitched: false,
  isProcessed: false,
  user: {},
  findAddresses: [],
  isAddressFinding: false,
  verifiedAddress: {},
  isAddressVerifying: false,
  // isVerificationEmailHasSend: false,
  // isAddressMatched: false
};

function authReducer(auth = initialState, action) {
  switch (action.type) {
    case types.GET_USER_START:
      return { ...auth, isLoading: true };
    case types.GET_USER_SUCCESS:
      return {
        isLoading: false,
        isUserExist: true,
        isProcessed: true,
        user: action.user,
      };
    case types.SWITCHED_PROFILE:
      return {
        isLoading: false,
        isProfileSwitched: true,
        isProcessed: true,
        user: action.user,
      };
    case types.GET_USER_FAILED:
      return { ...auth, isLoading: false, isProcessed: true };

    // for user creation
    case types.SET_USER_START:
      return { ...auth, isLoading: true };
    case types.SET_USER_SUCCESS:
      return {
        isLoading: false,
        isUserExist: true,
        isProcessed: true,
        user: action.user,
      };
    case types.SET_USER_FAILED:
      return { ...auth, isLoading: false, isProcessed: true };

    // for update user
    case types.UPDATE_USER_START:
      return { ...auth, isLoading: true };
    case types.UPDATE_USER_SUCCESS:
      return { ...auth, user: action.user };
    case types.UPDATE_USER_FAILED:
      return { ...auth, isLoading: false, isProcessed: true };

    // for address find
    case types.ADDRESS_FINDER_START:
      return { ...auth, isAddressFinding: true };
    case types.ADDRESS_FINDER_SUCCESS:
      return {
        ...auth,
        isAddressFinding: false,
        findAddresses: action.findAddress || [],
      };
    case types.ADDRESS_FINDER_FAILED:
      return { ...auth, isAddressFinding: false };

    // for address verification
    case types.ADDRESS_VERIFICATION_START:
      return { ...auth, isAddressVerifying: true };
    case types.ADDRESS_VERIFICATION_SUCCESS:
      return {
        ...auth,
        isAddressVerifying: false,
        verifiedAddress: action.verifiedAddress || {},
      };
    case types.ADDRESS_VERIFICATION_FAILED:
      return { ...auth, isAddressVerifying: false };

    // // for send verification email
    // case types.SHOW_VERIFICATION_EMAIL_POPUP:
    //   return { ...auth, isVerificationEmailHasSend: true };
    // case types.SEND_VERIFICATION_EMAIL_START:
    //   return { ...auth, isLoading: false, isProcessed: false };
    // case types.SEND_VERIFICATION_EMAIL_SUCCESS:
    //   return {
    //     ...auth,
    //     isVerificationEmailHasSend: true,
    //     isLoading: false,
    //     isProcessed: false,
    //   };
    // case types.SEND_VERIFICATION_EMAIL_FAILED:
    //   return {
    //     ...auth,
    //     isVerificationEmailHasSend: true,
    //     isLoading: false,
    //     isProcessed: false,
    //   };

    // case types.SEND_APPROVAL_EMAIL_START:
    //   return { ...auth, isLoading: false };
    // case types.SEND_APPROVAL_EMAIL_SUCCESS:
    //   return { ...auth, isLoading: false };
    // case types.SEND_APPROVAL_EMAIL_FAILED:
    //   return { ...auth, isLoading: false };

    default:
      return auth;
  }
}

export default authReducer;
