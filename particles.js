// Particle Effect Background
class Particle {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (options.maxSize || 3) + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = options.color || '#3f51b5';
        this.opacity = Math.random() * 0.6 + 0.1;
        this.linked = false;
    }

    update(mouse) {
        // Move particles
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > this.canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > this.canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }

        // Mouse interaction
        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                this.speedX += dx * 0.0005;
                this.speedY += dy * 0.0005;
                
                // Draw line to mouse
                if (distance < 80) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(63, 81, 181, ${0.5 - distance/160})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.x, this.y);
                    this.ctx.lineTo(mouse.x, mouse.y);
                    this.ctx.stroke();
                }
            }
        }

        // Limit speed
        const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        const maxSpeed = 2;
        if (speed > maxSpeed) {
            this.speedX = (this.speedX / speed) * maxSpeed;
            this.speedY = (this.speedY / speed) * maxSpeed;
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.globalAlpha = this.opacity;
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
    }
}

// Particle System
class ParticleSystem {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null };
        this.options = {
            particleCount: 60,
            color: '#3f51b5',
            ...options
        };
        
        this.init();
        this.animate();
    }
    
    init() {
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas.bind(this));
        
        // Create particles
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push(new Particle(this.canvas, {
                color: this.options.color,
                maxSize: 3
            }));
        }
        
        // Mouse move event
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        // Mouse leave event
        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Connect particles
        this.connectParticles();
        
        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update(this.mouse);
            this.particles[i].draw();
        }
        
        requestAnimationFrame(this.animate.bind(this));
    }
    
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(63, 81, 181, ${0.5 - distance/200})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}
// Initialize particle system when the page loads
window.addEventListener('load', () => {
    new ParticleSystem('particle-canvas', {
        particleCount: 80,
        color: '#3f51b5'
    });
});
