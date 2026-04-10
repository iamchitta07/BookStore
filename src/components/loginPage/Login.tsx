import LOGIN_IMG from "/images/Login.webp";
import LOGO from "/icons/LOGO_BLACK.svg";
import { useState, useEffect } from "react";
import { CheckBoxField, InputField, PasswordField, SubmitBox } from "../common/inputFields/InputField";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { loginUser } from "../../features/auth/authThunk";

const Login = () => {
  useEffect(() => {
    document.title = "Login | BookStore";
  }, []);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state: RootState) => state.auth);

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* ── Left Panel ── */}
      <div className="relative w-1/2 h-full shrink-0">
        {/* Logo overlay */}
        <div className="absolute top-10 left-14 z-10 flex items-center gap-3">
          <img src={LOGO} alt="BookStore Logo" className="h-12 w-12 object-contain" />
          <span className="font-bold text-4xl text-black leading-none">BookStore</span>
        </div>
        <img src={LOGIN_IMG} alt="Login Illustration" className="h-full w-full object-cover" />
      </div>

      {/* ── Right Panel ── */}
      <div className="w-1/2 h-full shrink-0 flex items-center justify-center bg-col-one">
        <div className="w-105 flex flex-col gap-6">
          {/* Heading */}
          <div>
            <h1 className="text-6xl font-bold text-black leading-tight">Login</h1>
            <p className="mt-1 text-base font-bold text-col-five">
              Welcome back! Please login to your account.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            {error && <div className="text-red-500 text-sm font-bold">{error}</div>}
            
            {/* User Name / Email */}
            <InputField 
              title="User Name/Email" 
              placeholder="your@email.com" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <PasswordField
              title="Password"
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Remember Me + Forget Password row */}
            <div className="flex items-center justify-between">
              <CheckBoxField agreed={agreed} setAgreed={setAgreed}>
                <span className="text-sm font-bold text-black">Remember Me</span>
              </CheckBoxField>
              <button type="button" className="text-sm font-bold cursor-pointer text-col-six">
                Forget password?
              </button>
            </div>

            {/* Login Button */}
            <SubmitBox title={loading ? "Logging in..." : "Login"} color="bg-primary-btn" />
            {/* Signup row */}
            <p className="text-sm font-bold text-black text-center">
              New user?{" "}
              <Link to="/signup" className="font-bold cursor-pointer text-col-six">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
