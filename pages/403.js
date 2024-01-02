import React from "react";

const ForbiddenPage = () => {
  return (
    <div>
      <h1>403 - Forbidden Access</h1>
      <p>You do not have permission to access this page.</p>
    </div>
  );
};

export default ForbiddenPage;

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
