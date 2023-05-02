
import anime from "animejs/lib/anime.es.js"
import './App.css'

export function runWriterAnimation() {
  const mq = window.matchMedia('(max-width: 768px)');
  const isMobile = mq.matches; 
  const buttons = document.querySelector('.buttons');
  
  anime({
    targets: "h1",
    delay: 3000,
    easing: 'easeInOutExpo',
    duration: 1500,
    scale: isMobile ? 1.3 : 1.7, 
  });

  
  anime({
    targets: ".rowmenucontainer",
    delay: 4300,
    gap: isMobile ? '10' : '25vh',
    easing: "easeInOutExpo",
    duration: 1500,
  });
  anime({
    targets: ".arrow",
    delay: 5000,
    opacity: 1,
    easing: "easeInOutExpo",
    duration: 1500,
  });
}
export function runTopBarAnimation() {
  anime({
    targets: ".backbanner",
    delay: 550,
    duration: 1500,
    easing: 'easeInOutExpo',
    height: '92.7%',
  });
}

export function runProjectsAnimation() {
  anime({
    targets: ".projects",
    opacity: '100%',
    delay: 2000,
    easing: 'easeInOutExpo',
    duration: 1500,
  });
}

export function runAboutMeAnimation() {
  anime({
    targets: ".aboutme",
    opacity: '100%',
    delay: 2000,
    easing: 'easeInOutExpo',
    duration: 1500,
  });
}

export function runSkillsAnimation() {
  anime({
    targets: ".skills",
    opacity: '100%',
    delay: 2000,
    easing: 'easeInOutExpo',
    duration: 1500,
  });
}

export function runContactAnimation() {
  anime({
    targets: ".contact",
    opacity: '100%',
    delay: 2000,
    easing: 'easeInOutExpo',
    duration: 1500,
  });
}

