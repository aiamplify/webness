import { useState, useEffect } from "react";
import Header from "../components/Header";
import ParticleBackground from "../components/ParticleBackground";
import { motion } from "framer-motion";
import CalendlyWidget from "../components/CalendlyWidget";
import { 
  Users, 
  Bot,
  Code,
  Send,
  Sparkles,
  MessageSquare,
  Mic,
  Palette,
  Cog,
  Github,
  Twitter,
  Linkedin,
  Mail
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { toast } from "../components/ui/use-toast";
import {
  Card,
  CardContent,
} from "../components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";

const SERVICES = [
  {
    icon: Bot,
    title: "A.I. Agents",
    description: "Custom AI agents that automate complex tasks and workflows, enhancing business efficiency and decision-making capabilities."
  },
  {
    icon: MessageSquare,
    title: "Chatbots",
    description: "Intelligent conversational interfaces that provide 24/7 customer support, lead generation, and streamlined customer interactions."
  },
  {
    icon: Mic,
    title: "Voice Assistants",
    description: "Advanced voice-enabled AI solutions for hands-free operation and natural language interactions with your systems."
  },
  {
    icon: Palette,
    title: "AI Art for Marketing",
    description: "Generate unique, eye-catching visuals for your marketing campaigns using state-of-the-art AI image generation."
  },
  {
    icon: Cog,
    title: "Business Automation",
    description: "End-to-end AI solutions that automate repetitive tasks, optimize workflows, and increase operational efficiency."
  },
  {
    icon: Code,
    title: "Custom AI Solutions",
    description: "Tailored AI implementations that address your specific business challenges and requirements."
  }
];

const TESTIMONIALS = [
  {
    quote: "Mike's AI solutions have transformed our customer service operations. The chatbot he implemented handles 70% of our customer inquiries automatically.",
    author: "Sarah Johnson",
    role: "COO, TechCorp Solutions"
  },
  {
    quote: "The AI-powered automation system Mike developed has reduced our processing time by 60% and significantly improved accuracy.",
    author: "David Chen",
    role: "Director of Operations, InnovateTech"
  },
  {
    quote: "Working with Mike was a game-changer. His AI art generation system has revolutionized our marketing content creation process.",
    author: "Emily Rodriguez",
    role: "Marketing Director, CreativeAI"
  }
];

const MILESTONES = [
  {
    year: "2016",
    title: "AI Journey Begins",
    description: "Started career in machine learning and AI development."
  },
  {
    year: "2018",
    title: "First Major Project",
    description: "Developed enterprise-scale AI automation system for Fortune 500 company."
  },
  {
    year: "2020",
    title: "AI Consultancy Launch",
    description: "Founded independent AI consultancy to help businesses leverage AI technology."
  },
  {
    year: "2022",
    title: "Innovation Award",
    description: "Received Technology Innovator of the Year award for AI implementations."
  },
  {
    year: "2024",
    title: "Global Impact",
    description: "Expanded services globally, helping businesses across multiple continents."
  }
];

const About = () => {
  const [stats, setStats] = useState({ clients: 0, projects: 0, experience: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) * 0.05;
    const moveY = (clientY - window.innerHeight / 2) * 0.05;
    setMousePosition({ x: moveX, y: moveY });
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "I'll get back to you as soon as possible.",
    });
  };

  useEffect(() => {
    const animateStats = () => {
      const targetStats = { clients: 150, projects: 200, experience: 8 };
      const duration = 2000;
      const steps = 50;
      const interval = duration / steps;

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setStats({
          clients: Math.floor(targetStats.clients * progress),
          projects: Math.floor(targetStats.projects * progress),
          experience: Math.floor(targetStats.experience * progress)
        });

        if (currentStep === steps) clearInterval(timer);
      }, interval);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateStats();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(document.querySelector(".stats-section")!);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative" onMouseMove={handleMouseMove}>
      <ParticleBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blog-dark via-purple-900 to-blog-dark opacity-50"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 hero-text"
          >
                    <span className="bg-gradient-to-r from-primary via-primary-hover to-purple-500 bg-clip-text text-transparent hero-name">
              Mike Eckmeier
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto hero-text"
          >
            AI Engineer & Consultant helping businesses harness the power of artificial intelligence 
            through custom solutions, automation, and innovative implementations.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-6 mt-8"
          >
            <a href="https://github.com/mikeeckmeier" target="_blank" rel="noopener noreferrer" className="hero-button">
              <Github />
            </a>
            <a href="https://twitter.com/mikeeckmeier" target="_blank" rel="noopener noreferrer" className="hero-button">
              <Twitter />
            </a>
            <a href="https://linkedin.com/in/mikeeckmeier" target="_blank" rel="noopener noreferrer" className="hero-button">
              <Linkedin />
            </a>
            <a href="mailto:mike@eckmeier.ai" className="hero-button">
              <Mail />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-16 bg-blog-dark/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center"
            >
              <Users className="w-8 h-8 mx-auto mb-4 text-primary" />
              <div className="text-4xl font-bold text-primary mb-2">
                {stats.clients}+
              </div>
              <div className="text-gray-400">Satisfied Clients</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 text-center"
            >
              <Sparkles className="w-8 h-8 mx-auto mb-4 text-primary" />
              <div className="text-4xl font-bold text-primary mb-2">
                {stats.projects}+
              </div>
              <div className="text-gray-400">Projects Completed</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 text-center"
            >
              <Code className="w-8 h-8 mx-auto mb-4 text-primary" />
              <div className="text-4xl font-bold text-primary mb-2">
                {stats.experience}+
              </div>
              <div className="text-gray-400">Years Experience</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <service.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-blog-dark/50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Professional Journey
          </motion.h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-primary/30" />
            {MILESTONES.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? "justify-end" : ""
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "text-right pr-8" : "pl-8"}`}>
                  <div className="glass-card p-6 inline-block">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Client Testimonials
          </motion.h2>
          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="glass-card">
                    <CardContent className="p-8 text-center">
                      <blockquote className="text-xl text-gray-300 italic mb-6">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-gray-400">{testimonial.role}</div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Schedule a Call Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Schedule a Discovery Call
          </motion.h2>
          <div className="glass-card p-8">
            <CalendlyWidget />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blog-dark/50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Let's Work Together
          </motion.h2>
          <Card className="glass-card">
            <CardContent className="p-8">
              <form onSubmit={handleContact} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input className="bg-blog-dark border-blog-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" className="bg-blog-dark border-blog-accent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea className="bg-blog-dark border-blog-accent min-h-[150px]" />
                </div>
                <Button type="submit" variant="default" className="w-full">
                  Send Message
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;


