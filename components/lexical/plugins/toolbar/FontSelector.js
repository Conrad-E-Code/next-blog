import React, { useState } from 'react';

const FontSelector = ({ fontSize, fontType, onFontSizeChange, onFontTypeChange }) => {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <select
            id="font-type"
            
            onChange={(e) => onFontTypeChange(e.target.value)}
            className="border border-gray-300 rounded p-1"
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
            {/* Add more font options as needed */}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            id="font-size"
            value={fontSize}
            onChange={(e) => onFontSizeChange(e.target.value)}
            className="border border-gray-300 rounded p-1 w-16 text-center"
          />
        </div>
      </div>
    );
  };
  
  export default FontSelector;