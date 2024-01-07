import "../styles/globals.css";
import IntroWrapper from "../components/IntroWrapper";
import MainWrapper from "../components/MainWrapper";
import ProvidersWrappers from "../components/ProvidersWrapper";
import { useRouter } from "next/router";
import { useEffect } from "react";
import awsconfig from "../aws-exports";
import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";
import { useAuth } from "../context/auth-context";
import { isAuthenticated } from "../utils/auth";

Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { logout } = useAuth();

  Hub.listen("auth", ({ payload }) => {
    switch (payload.event) {
      case "signedIn":
        console.log("user have been signedIn successfully.");
        break;
      case "signedOut":
        console.log("user have been signedOut successfully.");
        logout();
        router.push("/logout");
        break;
      case "tokenRefresh":
        console.log("auth tokens have been refreshed.");
        break;
      case "tokenRefresh_failure":
        console.log("failure while refreshing auth tokens.");
        break;
      case "signInWithRedirect":
        console.log("signInWithRedirect API has successfully been resolved.");
        break;
      case "signInWithRedirect_failure":
        console.log("failure while trying to resolve signInWithRedirect API.");
        break;
      case "customOAuthState":
        logger.info("custom state returned from CognitoHosted UI");
        break;
    }
  });

  const excludedRoutes = [
    "/login",
    "/signup",
    "/forgotPassword",
    "/",
    "/404",
    "/403",
    "/terms",
    "/privacy",
    "/logout",
    "/confirmation",
  ];

  const isExcludedRoute = excludedRoutes.includes(router.pathname);
  const isNewUserForm = router.pathname === "/new-user-form";

  return (
    <ProvidersWrappers>
      {isNewUserForm ? (
        <Component {...pageProps} />
      ) : isExcludedRoute ? ( 
        router.pathname != "/terms" ? (
        <IntroWrapper>
          <Component {...pageProps} />
        </IntroWrapper>
      ) : (<Component {...pageProps}/>) ): (
        <MainWrapper>
          <Component {...pageProps} />
        </MainWrapper>
      )}
    </ProvidersWrappers>
  );
}

export default MyApp;
