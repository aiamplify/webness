import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User, Tag } from "lucide-react";

const SAMPLE_POSTS = {
  "1": {
    title: "The Future of AI: Beyond Machine Learning",
    content: `Artificial intelligence continues to evolve at an unprecedented pace, pushing the boundaries of what we once thought possible. From neural networks that can generate human-like text to AI systems that can create stunning artwork, the field is expanding in exciting new directions.

    Recent breakthroughs in machine learning architectures have led to models that can understand context and nuance in ways that seemed impossible just a few years ago. These advances are not just academic achievements – they're already being implemented in real-world applications that affect our daily lives.

    However, with these advances come important questions about the future of human-AI collaboration. How will we ensure that AI systems remain aligned with human values? What role will human creativity play in an increasingly automated world?

    As we look to the future, it's clear that the relationship between humans and AI will continue to evolve. The key will be finding the right balance between leveraging AI's capabilities while maintaining human agency and ethical considerations.`,
    date: "2024-03-15",
    readTime: "5",
    author: "Dr. Sarah Chen",
    category: "Artificial Intelligence"
  },
  "2": {
    title: "Web Development Trends",
    content: "The landscape of web development is constantly changing, with new frameworks and tools emerging regularly. From AI-assisted coding to WebAssembly, developers have more powerful tools than ever at their disposal.",
    date: "2024-03-14",
    readTime: "7",
    author: "Alex Rivera",
    category: "Web Development"
  },
  "3": {
    title: "Quantum Computing",
    content: "Quantum computing represents a paradigm shift in computational power. By harnessing quantum mechanical phenomena, these systems can solve certain problems exponentially faster than classical computers.",
    date: "2024-03-13",
    readTime: "6",
    author: "Prof. James Maxwell",
    category: "Quantum Computing"
  }
};

const Post = () => {
  const { id } = useParams();
  const post = id ? SAMPLE_POSTS[id as keyof typeof SAMPLE_POSTS] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl mb-4">Post not found</h1>
          <Link to="/" className="text-primary hover:text-primary-hover inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary-hover mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <article className="glass-card rounded-xl p-8 animate-fade-up space-y-6">
          <header className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-primary">
              <Tag className="w-4 h-4" />
              {post.category}
            </div>
            
            <h1 className="text-4xl font-bold text-white">{post.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </div>
            </div>
          </header>

          <div className="prose prose-invert max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-300 leading-relaxed">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default Post;