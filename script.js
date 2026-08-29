// Global Quiz Data & Functions
const quizQuestions = [
  {
    question: "1. Siapa mahasiswi paling manis, ceria, dan favorit banyak orang saat ini?",
    options: [
      { key: "A", text: "Ifa Anisahtul Framesti" },
      { key: "B", text: "Ifa si Bintang Kampus" },
      { key: "C", text: "Gadis cantik tanggal 29 Agustus" },
      { key: "D", text: "Semuanya benar & memang sepesona itu!" }
    ],
    compliment: "Tepat sekali! Gak bisa dipungkiri memang pesonamu selalu berhasil bikin suasana jadi jauh lebih hangat dan manis. Siap-siap dibuat makin tersenyum ya..."
  },
  {
    question: "2. Apa kebiasaan ajaib seorang Ifa yang selalu bikin orang di sekitarnya bahagia?",
    options: [
      { key: "A", text: "Senyum khasnya yang bikin suasana adem" },
      { key: "B", text: "Kepedulian dan kebaikan hatinya yang tulus" },
      { key: "C", text: "Semangat positifnya yang gak pernah padam" },
      { key: "D", text: "Semuanya benar & selalu bikin kangen!" }
    ],
    compliment: "Setuju banget! Kebaikan dan perhatian tulusmu itu langka banget. Beruntung banget siapapun orang yang ada di sekitar kamu!"
  },
  {
    question: "3. Di usia ke-22 tahun ini, apa hal terindah yang paling pantas didapatkan oleh Ifa?",
    options: [
      { key: "A", text: "Kebahagiaan tanpa batas setiap hari" },
      { key: "B", text: "Kelancaran kuliah & kesuksesan impian" },
      { key: "C", text: "Dikelilingi cinta & orang-orang tulus" },
      { key: "D", text: "Semua doa terbaik di dunia ini!" }
    ],
    compliment: "Bener banget! Kamu selayak itu untuk mendapatkan seluruh kebahagiaan dan keindahan dunia di usia 22 tahun ini. Selamat menikmati kejutan spesialmu!"
  }
];

let currentQuizIndex = 0;

// Global Functions attached to window so HTML onclick always works
window.startQuiz = function() {
  const quizWelcomeCard = document.getElementById('quizWelcomeCard');
  const quizQuestionCard = document.getElementById('quizQuestionCard');
  if (quizWelcomeCard) quizWelcomeCard.style.display = 'none';
  if (quizQuestionCard) quizQuestionCard.style.display = 'block';
  currentQuizIndex = 0;
  renderQuizQuestion(0);
};

window.selectQuizOption = function(optIndex) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    playPianoNote(523.25, 0.4, 0, 0.1);
  } catch(e) {}

  const qData = quizQuestions[currentQuizIndex];
  if (qData) {
    showComplimentModal(qData.compliment, currentQuizIndex === quizQuestions.length - 1);
  }
};

window.nextCompliment = function() {
  const complimentModal = document.getElementById('complimentModal');
  if (complimentModal) complimentModal.classList.remove('active');

  if (currentQuizIndex < quizQuestions.length - 1) {
    currentQuizIndex++;
    renderQuizQuestion(currentQuizIndex);
  } else {
    // Finished all 3 quiz questions! Open main website
    const overlay = document.getElementById('introOverlay');
    if (overlay) overlay.classList.add('hidden');

    launchConfetti();

    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      startMelody();

      const musicBtn = document.getElementById('musicBtn');
      if (musicBtn) {
        musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        musicBtn.style.color = '#4ea8de';
      }
    } catch(e) {}
  }
};

function renderQuizQuestion(index) {
  const qData = quizQuestions[index];
  const stepBadge = document.getElementById('quizStepBadge');
  const progressFill = document.getElementById('quizProgressFill');
  const questionTitle = document.getElementById('quizQuestionTitle');
  const optionsGrid = document.getElementById('quizOptionsGrid');

  if (!qData) return;

  if (stepBadge) stepBadge.textContent = `Pertanyaan ${index + 1} dari 3`;
  if (progressFill) progressFill.style.width = `${((index + 1) / 3) * 100}%`;
  if (questionTitle) questionTitle.textContent = qData.question;
  
  if (optionsGrid) {
    optionsGrid.innerHTML = '';
    qData.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.setAttribute('onclick', `selectQuizOption(${idx})`);
      btn.innerHTML = `
        <span class="quiz-opt-badge">${opt.key}</span>
        <span>${escapeHtml(opt.text)}</span>
      `;
      optionsGrid.appendChild(btn);
    });
  }
}

function showComplimentModal(text, isLast) {
  const modal = document.getElementById('complimentModal');
  const compText = document.getElementById('complimentText');
  const compNextBtn = document.getElementById('complimentNextBtn');

  if (!modal) return;

  if (compText) compText.textContent = text;
  if (compNextBtn) {
    if (isLast) {
      compNextBtn.querySelector('span').textContent = 'Buka Kejutan Utama 🎉';
    } else {
      compNextBtn.querySelector('span').textContent = `Lanjut ke Pertanyaan ${currentQuizIndex + 2}`;
    }
  }

  modal.classList.add('active');
  launchConfetti();
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
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

function playPianoNote(freq, duration, delay = 0, volume = 0.12) {
  if (!audioCtx) return;
  setTimeout(() => {
    try {
      const now = audioCtx.currentTime;

      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);

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

function playChordArpeggio(chordNotes, duration, delay) {
  chordNotes.forEach((freq, idx) => {
    playPianoNote(freq, duration, delay + (idx * 80), 0.06);
  });
}

function startMelody() {
  if (isPlayingMelody) return;
  isPlayingMelody = true;

  const emotionalSequence = [
    { chord: [220, 261.63, 329.63], mel: 392, d: 450 },
    { chord: [], mel: 392, d: 350 },
    { chord: [174.61, 220, 261.63], mel: 440, d: 600 },
    { chord: [], mel: 392, d: 600 },
    { chord: [130.81, 164.81, 196.00], mel: 523.25, d: 650 },
    { chord: [], mel: 493.88, d: 1100 },

    { chord: [220, 261.63, 329.63], mel: 392, d: 450 },
    { chord: [], mel: 392, d: 350 },
    { chord: [174.61, 220, 261.63], mel: 440, d: 600 },
    { chord: [], mel: 392, d: 600 },
    { chord: [196.00, 246.94, 293.66], mel: 587.33, d: 650 },
    { chord: [], mel: 523.25, d: 1100 },

    { chord: [130.81, 164.81, 196.00], mel: 392, d: 450 },
    { chord: [], mel: 392, d: 350 },
    { chord: [349.23, 440, 523.25], mel: 783.99, d: 650 },
    { chord: [329.63, 392, 523.25], mel: 659.25, d: 650 },
    { chord: [261.63, 329.63, 392], mel: 523.25, d: 650 },
    { chord: [246.94, 293.66, 392], mel: 493.88, d: 650 },
    { chord: [220, 261.63, 329.63], mel: 440, d: 1200 },

    { chord: [174.61, 220, 261.63], mel: 698.46, d: 450 },
    { chord: [], mel: 698.46, d: 350 },
    { chord: [130.81, 164.81, 196.00], mel: 659.25, d: 650 },
    { chord: [], mel: 523.25, d: 650 },
    { chord: [196.00, 246.94, 293.66], mel: 587.33, d: 750 },
    { chord: [130.81, 164.81, 196.00, 261.63], mel: 523.25, d: 1600 }
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
