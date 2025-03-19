import { useState } from "react";

export default function ModeSelect(props) {
    const [isOpen, setIsOpen] = useState(false);
    const difficulties = [
        { name: "Easy", value: 0.75 },
        { name: "Normal", value: 1 },
        { name: "Hard", value: 1.75 },
        { name: "Insane", value: 3 },
    ];
    const selectedMode = difficulties.find(d => d.value === props.mode);
    function handleSelect(difficulty) {
        setIsOpen(false);
        props.setMode(difficulty.value);
    };

    return (
        <div className="relative sm:w-80% w-40% text-white mx-auto mt-4">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 shadow-lg flex justify-between items-center transition-all duration-300 hover:shadow-xl"
        >
            {selectedMode.name}
            <span
            className={`ml-2 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
            }`}
            >
                ▼
            </span>
        </button>
      <div
        className={`absolute top-full left-0 w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-56 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {difficulties.map((difficulty) => (
          <div
            key={difficulty.value}
            className="px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800"
            onClick={() => handleSelect(difficulty)}
          >
            {difficulty.name}
          </div>
        ))}
      </div>
    </div>
  );
}
