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

  const authenticationTimeout = 25 * 60 * 1000; // 15 minutes

  if (lastAuthUser && idToken && accessToken && authTimestamp) {

    // const {login} = useAuth();
    const currentTime = new Date().getTime();
    const lastAuthTime = parseInt(authTimestamp, 10);

    if (currentTime - lastAuthTime < authenticationTimeout) {
      console.log("User authenticated: Session still active", `Time lapsed: ${(currentTime - lastAuthTime)/(60 * 1000)} min`);
      return true;
    }

    else{
      console.log("Authentication succeeded, but timestamp indicates logout",`Time lapsed: ${(currentTime - lastAuthTime)/(60 * 1000)} min`)
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

export const setUserData = (data) => {
  const cognitoClientId = process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID;
  const lastAuthUser = localStorage.getItem(
    `CognitoIdentityServiceProvider.${cognitoClientId}.LastAuthUser`
  );

  if (lastAuthUser) {
    localStorage.setItem(
      `CognitoIdentityServiceProvider.${cognitoClientId}.${lastAuthUser}.userData`,
      JSON.stringify(data)
    );
  }
}

export const getUserData = () => {
  if (typeof window !== 'undefined') {
    const cognitoClientId = process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID;
    const lastAuthUser = localStorage.getItem(
      `CognitoIdentityServiceProvider.${cognitoClientId}.LastAuthUser`
    );
    const userDataString = localStorage.getItem(`CognitoIdentityServiceProvider.${cognitoClientId}.${lastAuthUser}.userData`);
    try{
      const userData = userDataString ? JSON.parse(userDataString) : null;
      console.log('retrieving data from storage',userData?userData:null);
      return userData
    }catch{
      console.log("not valid format");
      return null
    }
  }
  return null;
}