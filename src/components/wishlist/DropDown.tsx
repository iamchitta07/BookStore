import { useState, type FC } from "react";
import { LuChevronDown } from "react-icons/lu";

interface GenreDropdownProps {
  options: string[];
  selected: string;
  onChange: (selected: string) => void;
}

const GenreDropdown: FC<GenreDropdownProps> = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="relative inline-block text-center w-80">
        {/* Trigger Button */}
        <h1 className="uppercase text-start font-bold text-2xl">Category</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-black bg-secondary-btn hover:shadow-[3px_3px_0px_rgba(255,197,103,1)] ${isOpen ? "shadow-[3px_3px_0px_rgba(255,197,103,1)]" : ""} border-2`}
        >
          <span className="text-center text-xl">{selected}</span>
          <LuChevronDown
            className={`absolute right-2 h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 z-10 mt-1 w-full origin-top-right bg-background border-2 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col items-center">
              {/* "All" Option */}
              <button
                onClick={() => {
                  onChange("All");
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-2 text-center text-xl text-black hover:bg-gray-100"
              >
                All
              </button>

              {/* Dynamic Options */}
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-center text-xl text-black hover:bg-gray-100"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenreDropdown;
