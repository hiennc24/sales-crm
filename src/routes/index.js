import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMyLanguage,
  selectListLanguage,
  selectToken,
} from "../stores/global/global.selector";
import HomeScreen from "../pages/home/Home";
import LoginScreen from "../pages/login/Login";
import RegisterScreen from "../pages/register/Register";
import ForgotPassScreen from "../pages/forgot-password/ForgotPassword";
import VerifyInvite from "../pages/verify-invite/VerifyInvite";
import VerifyLink from "../pages/verify-link/VerifyLink";

import PAGES from "./constants";
import { MainRoutes } from "./MainRoutes";
import { Splash } from "../Splash";
import lang from "../lang";
import { getListLanguage } from "../stores/global/global.action";
import Loading from "../components/loading/Loading";
import {RecoilRoot} from 'recoil'
import ChatModal from "../components/chat-modal";

// console.log("process.env", process.env);
export const Routes = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const [isHome, setIsHome] = React.useState(true);
  const myLang = useSelector(selectMyLanguage());
  const listLang = useSelector(selectListLanguage());
  const token = useSelector(selectToken());
  

  

  useEffect(() => {

    if (window.location.hostname.split(".").length === 2) {
      setIsHome(true);
      setLoading(false);
    } else {
      setIsHome(false);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (listLang && !listLang.length) {
      dispatch(getListLanguage());
    }

    // console.log(token)

    if(token) {
      setIsHome(false);
    }
    else {
      setIsHome(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (token && listLang && !listLang.length) {
    return <Loading redirect />;
  }
  return (
    <IntlProvider locale={myLang} key={myLang} messages={lang[myLang]}>
                  <RecoilRoot>
                  <Switch>
        <Route path={PAGES.splash} component={Splash} exact />
        <Route path={PAGES.verifyInvite} component={VerifyInvite} exact />
        <Route path={PAGES.verifyLink} component={VerifyLink} exact />
        {!loading ? (
          isHome ? (
            <>
              {/* <Route path={PAGES.home} component={HomeScreen} exact /> */}
              <Route path={PAGES.login} component={LoginScreen} exact />
              <Route path={PAGES.register} component={RegisterScreen} exact />
              <Route
                path={PAGES.forgotPass}
                component={ForgotPassScreen}
                exact
              />
               <Redirect from="*" to={PAGES.login} />
            </>
          ) : (

            <>
            <ChatModal/>
            <MainRoutes />
            </>
          )
        ) : null}
      </Switch>
              </RecoilRoot>
     
    </IntlProvider>
  );
};
