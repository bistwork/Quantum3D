export const isAuthenticated = () => {
  const cognitoClientId = process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID;

  const lastAuthUser = localStorage.getItem(
    `CognitoIdentityServiceProvider.${cognitoClientId}.LastAuthUser`
  );

  const idToken = localStorage.getItem(
    `CognitoIdentityServiceProvider.${cognitoClientId}.${lastAuthUser}.idToken`
  );

  const accessToken = localStorage.getItem(
    `CognitoIdentityServiceProvider.${cognitoClientId}.${lastAuthUser}.accessToken`
  );

  const authTimestamp = localStorage.getItem(
    `CognitoIdentityServiceProvider.${cognitoClientId}.${lastAuthUser}.authTimestamp`
  );

  const authenticationTimeout = 5 * 60 * 1000; // 5 minutes

  if (lastAuthUser && idToken && accessToken && authTimestamp) {
    const currentTime = new Date().getTime();
    const lastAuthTime = parseInt(authTimestamp, 10);

    if (currentTime - lastAuthTime < authenticationTimeout) {
      console.log("User authenticated");
      return true;
    }

    else{
      console.log("Authentication succeeded, but timestamp indicates logout")
      var cookies = document.cookie.split(";");

      cookies.forEach(function (cookie) {
        var parts = cookie.split("=");
        var cookieName = parts[0].trim();
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      });
    }
  }

  return false;
};


export const setAuthTimestamp = () => {
  const cognitoClientId = process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID;
  const lastAuthUser = localStorage.getItem(
    `CognitoIdentityServiceProvider.${cognitoClientId}.LastAuthUser`
  );

  if (lastAuthUser) {
    const authTimestamp = new Date().getTime().toString();
    localStorage.setItem(
      `CognitoIdentityServiceProvider.${cognitoClientId}.${lastAuthUser}.authTimestamp`,
      authTimestamp
    );
  }
};