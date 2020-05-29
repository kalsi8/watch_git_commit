/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import pubsub from '../utils/pubsub';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { isIOS } from '../utils/utils';
import { PUB_SUB_TOPICS } from '../constants/constants';

const CommonViewSheet = new StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 1,
    marginBottom: 50,
    backgroundColor: '#000000',
    opacity: 0.7,
    borderRadius: 30,
  },
  text: {
    padding: 10,
    color: '#ffffff',
  },
  loaderContainer: {
    position: 'absolute',
    left: 0,
    right:0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    opacity: .5,
    backgroundColor: '#000000',
  },
});
function CommonView() {
  const [toast, setToast] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timeOut = 0;
    const unSubscribe = pubsub.subscribe('PUB_SUB_TOPICS.TOAST', data => {
      setToast(data);
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        setToast('');
      }, 1000);
    });
    return unSubscribe;
  }, []);

  useEffect(() => {
    const unSubscribe = pubsub.subscribe('PUB_SUB_TOPICS.SHOW_LOADER', data => {
      setShowLoader(data);
    });
    return unSubscribe;
  }, []);


  return (
    <React.Fragment>
      {showLoader ?
      <View style = {CommonViewSheet.loaderContainer}>
        <ActivityIndicator size={isIOS() ? 'large' : 100}/>
      </View> :
      null
      }
      {
    toast ?
      <View style={CommonViewSheet.container}>
        <Text style={CommonViewSheet.text}>{toast}</Text>
      </View>
     : null
      }
    </React.Fragment>
    );
}

export default CommonView;


