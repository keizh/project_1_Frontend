import { Input, Typography, Button } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Signin = () => {
  const navigate = useNavigate();
  const initialState = { email: "", password: "" };
  const initialMssg = {};
  const [data, setData] = useState(initialState);
  const [loadingState, setLoadingState] = useState(false);
  const [mssg, setMssg] = useState(initialMssg);
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoadingState(true);
    try {
      const response = await fetch(
        `https://project-1-backend-v3.vercel.app/sign-in`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const DATAfetched = await response.json();
      setMssg(DATAfetched);
      if (DATAfetched.status == "success") {
        localStorage.setItem("project_1", DATAfetched.token);
        console.log("Token stored:", localStorage.getItem("project_1"));
        setTimeout(() => {
          setData(initialState);
          setLoadingState(false);
          setMssg(initialMssg);
          navigate("/");
        }, 2000);
      } else if (DATAfetched.status == "Incorrect Email") {
        setTimeout(() => {
          setData(initialState);
          setLoadingState(false);
          setMssg(initialMssg);
          navigate("/signup");
        }, 2000);
      } else {
        setLoadingState(false);
      }
    } catch (err) {
      console.log(`backend : ${err.message}`);
      setLoadingState(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col  items-center justify-center pt-[80px] ">
      <form
        onSubmit={onSubmitHandler}
        onChange={onChangeHandler}
        className="w-[90%] sm:w-[350px] flex flex-col gap-[25px] text-center  py-4 px-2 rounded-lg"
      >
        <Typography variant="h3" color="blue-gray">
          Welcome back
        </Typography>
        <Input
          label="email"
          type="text"
          name="email"
          value={data.email}
          success={data.email !== ""}
          required
          error={mssg?.status == "Incorrect Email"}
        />
        <Input
          label="password"
          type="password"
          name="password"
          value={data.password}
          required
          error={mssg?.status == "failed"}
          success={data.password != ""}
        />

        <Button
          loading={loadingState}
          type="submit"
          className="flex justify-center gap-4 bg-green-500"
        >
          Continue
        </Button>
        {mssg && mssg?.status == "Incorrect Email" && (
          <div className="text-[15px] text-center bg-red-500 text-white py-2 rounded">
            {mssg.message}
          </div>
        )}
        {mssg && mssg?.status == "success" && (
          <div className="text-[15px] text-center bg-green-500 text-white py-2 rounded">
            {mssg.message}
          </div>
        )}
        {mssg && mssg?.status == "failed" && (
          <div className="text-[15px] text-center bg-red-500 text-white py-2 rounded">
            {mssg.message}
          </div>
        )}
      </form>
      <p className="mb-[60px] text-xs ">
        Don't have an account ?{" "}
        <NavLink to="/signup" className="text-green-500 font-bold">
          Sign Up
        </NavLink>
      </p>
    </div>
  );
};

export default Signin;
