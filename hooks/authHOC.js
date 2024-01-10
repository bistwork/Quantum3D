// authHOC.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../utils/auth";
import { useAuth } from "@/context/auth-context";
import { getUserData } from "../utils/auth";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const { login, user } =useAuth();
    useEffect(() => {
      if (!isAuthenticated()) {
        Router.push("/login");
      } else {
        setAuthenticated(true);
        login(getUserData());
        console.log("hook triggered",user)
      }
    }, [Router]);

    // if (!authenticated) {
    //   return <div>Please Login Before Continue...</div>;
    // }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;