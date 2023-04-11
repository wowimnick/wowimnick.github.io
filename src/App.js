import { useEffect, useState } from 'react';
import './App.css';
import { swapElements, onSelection, runContactAnimation, runSkillsAnimation, runAboutMeAnimation, runProjectsAnimation, runTopBarAnimation, runWriterAnimation } from "./animations";
import sample from './videoplayback.mp4';
import { useDescriptions } from "./descriptions"
import { Typewriter } from 'react-simple-typewriter'

function App() {
  const [previous, setPrevious] = useState("");
  const [clickedbutton, setClickedButton] = useState("");
  const descriptors = useDescriptions();
  var isFirst = false;


  useEffect(() => {

    runWriterAnimation();

    setTimeout(() => {
      runTopBarAnimation();
    }, 3000);

    setTimeout(() => {
      runProjectsAnimation();
    }, 2300);

    setTimeout(() => {
      runAboutMeAnimation();
    }, 2600);

    setTimeout(() => {
      runSkillsAnimation();
    }, 2900);

    setTimeout(() => {
      runContactAnimation();
    }, 3200);
  }, []);

  function showSection(sectionName) {
    setClickedButton(sectionName);
    if (!previous) {
      isFirst = true;
      onSelection(sectionName);

    } else {
      isFirst = false;
    }
  }

  useEffect(() => {
    setPrevious(clickedbutton);
    if (clickedbutton && previous && clickedbutton !== previous) {

      swapElements(document.querySelector(`.${previous}`), document.querySelector(`.${clickedbutton}`))
    }
  }, [previous, clickedbutton]);


  return (
    <div className="App">
      <video autoPlay muted loop className="video">
        <source src={sample} type="video/mp4" />

      </video>
      <div className='backdropcontainer'>
        <div className='lines1'></div>
        <div className='lines2'></div>

        {descriptors.showAboutMeDesc && (
          <div className='desctypewriter'>
            <br /><br /><br />
            I'm a Full-Stack Developer and Machine Learning enthusiast based in Toronto. My passion lies in building robust, scalable applications and using data to derive insights that drive business growth.
            <br /><br />
            As a problem solver, I love tackling complex challenges and breaking them down into smaller, more manageable pieces. I'm constantly experimenting with new technologies and frameworks to stay up-to-date and provide the best solutions for my clients.
            <br /><br />
            In addition to my technical skills, I'm also a family person and enjoy spending time with my loved ones. When I'm not coding, you can find me hiking, reading about the latest advancements in AI, or playing some games with friends.
            <br /><br />
            I believe that collaboration is key to achieving great results, and I'm always looking for new opportunities to work with positive and ambitious people on exciting projects.
            <br /><br /><br /><br /><br /><br />
            <span style={{ color: '#4bc9f9' }}>Let's make something special.</span>
          </div>)}

        {descriptors.showSkillsDesc && (
          <><div className='java'>Java</div>
            <div className='csharp'>C#</div>
            <div className='python'>Python</div>
            <div className='htmlcss'>HTML & CSS</div>
            <div className='desctypewriterskills'>
              <br />
              <br /><br />
              Having over 2 years of development experience in both back-end and front-end development, I have experience in a variety of programming languages, tools, and technologies, like
              <span style={{ color: 'indianred', fontFamily: 'Damion', fontSize: '22px' }}>
                <Typewriter
                  words={[' Java', ' Python', ' C#', ' HTML & CSS', ' SQL', ' Java Script', ' ReactJS', ' Django', ' Cloud Computing', ' Docker', ' Machine Learning', ' Git']}
                  loop={0}
                  typeSpeed={50}
                  deleteSpeed={30}
                  delaySpeed={1000} />
              </span>.



            </div></>)}
        {descriptors.showContactMeDesc && (<div className='desctypewriter'>
          <br />
          This is to test contact me section

        </div>)}
        {descriptors.showProjectsDesc && (<div className='desctypewriter'>
          <br />
          This is to test Portfolio section
        </div>)}
      </div>
      <div className='backbanner'>

      </div>
      <div className="typewriter">
        <h1>
          <Typewriter
            words={['Hi, Im Nick.', 'What would you like to see?']}
            loop={1}
            cursor
            cursorStyle='|'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
          <br />
        </h1>
      </div>
      <div className='buttonscontainer'>
        <div className='aboutmeswap'>
          <div className='aboutmecontainer' onClick={() => { showSection("aboutmeswap"); descriptors.showAboutMe(isFirst); }} >
            <div className='aboutme'>
              <span className='red-cursor'>|</span>
              <Typewriter
                words={['', '', '', 'About Me']}
                loop={1}
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1600}
              />
              <span className='red-cursor'>|</span>
            </div>
          </div>
        </div>
        <div className='projectsswap'>
          <div className='projectscontainer' onClick={() => { showSection("projectsswap"); descriptors.showProjects(isFirst) }}>
            <div className='projects'>
              <span className='red-cursor'>|</span>
              <Typewriter
                words={['', '', '', 'My Portfolio']}
                loop={1}
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500} />
              <span className='red-cursor'>|</span>
            </div>
          </div>
        </div>
        <div className='skillsswap'>
          <div className='skillscontainer' onClick={() => { showSection("skillsswap"); descriptors.showSkills(isFirst) }}>
            <div className='skills'>
              <span className='red-cursor'>|</span>
              <Typewriter
                words={['', '', '', 'My Skills']}
                loop={1}
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1600}
              />
              <span className='red-cursor'>|</span>
            </div>
          </div>
        </div>
        <div className='contactswap'>
          <div className='contactcontainer' onClick={() => { showSection("contactswap"); descriptors.showContactMe(isFirst) }}>
            <div className='contact'>
              <span className='red-cursor'>|</span>
              <Typewriter
                words={['', '', '', 'Contact Me']}
                loop={1}
                typeSpeed={135}
                deleteSpeed={50}
                delaySpeed={1600}
              />
              <span className='red-cursor'>|</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
