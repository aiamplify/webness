import { useState, useReducer, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import SearchAndFilter from '@/components/SearchAndFilter';
import ParticleBackground from '@/components/ParticleBackground';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import '../VideoTraining.css';

interface Video {
  id: number;
  title: string;
  category: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress?: number;
  achievements?: string[];
  url: string;
}

interface State {
  watchedVideos: number[];
  achievements: string[];
  liveChatOpen: boolean;
}

interface AchievementBadge {
  title: string;
  color: string;
}

type AchievementKey = keyof typeof achievementsMap;

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  timestamp: string;
}

type TrainingAction = 
  | { type: 'MARK_WATCHED'; videoId: number; newAchievements?: string[] }
  | { type: 'TOGGLE_CHAT' };

const mockVideos: Video[] = [
  { 
    id: 1,
    title: 'Frontend Development Fundamentals',
    category: 'Web Development',
    duration: '--:--',
    difficulty: 'beginner',
    url: '#'
  },
  { 
    id: 2,
    title: 'Backend Systems Overview',
    category: 'Server-Side',
    duration: '--:--',
    difficulty: 'intermediate',
    url: '#'
  },
  { 
    id: 3,
    title: 'DevOps Practices',
    category: 'Infrastructure',
    duration: '--:--',
    difficulty: 'advanced',
    url: '#'
  },
  { 
    id: 4,
    title: 'Design Principles',
    category: 'UI/UX',
    duration: '--:--',
    difficulty: 'beginner',
    url: '#'
  },
  { 
    id: 5,
    title: 'Security Basics',
    category: 'Cybersecurity',
    duration: '--:--',
    difficulty: 'intermediate',
    url: '#'
  },
  { 
    id: 6,
    title: 'Performance Concepts',
    category: 'Optimization',
    duration: '--:--',
    difficulty: 'advanced',
    url: '#'
  }
];

const achievementsMap = {
  'react-expert': { title: 'React Expert', color: '#61DAFB' },
  'typescript-pro': { title: 'TypeScript Pro', color: '#3178C6' },
  'security-champion': { title: 'Security Champion', color: '#4CAF50' }
};

function trainingReducer(state: State, action: TrainingAction) {
  switch (action.type) {
    case 'MARK_WATCHED':
      return {
        ...state,
        watchedVideos: [...state.watchedVideos, action.videoId],
        achievements: action.newAchievements ? 
          [...state.achievements, ...action.newAchievements] : 
          state.achievements
      };
    case 'TOGGLE_CHAT':
      return { ...state, liveChatOpen: !state.liveChatOpen };
    default:
      console.warn(`Unknown action type: ${(action as TrainingAction).type}`);
      return state;
  }
}

const VideoTraining = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0.9]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.98]);
  
  const [state, dispatch] = useReducer(trainingReducer, {
    watchedVideos: (() => {
      try {
        return JSON.parse(localStorage.getItem('watchedVideos') ?? '[]');
      } catch (error) {
        console.error('Error loading watched videos:', error);
        return [];
      }
    })(),
    achievements: (() => {
      try {
        return JSON.parse(localStorage.getItem('achievements') ?? '[]');
      } catch (error) {
        console.error('Error loading achievements:', error);
        return [];
      }
    })(),
    liveChatOpen: false
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { toast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('watchedVideos', JSON.stringify(state.watchedVideos));
      localStorage.setItem('achievements', JSON.stringify(state.achievements));
    } catch (error) {
      console.error('Failed to persist training progress:', error);
      toast({
        title: 'Save Error',
        description: 'Failed to save your progress locally',
        variant: 'destructive'
      });
    }
  }, [state, toast]);

  const handleVideoComplete = (videoId: number) => {
    const video = mockVideos.find(v => v.id === videoId);
    const newAchievements = video?.achievements?.filter(a => !state.achievements.includes(a));
    
    dispatch({
      type: 'MARK_WATCHED',
      videoId,
      newAchievements
    });

    if (newAchievements?.length) {
      newAchievements.forEach(achievement => {
        toast({
          title: '🎉 Achievement Unlocked!',
          description: achievementsMap[achievement as AchievementKey].title,
          style: {
            backgroundColor: achievementsMap[achievement as AchievementKey].color,
            color: 'white'
          }
        });
      });
    }
  };

  const filteredVideos = mockVideos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="video-training-container relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      
      <motion.div 
        className="relative z-10"
        style={{ opacity, scale }}
      >
        <div className="achievements-bar flex gap-2 mb-6">
          {state.achievements.map(achievement => (
            <Badge 
              key={achievement} 
              style={{ backgroundColor: achievementsMap[achievement as keyof typeof achievementsMap].color }}
              className="gap-2"
            >
              <span className="text-white">
                {achievementsMap[achievement as keyof typeof achievementsMap].title}
              </span>
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="page-title bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
            Interactive Video Training
          </h1>
          <button 
            onClick={() => dispatch({ type: 'TOGGLE_CHAT' })}
            className="live-chat-button bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Live Chat
          </button>
        </div>

        <SearchAndFilter
          onSearch={setSearchQuery}
          onFilterChange={setSelectedCategory}
          categories={['All', 'Web Development', 'Server-Side', 'Infrastructure', 'UI/UX', 'Cybersecurity']}
        />

        <Carousel className="featured-carousel">
          <CarouselContent>
            {mockVideos.slice(0, 3).map(video => (
              <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3">
                <motion.div 
                  className="featured-video-card"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="relative mb-4 animate-pulse">
                    <div className="aspect-video bg-gray-200 rounded-lg shadow-xl flex items-center justify-center text-gray-400">
                      <span className="text-lg">Video Preview</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <h3 className="video-title flex-1">{video.title}</h3>
                    <span className={`difficulty-badge ml-2 ${
                      video.difficulty === 'beginner' ? 'bg-green-500' :
                      video.difficulty === 'intermediate' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}>
                      {video.difficulty}
                    </span>
                  </div>
                  <div className="video-metadata">
                    <span className="category-badge">{video.category}</span>
                    <span className="duration">⏱ {video.duration}</span>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="video-grid">
          {filteredVideos.map(video => (
            <motion.div 
              key={video.id}
              className="video-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="video-thumbnail animate-pulse" />
              <h3 className="video-title">{video.title}</h3>
              <div className="video-metadata">
                <span className="category-badge">{video.category}</span>
                <span className="duration">⏱ {video.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Sheet open={state.liveChatOpen} onOpenChange={() => dispatch({ type: 'TOGGLE_CHAT' })}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Live Training Chat</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-100px)] pr-4">
            <div className="chat-messages space-y-4 py-4">
              {[
                { id: 1, user: 'John', message: 'This training is awesome!', timestamp: '3:45 PM' },
                { id: 2, user: 'Sarah', message: 'Anyone stuck on lesson 2?', timestamp: '3:46 PM' },
                { id: 3, user: 'AI Tutor', message: 'Need help? Ask me anything!', timestamp: '3:47 PM' },
              ].map(msg => (
                <div key={msg.id} className="chat-message bg-gray-100 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-sm">{msg.user}</span>
                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="chat-input pt-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Send
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default VideoTraining;
