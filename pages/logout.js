import { Box } from "@mui/material";
import Label from "../components/Label";
import Button from "../components/Button";
import { useRouter } from "next/router";
import withPublicAccess from "../hooks/withPublicAccess";

function CustomLogoutIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="59"
      height="59"
      fill="currentColor"
      className="bi bi-box-arrow-right"
      viewBox="0 0 16 16"
    >
      <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
      <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
    </svg>
  );
}

function Logout() {
  const router = useRouter();

  const handleOnclick = (e) => {
    router.push(`/login`);
  };

  return (
    <Box width={"80%"}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
        <CustomLogoutIcon />
      </Box>
      <Label
        fontSize="20px"
        component={"h5"}
        color="var(--font-color-v1)"
        fontWeight={550}
      >
        You are Logged Out
      </Label>
      <Label component={"p"} fontSize="13px" color="var(--font-color-v2)">
        Thank you for using Pergalum.
      </Label>
      <Button fullWidth style={{ marginTop: "2em" }} onClick={handleOnclick}>
        Sing in
      </Button>
    </Box>
  );
}
export default withPublicAccess(Logout);
