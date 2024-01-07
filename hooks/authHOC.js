// authHOC.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../utils/auth";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      if (!isAuthenticated()) {
        Router.push("/login");
      } else {
        setAuthenticated(true);
      }
    }, [Router]);

    // if (!authenticated) {
    //   return <div>Please Login Before Continue...</div>;
    // }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;