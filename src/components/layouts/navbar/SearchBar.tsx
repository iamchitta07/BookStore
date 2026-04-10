import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/axios";
import type { BookResponse } from "../../../types";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BookResponse[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  // Fetch search results
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await api.get<BookResponse[]>("/books/", {
          params: { search: query, limit: 6 },
        });
        setResults(response.data);
        setIsOpen(true);
      } catch (error) {
        console.error("Failed to fetch search results", error);
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (book: BookResponse) => {
    setQuery(""); // Clear the search after selection, or keep book.title
    setIsOpen(false);
    navigate(`/product/${book.id}`);
  };

  const handleKeyDown = () => {
    // If we wanted to handle "Enter" to go to a full search page, we would do it here
    // But since no search page was defined, we'll just let the dropdown handle selection
  };

  return (
    <div className="flex flex-col w-300">
      <div ref={containerRef} className="relative w-full max-w-4xl">
        {/* Search Input */}
        <div className="group relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search Books, Authors or Publishers"
            className="w-full border-2 border-expired bg-background py-3 px-11 text-zinc-900 outline-hidden transition-all focus:border-black duration-300 focus:shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)]"
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
          {loading && (
            <div className="absolute inset-y-0 right-4 flex items-center">
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {isOpen && (
          <ul className="z-50 absolute mt-2 w-full overflow-hidden border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-background fade-in slide-in-from-top-1 max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              results.map((book) => (
                <li key={book.id} className="border-b border-gray-200 last:border-0">
                  <button
                    onClick={() => handleSelect(book)}
                    className="flex flex-col w-full px-4 py-3 text-left hover:bg-col-one transition-colors duration-200"
                  >
                    <span className="text-lg font-bold text-black">{book.title}</span>
                    <span className="text-sm font-semibold text-gray-600">by {book.author}</span>
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-4 text-center font-bold text-gray-500">
                No books found
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;