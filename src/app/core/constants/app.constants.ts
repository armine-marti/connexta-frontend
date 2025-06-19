
export const AppConstants = {

  pagination: {
    pageSize: 10,
    pageNumber: 1
  },

  routes: {
    admin: '/admin',
    user: '/contacts',
    register: '/register',
    login: '/login'
  },

  storageKeys: {
    token: 'token',
    userType: 'userType'
  },

  userDefaults: {
    status: 'ACTIVE_USER'
  },

  validation: {
    PHONE: /^\+?[0-9]{10,15}$/
  }


};
