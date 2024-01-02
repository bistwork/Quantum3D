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

  if (lastAuthUser && idToken && accessToken) {
    console.log("user authenticated, new user authenticator");
    return true;
  }

  return false;
};
