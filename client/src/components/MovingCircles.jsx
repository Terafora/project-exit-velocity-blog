import { useEffect, useRef } from "react";

const MovingCircles = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const colors = [
            "rgba(32, 178, 170, 0.7)",
            "rgba(255, 215, 0, 0.7)",
            "rgba(199, 21, 133, 0.7)",
            "rgba(30, 144, 255, 0.7)"
        ];
        let circles = [];

        const createCircle = () => {
            const radius = Math.random() * 180 + 10; // Size range
            const x = canvas.width + radius; // Start off-screen to the right
            const y = Math.random() * canvas.height;
            const speed = Math.random() * 5 + 3; // Speed range
            const color = colors[Math.floor(Math.random() * colors.length)];

            circles.push({ x, y, radius, speed, color });
        };

        const animate = () => {
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
