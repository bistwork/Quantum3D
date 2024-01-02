import { Typography, Button } from "@mui/material";
import { useAuth } from "../context/auth-context";
import withAuth from "../hooks/authHOC";

//we need username using redux or useContext
function DashBoard() {
  const { user } = useAuth();

  const handleClick = async () => {
    console.log("clicked", user);
  };

  return (
    <>
      <Typography paragraph>welcome {user?.fullName || "My name"}</Typography>
      <Typography paragraph>
        Here we are goin to put a lot of sections
      </Typography>
      <Button onClick={handleClick}>test</Button>
    </>
  );
}

export default withAuth(DashBoard);
