import React, { useEffect, useRef } from "react";

interface Circle {
  radius: number;
  x: number;
  y: number;
  originalSpeed: number;
  speed: number;
  color: string;
}

const MovingCircles: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        // Declare circles array at the top
        let circles: Circle[] = [];

        const colors: string[] = [
            "rgba(32, 178, 170, 0.7)",
            "rgba(255, 215, 0, 0.7)",
            "rgba(199, 21, 133, 0.7)",
            "rgba(30, 144, 255, 0.7)"
        ];

        // Set canvas size and check window width
        const resizeCanvas = (): void => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Now circles is defined before we use it
            circles.forEach(circle => {
                circle.speed = window.innerWidth <= 768 ? circle.originalSpeed / 2 : circle.originalSpeed;
            });
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const createCircle = (): void => {
            if (!canvas) return;
            const originalSpeed = Math.random() * 5 + 3; // Store original speed
            const radius = Math.random() * 180 + 10;  // Define radius first
            const circle: Circle = {
                radius: radius,  // Now we can use radius
                x: canvas.width + radius,
                y: Math.random() * canvas.height,
                originalSpeed: originalSpeed,
                speed: window.innerWidth <= 768 ? originalSpeed / 2 : originalSpeed,
                color: colors[Math.floor(Math.random() * colors.length)]
            };

            circles.push(circle);
        };

        const animate = (): void => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Filter out off-screen circles
            circles = circles.filter(circle => circle.x + circle.radius >= 0);

            circles.forEach(circle => {
                circle.x -= circle.speed;
                ctx.beginPath();
                ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
                ctx.fillStyle = circle.color;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        const interval = setInterval(createCircle, 3000); // Changed to create circles every 3 seconds
        animate();

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                pointerEvents: "none",
            }}
        />
    );
};

export default MovingCircles;
