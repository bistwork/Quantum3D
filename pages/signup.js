import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import Form from "../components/Form";
import TermOfUse from "../components/Sections/TermOfUse";
import Divider from "../components/Divider";
import SignUpLabel from "../components/Sections/SignUp";
import Label from "../components/Label";
import validations from "../utils/validations";
import PasswordVisibility from "../components/PasswordVisibility";
import useFormInput from "../hooks/useFormInput";
import { useRouter } from "next/router";
import { signUp } from "aws-amplify/auth";
import withPublicAccess from "../hooks/withPublicAccess";

function Signup() {
  const emailInput = useFormInput("", validations.email);
  const fullNameInput = useFormInput("", validations.fullName);
  const companyNameInput = useFormInput("", validations.validateNotEmpty);
  const zipcodeInput = useFormInput("", validations.isValidUSZipCode);
  const passwordInput = useFormInput("", validations.password);
  const reEnteredPassword = useFormInput("", validations.password);

  const [showPassword, setShowPassword] = useState(false);
  const [showReEnteredPassword, setShowReEnteredPassword] = useState(false);
  const [passWordMatch, setPasswordMatch] = useState(false);

  const router = useRouter();

  const handleClick = async (event) => {
    event.preventDefault();

    let allFieldsValid = true;

    // Verify before iniciate section
    const isEmailValid = validations.email(emailInput.value);
    const isFullNameValid = validations.fullName(fullNameInput.value);
    const isCompanyNameValid = validations.validateNotEmpty(
      companyNameInput.value
    );
    const isZipcodeValid = validations.isValidUSZipCode(zipcodeInput.value);
    const isPasswordValid = validations.password(passwordInput.value);
    const isReEntredPasswordValid = validations.password(
      reEnteredPassword.value
    );

    if (!isEmailValid) {
      emailInput.triggerOnChangeValidation();
      allFieldsValid = false;
    }

    if (!isFullNameValid) {
      fullNameInput.triggerOnChangeValidation();
      allFieldsValid = false;
    }

    if (!isCompanyNameValid) {
      companyNameInput.triggerOnChangeValidation();
      allFieldsValid = false;
    }

    if (!isZipcodeValid) {
      zipcodeInput.triggerOnChangeValidation();
      allFieldsValid = false;
    }

    if (!isPasswordValid) {
      passwordInput.triggerOnChangeValidation();
      allFieldsValid = false;
    }

    if (!isReEntredPasswordValid) {
      reEnteredPassword.triggerOnChangeValidation();
      allFieldsValid = false;
    }

    if (allFieldsValid && passWordMatch) {
      try {
        const { userId } = await signUp({
          username: emailInput.value,
          password: passwordInput.value,
          options: {
            userAttributes: {
              email: emailInput.value,
              "custom:companyName": companyNameInput.value,
              "custom:fullName": fullNameInput.value,
              "custom:zipcode": zipcodeInput.value,
            },
          },
        });
        console.log("user created", userId);
        router.push(
          `/confirmation?email=${encodeURIComponent(emailInput.value)}`
        );
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
      }
    }
  };

  useEffect(() => {
    if (passwordInput.value && reEnteredPassword.value) {
      if (
        validations.password(passwordInput.value) &&
        validations.password(reEnteredPassword.value)
      ) {
        setPasswordMatch(passwordInput.value === reEnteredPassword.value);
      } else {
        setPasswordMatch(false);
      }
    }
  }, [passwordInput.value, reEnteredPassword.value]);

  return (
    <Form onSubmit={handleClick}>
      <Label fontSize="1.5em" component={"h5"}>
        Become a Dealer
      </Label>
      <Label component={"p"}>Get your free Dealer account now</Label>

      <TextField
        required
        type="email"
        placeholder="Enter email address"
        name="email"
        helperText={<p>Email</p>}
        isValid={emailInput.isValid}
        value={emailInput.value}
        onChange={emailInput.onChange}
        autoComplete="email"
      />

      <TextField
        required
        type="text"
        placeholder="Enter your full name"
        name="fullName"
        helperText={<p>Full Name</p>}
        isValid={fullNameInput.isValid}
        value={fullNameInput.value}
        onChange={fullNameInput.onChange}
        autoComplete="name"
      />

      <TextField
        required
        type="text"
        placeholder="Enter your Company Name"
        name="company"
        helperText={<p>Company Name</p>}
        isValid={companyNameInput.isValid}
        value={companyNameInput.value}
        onChange={companyNameInput.onChange}
        autoComplete="organization"
      />
      <TextField
        required
        type="number"
        placeholder="Enter your Zipcode"
        name="zipcode"
        helperText={<p>Zipcode</p>}
        isValid={zipcodeInput.isValid}
        value={zipcodeInput.value}
        onChange={zipcodeInput.onChange}
        autoComplete="postal-code"
      />

      <TextField
        required
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Enter password"
        helperText={<p>Password</p>}
        isValid={passwordInput.isValid}
        onChange={passwordInput.onChange}
        autoComplete="new-password"
        InputProps={{
          endAdornment: (
            <PasswordVisibility
              onChangeType={(visibility) => setShowPassword(visibility)}
            />
          ),
        }}
      />

      <TextField
        isMatched={passWordMatch}
        required
        type={showReEnteredPassword ? "text" : "password"}
        name="password"
        placeholder="Re-Enter password"
        helperText={<p>Confirm Password</p>}
        isValid={reEnteredPassword.isValid}
        onChange={reEnteredPassword.onChange}
        autoComplete="new-password"
        InputProps={{
          endAdornment: (
            <PasswordVisibility
              onChangeType={(visibility) =>
                setShowReEnteredPassword(visibility)
              }
            />
          ),
        }}
      />

      <TermOfUse
        sx={{ margin: "1em 0" }}
        text="By registering you agree to the Pergalum "
        textLink="Terms of Use"
        linkPage="/terms"
      />

      <Button type="submit">Sign Up</Button>

      <Divider sx={{ marginTop: "2em" }} />

      <SignUpLabel
        sx={{ marginTop: "2em" }}
        text="Already have an account? "
        textLink="SignIn"
        linkPage="/login"
      />
    </Form>
  );
}

export default withPublicAccess(Signup);
