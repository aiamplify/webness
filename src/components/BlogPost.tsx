interface BlogPostProps {
  title: string;
  content: string;
  date: string;
  readTime: string;
}

const BlogPost = ({ title, content, date, readTime }: BlogPostProps) => {
  return (
    <article className="max-w-3xl mx-auto animate-fade-in">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-primary">{title}</h1>
        <div className="flex gap-4 text-gray-400">
          <span>{date}</span>
          <span>{readTime} min read</span>
        </div>
      </header>
      <div className="prose prose-invert prose-lg">
        {content}
      </div>
    </article>
  );
};

export default BlogPost;