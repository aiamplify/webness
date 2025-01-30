import { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  className?: string;
}

const ParticleBackground = ({ className }: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 150;
    const connectionDistance = 150;
    const mouseRadius = 150;
    const centerAttractionForce = 0.02;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let mouseX = 0;
    let mouseY = 0;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(147, 51, 234, ${Math.random() * 0.5 + 0.2})`; // Purple with random opacity
      }

      update() {
        // Center attraction
        const dxCenter = centerX - this.x;
        const dyCenter = centerY - this.y;
        const distanceToCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
        
        if (distanceToCenter > 200) {
          this.speedX += (dxCenter / distanceToCenter) * centerAttractionForce;
          this.speedY += (dyCenter / distanceToCenter) * centerAttractionForce;
        }

        // Apply velocity
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction with stronger repulsion
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - distance / mouseRadius) * 3;
          this.speedX -= Math.cos(angle) * force;
          this.speedY -= Math.sin(angle) * force;
        }

        // Speed limits
        const maxSpeed = 2;
        const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        if (speed > maxSpeed) {
          this.speedX = (this.speedX / speed) * maxSpeed;
          this.speedY = (this.speedY / speed) * maxSpeed;
        }

        // Add some randomness
        this.speedX += (Math.random() - 0.5) * 0.1;
        this.speedY += (Math.random() - 0.5) * 0.1;

        // Bounce off edges with damping
        if (this.x > canvas.width) {
          this.x = canvas.width;
          this.speedX *= -0.8;
        }
        if (this.x < 0) {
          this.x = 0;
          this.speedX *= -0.8;
        }
        if (this.y > canvas.height) {
          this.y = canvas.height;
          this.speedY *= -0.8;
        }
        if (this.y < 0) {
          this.y = 0;
          this.speedY *= -0.8;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            const opacity = 0.15 * (1 - distance / connectionDistance);
            ctx.strokeStyle = `rgba(147, 51, 234, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.x;
      mouseY = e.y;
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleBackground;
