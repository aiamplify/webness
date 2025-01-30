import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Brain, 
  Database, 
  Globe, 
  Cloud,
  Shield,
  Zap,
  Code
} from 'lucide-react';

interface Technology {
  name: string;
  icon: JSX.Element;
  description: string;
  tools: string[];
  color: string;
}

const TECHNOLOGIES: Technology[] = [
  {
    name: "AI & Machine Learning",
    icon: <Brain className="w-8 h-8" />,
    description: "Cutting-edge AI technologies powering our insights and analysis",
    tools: ["TensorFlow", "PyTorch", "Scikit-learn", "Transformers"],
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Quantum Computing",
    icon: <Cpu className="w-8 h-8" />,
    description: "Next-generation quantum algorithms and simulations",
    tools: ["Qiskit", "Cirq", "Q#", "Quantum Circuits"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Cloud Infrastructure",
    icon: <Cloud className="w-8 h-8" />,
    description: "Scalable and reliable cloud-native architecture",
    tools: ["AWS", "Google Cloud", "Kubernetes", "Docker"],
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "Web Technologies",
    icon: <Globe className="w-8 h-8" />,
    description: "Modern web development stack for optimal performance",
    tools: ["React", "TypeScript", "Node.js", "GraphQL"],
    color: "from-orange-500 to-yellow-500"
  },
  {
    name: "Data Engineering",
    icon: <Database className="w-8 h-8" />,
    description: "Robust data processing and analytics pipeline",
    tools: ["Apache Spark", "Kafka", "PostgreSQL", "MongoDB"],
    color: "from-red-500 to-pink-500"
  },
  {
    name: "Security",
    icon: <Shield className="w-8 h-8" />,
    description: "Advanced security measures and encryption",
    tools: ["Zero Trust", "Blockchain", "Quantum Cryptography"],
    color: "from-indigo-500 to-purple-500"
  },
  {
    name: "Performance",
    icon: <Zap className="w-8 h-8" />,
    description: "Optimized for speed and efficiency",
    tools: ["WebAssembly", "Redis", "Edge Computing"],
    color: "from-yellow-500 to-orange-500"
  },
  {
    name: "Development",
    icon: <Code className="w-8 h-8" />,
    description: "Modern development practices and tools",
    tools: ["Git", "CI/CD", "Testing", "Monitoring"],
    color: "from-cyan-500 to-blue-500"
  }
];

const TechStack = () => {
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [isGridView, setIsGridView] = useState(true);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Our Tech Stack</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Powered by cutting-edge technologies and tools that enable us to build
            the future of tech blogging and content delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECHNOLOGIES.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedTech(tech)}
              className="cursor-pointer"
            >
              <div className={`glass-card p-6 h-full bg-gradient-to-br ${tech.color} bg-opacity-10 hover:bg-opacity-20 transition-all duration-300`}>
                <div className="flex items-center mb-4">
                  {tech.icon}
                  <h3 className="text-xl font-semibold ml-3">{tech.name}</h3>
                </div>
                <p className="text-gray-400 mb-4">{tech.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tech.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-1 text-xs rounded-full bg-white/10 text-white"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedTech && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
              onClick={() => setSelectedTech(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`glass-card p-8 max-w-2xl w-full bg-gradient-to-br ${selectedTech.color} bg-opacity-10`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center mb-6">
                  {selectedTech.icon}
                  <h3 className="text-2xl font-bold ml-4">{selectedTech.name}</h3>
                </div>
                <p className="text-gray-300 mb-6">{selectedTech.description}</p>
                <div className="space-y-4">
                  <h4 className="font-semibold">Key Tools & Technologies:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedTech.tools.map((tool) => (
                      <motion.div
                        key={tool}
                        whileHover={{ scale: 1.05 }}
                        className="glass-card p-3 text-center"
                      >
                        {tool}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TechStack;
