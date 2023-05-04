import { useEffect } from 'react';
import { runContactAnimation, runSkillsAnimation, runAboutMeAnimation, runProjectsAnimation, runTopBarAnimation, runWriterAnimation } from "./animations";
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import algo from './algo.mp4'
import sa from './sa.png'
import poster1 from './postersnake.png'
import snakie from './snakie.mp4'
import { InfiniteLoopSlider, Tag } from './scrollskills'
import { Typewriter } from 'react-simple-typewriter'
import GradientCanvas from './gradient';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  AOS.init();
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
    }, 2300);

    setTimeout(() => {
      runSkillsAnimation();
    }, 2300);

    setTimeout(() => {
      runContactAnimation();
    }, 2300);
  }, []);

  const COLORS = ['#bbf7d0', '#99f6e4', '#bfdbfe', '#ddd6fe', '#f5d0fe', '#fed7aa', '#fee2e2'];
  const TAGS = ['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'TensorFlow', 'Java', 'SQL', 'UI/UX', 'git', 'docker', 'backend', 'frontend', 'C#'];
  const DURATION = 15000;
  const ROWS = 5;
  const TAGS_PER_ROW = 5;

  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  const shuffle = (arr) => [...arr].sort(() => .5 - Math.random());

  // const navbarRef = useRef(null);

  // window.addEventListener('scroll', () => {
  //   const scrollPosition = window.scrollY;
  //   if (scrollPosition > window.innerHeight - 200) {
  //     try {
  //       navbarRef.current.classList.add('visible');
  //       navbarRef.current.classList.remove('hidden');
  //     } catch {}

  //   } else {
  //     try {
  //     navbarRef.current.classList.remove('visible');
  //     navbarRef.current.classList.add('hidden');
  //   } catch {}
  //   }
  // });

  const scrollTo = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  return (
    <div className="App">

      {/* //<div className='navbar hidden' ref={navbarRef}>
        <div className='navbaritem' style={{fontWeight: 'bold', fontSize: '3vh', flexGrow: 0.31, letterSpacing: '0.17em' }}>NICK</div>
        <div className='navbaritem'>About Me</div>
        <div className='navbaritem'>Portfolio</div>
        <div className='navbaritem'>Skills</div>
        <div className='navbaritem'>Contact</div>
      </div> */}

      <div className='rowmenucontainer'>
        <div class="arrow bounce"><i class="fa fa-angle-down fa-5x" aria-hidden="true"><FontAwesomeIcon icon={faAngleDown} /></i></div>
        <GradientCanvas />
        <div className='typewriter'>
          <h1>
            <Typewriter
              words={['Hi, Im Nick.', 'What would you like to see?']}
              loop={1}
              cursor
              cursorStyle='|'
              typeSpeed={50}
              deleteSpeed={50}
            />
          </h1>
        </div>
        <div className='buttons'>
          <div className='aboutme' onClick={() => { scrollTo('firstsection') }}>
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
          <div className='skills' onClick={() => { scrollTo('secondsection') }}>
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
          <div className='projects' onClick={() => { scrollTo('thirdsection') }}>
            <span className='red-cursor'>|</span>
            <Typewriter
              words={['', '', '', 'My Portfolio']}
              loop={1}
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500} />
            <span className='red-cursor'>|</span>
          </div>
          <div className='contact' onClick={() => { scroll.scrollToBottom() }}>
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
      <div className='shapes' data-aos="fade-up" data-aos-anchor-placement="top-center" style={{ mixBlendMode: 'luminosity' }}></div>
      <div className='firstsection' data-aos="fade-up">
        <div className='desctypewriter' data-aos="fade-up">
          <h2>Here's a bit about me:</h2>
          <br />
          I'm a Full-Stack Developer and Machine Learning enthusiast based in Toronto. My passion lies in building robust, scalable applications and using data to derive insights that drive business growth.
          <br /><br />
          I aquired my Bachelors in Computer Science from <a href="https://wgu.edu/" style={{ paddingBottom: "0.2em" }}>Western Governors University</a>. As a problem solver, I love tackling complex challenges and breaking them down into smaller, more manageable pieces. I'm constantly experimenting with new technologies and frameworks to stay up-to-date and provide the best solutions for my clients.
          <br /><br />
          In addition to my technical skills, I'm also a family person and enjoy spending time with my loved ones. When I'm not coding, you can find me hiking, reading about the latest advancements in AI, or playing some games with friends.
          <br /><br />
          I believe that collaboration is key to achieving great results, and I'm always looking for new opportunities to work with positive and ambitious people on exciting projects.
          <br /><br /><br /><br />
          <span style={{ color: '#4bc9f9' }}>Let's make something special.</span>
        </div>
      </div>

      <div className='secondsection' style={{ display: 'flex', justifyContent: 'space-evenly', alignitems: 'center', gap: '4vw', flexDirection: 'row' }} >

        <div className='desctypewriter' data-aos="fade-right" style={{ position: 'relative', mixBlendMode: 'hard-light', flex: 8 }}>
          <h2>What I can do.</h2>
          <br />
          Having over 2 years of development experience in both back-end and front-end development, I have experience in a variety of programming languages, tools, and technologies, <br />like
          <span style={{ color: 'white', fontFamily: 'Damion', fontSize: '22px' }}>
            <Typewriter
              words={[' Java', ' Python', ' C#', ' HTML & CSS', ' SQL', ' JavaScript', ' React.js', ' Django', ' Cloud Computing', ' Docker', ' Machine Learning', ' Git']}
              loop={0}
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={1000} />
          </span>.
          <br /><br />
          During my experience at Reeve Network I have successfully created ecommerce web applications which hooked into user management systems, and various management tools in Java which served to support the high amount of daily users.

        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6vh', flexDirection: 'column', flex: 6 }}>
          <div data-aos="flip-left" className='python'><h2 style={{ fontSize: '2vh' }}>Python</h2></div>
          <div data-aos="flip-left" className='java'><h2 style={{ fontSize: '2vh' }}>Java</h2></div>
          <div data-aos="flip-left" className='htmlcss'><h2 style={{ fontSize: '1.6vh' }}>HTML & CSS</h2></div>
          <div data-aos="flip-left" className='csharp'><h2 style={{ fontSize: '2vh' }}>C#</h2></div>
        </div>
        <div className='tag-list' data-aos="fade-left">
          {[...new Array(ROWS)].map((_, i) => (
            <InfiniteLoopSlider key={i} duration={random(DURATION - 5000, DURATION + 5000)} reverse={i % 2}>
              {shuffle(TAGS).slice(0, TAGS_PER_ROW).map(tag => (
                <Tag text={tag} key={tag} />
              ))}
            </InfiniteLoopSlider>
          ))}
          <div className='fade' />
          <div className='skillswork' data-aos="fade-left">
            <h2 style={{ fontSize: '2vh', fontWeight: '300', textAlign: 'left', fontFamily: 'Poppins' }}>Reeve Network, LLC
              <br />
              Software Engineer</h2><br />
            <span style={{ fontSize: '16px', color: 'gray', mixBlendMode: 'color-burn' }}>2019 - 2021
              <br /><br />
              Developed java-based server applications for a large number of daily active users and incorporated APIs and libraries to interact with the server.</span>
          </div>
        </div>
      </div>

      <div className='thirdsection' style={{ display: 'flex', alignitems: 'center', flexDirection: 'column' }}>
        <div className='shapes2' data-aos="fade-up" data-aos-anchor-placement="top-center" style={{ mixBlendMode: 'luminosity' }}></div>
        <h2>What i've made.</h2>
        <div className='desctypewriter' style={{ display: 'flex', flexDirection: 'row', position: 'relative', gap: '4vw', flex: 1 }}>
          <p style={{ width: '100%', textAlign: 'left' }} data-aos="fade-out">The sentiment analysis model is developed using the BiLSTM algorithm, trained and tested on the publicly available Stanford Sentiment Dataset. This model achieved an accuracy of ~84% on the validation set.
            <div className='sentimentanalysis'>
              <span style={{ fontFamily: 'Damion', textAlign: 'center', fontSize: '22px' }}>Sentiment Analysis</span>
              <a href="https://github.com/wowimnick/Sentiment-Analysis"><img src={sa} width="100%" height="300" style={{ objectFit: 'cover', borderRadius: '5px', border: '2px white solid' }} /></a>
            </div></p>
          <p style={{ width: '100%', textAlign: 'left' }} data-aos="fade-out">A reinforcement learning Snake game that implements an agent and lets it learn how to play. The model is capable of playing proficiantly after ~200 episodes.
            <div className='snakie'>
              <span style={{ fontFamily: 'Damion', textAlign: 'center', fontSize: '22px' }}>Reinforcement Learning Agent</span>
              <a href="https://github.com/wowimnick/SnakeAI"><video width="100%" height="300" muted loop style={{ objectFit: 'cover', borderRadius: '5px', border: '2px white solid' }} autoPlay={!(/Mobi|Android/i.test(navigator.userAgent))} poster={poster1}>
                <source src={snakie} type="video/mp4" />
                Your browser does not support the video tag.
              </video></a>
            </div>
          </p>
          <p style={{ width: '100%', textAlign: 'left' }} data-aos="fade-out">Path finding using the A* Algorithm. You can draw the starting point, ending point, and walls that it will try to navigate around.
            <br /><br />
            <div className='algo'>
              <span style={{ fontFamily: 'Damion', textAlign: 'center', fontSize: '22px' }}>A* Pathfinding Algorithm</span>
              <a href="https://github.com/wowimnick/A-Star-Pathfinding"><video width="100%" height="300" muted loop style={{ borderRadius: '5px', border: '2px white solid' }} autoPlay={!(/Mobi|Android/i.test(navigator.userAgent))}>
                <source src={algo} type="video/mp4" />
                Your browser does not support the video tag.
              </video></a>
            </div>
          </p>
        </div>
      </div>

      <div className='fourthsection' data-aos="fade-in" style={{ display: 'flex', alignitems: 'center', flexDirection: 'column' }}>
        <div className='bottomshapes' style={{ mixBlendMode: 'luminosity' }}></div>
        <h2 data-aos="fade-up">Contact me.</h2>
        <div className='desctypewriter' style={{ display: 'flex', flexDirection: 'row', position: 'relative', gap: '4vw', flex: 1 }}>
          <p style={{ width: '100%', textAlign: 'left', flex: 5 }}>
            I'm interested in any potential opportunities, especially ambitious or large projects. However, if you have other request or question, don't hesitate to use the form. <br /><br /><br />
            Fill in the form and I'll respond to all emails as quickly as possible. <br />If you do not receive a response back within a few days, please check your SPAM folder or filter.
          </p>
          <div className='contactmebox'>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '5vw' }}>
              <div>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" style={{ height: '1.5vh', width: '100%' }} /> <br />
              </div>
              <div>
                <label htmlFor="subject">Email: </label>
                <input type="text" id="subject" name="subject" style={{ height: '1.5vh', width: '100%' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '2vh' }}>
              <div>
                <label htmlFor="email">Subject: </label>
                <br />
                <input type="text" id="email" name="email" style={{ height: '1.5vh', width: '50%' }} />
              </div>
              <div>
                <label htmlFor="message">Message: </label>
                <br />
                <textarea id="message" name="message" className='textarea' style={{ position: 'relative', height: '6vh', width: '98%', fontFamily: 'Arial, sans-serif' }}></textarea>
              </div>
              <input type="button" className='submitbutton' value="Submit" id="submitbutton" style={{ fontFamily: 'Questrial', fontSize: '19px', marginTop: '10px' }}></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default App;
