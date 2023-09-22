"use client";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "/context/Context";
import { useRouter } from "next/navigation";
// import ReCAPTCHA from "react-google-recaptcha";

const SignForm = ({}) => {
  const [captcha, setCaptcha] = useState(false);

  const { setUser, errors, setErrors } = useContext(Context);
  const router = useRouter();
  const { textClr } = useContext(Context);
  const [signForm, setSignForm] = useState({
    username: "",
    password: "",
    name: "",
    email: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignForm((prevState) => ({ ...prevState, [name]: value }));
  };

  // const onCapChange = (value) => {
  //   if (value) {
  //     setCaptcha(true);
  //   }
  //   else {
  //     setCaptcha(false);
  //   }
  // }

  const handleLogin = async (e) => {
    console.log("YO")
    e.preventDefault();
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: signForm.username,
          password: signForm.password,
          name: signForm.name,
          email: signForm.email
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, handle success scenario here (e.g., redirect)
        console.log("Login successful!");
        console.log(data)
      } else {
        // Login failed, set the errors state to display error messages
        setErrors([data.error]);
        console.log(data.error)
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors(["Something went wrong during login"]);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-trueblue font-extrabold text-5xl">
        <span>CREATE NEW ACCOUNT</span>
      </h1>
      <h1 className="text-trueblue font-extrabold text-2xl">
        <span>Blog</span>
      </h1>
      {errors.length > 0 && (
        <div className="text-red-500">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <form className="flex flex-col gap-2" onSubmit={handleLogin}>
        <label className="">
          <span className="">Username</span>
          <input
            name="username"
            value={signForm.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="form_input"
          />
        </label>
        <label className="">
          <span className="">Password:</span>
          <input
            name="password"
            type="password"
            value={signForm.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
            className="form_input"
          />
        </label>
        <label className="">
          <span className="">Name:</span>
          <input
            name="name"
            value={signForm.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
            className="form_input"
          />
        </label>
        <label className="">
          <span className="">Email:</span>
          <input
            name="email"
            value={signForm.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
            className="form_input"
          />
        </label>
        <div className="w-full flex justify-around">
          {/* <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onCapChange}
          /> */}
          <button
            id="signin-submit"
            type="submit"
            style={{ color: "red" }}
            className="mt-2 px-5 py-1.5 bg-accentColorB hover:bg-truebluedark rounded-lg"
            // disabled={!captcha}
          >
            SUBMIT
          </button>
          <p className="mt-2 px-5 py-1.5 text-gray-500 cursor-pointer">
            CANCEL
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignForm;
