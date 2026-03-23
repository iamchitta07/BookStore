import { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
// Mock data for suggestions
const SUGGESTIONS = [
  "Tailwind CSS v4 features",
  "React performance optimization",
  "Bun runtime vs Node.js",
  "TypeScript generic patterns",
  "Edge computing explained",
  "Server Components guide",
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle filtering (Simulating an API call)
  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const filtered = SUGGESTIONS.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase()),
      );
      setResults(filtered);
      setIsOpen(true);
    }, 150); // 150ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="flex flex-col w-300">
      <div ref={containerRef} className="relative w-full max-w-4xl">
        {/* Search Input */}
        <div className="group relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 0 && setIsOpen(true)}
            placeholder="Search Books, Authors or Publishers"
            className="w-full border-2 border-expired bg-background py-3 px-11  text-zinc-900 outline-hidden transition-all focus:border-black duration-300 focus:shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)]"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-expired group-focus-within:text-black">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button className="absolute inset-y-1.5 right-2 border-2 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] flex items-center h-10 w-10 justify-center bg-secondary-btn text-black">
            <FaFilter />
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {isOpen && results.length > 0 && (
          <ul className="absolute mt-2 w-full overflow-hidden border border-black bg-background shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-backgroud fade-in slide-in-from-top-1">
            {results.map((suggestion, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setQuery(suggestion);
                    setIsOpen(false);
                  }}
                  className="flex w-full px-4 py-2 text-left text-md text-zinc-800 hover:text-black hover:bg-col-one"
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default SearchBar;