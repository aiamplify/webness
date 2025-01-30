import { useState, useEffect } from 'react';
import BlogGrid from '../components/BlogGrid';
import FeaturedPosts from '../components/FeaturedPosts';
import SearchAndFilter from '../components/SearchAndFilter';
import blogPosts from '../data/blogPosts.json';
import ParticleBackground from '../components/ParticleBackground';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  imageUrl: string;
  author: string;
  trending: boolean;
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = blogPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.category.toLowerCase().includes(query.toLowerCase()) ||
      post.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const fetchMorePosts = () => {
    // Simulate fetching more data
    const moreData = [
      {
        id: "5",
        title: "The Future of Quantum Computing",
        excerpt: "Exploring the potential of quantum computers and their impact on various industries",
        date: "2025-01-26",
        category: "Technology",
        readTime: "8",
        imageUrl: "/gallery/surreal-ocean.jpg",
        author: "Quantum Team",
        trending: true
      },
      {
        id: "6",
        title: "Sustainable Cities of Tomorrow",
        excerpt: "Innovative urban planning and design for eco-friendly living",
        date: "2025-01-25",
        category: "Architecture",
        readTime: "6",
        imageUrl: "/gallery/fantasy-forest.jpg",
        author: "Architect Team",
        trending: false
      }
    ];

    setFilteredPosts((prevPosts) => [...prevPosts, ...moreData]);

    // Check if there is more data to fetch
    if (filteredPosts.length + moreData.length >= blogPosts.length) {
      setHasMorePosts(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground className="absolute inset-0 z-0" />
      <div className="relative z-10 container mx-auto">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6 animate-fade-in-up">
            Futuristic Blogscape
          </h1>
          <p className="text-xl md:text-2xl text-cyan-100 mb-8 max-w-3xl mx-auto animate-fade-in-up delay-100">
            Exploring the frontiers of technology, design, and innovation
          </p>
          <div className="animate-fade-in-up delay-200">
            <button className="bg-cyan-500/20 hover:bg-cyan-500/30 backdrop-blur-lg text-cyan-300 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 border border-cyan-500/30 hover:border-cyan-500/50">
              Start Exploring
            </button>
          </div>
          <div className="mt-20 animate-float">
            <div className="w-24 h-24 bg-cyan-500/20 rounded-full absolute -left-8 -top-8 blur-xl"></div>
            <div className="w-32 h-32 bg-blue-500/20 rounded-full absolute -right-12 -bottom-12 blur-xl"></div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <SearchAndFilter
          onSearch={handleSearch}
          onFilterChange={() => {}}
          categories={['UI/UX', 'Development', 'Technology', 'Architecture']}
        />
        <FeaturedPosts posts={filteredPosts.slice(0, 3)} />
      {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-32 bg-gray-100 rounded-lg"></div>
            </div>
          </div>
        ) : (
          <BlogGrid posts={filteredPosts} />
        )}
      </div>
    </div>
  );
}
