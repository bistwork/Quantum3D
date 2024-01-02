// pages/404.js

import { useEffect } from "react";
import { signOut } from "aws-amplify/auth";

const NotFoundPage = () => {
  useEffect(() => {
    const signOutUser = async () => {
      await signOut({ global: true });
    };

    signOutUser();
  }, []);
  return (
    <div>
      <h1>404 - Not Fund</h1>
      <p>Sorry, the page you are looking for does not exit.</p>
    </div>
  );
};

export default NotFoundPage;

// pages/_error.js

// import React from 'react';

// const ErrorPage = ({ statusCode }) => {
//   return (
//     <div>
//       <h1>
//         {statusCode
//           ? `Error ${statusCode}`
//           : 'Un error ocurrió en el servidor'}
//       </h1>
//       <p>Lo sentimos, algo salió mal.</p>
//     </div>
//   );
// };

// ErrorPage.getInitialProps = ({ res, err }) => {
//   const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
//   return { statusCode };
// };

// export default ErrorPage;
