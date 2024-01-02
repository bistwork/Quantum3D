import TextField from "../../TextField";
import { Grid } from "@mui/material";
import ConfirmationBtn from "../../ConfirmationBtn";
import { useState, useEffect } from "react";
import validations from "../../../utils/validations";
import useFormInput from "../../../hooks/useFormInput";
import PasswordVisibility from "../../PasswordVisibility";

export default function ChangePassword(props) {
  const oldPasswordInput = useFormInput("", validations.password);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const passwordInput = useFormInput("", validations.password);
  const [showPassword, setShowPassword] = useState(false);
  const reEnteredPassword = useFormInput("", validations.password);
  const [showReEnteredPassword, setShowReEnteredPassword] = useState(false);
  const [arePasswordsCorrect, setArePasswordsCorrect] = useState(false);

  const setNewPassword = () => {};

  useEffect(() => {
    if (
      passwordInput.isValid &&
      reEnteredPassword.isValid &&
      passwordInput.value === reEnteredPassword.value &&
      passwordInput.value !== "" &&
      reEnteredPassword.value !== ""
    ) {
      setArePasswordsCorrect(true);
    } else {
      setArePasswordsCorrect(false);
    }
  }, [
    passwordInput.isValid,
    reEnteredPassword.isValid,
    passwordInput.value,
    reEnteredPassword.value,
  ]);

  const handleOldPasswordChange = oldPasswordInput.onChange;
  const handleOnBlurOldPassword = oldPasswordInput.onBlur;
  const handlePasswordChange = passwordInput.onChange;
  const handleOnBlurPassword = passwordInput.onBlur;
  const handleReEnteredPasswordChange = reEnteredPassword.onChange;
  const handleOnBlurReEnteredPassword = reEnteredPassword.onBlur;

  return (
    <form onSubmit={setNewPassword} style={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            autoComplete="current-password"
            fullWidth
            name="password"
            placeholder="Enter current password"
            helperText={<p>Old Password</p>}
            type={showOldPassword ? "text" : "password"}
            required
            isValid={oldPasswordInput.isValid}
            onChange={handleOldPasswordChange}
            onBlur={handleOnBlurOldPassword}
            InputProps={{
              endAdornment: (
                <PasswordVisibility
                  onChangeType={(visibility) => setShowOldPassword(visibility)}
                />
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            autoComplete="new-password"
            fullWidth
            name="password"
            placeholder="Enter new password"
            helperText={<p>New Password</p>}
            type={showPassword ? "text" : "password"}
            required
            nonCopyable
            isValid={passwordInput.isValid}
            onChange={handlePasswordChange}
            onBlur={handleOnBlurPassword}
            InputProps={{
              endAdornment: (
                <PasswordVisibility
                  onChangeType={(visibility) => setShowPassword(visibility)}
                />
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            autoComplete="new-password"
            fullWidth
            name="password"
            placeholder="Confirm password"
            helperText={<p>Confirm Password</p>}
            type={showReEnteredPassword ? "text" : "password"}
            required
            isValid={reEnteredPassword.isValid}
            onChange={handleReEnteredPasswordChange}
            onBlur={handleOnBlurReEnteredPassword}
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
        </Grid>
      </Grid>
      <ConfirmationBtn
        type={"submit"}
        marginTop="1em"
        disabled={!arePasswordsCorrect}
      >
        Change Password
      </ConfirmationBtn>
    </form>
  );
}
