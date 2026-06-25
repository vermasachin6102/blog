import { useEffect, useRef } from 'react';

// Light americano pooling in top-right corner, nav bar acts as the top wall
export default function CornerCoffee({ navHeight = 72 }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0 });
  const tiltRef = useRef(0);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouseMove);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // smooth tilt: mouse X drives left/right slosh
      const targetTilt = (mouseRef.current.x - 0.5) * 80;
      tiltRef.current += (targetTilt - tiltRef.current) * 0.05;
      const tilt = tiltRef.current;

      // pool depth: mouse Y slightly adjusts how deep the pool is
      const depthBonus = mouseRef.current.y * 40;

      // The liquid surface in the top-right corner
      // Pool fills from right edge inward and from nav downward
      // Surface is a wave line; everything right+above it fills with coffee

      const poolBaseDepth = 160 + depthBonus; // how far down from nav the pool reaches at right edge
      const poolBaseWidth = 340;              // how far left from right edge the pool reaches

      // surface curve: starts at top-right, sweeps down-left
      const startX = W;
      const startY = navHeight + 4;

      // end of surface at the left-most point of the pool
      const endX = W - poolBaseWidth + tilt * 1.2;
      const endY = navHeight + 14;

      // control point for the wave belly (curves down into corner)
      const cpX = W - poolBaseWidth * 0.45;
      const cpY = navHeight + poolBaseDepth + tilt * 0.4;

      // animated ripple offset along the curve
      const ripple = Math.sin(t * 1.1) * 6 + Math.sin(t * 2.3) * 3;

      // Build path: surface wave → right edge down → bottom of pool → back up
      ctx.beginPath();
      ctx.moveTo(endX, endY + ripple * 0.3);

      // main surface curve with subtle wave
      for (let i = 0; i <= 60; i++) {
        const p = i / 60;
        // quadratic bezier point
        const bx = (1 - p) * (1 - p) * endX + 2 * (1 - p) * p * cpX + p * p * startX;
        const by = (1 - p) * (1 - p) * endY + 2 * (1 - p) * p * cpY + p * p * startY;
        const waveOffset = Math.sin(p * Math.PI * 2.5 + t) * 5 * Math.sin(p * Math.PI)
                         + Math.sin(p * Math.PI * 4 - t * 1.6) * 2.5;
        ctx.lineTo(bx, by + waveOffset);
      }

      // right wall down to bottom-right corner
      ctx.lineTo(W, navHeight + poolBaseDepth + 60);
      // sweep along bottom of pool area
      ctx.quadraticCurveTo(
        W - poolBaseWidth * 0.3,
        navHeight + poolBaseDepth + 80,
        endX - 20,
        navHeight + poolBaseDepth + 10
      );
      ctx.lineTo(endX, endY + ripple * 0.3);
      ctx.closePath();

      // americano: light amber, translucent
      const grad = ctx.createRadialGradient(
        W - poolBaseWidth * 0.2, navHeight + poolBaseDepth * 0.5, 10,
        W - poolBaseWidth * 0.5, navHeight + poolBaseDepth, poolBaseWidth * 0.9
      );
      grad.addColorStop(0, 'rgba(210, 155, 90, 0.22)');
      grad.addColorStop(0.4, 'rgba(180, 120, 65, 0.18)');
      grad.addColorStop(1, 'rgba(140, 85, 40, 0.08)');
      ctx.fillStyle = grad;
      ctx.fill();

      // surface shimmer line
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      for (let i = 0; i <= 60; i++) {
        const p = i / 60;
        const bx = (1 - p) * (1 - p) * endX + 2 * (1 - p) * p * cpX + p * p * startX;
        const by = (1 - p) * (1 - p) * endY + 2 * (1 - p) * p * cpY + p * p * startY;
        const waveOffset = Math.sin(p * Math.PI * 2.5 + t) * 5 * Math.sin(p * Math.PI)
                         + Math.sin(p * Math.PI * 4 - t * 1.6) * 2.5;
        ctx.lineTo(bx, by + waveOffset);
      }
      ctx.strokeStyle = 'rgba(230, 190, 130, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // tiny bubbles near the surface
      for (let i = 0; i < 5; i++) {
        const p = 0.5 + i * 0.08 + Math.sin(t * 0.3 + i) * 0.05;
        const bx = (1 - p) * (1 - p) * endX + 2 * (1 - p) * p * cpX + p * p * startX;
        const by = (1 - p) * (1 - p) * endY + 2 * (1 - p) * p * cpY + p * p * startY;
        const waveOffset = Math.sin(p * Math.PI * 2.5 + t) * 5 * Math.sin(p * Math.PI);
        ctx.beginPath();
        ctx.arc(bx + Math.sin(t + i) * 3, by + waveOffset + 6 + Math.sin(t * 0.7 + i * 1.3) * 4, 2 + i * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(220, 175, 110, 0.25)';
        ctx.fill();
      }

      t += 0.016;
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, [navHeight]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 99, // just below nav z-index (100)
      }}
    />
  );
}
