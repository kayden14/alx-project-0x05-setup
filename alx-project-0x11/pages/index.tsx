import ImageCard from "@/components/common/ImageCard";
import { ImageProps } from "@/interfaces";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<ImageProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateImage = async () => {
    setIsLoading(true);
    const resp = await fetch('/api/generate-image', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      headers: {
        'Content-type': 'application/json'
      }
    });

    if (!resp.ok) {
      setIsLoading(false);
      return;
    }

    const data = await resp.json();
    setImageUrl(data?.message);
    setGeneratedImages(prev => [...prev, { imageUrl: data.message, prompt }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {/* Prompt Input */}
      <div className="w-full max-w-md">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <button
          onClick={handleGenerateImage}
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isLoading ? "Loading..." : "Generate Image"}
        </button>
      </div>

      {/* Main Image */}
      {imageUrl && <ImageCard action={() => setImageUrl(imageUrl)} imageUrl={imageUrl} prompt={prompt} />}

      {/* History of Generated Images */}
      {generatedImages.length > 0 && (
        <div>
          <h3 className="text-xl text-center mb-4">Generated Images</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-full md:max-w-[1100px] p-2 overflow-y-scroll h-96 border">
            {generatedImages.map(({ imageUrl, prompt }: ImageProps, index) => (
              <ImageCard
                key={index}
                action={() => setImageUrl(imageUrl)}
                imageUrl={imageUrl}
                prompt={prompt}
                width="w-full"
                height="h-40"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
