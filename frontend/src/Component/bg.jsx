import React, { useEffect, useRef } from 'react';

const SoloLevelingBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      draw() {
        ctx.fillStyle = `rgba(0, 198, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width + 10 || this.x < -10 || 
            this.y > canvas.height + 10 || this.y < -10) {
          this.reset();
        }
      }
    }

    // Create particles
    const particles = Array(100).fill().map(() => new Particle());

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,198,255,0.05)_0%,_transparent_70%)] animate-pulse-slow" />
      
      {/* Glowing grid pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 198, 255, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 198, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Canvas particle animation */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />
      
      {/* Floating runes animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-blue-400/10 text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 15}s infinite linear`,
              transform: `scale(${0.5 + Math.random() * 2})`
            }}
          >
            {/* Add your preferred rune symbols */}
            {['⟁', '⏣', '⌗', '⎈', '⍟', '⌬'][i % 6]}
          </div>
        ))}
      </div>
      
      {/* Style definitions */}
      <style>{`
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-100vh) rotate(180deg); }
    100% { transform: translateY(-200vh) rotate(360deg); }
  }
  
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0.3; }
  }
`}</style>

    </div>
  );
};

export default SoloLevelingBackground;