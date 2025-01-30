import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog } from '@/components/ui/dialog'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import ParticleBackground from '../components/ParticleBackground'

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Blog Platform",
    description: "A modern blogging platform with AI-assisted content generation and smart content recommendations.",
    image: "/placeholder.svg",
    technologies: ["React", "TypeScript", "Node.js", "OpenAI"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/project",
    featured: true
  },
  {
    id: 2,
    title: "Virtual Art Gallery",
    description: "An immersive 3D virtual gallery showcasing digital art with WebGL rendering.",
    image: "/placeholder.svg",
    technologies: ["Three.js", "React", "WebGL", "GLSL"],
    featured: true
  },
  {
    id: 3,
    title: "Smart Home Dashboard",
    description: "A comprehensive IoT dashboard for monitoring and controlling smart home devices.",
    image: "/placeholder.svg",
    technologies: ["React", "MQTT", "Socket.io", "Chart.js"],
    featured: false
  }

  
]



export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<'all' | 'featured'>('all')

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.featured)

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <div className="container mx-auto px-4 py-12 mt-20 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          My Projects
        </h1>

        <div className="flex justify-center mb-8">
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All Projects
            </Button>
            <Button
              variant={filter === 'featured' ? 'default' : 'outline'}
              onClick={() => setFilter('featured')}
            >
              Featured
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          {selectedProject && (
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button>View Demo</Button>
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline">View Code</Button>
                    </a>
                  )}
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </motion.div>
      </div>
    </div>
  )
}
