export interface ImageData {
  id: string;
  src: string;
  title: string;
  description: string;
  style: string;
  likes: number;
  views: number;
  prompt: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  content: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  duration?: string;
  rating: number;
  tags: string[];
  category: string;
  lastUpdated: string;
}

export interface FeaturedResource {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  format: 'video' | 'article' | 'course' | 'tool';
  author: string;
  duration: string;
  rating: number;
  tags: string[];
}

export interface ResourceCategory {
  title: string;
  icon?: string;
  items: ResourceItem[];
}

export interface ResourceMetadata {
  totalResources: number;
  lastUpdated: string;
  categories: string[];
}
