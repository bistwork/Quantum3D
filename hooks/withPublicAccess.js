// withPublicAccess.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../utils/auth";
import { useAuth } from "@/context/auth-context";

const withPublicAccess = (WrappedComponent, redirectTo = "/profile") => {
  return (props) => {
    const Router = useRouter();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
      if (isAuthenticated()) {
        // Si el usuario está autenticado y está en una página restringida, redirige
        const restrictedPages = [
          "/login",
          "/signup",
          "/forgotPassword",
          "/",
          "/404",
          "/403",
          "/terms",
          "/logout",
          "/confirmation",
          "/new-user-form",
          "/privacy",
        ]; // Agrega aquí las rutas restringidas
        if (restrictedPages.includes(Router.pathname)) {
          Router.push(redirectTo);
        } else {
          setIsAuthChecked(true);
        }
      } else {
        // Usuario no autenticado, permite acceso
        setIsAuthChecked(true);
      }
    }, [Router]);

    if (!isAuthChecked) {
      // Muestra un spinner o un mensaje mientras se verifica la autenticación
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withPublicAccess;
