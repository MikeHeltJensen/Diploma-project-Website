import React from 'react';
import '../style/GenerateScriptButton.css';

const GenerateScriptButton = () => {
  const handleGenerateScript = async () => {
    try {
      const response = await fetch('http://localhost:8080/generate-script', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Create a blob and download it
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'system-data-collector.ps1'; // Default file name
        a.click();
        window.URL.revokeObjectURL(url); // Clean up the object URL
      } else {
        console.error('Failed to generate script:', response.status);
      }
    } catch (error) {
      console.error('Error fetching script:', error);
    }
  };

  return (
    <button onClick={handleGenerateScript} className="download-script-btn">
      Download Script
    </button>
  );
};

export default GenerateScriptButton;
