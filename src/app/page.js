"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Github, Linkedin, Mail, Maximize2} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Portfolio() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2.5 + 0.5,
      color: Math.random() > 0.5 ? "rgba(59,130,246,0.6)" : "rgba(255, 28, 179, 0.6)",
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  // data for projects with multiple screenshots
  const projects = [
    {
      id: 1,
      title: "Chatbot for Tourist Support in Calbayog City using Natural Language Processing Technique",
      description: "An intelligent full-stack chatbot powered by Flan-T5-Large (l6), integrating advanced natural language processing to deliver accurate, context-aware responses for a seamless conversational experience.",
      screenshots: [
        "/chatbot/splash.png",
        "/chatbot/home.png",
        "/chatbot/carousel.png",
        "/chatbot/chatbot.png",
        "/chatbot/night_mode.png",
        "/chatbot/settings.png",
        "/chatbot/how_to_use.png",
        "/chatbot/numbers.png",
        "/chatbot/all_rights.png",
      ],
      techStack: ["html","css","javascript" ,"python", "flask", "huggingface"],
    },
    {
      id: 2,
      title: "SweetBakes Tablet App",
      description: "A collaborative task management application built specifically for bakery operations, offering real-time updates, streamlined task tracking, and team coordination to ensure smooth daily workflows from kitchen prep to front-of-house service.",
      screenshots: [
        "/sweetbakes/task_lists.png",
        "/sweetbakes/task_lists_landscape.png",
        "/sweetbakes/inventory_management.png",
        "/sweetbakes/task_history.png",
        "/sweetbakes/manage_personnel.png",
      ],
      techStack: ["html" ,"css", "javascript", "kotlin"],
    },
    {
      id: 3,
      title: "TaskTide Mobile App",
      description: "A sleek and minimalist task reminder app focused on simplicity and clarity, helping users stay organized with intuitive scheduling, gentle notifications, and a distraction-free interface.",
      screenshots: [
        "/tasktide/dashboard.jpg",
        "/tasktide/savingsched.jpg",
        "/tasktide/notification.jpg",
      ],
      techStack: ["kotlin", "androidstudio"],
    },
    {
      id: 4,
      title: "College of Computing and Information Sciences Computer Laboratory Schedule Website",
      description: "A full-stack web-based scheduling platform for computer laboratories, allowing administrators and students to view, manage, and reserve lab sessions with ease. Designed to improve coordination, avoid conflicts, and ensure efficient use of lab resources.",
      screenshots: [
        "/websched/responsive.png",
        "/websched/landing_page.png",
        "/websched/login.png",
        "/websched/schedule.png",
        "/websched/announcement.png",
        "/websched/feedback.png",
      ],
      techStack: ["html" ,"css", "javascript", "react", "firebase"],
    },
  ]

  return (
    <div className="relative z-10 min-h-screen bg-black text-white overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 md:p-8">
        <div className="text-xl font-bold">Elgie</div>
        <div className="hidden md:flex space-x-8">
          <Link href="#home" className="hover:text-pink-400 transition-colors">
            Home
          </Link>
          <Link href="#about" className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent font-normal hover:text-pink-400 transition-colors">
            About
          </Link>
          <Link href="#projects" className="hover:text-pink-400 transition-colors">
            Projects
          </Link>
          <Link href="#contact" className="hover:text-pink-400 transition-colors">
            Contact
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6">
            Hello, I&apos;m <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent font-normal">
            Elgie
          </span>.
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-light mb-12 text-gray-300">
            I&apos;m a full stack web developer.
          </p>
          <div className="inline-block bg-gradient-to-r from-blue-400 to-pink-500 p-[1px] rounded-md transition hover:from-blue-500 hover:to-pink-600">
            <div className="bg-black rounded-md w-full h-full">
              <Button
                onClick={scrollToAbout}
                variant="outline"
                className="bg-transparent text-white border-none px-8 py-3 text-lg rounded-md w-full hover:bg-gradient-to-r from-blue-300 to-pink-400 hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                View my work <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 min-h-screen flex items-center px-6 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="w-48 h-48 mx-auto lg:mx-50 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-1 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-center ">
              <p className="text-gray-300 leading-relaxed text-lg">
                I&apos;m a full stack developer driven by a passion for continuous learning. I specialize in JavaScript,
                React, and modern web development, and I&apos;m especially inspired by the blend of creativity, logic, and
                technology that coding offers. I have a growing interest in machine learning and AI integration, excited
                by the potential they bring to the future of development. Outside of tech, I love drawing, spending time
                with my family, and listening to music.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { name: "HTML", logo: "/logos/html.svg" },
              { name: "CSS", logo: "/logos/css.svg" },
              { name: "JavaScript", logo: "/logos/javascript.svg" }, 
              { name: "Kotlin", logo: "/logos/kotlin.svg" },
              { name: "Python", logo: "/logos/python.svg" },        
              { name: "SQL", logo: "/logos/sql.svg" },
              { name: "React", logo: "/logos/react.svg" },
              { name: "Node.js", logo: "/logos/nodejs.svg" },
              { name: "Next.js", logo: "/logos/nextjs.svg" },
              { name: "Flask", logo: "/logos/flask.png" },
              { name: "Hugging Face", logo: "/logos/huggingface.svg" },           
              { name: "Android Studio", logo: "/logos/androidstudio.svg" },
              { name: "Firebase", logo: "/logos/firebase.svg" },
              { name: "Tailwind", logo: "/logos/tailwind.svg" },
              { name: "Linux", logo: "/logos/linux.svg" },
            ].map((tech, index) => (
              <div
                key={index}
                className="p-[2px] rounded-xl bg-gradient-to-br from-blue-400 to-pink-500 hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <div className="bg-black rounded-xl p-4 flex flex-col items-center justify-center text-center h-full">
                  <img
                    src={tech.logo || "/placeholder.svg"}
                    alt={tech.name}
                    className="w-12 h-12 mb-2 object-contain"
                    loading="lazy"
                  />
                  <span className="text-white text-xs font-semibold tracking-wide">{tech.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 min-h-screen flex items-center px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-12">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 min-h-screen flex items-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-8">Get In Touch</h2>
          <p className="text-xl text-gray-300 mb-12">
            I&apos;m always open to discussing new opportunities and interesting projects.
          </p>
          <div className="flex justify-center space-x-8">
          <a href="mailto:elgieimperial@example.com" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="bg-transparent border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Me
            </Button>
            </a>
            <a href="https://www.linkedin.com/in/elgie-jhamaica-imperial-developer" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="bg-transparent border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </Button>
            </a>
            <a href="https://github.com/E1217" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="bg-transparent border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Elgie. All rights reserved.</p>
      </footer>
    </div>
  )
}

const techIcons = {
  html: "/logos/html.svg",
  css: "/logos/css.svg",
  javascript: "/logos/javascript.svg",
  python: "/logos/python.svg",
  flask: "/logos/flask.png",
  huggingface: "/logos/huggingface.svg",
  sqlite: "/logos/sql.svg",
  kotlin: "/logos/kotlin.svg",
  firebase: "/logos/firebase.svg",
  react: "/logos/react.svg",
  nodejs: "/logos/nodejs.svg",
  androidstudio: "/logos/androidstudio.svg",
}


function ProjectCard({ project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.screenshots.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [project.screenshots.length])

  return (
    
    <div className="bg-gradient-to-br from-blue-400 to-pink-500 p-[2px] rounded-lg hover:from-blue-500 hover:to-pink-600 transition-colors">
      <div className="bg-black dark:bg-gray-900 rounded-lg p-6 h-full relative">
        {/* Screenshot section */}
        <div className="relative w-full h-61 rounded-lg mb-4 overflow-hidden">
          <Image
            src={project.screenshots[currentImageIndex] || "/placeholder.svg"}
            alt={`${project.title} screenshot ${currentImageIndex + 1}`}
            fill
            className="object-cover transition-opacity duration-500"
          />
          {/* Dots indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
            {project.screenshots.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
          {/* Expand/Fullscreen icon button */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-white hover:text-pink-400"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
  
        {/* Project title and description */}
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-500 dark:text-gray-300">{project.description}</p>
         
        {/* Horizontal line spacer */}
        <div className="border-t border-black my-4 w-full" />
        <div className="border-t border-black my-4 w-full" />

        {/* Tech stack icons */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {project.techStack?.map((tech, index) => (
            <div key={index} className="w-6 h-6" title={tech}>
              <img
                src={techIcons[tech] || "/logos/placeholder.svg"}
                alt={tech}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-6">
        <div className="relative bg-black rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 scrollbar-none">
          {/* Close button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-pink-400"
          >
            ✕
          </button>

          {/* Modal content */}
          <h2 className="text-2xl font-semibold mb-4 text-white">{project.title}</h2>
          <p className="text-gray-400 mb-6">{project.description}</p>

          {/* Single Screenshot (Rotating) */}
          <div className="relative w-full h-[500px] rounded-lg mb-6 overflow-hidden">
            <Image
              src={project.screenshots[currentImageIndex] || "/placeholder.svg"}
              alt={`${project.title} screenshot ${currentImageIndex + 1}`}
              fill
              className="object-cover rounded-lg transition-opacity duration-500"
            />
            {/* Optional: Dots indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
              {project.screenshots.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>


          {/* Tech icons */}
          <div className="flex flex-wrap gap-3">
            {project.techStack?.map((tech, index) => (
              <div key={index} className="w-6 h-6" title={tech}>
                <img
                  src={techIcons[tech] || "/logos/placeholder.svg"}
                  alt={tech}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
    </div>
    
  )
}
