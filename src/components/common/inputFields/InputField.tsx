import type { FC } from "react";
import type { InputFieldProps, PasswordProps, CheckBoxProps } from "../../../types";

const classProps = "w-full px-4 h-12 text-sm font-medium text-black outline-none border-2 border-black rounded-none bg-background transition-shadow duration-150 hover:shadow-[4px_4px_0px_#000] focus:shadow-[4px_4px_0px_#000]"

const InputField: FC<InputFieldProps> = ({ title, type, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-bold text-black">{title}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={classProps}
      />
    </div>
  );
};

const PasswordField: FC<PasswordProps> = ({ title, showPassword, setShowPassword, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-bold text-black">{title}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={value}
          onChange={onChange}
          className={classProps}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-black opacity-60 hover:opacity-100 text-xs font-bold cursor-pointer"
        >
          {showPassword ? "HIDE" : "SHOW"}
        </button>
      </div>
    </div>
  );
};

const CheckBoxField: FC<CheckBoxProps> = ({ agreed, setAgreed, children }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none group">
      <input
        type="checkbox"
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
        className="appearance-none h-5 w-5 border-2 border-black rounded-none
                  checked:bg-col-six checked:border-black
                  transition-shadow duration-150
                  group-hover:shadow-[2px_2px_0px_#000]
                  shrink-0 cursor-pointer bg-white"
      />
      {children}
    </label>
  );
};

export interface SubmitProps {
  title: string;
  color: string;
}

const SubmitBox: FC<SubmitProps> = ({ title, color }) => {
  return (
    <button
      type="submit"
      className={`w-full h-12 font-bold text-base text-black border-2 border-black rounded-none
                cursor-pointer transition-all duration-150 ${color}
                shadow-[4px_4px_0px_rgba(0,0,0,1)]
                hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none
                active:translate-x-1 active:translate-y-1`}
    >
      {title}
    </button>
  );
};

export { InputField, PasswordField, CheckBoxField, SubmitBox };
