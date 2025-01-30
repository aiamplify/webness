interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  imageUrl: string;
  author: string;
  featured?: boolean;
}

import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import SearchAndFilter from "./SearchAndFilter";
import { Button } from "./ui/button";
import { ArrowUpDown, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Future of AI: Beyond Machine Learning",
    excerpt: "Exploring groundbreaking developments in artificial intelligence, from neural networks to consciousness simulation. What does the future hold for human-AI collaboration?",
    date: "2024-03-15",
    readTime: "5",
    category: "Artificial Intelligence",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    author: "Dr. Sarah Chen"
  },
  {
    id: "2",
    title: "Web Development in 2025",
    excerpt: "The landscape of web development is evolving rapidly. From AI-powered coding assistants to quantum computing interfaces, discover what's next for developers.",
    date: "2024-03-14",
    readTime: "7",
    category: "Web Development",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    author: "Alex Rivera"
  },
  {
    id: "3",
    title: "Quantum Computing Revolution",
    excerpt: "Quantum computers are no longer science fiction. Learn how this technology is reshaping cryptography, drug discovery, and climate modeling.",
    date: "2024-03-13",
    readTime: "6",
    category: "Quantum Computing",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    author: "Prof. James Maxwell"
  },
  {
    id: "4",
    title: "The Ethics of Neural Interfaces",
    excerpt: "As brain-computer interfaces become reality, we must address the ethical implications. Explore the balance between progress and privacy.",
    date: "2024-03-12",
    readTime: "8",
    category: "Neurotechnology",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    author: "Dr. Elena Martinez"
  },
  {
    id: "5",
    title: "Sustainable Tech: Green Computing",
    excerpt: "How can we build powerful systems while minimizing environmental impact? Discover the latest innovations in sustainable computing.",
    date: "2024-03-11",
    readTime: "6",
    category: "Sustainability",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    author: "Thomas Green"
  }
];

interface BlogGridProps {
  posts: BlogPost[];
}

const BlogGrid = ({ posts }: BlogGridProps) => {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "trending">("date");

  const categories = ["All", ...Array.from(new Set(posts.map(post => post.category)))];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterPosts(term, selectedCategory);
  };

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    filterPosts(searchTerm, category);
  };

  const filterPosts = (term: string, category: string) => {
    let filtered = [...posts];

    if (term) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter(post => post.category === category);
    }

    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      // For demo purposes, using a random trending score
      return Math.random() - 0.5;
    });

    setFilteredPosts(filtered);
  };

  const toggleSort = () => {
    const newSortBy = sortBy === "date" ? "trending" : "date";
    setSortBy(newSortBy);
    const sorted = [...posts].sort((a, b) => {
      if (newSortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return Math.random() - 0.5;
    });
    setFilteredPosts(sorted);
  };

  useEffect(() => {
    filterPosts(searchTerm, selectedCategory);
  }, [sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SearchAndFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          categories={categories}
        />
        <Button
          variant="outline"
          className="border-blog-accent"
          onClick={toggleSort}
        >
          {sortBy === "date" ? (
            <>
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort by Date
            </>
          ) : (
            <>
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </>
          )}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12 text-gray-400"
          >
            No articles found matching your criteria
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <BlogCard {...post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogGrid;
