import React, { useState } from 'react';

interface CustomSelectProps {
  options: string[];
  onChange: (value: string) => void;
}

const EntitySelector: React.FC<CustomSelectProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="bg-white border border-gray-300 rounded-md p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700">{selectedOption}</span>
        <i className={`fas fa-chevron-down ml-2 ${isOpen ? 'transform rotate-180' : ''}`}></i>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow">
          {options.map((option, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntitySelector;