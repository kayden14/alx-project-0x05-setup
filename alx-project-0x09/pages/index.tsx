import ImageCard from "@/components/common/ImageCard";
import { ImageProps } from "@/interfaces";
import { useState } from "react";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<ImageProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateImage = async () => {
  console.log("Generating Image");
  console.log(process.env.NEXT_PUBLIC_GPT_API_KEY);
};
  // This function will handle the image generation logic.
  // You can implement the API call to your image generation service here.
  // For now, it just logs the prompt and the API key to the console.
  // You can replace this with your actual image generation logic.
  // Example: setImageUrl("https://example.com/generated-image.jpg");
  // setIsLoading(true);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2">Image Generation App</h1>
        <p className="text-lg text-gray-700 mb-4">
          Generate stunning images based on your prompts!
        </p>

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
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {/* {isLoading ? "Loading..." : "Generate Image"} */}
            Generate Image
          </button>
        </div>

        {imageUrl && (
          <ImageCard
            action={() => setImageUrl(imageUrl)}
            imageUrl={imageUrl}
            prompt={prompt}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
// This code is a simple React component for an image generation app.
// It includes an input field for the user to enter a prompt, a button to generate an image,
// and a component to display the generated image. The state is managed using React hooks.