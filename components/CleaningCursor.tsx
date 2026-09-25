"use client";

import { useEffect } from "react";

/**
 * Cleaning-themed custom cursor.
 *
 * The pointer becomes a little broom, and as you move it "sweeps" the surface:
 * a wet shine streak follows the path, soap-foam bubbles spray off the
 * bristles, and expanding water ripples (the wave) fan out — as if you were
 * cleaning the screen.
 *
 * Canvas-based (no dependency), and disabled on touch devices and for visitors
 * who prefer reduced motion, where the normal cursor is left untouched.
 */
export default function CleaningCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) return;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText =
      "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483647;";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.remove();
      return;
    }

    // Hide the native cursor (keep a text caret inside form fields for usability).
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after, html, body { cursor: none !important; }
    `;
    document.head.appendChild(style);

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Pointer state
    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;
    let bx = px; // eased broom position
    let by = py;
    let lastX = px;
    let lastY = py;
    let angle = -0.5; // broom lean
    let visible = false;
    let downScale = 1;

    type Bubble = { x: number; y: number; r: number; vx: number; vy: number; life: number; max: number };
    type Ripple = { x: number; y: number; r: number; life: number; max: number; w: number };
    type Streak = { x: number; y: number; life: number };
    const bubbles: Bubble[] = [];
    const ripples: Ripple[] = [];
    const streak: Streak[] = [];

    let sinceRipple = 0;

    const onMove = (e: MouseEvent) => {
      px = e.clientX;
      py = e.clientY;
      visible = true;
      const dx = px - lastX;
      const dy = py - lastY;
      const speed = Math.hypot(dx, dy);

      // Wet shine streak points along the path
      streak.push({ x: px, y: py, life: 1 });
      if (streak.length > 46) streak.shift();

      if (speed > 1.2) {
        // Foam bubbles sprayed off the bristles, biased opposite the motion
        const n = Math.min(4, 1 + Math.floor(speed / 6));
        for (let i = 0; i < n; i++) {
          const spread = (Math.random() - 0.5) * 1.4;
          const back = Math.atan2(-dy, -dx) + spread;
          const sp = 0.5 + Math.random() * 1.8;
          bubbles.push({
            x: px + (Math.random() - 0.5) * 10,
            y: py + (Math.random() - 0.5) * 10,
            r: 2 + Math.random() * 5,
            vx: Math.cos(back) * sp,
            vy: Math.sin(back) * sp - 0.5,
            life: 1,
            max: 40 + Math.random() * 30,
          });
        }
        if (bubbles.length > 160) bubbles.splice(0, bubbles.length - 160);

        // Expanding ripple waves as we sweep
        sinceRipple += speed;
        if (sinceRipple > 26) {
          sinceRipple = 0;
          ripples.push({ x: px, y: py, r: 6, life: 1, max: 34, w: 2.2 });
          if (ripples.length > 24) ripples.shift();
        }
      }

      lastX = px;
      lastY = py;
    };

    const onDown = () => {
      downScale = 0.82;
      // a burst of foam on click, like a scrub
      for (let i = 0; i < 14; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 1 + Math.random() * 2.4;
        bubbles.push({
          x: px,
          y: py,
          r: 2 + Math.random() * 5,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 0.6,
          life: 1,
          max: 40 + Math.random() * 30,
        });
      }
      ripples.push({ x: px, y: py, r: 4, life: 1, max: 44, w: 3 });
    };
    const onUp = () => {
      downScale = 1;
    };
    const onLeave = () => {
      visible = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    // Draw a little broom, bristle tip at (0,0), rotated by `rot`.
    const drawBroom = (x: number, y: number, rot: number, scale: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.scale(scale, scale);

      // Bristles (fan from the tip upward)
      ctx.strokeStyle = "#eab54d";
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      for (let i = -5; i <= 5; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 1.1, -12);
        ctx.lineTo(i * 2.2, 1);
        ctx.stroke();
      }
      // Bristle block
      ctx.fillStyle = "#f2c766";
      ctx.beginPath();
      ctx.moveTo(-7, -20);
      ctx.lineTo(7, -20);
      ctx.lineTo(6, -12);
      ctx.lineTo(-6, -12);
      ctx.closePath();
      ctx.fill();
      // Binding band
      ctx.fillStyle = "#2b6cb0";
      ctx.fillRect(-7.5, -22, 15, 4);
      // Handle
      ctx.strokeStyle = "#b5732b";
      ctx.lineWidth = 4.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.lineTo(-4, -46);
      ctx.stroke();
      ctx.strokeStyle = "#d68a3a";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.lineTo(-4, -46);
      ctx.stroke();

      ctx.restore();
    };

    let raf = 0;
    const loop = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // Ease the broom toward the pointer for a natural sweep
      bx += (px - bx) * 0.35;
      by += (py - by) * 0.35;
      const moveDX = px - bx;
      const moveDY = py - by;
      const moving = Math.hypot(moveDX, moveDY);
      // Broom leans in the direction of travel
      const target = -0.5 + Math.max(-0.6, Math.min(0.6, moveDX * 0.03));
      angle += (target - angle) * 0.15;

      if (visible) {
        // Traveling wave + wet shine along the sweep path
        if (streak.length > 2) {
          const now = performance.now() / 1000;
          // soft wet-shine underlay
          for (let i = 1; i < streak.length; i++) {
            const a = streak[i];
            const b = streak[i - 1];
            const t = i / streak.length;
            ctx.strokeStyle = `rgba(200,235,255,${0.1 * t})`;
            ctx.lineWidth = 12 * t;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(a.x, a.y);
            ctx.stroke();
          }
          // two overlaid sine waves rolling along the path
          const waves = [
            { amp: 8, freq: 0.5, speed: 6, col: "150,215,255", alpha: 0.5, width: 3 },
            { amp: 5, freq: 0.85, speed: -9, col: "20,161,230", alpha: 0.55, width: 2 },
          ];
          for (const wv of waves) {
            ctx.beginPath();
            for (let i = 0; i < streak.length; i++) {
              const p = streak[i];
              const prev = streak[Math.max(0, i - 1)];
              const nx = p.x - prev.x;
              const ny = p.y - prev.y;
              const len = Math.hypot(nx, ny) || 1;
              const perpx = -ny / len;
              const perpy = nx / len;
              const off = Math.sin(i * wv.freq + now * wv.speed) * wv.amp * p.life;
              const x = p.x + perpx * off;
              const y = p.y + perpy * off;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = `rgba(${wv.col},${wv.alpha})`;
            ctx.lineWidth = wv.width;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();
          }
        }
        for (const s of streak) s.life -= 0.02;
        while (streak.length && streak[0].life <= 0) streak.shift();

        // Ripple waves
        for (let i = ripples.length - 1; i >= 0; i--) {
          const rp = ripples[i];
          rp.r += 1.5;
          rp.life = 1 - rp.r / rp.max;
          if (rp.life <= 0) {
            ripples.splice(i, 1);
            continue;
          }
          ctx.strokeStyle = `rgba(20,161,230,${0.5 * rp.life})`;
          ctx.lineWidth = rp.w * rp.life;
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.r, Math.PI * 0.05, Math.PI * 0.95);
          ctx.stroke();
        }

        // Foam bubbles
        for (let i = bubbles.length - 1; i >= 0; i--) {
          const bub = bubbles[i];
          bub.x += bub.vx;
          bub.y += bub.vy;
          bub.vy += 0.015; // slight settle
          bub.vx *= 0.98;
          bub.life -= 1 / bub.max;
          if (bub.life <= 0) {
            bubbles.splice(i, 1);
            continue;
          }
          const alpha = Math.max(0, bub.life);
          ctx.beginPath();
          ctx.arc(bub.x, bub.y, bub.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.5 * alpha})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(20,161,230,${0.45 * alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          // little highlight
          ctx.beginPath();
          ctx.arc(bub.x - bub.r * 0.3, bub.y - bub.r * 0.3, bub.r * 0.28, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.7 * alpha})`;
          ctx.fill();
        }

        // The broom itself (a touch of squash while moving/clicking)
        const squash = 1 + Math.min(0.12, moving * 0.01);
        drawBroom(bx, by, angle, downScale * squash);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      style.remove();
      canvas.remove();
    };
  }, []);

  return null;
}
