
const ClientType = {
  ANDROID: 'android',
  IOS: 'ios',
  WEB: 'web',
  TELEGRAM_BOT: 'telegram_bot',
};

// export const IP = 'http://localhost/eggmarket/code/service-core';
// export const IP = 'http://192.168.1.99/eggmarket/code/service-core';
export const IP = 'https://eggmarket.ir';

export const BASE_URL = `${IP}/API`;

export const BASE_CUSTOMER_URL = `${BASE_URL}/customers`;
export const BASE_LOAD_URL = `${BASE_URL}/loads`;
export const BASE_LOCATION_URL = `${BASE_URL}/locations`;
export const BASE_OTHERS_URL = `${BASE_URL}/others`;


export const checkMobileNumberURL = (mobileNumber) => `${BASE_CUSTOMER_URL}/check_number/${mobileNumber}/${ClientType.WEB}`;
export const confirmURL = (mobileNumber, code) => `${BASE_CUSTOMER_URL}/confirm/${mobileNumber}/${code}`;
export const completingCustomerDataURL = `${BASE_CUSTOMER_URL}/fill`;

export const getLoadersURL = () => `${BASE_LOAD_URL}/loaders/`;
export const getLoadsURL = () => `${BASE_LOAD_URL}/loads/`;

export const getPricesURL = (date) => `${BASE_URL}/prices/list/${date}`;

export const getProvincesURL = () => `${BASE_LOCATION_URL}/provinces/`;
export const getBookmarksURL = () => `${BASE_LOAD_URL}/bookmark_get`;
export const setLoadBookmarkedURL = `${BASE_LOAD_URL}/bookmark_set`;
export const removeLoadFromBookMarksURL = `${BASE_LOAD_URL}/bookmark_remove`;
export const renewConfirmCodeURL = (mobileNumber, type) => `${BASE_CUSTOMER_URL}/renew_confirm_code/${mobileNumber}/${type}`;
export const shareLoadURL = `${BASE_LOAD_URL}/share`;
export const getCustomerProfileURL = `${BASE_CUSTOMER_URL}/profile`;
export const getLoadDataURL = `${BASE_LOAD_URL}/load`;
export const getShortBookmarksURL = `${getBookmarksURL()}/short`;
export const getServerTime = `${BASE_OTHERS_URL}/server_time`;
export const getLoadContactURL = `${BASE_LOAD_URL}/get_contact/`;
export const logoutURL = `${BASE_CUSTOMER_URL}/logout`;
export const myLoadsURL = `${BASE_LOAD_URL}/my_loads`;
export const addLoadURL = `${BASE_LOAD_URL}/add`;
export const deleteLoadURL = `${BASE_LOAD_URL}/delete`;
export const loadStatsURL = `${BASE_LOAD_URL}/stats`;
export const editLoadURL = `${BASE_LOAD_URL}/edit`;
export const sendOffer = `${BASE_LOAD_URL}/offer`;
