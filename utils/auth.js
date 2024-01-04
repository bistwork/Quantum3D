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

  if (lastAuthUser && idToken && accessToken) {
    // const currentTime = new Date().getTime();
    // const sessionTimeout = 5 * 60 * 1000; // 5 minutes in milliseconds

    // if (currentTime - authTimestamp < sessionTimeout) {
      console.log("User authenticated",authTimestamp);
      return true;
    // }
  }

  return false;
};
