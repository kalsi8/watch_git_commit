import pubsub from './pubsub';
import { Platform } from 'react-native'
import { PUB_SUB_TOPICS } from '../constants/constants';

function showToast(text) {
  pubsub.publish('PUB_SUB_TOPICS.TOAST', text);
}

function showLoader(show) {
  pubsub.publish('PUB_SUB_TOPICS.SHOW_LOADER', show);
}

function isIOS() {
  return Platform.OS === 'ios';
}

export {showToast, showLoader, isIOS};
