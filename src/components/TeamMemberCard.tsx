import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Twitter, Linkedin, Github } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter: string;
    linkedin: string;
    github: string;
  };
  skills: string[];
}

const TeamMemberCard = ({ name, role, bio, image, social, skills }: TeamMemberProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  // Parallax effect for content
  const contentX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const contentY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig);

  // Shine effect
  const shineX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["100%", "0%"]), springConfig);
  const shineY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["100%", "0%"]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        <Card className="glass-card overflow-hidden">
          <motion.div
            style={{
              x: contentX,
              y: contentY,
              transformStyle: "preserve-3d",
            }}
          >
            <CardHeader>
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img 
                  src={image} 
                  alt={name}
                  className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent opacity-0"
                  style={{
                    opacity: useTransform(mouseX, [-0.5, 0.5], [0.4, 0]),
                    x: shineX,
                    y: shineY,
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <CardTitle className="text-white">{name}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {role}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">{bio}</p>
              
              {/* Skills */}
              <div className="mb-4 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <motion.a
                  href={social.twitter}
                  whileHover={{ scale: 1.2 }}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={social.linkedin}
                  whileHover={{ scale: 1.2 }}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={social.github}
                  whileHover={{ scale: 1.2 }}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              </div>
            </CardContent>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TeamMemberCard;
