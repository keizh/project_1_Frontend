import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";
import { useEffect } from "react";
function Help() {
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
        Shopify Help Contact
      </Typography>
      <Typography variant="paragraph">
        Thanks for being part of our MVP journey! We're working hard to build a
        great experience. Full customer support is coming soon!
      </Typography>
    </div>
  );
}

export default Help;
