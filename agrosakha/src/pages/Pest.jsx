// src/pages/PestDetection.jsx
import { useState } from 'react';
import { FaCloudUploadAlt, FaCheck, FaTimes } from 'react-icons/fa';

const Pest= () => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleImageUpload = (e) => {
    if (e.target.files.length > 0) {
      setImageUploaded(true);
      // Simulate analysis after 1.5 seconds
      setTimeout(() => {
        setAnalysisComplete(true);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-green-600 text-white py-4 px-6">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div>
            <h1 className="text-xl font-bold">Saikiran (AgroSakha)</h1>
            <p className="text-sm">AI Farming Assistant for Indian Farmers</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded-full bg-green-700 text-sm">Telugu</button>
            <button className="px-3 py-1 rounded-full bg-white text-green-700 text-sm">English</button>
            <button className="px-3 py-1 rounded-full bg-green-700 text-sm">Hindi</button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-green-500 text-white py-2 px-6">
        <div className="flex space-x-6 max-w-6xl mx-auto">
          <a href="#" className="text-sm">Dashboard</a>
          <a href="#" className="text-sm">Weather</a>
          <a href="#" className="text-sm font-bold">Pest Detection</a>
          <a href="#" className="text-sm">Market Prices</a>
          <a href="#" className="text-sm">Govt Schemes</a>
          <a href="#" className="text-sm">Expense Tracker</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-green-700">Pest & Disease Identification</h2>

        {/* Upload Section */}
        <div className="mb-8 p-6 border-2 border-dashed border-green-400 rounded-lg bg-green-50 text-center">
          <div className="flex items-center justify-center mb-2">
            {imageUploaded ? (
              <FaCheck className="text-green-600 mr-2" />
            ) : (
              <FaTimes className="text-gray-400 mr-2" />
            )}
            <h3 className="font-bold">Upload Crop Image</h3>
          </div>
          <p className="mb-4">Take a photo of your crop leaf or affected area and upload it here.</p>
          <label className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition-colors">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload} 
            />
            Choose Image
          </label>
        </div>

        {/* Analysis Result */}
        {analysisComplete && (
          <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-white">
            <div className="flex items-center mb-4">
              <FaCheck className="text-green-600 mr-2" />
              <h3 className="font-bold">Analysis Result</h3>
            </div>
            <div className="space-y-3 ml-8">
              <p><span className="font-semibold">Identified Disease:</span> Cotton Whitefly (Accuracy: 87%)</p>
              <p><span className="font-semibold">Symptoms:</span> Whiteflies under leaves, yellowing and curling of leaves</p>
              <p><span className="font-semibold">Recommended Treatment:</span> Spray Imidacloprid 17.8% SL @ 0.3ml/L</p>
            </div>
          </div>
        )}

        {/* Common Diseases */}
        <div className="p-6 border border-gray-200 rounded-lg bg-white">
          <h3 className="font-bold mb-4">Common Diseases & Remedies</h3>
          
          <div className="mb-6 ml-4">
            <h4 className="font-bold text-green-700">Rice Blast Disease:</h4>
            <div className="ml-4 mt-2 space-y-1">
              <p><span className="font-semibold">Symptoms:</span> Diamond-shaped lesions on leaves with gray centers and dark borders</p>
              <p><span className="font-semibold">Remedy:</span> Spray Tricyclazole 75% WP @ 0.6g/L</p>
            </div>
          </div>
          
          <div className="ml-4">
            <h4 className="font-bold text-green-700">Cotton Whitefly:</h4>
            <div className="ml-4 mt-2 space-y-1">
              <p><span className="font-semibold">Symptoms:</span> Whiteflies under leaves, yellowing and curling of leaves</p>
              <p><span className="font-semibold">Remedy:</span> Spray Imidacloprid 17.8% SL @ 0.3ml/L</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pest;