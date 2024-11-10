import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { ComputersCanvas } from './canvas';
import gitHub from './../assets/github.png'
import linkedin from './../assets/linkedin.png'
import whatsApp from './../assets/whatsApp.png'
import facebook from './../assets/facebook.png'



const Hero = () => {
  const canvasRef = useRef(null);
  const arrayColors = ['#eee', '#11a0cf', '#596d91', '#e8f462', '#696541'];
  let stars = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const banner = canvas.parentElement;

    const resizeCanvas = () => {
      canvas.width = banner.offsetWidth;
      canvas.height = banner.offsetHeight;

      // Reinitialize stars with more complex properties
      stars = Array.from({ length: 250 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1, // Initial random size
        opacity: Math.random() * 0.5 + 0.2, // Initial random opacity
        color: arrayColors[Math.floor(Math.random() * arrayColors.length)],
        speed: Math.random() * 0.1 + 0.05, // Speed for parallax effect
        twinkleSpeed: Math.random() * 0.02 + 0.01, // Speed for twinkling
        directionX: Math.random() * 0.5 - 0.25, // Movement direction in X
        directionY: Math.random() * 0.5 - 0.25, // Movement direction in Y
        maxSize: Math.random() * 3 + 2, // Max size for the star to increase
        minSize: Math.random() * 1 + 1, // Min size for the star to shrink
        growSpeed: Math.random() * 0.1 + 0.05, // Speed for size change
      }));
      drawStars();
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        // Calculate parallax effect (star speed and direction)
        star.x += star.directionX * star.speed;
        star.y += star.directionY * star.speed;

        // Keep the stars within the canvas bounds
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x =0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Add twinkling effect
        star.opacity += star.twinkleSpeed;
        if (star.opacity <= 0.2 || star.opacity >= 0.5) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Add pulsing size effect
        star.size += star.growSpeed;
        if (star.size >= star.maxSize || star.size <= star.minSize) {
          star.growSpeed = -star.growSpeed; // Reverse direction for pulsing effect
        }

        // Draw the star with updated properties
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const handleMouseMove = (event) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStars();
      const mouseX = event.pageX - banner.getBoundingClientRect().left;
      const mouseY = event.pageY - banner.getBoundingClientRect().top;

      // Create shooting star effect
      stars.forEach(star => {
        const distance = Math.sqrt((mouseX - star.x) ** 2 + (mouseY - star.y) ** 2);
        if (distance < 200) { // Effects will appear when mouse is closer
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      });
    };

    // Animate stars to create smooth motion, pulsing, and twinkling effect
    const animateStars = () => {
      stars.forEach(star => {
        // Adjust position for parallax effect
        star.x += star.directionX * star.speed;
        star.y += star.directionY * star.speed;

        // Reset position if stars go out of bounds
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Make stars twinkle
        star.opacity += star.twinkleSpeed;
        if (star.opacity <= 0.2 || star.opacity >= 0.5) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Add pulsing effect
        star.size += star.growSpeed;
        if (star.size >= star.maxSize || star.size <= star.minSize) {
          star.growSpeed = -star.growSpeed;
        }
      });

      drawStars();
    };

    banner.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    const animate = () => {
      requestAnimationFrame(animate);
      animateStars();
    };
    animate();

    return () => {
      banner.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [arrayColors]);

  return (
    <section className="relative w-full h-screen mx-auto">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      
      <div className={`absolute inset-0 top-[180px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
  <div className="flex flex-col justify-center items-center mt-5">
    <div className="w-5 h-5 rounded-full bg-[#5271ff] shadow-xl animate-bounce" />
    <div className="w-1 sm:h-80 h-40 violet-gradient opacity-75 hover:opacity-100 transition-opacity duration-300" />
  </div>

  <div>
    <style>{`/* Define the animation keyframes */
              @keyframes fadeInOut {
              0%, 100% { opacity: 0; transform: translateY(-10px); }
              50% { opacity: 1; transform: translateY(0); }
              }

              /* Apply the animation */
              .textAnimation {
                animation: fadeInOut 4.5s ease-in-out infinite;
              }
      `}</style>
  <h1 className={`${styles.heroHeadText} text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-wide textAnimation`}>
  Hi, I'm <span className="text-[#5271ff] hover:text-[#3a5bfd] transition-colors duration-300">Induru Udantha</span>
</h1>

    <p className={`${styles.heroSubText} mt-2 text-white-100 text-lg md:text-xl leading-relaxed opacity-60`}>
      I am an undergraduate student in the<br className="sm:block hidden" /> 
      Faculty of Computing - SLIIT...<br className="sm:block hidden" />
      I develop 3D visuals, user <br className="sm:block hidden" />
      interfaces and web applications
    </p>

    {/* Social Media Icons */}
    <div className="flex mt-6 space-x-6">
      <a href="https://github.com/Udantha-ID" rel="noopener noreferrer" className="transition-transform transform hover:scale-110 duration-300">
        <img src={gitHub} alt="GitHub" className="w-8 h-8 hover:animate-spin" />
      </a>
      <a href="https://www.linkedin.com/in/yourusername/" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110 duration-300">
        <img src={linkedin} alt="LinkedIn" className="w-9 h-9 hover:animate-spin" />
      </a>
      <a href="https://www.facebook.com/yourusername" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110 duration-300">
        <img src={facebook} alt="Facebook" className="w-9 h-9 hover:animate-spin" />
      </a>
      <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110 duration-300">
        <img src={whatsApp} alt="WhatsApp" className="w-8 h-8 hover:animate-spin" />
      </a>
    </div>
  </div>
</div>



      <ComputersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [10, 20, 0],
              }}
              transition={{
                duration: 1.0,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
