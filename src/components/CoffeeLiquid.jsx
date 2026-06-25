import { useEffect, useRef } from 'react';

export default function CoffeeLiquid() {
  const canvasRef = useRef(null);
  const mouseX = useRef(0.5); // normalized 0–1
  const tiltRef = useRef(0);  // smoothed tilt

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseX.current = e.clientX / window.innerWidth;
    };
    window.addEventListener('mousemove', onMouseMove);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    // bubble pool
    const bubbles = Array.from({ length: 14 }, () => ({
      x: Math.random(),
      y: 0.5 + Math.random() * 0.45,
      r: 2 + Math.random() * 4,
      speed: 0.0003 + Math.random() * 0.0005,
      wobble: Math.random() * Math.PI * 2,
    }));

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // smooth tilt toward mouse
      const targetTilt = (mouseX.current - 0.5) * 55;
      tiltRef.current += (targetTilt - tiltRef.current) * 0.06;
      const tilt = tiltRef.current;

      const fillTop = H * 0.30; // liquid surface base Y

      // --- liquid body ---
      ctx.beginPath();
      ctx.moveTo(0, surfaceY(0, W, H, fillTop, tilt, t));
      for (let x = 1; x <= W; x++) {
        ctx.lineTo(x, surfaceY(x, W, H, fillTop, tilt, t));
      }
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();

      const coffeeGrad = ctx.createLinearGradient(0, fillTop - 20, 0, H);
      coffeeGrad.addColorStop(0, 'rgba(90, 55, 35, 0.97)');
      coffeeGrad.addColorStop(0.25, 'rgba(60, 35, 18, 0.99)');
      coffeeGrad.addColorStop(1, 'rgba(28, 14, 6, 1)');
      ctx.fillStyle = coffeeGrad;
      ctx.fill();

      // --- crema foam band ---
      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const sy = surfaceY(x, W, H, fillTop, tilt, t);
        if (x === 0) ctx.moveTo(x, sy);
        else ctx.lineTo(x, sy);
      }
      for (let x = W; x >= 0; x--) {
        ctx.lineTo(x, surfaceY(x, W, H, fillTop, tilt, t) - 16);
      }
      ctx.closePath();
      const foamGrad = ctx.createLinearGradient(0, fillTop - 20, 0, fillTop + 10);
      foamGrad.addColorStop(0, 'rgba(203, 174, 154, 0.0)');
      foamGrad.addColorStop(0.5, 'rgba(210, 185, 160, 0.55)');
      foamGrad.addColorStop(1, 'rgba(180, 140, 110, 0.15)');
      ctx.fillStyle = foamGrad;
      ctx.fill();

      // --- rising bubbles ---
      for (const b of bubbles) {
        b.y -= b.speed;
        b.wobble += 0.04;
        if (b.y < 0.28) {
          b.y = 0.95;
          b.x = 0.1 + Math.random() * 0.8;
        }
        const bx = b.x * W + Math.sin(b.wobble) * 4;
        const by = b.y * H;
        const surfY = surfaceY(bx, W, H, fillTop, tilt, t);
        if (by > surfY) {
          ctx.beginPath();
          ctx.arc(bx, by, b.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(160, 110, 75, 0.25)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(200, 160, 120, 0.35)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // --- surface shimmer ---
      const shimmerGrad = ctx.createLinearGradient(0, 0, W, 0);
      shimmerGrad.addColorStop(0, 'rgba(255,220,170,0)');
      shimmerGrad.addColorStop(0.5 + (tilt / 200), 'rgba(255,210,150,0.12)');
      shimmerGrad.addColorStop(1, 'rgba(255,220,170,0)');

      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const sy = surfaceY(x, W, H, fillTop, tilt, t);
        if (x === 0) ctx.moveTo(x, sy - 2);
        else ctx.lineTo(x, sy - 2);
      }
      for (let x = W; x >= 0; x--) {
        ctx.lineTo(x, surfaceY(x, W, H, fillTop, tilt, t) + 2);
      }
      ctx.closePath();
      ctx.fillStyle = shimmerGrad;
      ctx.fill();

      t += 0.018;
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      overflow: 'hidden',
      boxShadow: 'inset 0 -20px 60px rgba(28,14,6,0.6), inset 0 10px 30px rgba(255,200,150,0.08), 0 20px 40px rgba(44,24,16,0.18)',
      background: '#1c0e06',
    }}>
      <canvas
        ref={canvasRef}
        width={450}
        height={450}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      {/* rim highlight — looks like light catching the cup edge */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        borderRadius: '50%',
        border: '2px solid rgba(255,255,255,0.15)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}

function surfaceY(x, W, H, fillTop, tilt, t) {
  const tiltAtX = ((x / W) - 0.5) * tilt * 2;
  const wave1 = Math.sin(x * 0.018 + t) * 7;
  const wave2 = Math.sin(x * 0.038 - t * 1.4) * 4;
  const wave3 = Math.sin(x * 0.008 + t * 0.6) * 3;
  return fillTop + wave1 + wave2 + wave3 + tiltAtX;
}
