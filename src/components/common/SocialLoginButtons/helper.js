import appleAuth from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager, Settings} from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId:
    '325445204277-i8r79abfn5g2bcfjfr0bpgi9juabptpe.apps.googleusercontent.com',
});
Settings.initializeSDK();

const getFacebookCredential = () => {
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
      },
    );
  });
};

const getGoogleCredential = async () => {
  // const currentUser = await GoogleSignin.getCurrentUser();
  // if (currentUser.idToken) {
  //   return auth.GoogleAuthProvider.credential(currentUser.idToken);
  // }
  const {idToken} = await GoogleSignin.signIn();
  return auth.GoogleAuthProvider.credential(idToken);
};

const getAppleCredential = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }

  const {identityToken, nonce} = appleAuthRequestResponse;
  return auth.AppleAuthProvider.credential(identityToken, nonce);
};

const socialLogin = getCredential => async () => {
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

const facebookLogin = socialLogin(getFacebookCredential);
const appleLogin = socialLogin(getAppleCredential);
const googleLogin = socialLogin(getGoogleCredential);

export {facebookLogin, appleLogin, googleLogin};
