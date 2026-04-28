// ═══════════════════════════════════════
// REM SİGORTA — MAIN JS
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ── Mobile menu toggle ──
  const toggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      const isOpen = mobileMenu.classList.contains('open');
      spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
      spans[1].style.opacity  = isOpen ? '0' : '';
      spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
    });
  }

  // ── Scroll reveal ──
  const revealEls = document.querySelectorAll('.reveal, .story-block, .story-quote');
  if (revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => obs.observe(el));
  }

  // ── Intro video ──
  const introScreen = document.getElementById('intro-screen');
  const introVideo  = document.getElementById('intro-video');
  const introSkip   = document.getElementById('intro-skip');

  function dismissIntro() {
    if (!introScreen) return;
    introScreen.classList.add('done');
  }

  if (introVideo) {
    introVideo.addEventListener('ended', dismissIntro);
    introVideo.play().catch(dismissIntro);
  }
  if (introSkip) {
    introSkip.addEventListener('click', dismissIntro);
  }

});
