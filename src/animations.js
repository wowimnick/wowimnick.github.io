
import anime from "animejs/lib/anime.es.js"
import './App.css'

export function swapElements(element1, element2) {
  const element1Position = element1.getBoundingClientRect();
  const element2Position = element2.getBoundingClientRect();

  anime({
    targets: element1,
    top: element2Position.top,
    left: element2Position.left,
    duration: 1000,
    easing: 'easeInOutExpo'
  });

  anime({
    targets: element2,
    top: element1Position.top,
    left: element1Position.left,
    duration: 1000,
    easing: 'easeInOutExpo'
  });
}

export function onSelection(element2) {
  console.log(`it was ${element2}`)

  anime.set('.aboutmeswap', { top: '35%' });
  anime.set('.projectsswap', { top: '55%' });
  anime.set('.skillsswap', { top: '55%' });
  anime.set('.contactswap', { top: '55%' });

  switch (element2) {
    case 'projectsswap':
      anime({
        targets: ".projectsswap",
        top: '10%',
        left: '42%',
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 700,
        complete: updateElementLocations
      });
      anime({
        targets: ".aboutmeswap",
        top: '90%',
        left: '17%',
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 700,
        complete: updateElementLocations
      });
      anime({
        targets: ".skillsswap",
        top: '90%',
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 700,
        complete: updateElementLocations
      });
      anime({
        targets: ".contactswap",
        top: '90%',
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 700,
        complete: updateElementLocations
      });
      break;
    case 'aboutmeswap':
      anime({
        targets: ".aboutmeswap",
        top: '10%',
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 700,
        complete: updateElementLocations
      });
      anime({
        targets: ".projectsswap",
        top: '90%',
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 700,
        complete: updateElementLocations
      });
      anime({
        targets: ".skillsswap",
        top: '90%',
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 700,
        complete: updateElementLocations
      });
      anime({
        targets: ".contactswap",
        top: '90%',
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 700,
        complete: updateElementLocations
      });
      break;
    case 'skillsswap':
      
      anime({
        targets: ".skillsswap",
        top: '10%',
        left: '42%',
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 700,
        complete: updateElementLocations
      });
      anime({
        targets: ".aboutmeswap",
        top: '90%',
        left: '42%',
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 700,
        complete: updateElementLocations
      });
      anime({
        targets: ".projectsswap",
        top: '90%',
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 700,
        complete: updateElementLocations
      });
      anime({
        targets: ".contactswap",
        top: '90%',
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 700,
        complete: updateElementLocations
      });
      break;
    case 'contactswap':
      anime({
        targets: ".contactswap",
        top: '10%',
        left: '42%',
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 700,
        complete: updateElementLocations
      });
      anime({
        targets: ".aboutmeswap",
        top: '90%',
        left: '67%',
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 700,
        complete: updateElementLocations
      });
      anime({
        targets: ".projectsswap",
        top: '90%',
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 700,
        complete: updateElementLocations
      });
      anime({
        targets: ".skillsswap",
        top: '90%',
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 700,
        complete: updateElementLocations
      });
      break;
  }

  anime({
    targets: ".backbanner",
    height: '0%',
    easing: 'easeInOutExpo',
    duration: 700,
    delay: 600,
  });
  anime({
    targets: '.desctypewriter',
    width: '50%',
    easing: 'easeInOutQuad',
    duration: 1000
  });
  anime({
    targets: "h1",
    translateY: -440,
    easing: 'easeInOutExpo',
    duration: 700,
    delay: 900
  });
  anime({
    targets: ".backdropcontainer",
    duration: 1500,
    easing: 'easeInOutExpo',
    height: '100%',
    boxShadow: '0 0 15px 10px rgb(12 12 12 / 98%)',
    delay: 1300
  });
  anime({
    targets: ".lines1",
    duration: 1500,
    easing: 'easeInOutExpo',
    opacity: 1,
    delay: 1300
  });
  anime({
    targets: ".lines2",
    duration: 1500,
    easing: 'easeInOutExpo',
    opacity: 1,
    delay: 1300
  });

  
}

export function runWriterAnimation() {
  //const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  anime({
    targets: "h1",
    //translateX: -screenWidth / 3,
    translateY: -screenHeight / 3.3,
    delay: 3000,
    easing: 'easeInOutExpo',
    duration: 1500,
    scale: 2
  });
}
export function runTopBarAnimation() {
  anime({
    targets: ".backbanner",
    delay: 550,
    duration: 1500,
    easing: 'easeInOutExpo',
    height: '92.7%',
    complete: updateElementLocations
  });
}

export function runProjectsAnimation() {
  const screenHeight = window.innerHeight;
  anime({
    targets: ".projectscontainer",
    translateY: screenHeight / 4.5,
    opacity: '100%',

    delay: 2000,
    easing: 'easeInOutExpo',
    duration: 1500,
  });
}

export function runAboutMeAnimation() {
  const screenHeight = window.innerHeight;
  anime({
    targets: ".aboutmecontainer",
    translateY: screenHeight / 2,
    opacity: '100%',

    delay: 2000,
    easing: 'easeInOutExpo',
    duration: 1500,
  });
}

export function runSkillsAnimation() {
  const screenHeight = window.innerHeight;
  anime({
    targets: ".skillscontainer",
    translateY: screenHeight / 2,
    opacity: '100%',
    delay: 2000,
    easing: 'easeInOutExpo',
    duration: 1500,
  });
}

export function runContactAnimation() {
  const screenHeight = window.innerHeight;
  anime({
    targets: ".contactcontainer",
    translateY: screenHeight / 2,
    opacity: '100%',
    delay: 2000,
    easing: 'easeInOutExpo',
    duration: 1500,
  });
}



function updateElementLocations() {
  // get all elements whose locations need to be updated
  const elements = document.querySelectorAll('.aboutmeswap, .projectsswap, .skillsswap, .contactswap');

  // loop through each element and update its location
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    element.style.top = rect.top + 'px';
    element.style.left = rect.left + 'px';
  });
}