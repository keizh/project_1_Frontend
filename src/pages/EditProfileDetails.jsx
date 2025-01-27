/* eslint-disable no-unused-vars */
import { Typography, Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../features/User/UserSlice";
import useThrottle from "../customHooks/useThrottle";

function EditProfileDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({ email: "", name: "", address: "" });
  const [canSubmit, setCanSubmit] = useState(true);

  const { email, name, address } = useSelector((state) => state.user);

  useEffect(() => {
    const authAccess = auth();
    console.log(`access : `, authAccess);
    if (!authAccess) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    if (email != "" || name != "" || address != "") {
      setData({ email, name, address });
    }
  }, [email, name, address]);

  const handle = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    // email != "" ||
    // address != "" ||
    // name != ""
    if (data.email != email || data.name != name || data.address != address) {
      setCanSubmit(true);
    } else if (canSubmit == true) {
      setCanSubmit(false);
    }
  }, [address, canSubmit, data, email, name]);

  const [triggered, setTriggered] = useState(0);
  const _ = useThrottle(
    triggered,
    () => {
      dispatch(updateUserData(data));
    },
    1500
  );

  const submitHandler = (e) => {
    e.preventDefault();
    setTriggered((prev) => prev + 1);
  };

  return (
    <div className="max-w-screen-xl mx-auto pt-[100px] px-4">
      <Typography variant="h1" color="blue" textGradient className="mb-5">
        Edit Profile Details
      </Typography>
      {/* <Typography variant="paragraph">
        Thanks for being part of our MVP journey! We're working hard to build a
        great experience. Edit Profile Name, password & email are coming up
        soon.
      </Typography> */}
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <Input
          required
          label="Name"
          value={data.name}
          name="name"
          onChange={handle}
        />
        <Input
          disabled={true}
          required
          label="Email"
          type="email"
          value={data.email}
          name="email"
          onChange={handle}
        />
        <Input
          required
          label="Address"
          value={data.address}
          name="address"
          onChange={handle}
        />
        <Button
          color={canSubmit ? "green" : "red"}
          disabled={!canSubmit}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default EditProfileDetails;
