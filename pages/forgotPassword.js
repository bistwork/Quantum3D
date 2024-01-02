import React, { useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import Form from "../components/Form";
import SignUpLabel from "../components/Sections/SignUp";
import Label from "../components/Label";
import ImageComponent from "../components/ImageComponent";
import validations from "../utils/validations";
import { resetPassword } from "aws-amplify/auth";
import withPublicAccess from "../hooks/withPublicAccess";

function Login() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [invalidCredential, setInvalidCredential] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();
    if (validations.email(email)) {
      try {
        const output = await resetPassword({ username: email });
        handleResetPasswordNextSteps(output);
        setInvalidCredential(false);
      } catch (error) {
        setInvalidCredential(true);
      }
    } else {
      setClicked(true);
      setValidEmail(false);
    }
  };

  function handleResetPasswordNextSteps(output) {
    const { nextStep } = output;
    switch (nextStep.resetPasswordStep) {
      case "CONFIRM_RESET_PASSWORD_WITH_CODE":
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        console.log(
          `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`
        );
        // Collect the confirmation code from the user and pass to confirmResetPassword.
        break;
      case "DONE":
        console.log("Successfully reset password.");
        break;
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (clicked) setValidEmail(validations.email(event.target.value));
  };

  const handleOnBlurEmail = () => {
    if (clicked) setValidEmail(validations.email(email));
  };

  return (
    <Form onSubmit={handleClick}>
      <Label
        fontSize="20px"
        component={"h5"}
        color="var(--font-color-v1)"
        fontWeight={550}
      >
        Forgot Password?
      </Label>
      <Label component={"p"} fontSize="13px" color="var(--font-color-v2)">
        Reset password with Pergalum
      </Label>
      <ImageComponent alt="Send email" src={"/email.png"}></ImageComponent>
      <Label marginBottom="15px" fontSize="13px" colored>
        Enter your email and instructions will be sent to you!
      </Label>

      <TextField
        name="email"
        type="email"
        placeholder="Enter email"
        helperText={<p>Email</p>}
        onChange={handleEmailChange}
        onBlur={handleOnBlurEmail}
        isValid={validEmail}
        autoComplete="email"
      />
      {invalidCredential && (
        <Label
          marginBottom="15px"
          fontSize="13px"
          sx={{
            color: "var(--error-color)",
            height: "2.8em!important",
            backgroundColor: "var(--light-error-color)",
          }}
        >
          The email you entered is not registered in our system...
        </Label>
      )}
      {!validEmail && (
        <Label
          marginBottom="15px"
          fontSize="13px"
          sx={{
            color: "var(--error-color)",
            height: "2.8em!important",
            backgroundColor: "var(--light-error-color)",
          }}
        >
          Please enter a valid email
        </Label>
      )}
      <Button type="submit" style={{ marginTop: "2em" }}>
        Send Reset Code
      </Button>

      <SignUpLabel
        sx={{ marginTop: "2em" }}
        text="Wait, I remember my password... "
        textLink="Click here"
        linkPage="/login"
      />
    </Form>
  );
}
export default withPublicAccess(Login);
