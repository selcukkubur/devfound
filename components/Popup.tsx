import React from "react";
import { Button } from "@/components/ui/button";

const articles = [
  {
    title: "Startup A Raises $10M in Funding",
    logo: "/path/to/logoA.png", // Replace with actual logo path
  },
  {
    title: "Startup B Launches New Product",
    logo: "/path/to/logoB.png", // Replace with actual logo path
  },
  // Add more articles as needed
];

export const Popup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Discover Startup News</h2>
        <div className="space-y-4">
          {articles.map((article, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img src={article.logo} alt={article.title} className="h-12 w-12" />
              <p className="text-lg">{article.title}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};
