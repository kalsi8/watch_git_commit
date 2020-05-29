import Axios from 'axios';
import {BASE_URL} from './url';
import {showLoader, showToast} from '../utils/utils';
import {decode as atob, encode as btoa} from 'base-64';
import {get} from 'lodash';

if (!global.atob) {
  global.atob = atob;
  global.btoa = btoa;
}
const axiosInstance = Axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(req => {
  showLoader(true);
  return req;
});

axiosInstance.interceptors.response.use(
  response => {
    showLoader(false);
    return response;
  },
  error => {
    showLoader(false);
    switch (error.response.status) {
      case 401:
        showToast(get(error, 'config.error.401.msg', 'unauthorized'));
        get(error, 'config.error.401.action', () => {})();
        break;
      case 404:
        showToast(get(error, 'config.error.404.msg', 'NOT FOUND'));
        get(error, 'config.error.401.action', () => {})();
    }
    return error;
  },
);

export default axiosInstance;
