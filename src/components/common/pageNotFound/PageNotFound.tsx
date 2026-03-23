import { Link } from "react-router-dom";
import LOGO from "/icons/LOGO_BLACK.svg";

const PageNotFound = () => {
    return(
        <div className="h-screen w-screen flex flex-col bg-background overflow-hidden px-14 py-10 font-sans">
            {/* Logo */}
            <div className="flex items-center w-full">
                <Link to="/" className="flex items-center gap-3">
                    <img src={LOGO} alt="BookStore Logo" className="h-12 w-12 object-contain" />
                    <span className="font-bold text-4xl text-black leading-none">BookStore</span>
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center flex-1 w-full -mt-16">
                <div className="flex flex-col items-center">
                    {/* Text Group */}
                    <div className="flex flex-col items-start w-[497px] relative">
                        {/* 404 & Error Text */}
                        <div className="flex items-end gap-4 w-full">
                            <span 
                                className="text-[60px] font-bold text-black tracking-[6px] leading-[71.8px] mb-[15px]"
                            >
                                ERROR
                            </span>
                            <span 
                                className="text-[217.5px] font-bold text-col-three leading-[260px] tracking-[21px]"
                            >
                                404
                            </span>
                        </div>
                        
                        {/* Subheading */}
                        <div className="relative -mt-8">
                            <h2 className="text-[50px] font-bold text-black tracking-[1px] leading-[59.85px]">Something’s Missing Here!</h2>
                            {/* Decorative Line Underline */}
                            <div className="absolute left-[149px] bottom-[-5px] h-0.5 w-[199px] bg-black"></div>
                        </div>
                    </div>

                    {/* Button */}
                    <Link
                        to="/"
                        className="mt-[42px] w-[425px] h-[61px] flex items-center justify-center bg-col-seven border-2 border-black 
                        shadow-[6px_6px_0px_#000000] hover:shadow-[0px_0px_0px_#000000] active:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-1.5 active:translate-y-1.5
                        transition-all duration-200"
                    >
                        <span className="text-[40px] font-bold text-black leading-[47.88px]">Go Back to Home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;