/** @format */

import appleAuth from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import jwtDecode from 'jwt-decode';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager, Settings } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

//GoogleSignin.configure();
//Settings.initializeSDK();

const getFacebookCredential = async () => {
  const data = await AccessToken.getCurrentAccessToken();
  if (data) {
    return auth.FacebookAuthProvider.credential(data.accessToken);
  } else {
    return new Promise((resolve, reject) => {
      LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        async result => {
          if (result.isCancelled) {
            reject('USER CANCEL');
          } else {
            const token = await AccessToken.getCurrentAccessToken();
            resolve(auth.FacebookAuthProvider.credential(token.accessToken));
          }
        },
        function (err) {
          reject(err);
        }
      );
    });
  }
};

const facebookLogin = async () => {
  const data = await AccessToken.getCurrentAccessToken();
  if (data) {
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    return auth().signInWithCredential(facebookCredential);
  } else {
    return new Promise((resolve, reject) => {
      LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        async result => {
          if (result.isCancelled) {
            reject('USER CANCEL');
          } else {
            const token = await AccessToken.getCurrentAccessToken();
            const facebookCredential = auth.FacebookAuthProvider.credential(token.accessToken);
            resolve(auth().signInWithCredential(facebookCredential));
          }
        },
        function (err) {
          reject(err);
        }
      );
    });
  }
};

const getGoogleCredential = async () => {
  const currentUser = await GoogleSignin.getCurrentUser();
  if (currentUser) {
    return auth.GoogleAuthProvider.credential(currentUser.idToken);
  }
  const { idToken } = await GoogleSignin.signIn();
  return auth.GoogleAuthProvider.credential(idToken);
};

const googleLogin = async () => {
  const currentUser = await GoogleSignin.getCurrentUser();
  if (currentUser) {
    const googleCredential = auth.GoogleAuthProvider.credential(currentUser.idToken);
    return auth().signInWithCredential(googleCredential);
  }
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};

const getAppleCredential = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }

  const { identityToken, nonce } = appleAuthRequestResponse;
  return auth.AppleAuthProvider.credential(identityToken, nonce);
};

const socialLogin = async getCredential => {
  try {
    const credential = await getCredential();
    const data = await auth().signInWithCredential(credential);
    return data.user.providerData[0];
  } catch (error) {
    throw error;
  } finally {
    auth().signOut();
  }
};

const appleLogin = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }

  const { identityToken, nonce } = appleAuthRequestResponse;
  return auth.AppleAuthProvider.credential(identityToken, nonce);
};

export default function useSocialLogin() {
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(_user => {
      if (_user) {
        setUser(_user.providerData[0]);
      } else {
        setUser(null);
      }
    });
    return subscriber;
  }, []);

  useEffect(() => {
    return () => {
      auth().signOut();
    };
  }, []);

  return { user, facebookLogin, googleLogin, appleLogin };
}
