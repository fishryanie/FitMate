/** @format */

import dynamicLinks from '@react-native-firebase/dynamic-links';
import { authRoot } from '@routes/Ref';
import router from '@routes/router';
import actions from '@store/actions';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useLinkOpenApp() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo.data);
  const [link, setLink] = useState(null);

  useEffect(() => {
    if (link) {
      const invite = queryString.parseUrl(link.url).query?.invite;
      dispatch({ type: actions.SAVE_INVITE_CODE, data: invite });
      if (!userInfo) {
        authRoot.navigate(router.REGISTER_SCREEN);
      }
    }
  }, [link, dispatch]);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(_link => {
        if (__DEV__) {
          console.log('LINK OPEN APP FROM QUIT STATE: ', _link);
        }
        setLink(_link);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(_link => {
      if (__DEV__) {
        console.log('LINK OPEN APP FROM BACKGROUND STATE: ', _link);
      }
      setLink(_link);
    });
    return unsubscribe;
  }, []);

  return link;
}
