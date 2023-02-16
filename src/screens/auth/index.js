import router from "routes/router";
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'

export const auth = {
  [router.LOGIN_SCREEN]: LoginScreen,
  [router.REGISTER_SCREEN]: RegisterScreen,
}