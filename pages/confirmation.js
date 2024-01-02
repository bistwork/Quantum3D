import React, { useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import Form from "../components/Form";
import SignUpLabel from "../components/Sections/SignUp";
import Label from "../components/Label";
import ImageComponent from "../components/ImageComponent";
import validations from "../utils/validations";
import { confirmSignUp } from "aws-amplify/auth";
import { useRouter } from "next/router";
import { resendSignUpCode } from "aws-amplify/auth";
import withPublicAccess from "../hooks/withPublicAccess";

function Verification() {
  const router = useRouter();
  const email = router.query.email;
  const [code, setCode] = useState("");
  const [validCode, setValidCode] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const response = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      if (response.isSignUpComplete) {
        setIsEmailVerified(true);
        setValidCode(true);
      }
    } catch (error) {
      console.error("Error al confirmar el registro:", error);
      setValidCode(false);
    }
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleResendCode = async () => {
    try {
      await resendSignUpCode({ username: email });
      console.log("Code resent successfully");
    } catch (err) {
      console.error("Error resending code: ", err);
    }
  };

  return (
    <Form onSubmit={handleClick}>
      <Label
        fontSize="20px"
        component={"h5"}
        color="var(--font-color-v1)"
        fontWeight={550}
      >
        Email Verification
      </Label>
      {/* <Label component={"p"} fontSize="13px" color="var(--font-color-v2)">
        Reset password with Pergalum
      </Label> */}
      <ImageComponent alt="Send email" src={"/email.png"}></ImageComponent>
      <Label marginBottom="15px" fontSize="13px" colored>
        Enter the code sent to your email!
      </Label>

      <TextField
        name="code"
        type="text"
        placeholder="Enter code"
        helperText={<p>Code</p>}
        onChange={handleCodeChange}
        isValid
      />
      {!validCode && (
        <Label fontSize="13px" component={"h5"} color="red" fontWeight={400}>
          The code is incorrect...
        </Label>
      )}

      <Button type="submit" style={{ marginTop: "2em" }}>
        Verify
      </Button>

      <Button onClick={handleResendCode} style={{ marginTop: "2em" }}>
        Resend Code
      </Button>

      {isEmailVerified && (
        <SignUpLabel
          sx={{ marginTop: "2em" }}
          text="Your email have been confirmed successfully... "
          textLink="Click here"
          linkPage="/login"
        />
      )}
    </Form>
  );
}
export default withPublicAccess(Verification);
