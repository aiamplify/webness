import { useState } from "react";
import { FeaturedResource } from "../types";
import Header from "../components/Header";
import ParticleBackground from "../components/ParticleBackground";
import SearchAndFilter from "../components/SearchAndFilter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortType, setSortType] = useState<'popular' | 'newest' | 'rating'>('popular');
  const [progress] = useState({
    'beginner-ai': 45,
    'quantum-basics': 80,
    'future-tech': 30
  });

  const resourceCategories = ["AI/ML", "Quantum Computing", "Future Tech", "Development", "Web3", "Biotech"];

  const handleSearch = (term: string) => {
    setSearchQuery(term);
  };

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
  };

  const featuredResources: FeaturedResource[] = [
    {
      id: "ai-ml-fundamentals",
      title: "AI & Machine Learning Fundamentals",
      description: "Master core concepts with interactive labs and real-world projects",
      image: "/gallery/future-city.jpg",
      link: "#",
      category: "AI/ML",
      format: "course",
      author: "Dr. Samantha Chen",
      duration: "6h 45m",
      rating: 4.8,
      tags: ["neural networks", "deep learning", "python"],
    },
    {
      id: "quantum-computing-lab",
      title: "Quantum Computing Lab",
      description: "Hands-on quantum programming with Qiskit",
      image: "/gallery/cyberpunk-cityscape.jpg",
      link: "#",
      category: "Quantum Computing",
      format: "course",
      author: "Quantum Academy",
      duration: "8h 20m",
      rating: 4.6,
      tags: ["qiskit", "quantum gates", "algorithms"],
    },
    {
      id: "future-tech-2025",
      title: "Future Tech 2025 Report",
      description: "Emerging technologies shaping tomorrow",
      image: "/gallery/scifi-station.jpg",
      link: "#",
      category: "Future Tech",
      format: "article",
      author: "Tech Futures Institute",
      duration: "45m read",
      rating: 4.7,
      tags: ["trends", "innovation", "forecast"],
    },
    {
      id: "web3-masterclass",
      title: "Web3 Development Masterclass",
      description: "Build decentralized applications from scratch",
      image: "/gallery/abstract-mindscape.jpg",
      link: "#",
      category: "Web3",
      format: "course",
      author: "Blockchain Devs Inc",
      duration: "10h 15m",
      rating: 4.9,
      tags: ["solidity", "smart contracts", "ethereum"],
    },
    {
      id: "bioinformatics-essentials",
      title: "Bioinformatics Essentials",
      description: "Computational biology and genomic analysis",
      image: "/gallery/surreal-ocean.jpg",
      link: "#",
      category: "Biotech",
      format: "course",
      author: "Dr. Emily Zhang",
      duration: "7h 30m",
      rating: 4.5,
      tags: ["genomics", "python", "data analysis"],
    }
  ];

  const categories = [
    {
      title: "Learning Paths",
      items: [
        {
          id: "beginner-ai",
          title: "Beginner's Guide to AI",
          description: "Start your journey into artificial intelligence",
          content: "A comprehensive introduction to AI concepts, machine learning basics, and practical applications. Learn about neural networks, deep learning, and how AI is transforming various industries. Includes hands-on projects and real-world case studies."
        },
        {
          id: "advanced-ml",
          title: "Advanced ML Techniques",
          description: "Deep dive into machine learning",
          content: "Explore advanced topics in machine learning, including neural networks, deep learning architectures, and reinforcement learning. Master complex algorithms and learn to implement them using popular frameworks."
        },
        {
          id: "quantum-basics",
          title: "Quantum Computing Basics",
          description: "Understanding quantum mechanics and computing",
          content: "Learn the fundamental principles of quantum computing, including qubits, quantum gates, and quantum algorithms. Explore practical applications and current limitations of quantum technology."
        },
        {
          id: "future-tech",
          title: "Future Technologies Overview",
          description: "Explore emerging tech trends",
          content: "Stay ahead of the curve with insights into emerging technologies like quantum computing, blockchain, augmented reality, and biotechnology. Understand their potential impact on various industries."
        }
      ]
    },
    {
      title: "Tools & Software",
      items: [
        {
          title: "Essential Development Tools",
          description: "Must-have tools for modern development",
          content: "Comprehensive guide to development tools including VS Code, Git, Docker, and cloud platforms. Learn best practices for setting up an efficient development environment."
        },
        {
          title: "AI/ML Frameworks Guide",
          description: "Popular frameworks and libraries",
          content: "In-depth overview of leading AI/ML frameworks including TensorFlow, PyTorch, and scikit-learn. Compare features, use cases, and performance considerations."
        },
        {
          title: "Cloud Computing Platforms",
          description: "Guide to major cloud services",
          content: "Compare and contrast major cloud platforms (AWS, Azure, GCP) for AI/ML workloads. Learn about pricing, features, and choosing the right services for your needs."
        },
        {
          title: "Development Productivity Tools",
          description: "Boost your coding efficiency",
          content: "Discover tools and extensions that can improve your coding workflow. From code formatters to debugging tools, learn how to optimize your development process."
        },
        {
          title: "CI/CD Tools and Practices",
          description: "Modern deployment workflows",
          content: "Learn about continuous integration and deployment tools like Jenkins, GitHub Actions, and GitLab CI. Understand automated testing, deployment strategies, and monitoring."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative">
      <ParticleBackground />
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-hover to-purple-500 bg-clip-text text-transparent animate-fade-up">
            Resources Hub
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-up animation-delay-100">
            Discover curated resources to accelerate your learning journey
          </p>
          
          <div className="max-w-2xl mx-auto mb-12">
            <SearchAndFilter 
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              categories={resourceCategories}
            />
            <div className="mt-4 flex justify-end">
              <select 
                value={sortType}
                onChange={(e) => setSortType(e.target.value as 'popular' | 'newest' | 'rating')}
                className="bg-blog-card/50 text-gray-300 rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured Resources Carousel */}
        <div className="mb-16 animate-fade-up animation-delay-200">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Resources</h2>
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {featuredResources.map((resource, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="group glass-card hover:scale-105 transition-transform duration-300 m-2 h-full relative overflow-hidden">
                    <div className="relative">
                      <img 
                        src={resource.image} 
                        alt={resource.title} 
                        className="w-full h-40 object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                        <CardTitle className="text-xl text-white">{resource.title}</CardTitle>
                        <CardDescription className="text-gray-200">{resource.description}</CardDescription>
                      </div>
                      <div className="absolute top-2 right-2 flex items-center gap-2">
                        <span className="bg-primary/80 text-white px-3 py-1 rounded-full text-sm">
                          {resource.category}
                        </span>
                        <span className="bg-background/80 text-white px-2 py-1 rounded-md text-sm flex items-center">
                          ⭐ {resource.rating}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-gray-300">{resource.author}</span>
                        <span className="text-primary">{resource.duration}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {resource.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-blog-card rounded-full text-xs text-gray-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <button className="w-full bg-primary/20 hover:bg-primary/30 text-primary rounded-md py-2 transition-colors duration-300">
                        Explore {resource.format}
                      </button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-primary hover:bg-primary-hover p-3 w-10 h-10" />
            <CarouselNext className="bg-primary hover:bg-primary-hover p-3 w-10 h-10" />
          </Carousel>
        </div>

        {/* Main Content Tabs */}
        <div className="animate-fade-up animation-delay-300">
          <Tabs defaultValue="learning-paths" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-blog-card/50 p-1 rounded-lg">
              <TabsTrigger value="learning-paths" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md py-2">Learning Resources</TabsTrigger>
              <TabsTrigger value="tools-software" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md py-2">Tools & Software</TabsTrigger>
            </TabsList>

            <TabsContent value="learning-paths">
              <div className="grid gap-6">
                <Accordion type="single" collapsible className="w-full">
                  {categories[0].items.map((item, itemIndex) => (
                    <AccordionItem key={itemIndex} value={`item-${itemIndex}`} className="glass-card mb-4 hover:bg-blog-card/80 transition-colors duration-200">
                      <AccordionTrigger className="text-xl font-semibold px-6">
                        <div className="flex flex-col items-start text-left">
                          <div>{item.title}</div>
                          <div className="text-sm text-gray-400 font-normal">
                            {item.description}
                          </div>
                          {progress[item.id as keyof typeof progress] && (
                            <div className="w-full mt-2">
                              <div className="h-2 bg-gray-800 rounded-full">
                                <div 
                                  className="h-full bg-primary rounded-full transition-all duration-500" 
                                  style={{ width: `${progress[item.id as keyof typeof progress]}%` }}
                                />
                              </div>
                              <span className="text-xs text-primary">
                                {progress[item.id as keyof typeof progress]}% Complete
                              </span>
                            </div>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="prose prose-invert max-w-none">
                          <p>{item.content}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="tools-software">
              <div className="grid gap-6">
                <Accordion type="single" collapsible className="w-full">
                  {categories[1].items.map((item, itemIndex) => (
                    <AccordionItem key={itemIndex} value={`item-${itemIndex}`} className="glass-card mb-4 hover:bg-blog-card/80 transition-colors duration-200">
                      <AccordionTrigger className="text-xl font-semibold px-6">
                        <div className="flex flex-col items-start text-left">
                          <div>{item.title}</div>
                          <div className="text-sm text-gray-400 font-normal">
                            {item.description}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="prose prose-invert max-w-none">
                          <p>{item.content}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Resources;
