// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  initIntroOverlay();
  initHeroAnimation();
  initBgCanvas();
  initCursorGlow();
  initGSAPScrollTrigger();
  initProgressBar();
  initAudioSynthesizer();
  initCakeCandles();
  initWishBox();
  initLightbox();
});

/* ===================================================
   0. Opening Intro Splash Screen Transition
   =================================================== */
function initIntroOverlay() {
  const overlay = document.getElementById('introOverlay');
  const openBtn = document.getElementById('openIntroBtn');

  if (!openBtn || !overlay) return;

  openBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    
    // Launch opening celebration confetti
    launchConfetti();

    // Auto play emotional birthday piano melody
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    startMelody();

    const musicBtn = document.getElementById('musicBtn');
    if (musicBtn) {
      musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      musicBtn.style.color = '#4ea8de';
    }
  });
}

/* ===================================================
   1. Hero Card Entrance Animation (GSAP)
   =================================================== */
function initHeroAnimation() {
  const heroCard = document.getElementById('heroCard');
  if (heroCard) {
    setTimeout(() => {
      heroCard.classList.add('loaded');
    }, 150);
  }

  if (typeof gsap !== 'undefined') {
    gsap.from('.hero-title', {
      duration: 1.2,
      y: 40,
      opacity: 0,
      ease: 'back.out(1.7)',
      delay: 0.3
    });

    gsap.from('.age-badge', {
      duration: 1,
      scale: 0.7,
      opacity: 0,
      ease: 'elastic.out(1, 0.5)',
      delay: 0.6
    });

    gsap.from('.hero-thumb', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.9
    });
  }
}

/* ===================================================
   2. Cursor Follower & Glowing Sparkle Trail
   =================================================== */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (glow) {
      glow.style.left = `${mouseX}px`;
      glow.style.top = `${mouseY}px`;
    }
  });
}

/* ===================================================
   3. Interactive Background Canvas (Floating Particles)
   =================================================== */
function initBgCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 50;
  const colors = ['#ff85a1', '#ffd6e0', '#70d6ff', '#90e0ef', '#b39ddb', '#ffd166'];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 100;
      this.size = Math.random() * 12 + 6;
      this.speedY = Math.random() * 1.2 + 0.5;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.8;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.5 + 0.3;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 2;
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.y * 0.01) * 0.7;
      this.rotation += this.rotSpeed;

      if (this.y < -30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;

      const s = this.size / 2;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.quadraticCurveTo(0, 0, s, 0);
      ctx.quadraticCurveTo(0, 0, 0, s);
      ctx.quadraticCurveTo(0, 0, -s, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s);
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* ===================================================
   4. Advanced GSAP ScrollTrigger Animations & Parallax
   =================================================== */
function initGSAPScrollTrigger() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    const storyCards = document.querySelectorAll('.story-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    storyCards.forEach(card => observer.observe(card));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const cards = document.querySelectorAll('.story-card');
  cards.forEach((card) => {
    gsap.fromTo(card, 
      { opacity: 0, y: 100, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    const img = card.querySelector('.polaroid-img');
    if (img) {
      gsap.fromTo(img, 
        { y: -20, scale: 1.1 },
        {
          y: 20,
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }
  });

  ScrollTrigger.create({
    trigger: '#story',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const p = self.progress;
      if (p < 0.25) {
        document.body.style.background = 'linear-gradient(135deg, #fff0f5 0%, #e0f7fa 50%, #ffe5ec 100%)';
      } else if (p < 0.5) {
        document.body.style.background = 'linear-gradient(135deg, #e0f7fa 0%, #f3e5f5 50%, #fff0f5 100%)';
      } else if (p < 0.75) {
        document.body.style.background = 'linear-gradient(135deg, #ffe5ec 0%, #e8f7ff 50%, #f0f4c3 100%)';
      } else {
        document.body.style.background = 'linear-gradient(135deg, #fff0f5 0%, #e0f7fa 50%, #ffd6e0 100%)';
      }
    }
  });
}

/* ===================================================
   5. Scroll Progress Bar
   =================================================== */
function initProgressBar() {
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  });
}

/* ===================================================
   6. Rich Emotional Piano Birthday Synthesizer
   (Nuansa Terharu, Emosional, Bittersweet & Penuh Semangat)
   =================================================== */
let audioCtx = null;
let isPlayingMelody = false;
let melodyInterval = null;

function initAudioSynthesizer() {
  const musicBtn = document.getElementById('musicBtn');
  if (!musicBtn) return;

  musicBtn.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (isPlayingMelody) {
      stopMelody();
      musicBtn.innerHTML = '<i class="fas fa-music"></i>';
      musicBtn.style.color = '#ff85a1';
    } else {
      startMelody();
      musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      musicBtn.style.color = '#4ea8de';
    }
  });
}

// Warm acoustic piano note synthesis with harmonics & warm decay
function playPianoNote(freq, duration, delay = 0, volume = 0.12) {
  if (!audioCtx) return;
  setTimeout(() => {
    try {
      const now = audioCtx.currentTime;

      // Fundamental oscillator (Warm triangle/sine mix)
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now); // Warm 1st overtone

      // Attack, decay, sustain envelope for realistic piano touch
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch (e) {
      console.log(e);
    }
  }, delay);
}

// Play arpeggiated piano chord for emotional bittersweet background depth
function playChordArpeggio(chordNotes, duration, delay) {
  chordNotes.forEach((freq, idx) => {
    playPianoNote(freq, duration, delay + (idx * 80), 0.06);
  });
}

function startMelody() {
  if (isPlayingMelody) return;
  isPlayingMelody = true;

  // Emotional Bittersweet & Inspiring Birthday Piano Sequence
  // Frequencies: G3, C4, E4, G4, A4, B4, C5, D5, E5, F5, G5
  const emotionalSequence = [
    // Intro: Bittersweet Arpeggio (Am -> F -> C -> G)
    { chord: [220, 261.63, 329.63], mel: 392, d: 450 },  // G4
    { chord: [], mel: 392, d: 350 },                    // G4
    { chord: [174.61, 220, 261.63], mel: 440, d: 600 },  // A4 (Nostalgic shift)
    { chord: [], mel: 392, d: 600 },                    // G4
    { chord: [130.81, 164.81, 196.00], mel: 523.25, d: 650 }, // C5
    { chord: [], mel: 493.88, d: 1100 },                // B4 (Heartfelt pause)

    // Phrase 2: Building Hope & Warmth
    { chord: [220, 261.63, 329.63], mel: 392, d: 450 },  // G4
    { chord: [], mel: 392, d: 350 },                    // G4
    { chord: [174.61, 220, 261.63], mel: 440, d: 600 },  // A4
    { chord: [], mel: 392, d: 600 },                    // G4
    { chord: [196.00, 246.94, 293.66], mel: 587.33, d: 650 }, // D5
    { chord: [], mel: 523.25, d: 1100 },                // C5

    // Phrase 3: Emotional Peak (Uplifting & Inspiring)
    { chord: [130.81, 164.81, 196.00], mel: 392, d: 450 },  // G4
    { chord: [], mel: 392, d: 350 },                    // G4
    { chord: [349.23, 440, 523.25], mel: 783.99, d: 650 },  // G5 (High emotion)
    { chord: [329.63, 392, 523.25], mel: 659.25, d: 650 },  // E5
    { chord: [261.63, 329.63, 392], mel: 523.25, d: 650 },  // C5
    { chord: [246.94, 293.66, 392], mel: 493.88, d: 650 },  // B4
    { chord: [220, 261.63, 329.63], mel: 440, d: 1200 },    // A4 (Deep emotional resolution)

    // Phrase 4: Celebration Finale (Full Spirit)
    { chord: [174.61, 220, 261.63], mel: 698.46, d: 450 },  // F5
    { chord: [], mel: 698.46, d: 350 },                    // F5
    { chord: [130.81, 164.81, 196.00], mel: 659.25, d: 650 }, // E5
    { chord: [], mel: 523.25, d: 650 },                    // C5
    { chord: [196.00, 246.94, 293.66], mel: 587.33, d: 750 }, // D5
    { chord: [130.81, 164.81, 196.00, 261.63], mel: 523.25, d: 1600 } // C5 (Warm resolution chord)
  ];

  const loopMelody = () => {
    let t = 0;
    emotionalSequence.forEach(step => {
      if (step.chord.length > 0) {
        playChordArpeggio(step.chord, step.d / 1000 + 0.4, t);
      }
      playPianoNote(step.mel, step.d / 1000 + 0.3, t, 0.14);
      t += step.d + 80;
    });
  };

  loopMelody();
  melodyInterval = setInterval(loopMelody, 18500);
}

function stopMelody() {
  isPlayingMelody = false;
  if (melodyInterval) clearInterval(melodyInterval);
}

/* ===================================================
   7. Interactive Birthday Cake & Candle Blowing
   =================================================== */
function initCakeCandles() {
  const blowBtn = document.getElementById('blowBtn');
  const flames = document.querySelectorAll('.flame');

  if (!blowBtn) return;

  blowBtn.addEventListener('click', () => {
    flames.forEach(f => f.classList.add('extinguished'));

    // Trigger explosive confetti celebration
    launchConfetti();

    blowBtn.innerHTML = 'Lilin Telah Ditiup! Selamat Ulang Tahun, Ifa!';
    blowBtn.disabled = true;
    blowBtn.style.background = 'linear-gradient(135deg, #70d6ff, #ff85a1)';

    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      playPianoNote(freq, 1.2, idx * 180, 0.16);
    });

    setTimeout(() => {
      alert("Selamat Ulang Tahun ke-22, Ifa Anisahtul Framesti! Semoga panjang umur, sehat selalu, makin sukses kuliahnya, dan selalu dipenuhi kebahagiaan!");
    }, 800);
  });
}

function launchConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff85a1', '#70d6ff', '#ffd166', '#ffffff']
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 60,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 60,
        origin: { x: 1 }
      });
    }, 400);
  }
}

/* ===================================================
   8. Wish Box & Dynamic Wish Cards
   =================================================== */
function initWishBox() {
  const sendWishBtn = document.getElementById('sendWishBtn');
  const wishTextarea = document.getElementById('wishTextarea');
  const wishNameInput = document.getElementById('wishNameInput');
  const wishesGrid = document.getElementById('wishesGrid');

  if (!sendWishBtn) return;

  sendWishBtn.addEventListener('click', () => {
    const text = wishTextarea.value.trim();
    const name = wishNameInput.value.trim() || 'Sahabat Setia';

    if (!text) {
      alert('Tuliskan doa ucapan terlebih dahulu untuk Ifa.');
      return;
    }

    const card = document.createElement('div');
    card.className = 'wish-card-item';
    card.innerHTML = `
      <div style="font-weight:700; color:var(--pink-primary); margin-bottom:6px; display:flex; justify-content:space-between;">
        <span>${escapeHtml(name)}</span>
        <span style="font-size:0.8rem; color:#aaa;">Baru saja</span>
      </div>
      <p style="font-size:0.95rem; line-height:1.5; color:#555;">"${escapeHtml(text)}"</p>
    `;

    wishesGrid.prepend(card);
    wishTextarea.value = '';
    wishNameInput.value = '';

    launchConfetti();
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ===================================================
   9. Lightbox Zoom Preview
   =================================================== */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');

  if (!modal) return;

  document.querySelectorAll('.polaroid-frame').forEach(frame => {
    frame.addEventListener('click', () => {
      const img = frame.querySelector('.polaroid-img');
      const caption = frame.querySelector('.polaroid-caption');
      if (img) {
        modalImg.src = img.src;
        modalCaption.textContent = caption ? caption.textContent : 'Moments with Ifa';
        modal.classList.add('active');
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}
