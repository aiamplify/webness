import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Clock, TrendingUp } from "lucide-react";

interface FeaturedPostsProps {
  posts: {
    id: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    category: string;
    readTime: string;
    trending: boolean;
  }[];
}

const FeaturedPosts = ({ posts }: FeaturedPostsProps) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-8 text-white">Featured Stories</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {posts.map((post) => (
            <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
              <Link to={`/post/${post.id}`}>
                <Card className="glass-card hover-scale overflow-hidden border-none">
                  <div className="relative h-64">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge variant="secondary" className="bg-blog-accent/90">
                        {post.category}
                      </Badge>
                      {post.trending && (
                        <Badge variant="secondary" className="bg-red-500/90">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-primary hover:text-primary-hover transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime} min read
                    </div>
                  </div>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;
