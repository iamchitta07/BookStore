import { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { signupUser, loginUser } from "../../features/auth/authThunk";

import SIGNUP_IMG from "/images/Signup.webp";
import LOGO from "/icons/LOGO_BLACK.svg";
import {
  CheckBoxField,
  InputField,
  PasswordField,
  SubmitBox,
} from "../common/inputFields/InputField";

const Signup = () => {
  useEffect(() => {
    document.title = "Signup | BookStore";
  }, []);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state: RootState) => state.auth);

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    
    if (!firstName || !lastName || !email || !password || !agreed) {
      setLocalError("Please fill in required fields and agree to terms.");
      return;
    }
    
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      address: pin ? `${address}, ${pin}` : address,
      phone_number: phone
    };

    const resultAction = await dispatch(signupUser(payload));
    if (signupUser.fulfilled.match(resultAction)) {
      const loginAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(loginAction)) {
        navigate("/");
      } else {
        setLocalError("Signup successful, but login failed. Please go to login.");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* ── Left Panel (form) ── */}
      <div className="w-3/5 h-full shrink-0 flex flex-col bg-col-one px-14 py-10 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-7">
          <img src={LOGO} alt="BookStore Logo" className="h-12 w-12 object-contain" />
          <span className="font-bold text-4xl text-black leading-none">BookStore</span>
        </div>

        {/* Heading */}
        <div className="mb-5">
          <h1 className="text-5xl font-bold text-black leading-tight">Welcome to BookStore.</h1>
          <p className="mt-1 text-base font-bold text-black">Let's help you get started.</p>
          <p className="mt-2 text-sm font-bold text-black">
            Already have an account?{" "}
            <Link to="/login" className="text-col-six font-bold">
              Login
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          {(localError || error) && (
             <div className="text-red-500 text-sm font-bold">{localError || error}</div>
          )}
          {/* Row 1: First Name / Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <InputField title="First Name" type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
            <InputField title="Last Name" type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
          </div>

          {/* Row 2: Address / PIN */}
          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <InputField title="Address" type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
            <InputField title="PIN" type="text" placeholder="eg. 100 001" value={pin} onChange={e => setPin(e.target.value)} />
          </div>

          {/* Row 3: Email / Phone */}
          <div className="grid grid-cols-2 gap-4">
            <InputField title="Email" type="email" placeholder="test@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            <InputField title="Phone Number" type="tel" placeholder="+91 xxxxx xxxxx" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>

          {/* Row 4: Password / Confirm Password */}
          <div className="grid grid-cols-2 gap-4">
            <PasswordField
              title="Password"
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <PasswordField
              title="Confirm Password"
              showPassword={showConfirm}
              setShowPassword={setShowConfirm}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Terms & Policies */}
          <CheckBoxField agreed={agreed} setAgreed={setAgreed}>
            <span className="text-sm font-bold text-black">
              I agree with the{" "}
              <span className="text-col-six cursor-pointer hover:underline">
                Terms &amp; Policies
              </span>
            </span>
          </CheckBoxField>

          {/* Signup Button */}
          <SubmitBox title={loading ? "Signing up..." : "Signup"} color="bg-col-seven" />
        </form>
      </div>

      {/* ── Right Panel (illustration) ── */}
      <div className="w-2/5 h-full shrink-0">
        <img src={SIGNUP_IMG} alt="Signup Illustration" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default Signup;
