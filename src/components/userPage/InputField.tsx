import { useState, useRef, useEffect } from "react";
import type { InputUserProps } from "../../types"

const InputField = ({ label, name, value, onChange, disabled, color = "#FFD580", type = "text" }: InputUserProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditable(true);
  };

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable]);

  const isCurrentlyDisabled = disabled || !isEditable;
  const currentBgColor = disabled ? "#e5e7eb" : (isEditable ? "#ffffff" : color);

  return (
    <div className="flex flex-col relative w-full group gap-1">
      <label 
         className="text-xl font-black text-black z-10"
      >
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={isCurrentlyDisabled}
          style={{ backgroundColor: currentBgColor }}
          onBlur={() => setIsEditable(false)}
          className={`w-full p-4 pr-24 border-2 border-black text-xl font-bold outline-none transition-all shadow-[4px_4px_0_0_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0_0_#000] focus:-translate-y-0.5 focus:-translate-x-0.5 focus:shadow-[6px_6px_0_0_#000] ${disabled ? 'text-gray-500' : 'text-black'}`}
        />
        {!disabled && !isEditable && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button 
              type="button" 
              onClick={handleEdit}
              className="bg-white border-2 border-black px-6 py-1.5 font-bold shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none tracking-wide text-black bg-white"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;