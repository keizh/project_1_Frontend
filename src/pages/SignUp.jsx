import { Input, Typography, Button } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useState, useEffect } from "react";

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Invalid email address." }),
  address: z.string(),
  password: z
    .string()
    .trim()
    .min(8, { message: "Must be 8 or more characters long." })
    .max(20, { message: "Must be 20 or fewer characters long." })
    .refine((val) => /[a-z]/.test(val), {
      message: "Must include at least one lowercase letter.",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Must include at least one uppercase letter.",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Must include at least one number.",
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Must include at least one special character.",
    }),
});

const SignUp = () => {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    email: "",
    address: "",
    password: "",
  };

  const initialErrorState = {
    name: [],
    email: [],
    address: [],
    password: [],
  };

  const initialServerMessage = { message: "", status: null };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(initialErrorState);
  const [loadingState, setLoadingState] = useState(false);
  const [serverMessage, setServerMessage] = useState(initialServerMessage);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoadingState(true);
    const successORfail = UserSchema.safeParse(formData);
    if (!successORfail.success) {
      setError(initialErrorState);
      successORfail.error.issues.forEach((err) =>
        setError((error) => ({
          ...error,
          [err.path[0]]: [...error[`${err.path[0]}`], err.message],
        }))
      );
      setLoadingState(false);
      //   console.log(successORfail);
    } else {
      setError(initialErrorState);
      const response = await fetch(
        `https://project-1-backend-v3.vercel.app/sign-up`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      // meaning the data was fetched correctly
      if (response.ok) {
        setServerMessage(data);
        setTimeout(() => {
          setLoadingState(false);
          setFormData(initialState);
          setError(initialErrorState);
          setServerMessage(initialServerMessage);
          navigate("/signin");
        }, 2000);
      } else {
        setLoadingState(false);
        setServerMessage(data);
      }
    }
  };

  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen flex flex-col  items-center justify-center pt-[80px] ">
      <form
        onSubmit={onSubmitHandler}
        onChange={onChangeHandler}
        className="w-[90%] sm:w-[350px] flex flex-col gap-[25px] text-center  py-4 px-2 rounded-lg"
      >
        <Typography variant="h3" color="blue-gray">
          Create an account
        </Typography>
        <Input
          label="name"
          type="text"
          name="name"
          value={formData.name}
          error={error.name.length > 0 ? true : false}
          required
          success={error.name.length == 0 && formData.name != ""}
        />
        <div>
          <Input
            label="email"
            name="email"
            value={formData.email}
            error={error.email.length > 0 ? true : false}
            required
            success={error.email.length == 0 && formData.email != ""}
          />
          <Typography
            variant="small"
            className="mt-2 text-center gap-1 text-[10px] text-red-500"
          >
            {error.email.map((ele, index) => (
              <span key={index}>
                {ele}
                <br />
              </span>
            ))}
          </Typography>
        </div>
        <Input
          label="address"
          type="address"
          name="address"
          value={formData.address}
          error={error.address.length > 0 ? true : false}
          required
          success={error.address.length == 0 && formData.address != ""}
        />
        <div>
          <Input
            label="password"
            type="password"
            name="password"
            value={formData.password}
            error={error.password.length > 0 ? true : false}
            success={error.password.length == 0 && formData.password != ""}
            required
          />
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 text-[10px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            Use at least 8 characters, one uppercase, one lowercase and one
            number & one special Character.
          </Typography>
          <Typography
            variant="small"
            className="mt-2 text-center gap-1 text-[10px] text-red-500"
          >
            {error.password.map((ele, index) => (
              <span key={index}>
                {ele}
                <br />
              </span>
            ))}
          </Typography>
        </div>
        <Button
          loading={loadingState}
          type="submit"
          className="flex justify-center gap-4 bg-green-500"
        >
          Sign-UP
        </Button>
        {serverMessage.message && serverMessage.status == "success" && (
          <div className="text-[15px] text-center bg-green-500 text-white py-2 rounded">
            {serverMessage.message}
          </div>
        )}
        {serverMessage.message && serverMessage.status == "error" && (
          <div className="text-[15px] text-center bg-red-500 text-white py-2 rounded">
            {serverMessage.message}
          </div>
        )}
      </form>
      <p className="mb-[60px] text-xs ">
        Already have an account ?{" "}
        <NavLink to="/signin" className="text-green-500 font-bold">
          Login
        </NavLink>
      </p>
    </div>
  );
};

export default SignUp;
