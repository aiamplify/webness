import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Clock, User, Tag, TrendingUp, BookmarkPlus, Share2, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { Progress } from "./ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  author: string;
}

interface ReadingProgress {
  [key: string]: number; // percentage read
}

// Load reading progress from localStorage
const getReadingProgress = (): ReadingProgress => {
  const saved = localStorage.getItem("readingProgress");
  return saved ? JSON.parse(saved) : {};
};

// Save reading progress to localStorage
const saveReadingProgress = (progress: ReadingProgress) => {
  localStorage.setItem("readingProgress", JSON.stringify(progress));
};

const BlogCard = ({
  id, 
  title, 
  excerpt, 
  date, 
  readTime, 
  category,
  imageUrl,
  author 
}: BlogCardProps) => {
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [viewCount, setViewCount] = useState<number>(0);

  useEffect(() => {
    // Load reading progress
    const progress = getReadingProgress();
    setReadingProgress(progress[id] || 0);

    // Simulate view count (in a real app, this would come from a backend)
    setViewCount(Math.floor(Math.random() * 1000));
  }, [id]);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Article bookmarked",
      description: "You can find this article in your reading list",
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // In a real app, this would use the Web Share API
    toast({
      title: "Share article",
      description: "Link copied to clipboard!",
    });
  };

  const simulateReadingProgress = () => {
    const progress = getReadingProgress();
    const newProgress = Math.min((progress[id] || 0) + 20, 100);
    progress[id] = newProgress;
    saveReadingProgress(progress);
    setReadingProgress(newProgress);
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link 
          to={`/post/${id}`} 
          className="block"
          onClick={simulateReadingProgress}
        >
          <article className="glass-card hover-scale rounded-xl overflow-hidden h-full animate-fade-up animate-fade-in group">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 right-4 flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={handleBookmark}
                      >
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Bookmark this article</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={handleShare}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share this article</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <div className="bg-blog-accent/90 text-white px-3 py-1 rounded-full text-sm inline-block">
                  {category}
                </div>
                {readingProgress > 0 && (
                  <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                    <Progress value={readingProgress} className="h-1 transition-all duration-500" />
                  </div>
                )}
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-primary group-hover:text-primary-hover transition-colors line-clamp-2">
                {title}
              </h2>
              <p className="text-gray-300 mb-4 line-clamp-3">{excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{author}</span>
                </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{readTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{viewCount}</span>
                </div>
                <span>{date}</span>
              </div>
              </div>
            </div>
          </article>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-blog-dark border-blog-accent">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-primary">{category}</h4>
          <p className="text-xs text-gray-400">{excerpt}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <User className="w-3 h-3" />
            <span>By {author}</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default BlogCard;
