import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";
import { useEffect } from "react";
function EditProfileDetails() {
  const navigate = useNavigate();
  useEffect(() => {
    const authAccess = auth();
    console.log(`access : `, authAccess);
    if (!authAccess) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <div className="max-w-screen-xl mx-auto pt-[100px] px-4">
      <Typography variant="h1" color="blue" textGradient className="mb-5">
        Edit Profile Details
      </Typography>
      <Typography variant="paragraph">
        Thanks for being part of our MVP journey! We're working hard to build a
        great experience. Edit Profile Name, password & email are coming up
        soon.
      </Typography>
    </div>
  );
}

export default EditProfileDetails;
