import React, { useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import Form from "../components/Form";
import CheckBox from "../components/CheckBox";
import Divider from "../components/Divider";
import SignUpLabel from "../components/Sections/SignUp";
import { useRouter } from "next/router";
import Label from "../components/Label";
import validations from "../utils/validations";
import { useAuth } from "../context/auth-context";
import PasswordVisibility from "../components/PasswordVisibility";
import useFormInput from "../hooks/useFormInput";
import { signIn, getCurrentUser } from "aws-amplify/auth";
import { Typography } from "@mui/material";
import { fetchUserData } from "../api/user";
import withPublicAccess from "../hooks/withPublicAccess";
import { setAuthTimestamp } from "@/utils/auth";
import { setUserData } from "@/utils/auth";

function Login() {
  const emailInput = useFormInput("", validations.email);
  const passwordInput = useFormInput("", validations.password);
  const [showPassword, setShowPassword] = useState(false);
  const [invalidCredentials, setInvalidCredential] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleClick = async (event) => {
    event.preventDefault();

    // Verify before iniciate section
    const isEmailValid = validations.email(emailInput.value);
    const isPasswordValid = validations.password(passwordInput.value);

    if (!isEmailValid) {
      emailInput.triggerOnChangeValidation();
    }

    if (!isPasswordValid) {
      passwordInput.triggerOnChangeValidation();
    }

    if (isEmailValid && isPasswordValid && emailInput.value.trim() !== "") {
      try {
        const { isSignedIn, nextStep } = await signIn({
          username: emailInput.value,
          password: passwordInput.value,
        });

        if (isSignedIn) {
          const { userId } = await getCurrentUser();
          fetchUserData(userId)
            .then((data) => {
              setUserData(data);
              return login(data);
            })
            .then(() => {
              setAuthTimestamp();
              // redirection after the context
              router.push("/profile");
            })
            .catch((error) => {
              console.log("Login error", error);
            });
          } else if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
            router.push(
              `/confirmation?email=${encodeURIComponent(emailInput.value)}`
              );
            }
            setInvalidCredential(false);
          } 
          catch (error) {
            if(error.message.includes("There is already a signed in user.")){
              console.log("logging in...");
              setAuthTimestamp();
              router.push("/profile");
            }
            else{
              console.error("Error al iniciar sesión:", error);
            }
        setInvalidCredential(true);
      }
    }
  };

  return (
    <Form onSubmit={handleClick}>
      <Label
        fontSize="20px"
        component={"h5"}
        fontWeight={550}
        color={"var(--font-color-v1)"}
      >
        Welcome Back
      </Label>
      <Label component={"p"} fontSize="13px" color={"var(--font-color-v2)"}>
        Sign In to continue with Oasis Patio Systems
      </Label>
      <TextField
        topTextField
        required
        type="email"
        placeholder="Enter email address"
        name="email"
        helperText={<p>Email</p>}
        value={emailInput.value}
        isValid={emailInput.isValid}
        onChange={emailInput.onChange}
        autoComplete="email"
      />
      <TextField
        sx={{ mb: 2 }}
        forgotPassword
        required
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Enter password"
        helperText={<p>Password</p>}
        isValid={passwordInput.isValid}
        onChange={passwordInput.onChange}
        autoComplete="current-password"
        InputProps={{
          endAdornment: (
            <PasswordVisibility
              onChangeType={(visibility) => setShowPassword(visibility)}
            />
          ),
        }}
      />
      {invalidCredentials && (
        <Typography
          color="var(--error-color)"
          fontFamily="var(--primary-font-family)"
          fontSize="13px"
          mt={1}
        >
          Invalid Credentials
        </Typography>
      )}
      <div style={{ height: "6px" }}></div>
      <CheckBox label="Remember me"></CheckBox>
      <div style={{ height: "12px" }}></div>
      <Button type="submit" sx={{ height: "2.7em" }}>
        Sign in
      </Button>
      <Divider sx={{ marginTop: "2em" }} />
      <SignUpLabel
        sx={{ marginTop: "2em" }}
        text="Don't have an account ? "
        textLink="SignUp"
        linkPage="/signup"
      />
    </Form>
  );
}
export default withPublicAccess(Login);
