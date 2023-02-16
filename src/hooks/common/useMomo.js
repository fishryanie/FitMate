/** @format */

import { useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import RNMomosdk from 'react-native-momosdk';
const RNMomosdkModule = NativeModules.RNMomosdk;
const EventEmitter = new NativeEventEmitter(RNMomosdkModule);

const MOMO_DEFAULT_DATA = {
  action: 'gettoken', //DO NOT EDIT
  partner: 'merchant', //DO NOT EDIT
  merchantname: 'RUBY',
  merchantnamelabel: 'Nhà cung cấp',
  enviroment: '0', //"0": SANBOX , "1": PRODUCTION
  orderLabel: 'Mã đơn hàng',
  appScheme: 'partnerSchemeId',
};

export default function useMomo() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const tokenReceived = EventEmitter.addListener('RCTMoMoNoficationCenterRequestTokenReceived', response => {
      try {
        if (response) {
          setResult(response);
        } else {
          throw new Error('Invalid Momo response ');
        }
      } catch (ex) {
        setResult({ status: -1, error: ex });
      }
    });

    const tokenState = EventEmitter.addListener('RCTMoMoNoficationCenterRequestTokenState', response => {
      if (__DEV__) {
        console.log('MOMO STATE STATUS: ', response);
      }
    });

    return () => {
      tokenReceived?.remove?.();
      tokenState?.remove?.();
    };
  }, []);

  useEffect(() => {
    if (__DEV__ && result) {
      console.log('MOMO RESULT: ', result);
    }
  }, [result]);

  const requestPayment = async ({
    merchantcode = '',
    orderId = '',
    amount = 0,
    description = '',
    merchantnamelabel = MOMO_DEFAULT_DATA.action,
    orderLabel = MOMO_DEFAULT_DATA.orderLabel,
    ...params
  }) => {
    setResult(null);
    const data = {
      ...MOMO_DEFAULT_DATA,
      merchantcode,
      merchantnamelabel,
      description: description || `Thanh toán qua MoMo cho đơn hàng ${orderId}`,
      orderId,
      orderLabel,
      amount: +amount,
      ...params,
    };
    if (Platform.OS === 'ios') {
      data.appScheme = MOMO_DEFAULT_DATA.appScheme;
      RNMomosdk.requestPayment(data);
    } else {
      try {
        const response = await RNMomosdk.requestPayment(data);
        if (response) {
          setResult(response);
        } else {
          throw new Error('Invalid Momo response ');
        }
      } catch (error) {
        setResult({ status: -1, error });
      }
    }
  };

  return { requestPayment, result };
}
