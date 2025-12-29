import { Instagram } from "lucide-react";

export const InstagramButton = ({ url }) => {
  return (
    <div className="fixed bottom-4 right-4">
      <a target="_blank"
       href={url}>   
        <Instagram size={24} className="text-pascale-500 hover:text-pascale-700 transition-colors" />
      </a>
    </div>
  );
}