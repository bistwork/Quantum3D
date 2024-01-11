// authHOC.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../utils/auth";
import { useAuth } from "@/context/auth-context";
import { getUserData } from "../utils/auth";
import { useOrders } from "@/context/orders-context";
import { fetchOrderNotifications } from "@/api/notifications";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const { login, user } =useAuth();
    const { setOrders } = useOrders();

    useEffect(() => {
      if (!isAuthenticated()) {
        Router.push("/login");
      } else {
        const data = getUserData()
        setAuthenticated(true);
        login(data);
        setOrders(fetchOrderNotifications(data?.id));
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