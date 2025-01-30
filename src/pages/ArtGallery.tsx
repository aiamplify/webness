import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Lightbox from "../components/Lightbox";
import SearchAndFilter from "../components/SearchAndFilter";
import { motion, AnimatePresence } from "framer-motion";
import { ImageData } from "../types";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import ParticleBackground from "../components/ParticleBackground";

const ArtGallery: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [layout, setLayout] = useState<"grid" | "masonry">("grid");
  const [isLoading, setIsLoading] = useState(false);

  const artStyles = [
    "All",
    "Cyberpunk",
    "Surreal",
    "Fantasy",
    "Sci-Fi",
    "Abstract",
    "Futuristic"
  ];

  const images: ImageData[] = [
    {
      id: "1",
      src: "/gallery/cyberpunk-cityscape.jpg",
      title: "Neon Dreams",
      description: "A sprawling cyberpunk metropolis with towering skyscrapers and flying vehicles weaving between them. The city is bathed in a neon glow, reflecting off the rain-slicked streets below.",
      style: "Cyberpunk",
      likes: 342,
      views: 1205,
      prompt: "Cyberpunk city at night, neon lights, flying cars, rain, ultra detailed"
    },
    {
      id: "2",
      src: "/gallery/surreal-ocean.jpg",
      title: "Floating Dreams",
      description: "Surreal seascape featuring floating islands with waterfalls that defy gravity. Crystal formations emerge from cloud-like structures while ethereal light filters through.",
      style: "Surreal",
      likes: 289,
      views: 892,
      prompt: "Surreal ocean landscape, floating islands, ethereal lighting, dreamlike atmosphere"
    },
    {
      id: "3",
      src: "/gallery/fantasy-forest.jpg",
      title: "Enchanted Realm",
      description: "A mystical forest with bioluminescent plants and floating spirit orbs. Ancient tree guardians watch over the magical inhabitants of this enchanted realm.",
      style: "Fantasy",
      likes: 567,
      views: 1832,
      prompt: "Magical forest, glowing plants, spirit orbs, ancient trees, mystical atmosphere"
    },
    {
      id: "4",
      src: "/gallery/scifi-station.jpg",
      title: "Orbital Nexus",
      description: "A massive space station orbiting a distant planet, serving as a hub for interstellar travel. The structure features advanced technology and impossible architecture.",
      style: "Sci-Fi",
      likes: 423,
      views: 1567,
      prompt: "Futuristic space station, orbital ring, advanced technology, sci-fi architecture"
    },
    {
      id: "5",
      src: "/gallery/abstract-mindscape.jpg",
      title: "Neural Pathways",
      description: "An abstract representation of consciousness, featuring intricate patterns and flowing energy that symbolize the complexity of human thought.",
      style: "Abstract",
      likes: 298,
      views: 945,
      prompt: "Abstract neural networks, consciousness visualization, flowing energy patterns"
    },
    {
      id: "6",
      src: "/gallery/future-city.jpg",
      title: "Tomorrow's Dawn",
      description: "A sustainable city of the future with vertical gardens, solar structures, and clean energy systems integrated seamlessly into the architecture.",
      style: "Futuristic",
      likes: 476,
      views: 1623,
      prompt: "Future sustainable city, vertical gardens, solar technology, clean energy"
    }
  ];

  const filteredImages = images.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         image.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStyle = selectedStyle === "All" || image.style === selectedStyle;
    return matchesSearch && matchesStyle;
  });

  const handleSwipe = (direction: 'left'|'right') => {
    if (direction === 'left') {
      setCurrentIndex(prev => (prev + 1) % filteredImages.length);
    } else {
      setCurrentIndex(prev => (prev - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const handleSearch = (term: string) => {
    setSearchQuery(term);
  };

  const handleStyleChange = (style: string) => {
    setSelectedStyle(style);
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <div className="relative z-10">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-hover to-purple-500 bg-clip-text text-transparent animate-fade-up">
            AI Art Gallery
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-up animation-delay-100">
            Explore incredible AI-generated artwork
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <SearchAndFilter
              onSearch={handleSearch}
              onFilterChange={handleStyleChange}
              categories={artStyles}
            />
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={layout === "grid" ? "default" : "outline"}
              onClick={() => setLayout("grid")}
              className="w-32"
            >
              Grid
            </Button>
            <Button
              variant={layout === "masonry" ? "default" : "outline"}
              onClick={() => setLayout("masonry")}
              className="w-32"
            >
              Masonry
            </Button>
      </div>
      </div>
    </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center min-h-[400px]"
            >
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`grid ${
                layout === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-6"
              }`}
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  variants={itemVariants}
                  className={`relative group cursor-pointer glass-card rounded-lg overflow-hidden ${
                    layout === "masonry" ? "row-span-1" : ""
                  }`}
                  onClick={() => {
                    setSelectedId(image.id);
                    setCurrentIndex(index);
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-bold text-xl mb-2">{image.title}</h3>
                      <p className="text-gray-200 text-sm mb-3">{image.description}</p>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">{image.style}</Badge>
                        <span className="text-sm text-gray-300">♥ {image.likes}</span>
                        <span className="text-sm text-gray-300">👁 {image.views}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedId && (
            <Lightbox
              images={filteredImages}
              initialIndex={currentIndex}
              onClose={() => setSelectedId(null)}
              onSwipe={handleSwipe}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ArtGallery;
