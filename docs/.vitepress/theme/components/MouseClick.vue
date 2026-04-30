<template>
    <canvas
      ref="canvas"
      style="position: fixed; left: 0; top: 0; pointer-events: none; z-index: 999999"
    ></canvas>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  
  const canvas = ref(null);
  let ctx = null;
  let animationFrameId = null;
  let isAnimating = false;
  let particles = [];
  let circles = [];
  const colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];
  
  function setCanvasSize() {
    const canvasEl = canvas.value;
    canvasEl.width = window.innerWidth * 2;
    canvasEl.height = window.innerHeight * 2;
    canvasEl.style.width = window.innerWidth + "px";
    canvasEl.style.height = window.innerHeight + "px";
    ctx = canvasEl.getContext("2d");
    ctx.scale(2, 2);
  }
  
  function createParticle(x, y) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 3;
    const radius = 4 + Math.random() * 8;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return {
      x,
      y,
      radius,
      color,
      speedX: Math.cos(angle) * speed,
      speedY: Math.sin(angle) * speed,
      life: 100 + Math.random() * 100,
      currentLife: 0,
      draw(c) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
      },
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.currentLife++;
        this.radius *= 0.98;
        if (this.currentLife / this.life > 0.5) {
          this.radius *= 0.95;
        }
        return this.currentLife < this.life;
      }
    };
  }
  
  function createCircle(x, y) {
    return {
      x,
      y,
      radius: 5 + Math.random() * 10,
      maxRadius: 80 + Math.random() * 80,
      lineWidth: 6,
      alpha: 0.5,
      speed: 1 + Math.random(),
      draw(c) {
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.lineWidth = this.lineWidth;
        c.strokeStyle = "#FFF";
        c.stroke();
        c.globalAlpha = 1;
      },
      update() {
        this.radius += this.speed * 2;
        this.alpha *= 0.97;
        this.lineWidth *= 0.98;
        return this.radius < this.maxRadius && this.alpha > 0.01;
      }
    };
  }
  
  function createRandomCircle(x, y) {
    return {
      x,
      y,
      radius: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      maxRadius: 50 + Math.random() * 40,
      alpha: 1,
      speed: 1 + Math.random(),
      draw(c) {
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.globalAlpha = 1;
      },
      update() {
        this.radius += this.speed * 3;
        this.alpha *= 0.96;
        return this.radius < this.maxRadius && this.alpha > 0.01;
      }
    };
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  
    particles = particles.filter(p => { p.update(); p.draw(ctx); return p.currentLife < p.life; });
    circles   = circles.filter(c  => { const ok = c.update(); c.draw(ctx); return ok; });
  
    if (particles.length > 0 || circles.length > 0) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      animationFrameId = null;
      isAnimating = false;
    }
  }
  
  function scheduleAnimation() {
    if (!isAnimating) {
      isAnimating = true;
      animationFrameId = requestAnimationFrame(animate);
    }
  }
  
  function handleClick(e) {
    const x = e.clientX ?? e.touches[0].clientX;
    const y = e.clientY ?? e.touches[0].clientY;
  
    for (let i = 0; i < 20; i++) particles.push(createParticle(x, y));
    circles.push(createCircle(x, y));
    circles.push(createRandomCircle(x, y));
  
    scheduleAnimation();
  }
  
  onMounted(() => {
    setCanvasSize();
    const tapEvent = "ontouchstart" in window ? "touchstart" : "mousedown";
    window.addEventListener(tapEvent, handleClick);
    window.addEventListener("resize", setCanvasSize);
  });
  
  onUnmounted(() => {
    const tapEvent = "ontouchstart" in window ? "touchstart" : "mousedown";
    window.removeEventListener(tapEvent, handleClick);
    window.removeEventListener("resize", setCanvasSize);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  });
  </script>