import React from "react";
import { IoSearch } from "react-icons/io5";

interface TopBarProps {
  input: string;
  setInput: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

const TopBar: React.FC<TopBarProps> = ({ input, setInput, onSearch }) => (
  <form
    onSubmit={onSearch}
    className="mb-6 flex items-center w-full h-14 px-4 py-2 rounded-full bg-sky-100 shadow focus-within:ring-2 focus-within:ring-blue-300"
  >
    <input
      type="text"
      className="flex-1 bg-transparent focus:outline-none text-2xl text-gray-500 placeholder-gray-500"
      placeholder="Hanoi"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
    <button type="submit" className="text-gray-500 hover:text-gray-700">
      <IoSearch size={28} />
    </button>
  </form>
);

export default TopBar;
