import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageData } from "../types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { X, ChevronLeft, ChevronRight, Heart, Eye } from "lucide-react";

interface LightboxProps {
  images: ImageData[];
  initialIndex: number;
  onClose: () => void;
  onSwipe: (direction: "left" | "right") => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex, onClose, onSwipe }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    onSwipe("left");
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    onSwipe("right");
  };

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 text-white hover:bg-white/20"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 text-white hover:bg-white/20"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Main content */}
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
            <motion.img
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            />

            {/* Image details */}
            <motion.div
              className="mt-6 text-white text-center max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-3">{currentImage.title}</h2>
              <p className="text-gray-300 mb-4">{currentImage.description}</p>
              
              <div className="flex items-center justify-center gap-4 mb-4">
                <Badge variant="secondary" className="text-sm">
                  {currentImage.style}
                </Badge>
                <span className="flex items-center gap-1 text-sm text-gray-300">
                  <Heart className="h-4 w-4" /> {currentImage.likes}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-300">
                  <Eye className="h-4 w-4" /> {currentImage.views}
                </span>
              </div>

              <div className="glass-card p-4 rounded-lg">
                <h3 className="text-sm font-semibold mb-2">Prompt Used:</h3>
                <p className="text-gray-300 text-sm italic">{currentImage.prompt}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
