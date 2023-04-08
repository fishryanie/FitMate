/** @format */

import actions from '@store/actions';
import Storage from '@utils/storage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppState } from '@react-native-community/hooks';

export default function useBackgroundMessages() {
  const dispatch = useDispatch();
  const appState = useAppState();
  const accessToken = useSelector(state => state.user.accessToken);

  const handleDefaultMessage = async () => {
    try {
      const messageDefault = (await Storage.getItem('messageDefault')) || [];
      await Storage.removeItem('messageDefault');
    } catch (error) {}
  };

  useEffect(() => {
    if (appState === 'active') {
      handleDefaultMessage();
      if (accessToken) {
        dispatch({ type: actions.GET_USER_INFORMATION });
      }
    }
  }, [dispatch, accessToken, appState]);
}
