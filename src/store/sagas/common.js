/** @format */

export const URL_API = {
  getConfigsApp: 'app/get-configs',

  user: {
    login: 'auth/login',
    checkPhone: 'checkPhone',
    sendOTP: 'sendOTP',
    logoutUser: 'logoutUser',
    getUser: 'auth/get-one-user',
    updateAvatar: 'updateUser',
    updateUser: 'auth/update-one-user',
    updatePassword: 'updatePassword',
  },

  address: {
    getLocation: 'app/get-location',
    addSavedLocation: 'addSavedLocation',
    deleteSavedLocation: 'deleteSavedLocation',
    updateSavedLocation: 'updateSavedLocation',
    getSavedLocation: 'getSavedLocation',
    getSavedLocationType: 'getSavedLocationType',
  },
};
