const queryKeys = {
  AUTH: {
    '': 'auth',
    GET_ACCESS_TOKEN: 'getAccessToken',
    GET_PROFILE: 'getProfile',
  },
  ACCOUNT: {
    '': 'account',
    ACCOUNTNO: 'getAccountNo',
  },
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
} as const;

export {queryKeys, storageKeys};
