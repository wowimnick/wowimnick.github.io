import { useEffect, useState } from 'react';
import './App.css';
import { swapElements, onSelection, runContactAnimation, runSkillsAnimation, runAboutMeAnimation, runProjectsAnimation, runTopBarAnimation, runWriterAnimation } from "./animations";
import BlurredBackground from './background'
import algo from './algo.gif'
import sa from './sa.png'
import snakie from './snakie.gif'
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
      <div className='buttonscontainer'>
        <div className='backdropcontainer'>
          <div className='lines1'></div>
          <div className='lines2'></div>

          {descriptors.showAboutMeDesc && (
            <div className='desctypewriter'>
              <br /><br /><br />
              I'm a Full-Stack Developer and Machine Learning enthusiast based in Toronto. My passion lies in building robust, scalable applications and using data to derive insights that drive business growth.
              <br /><br />
              I aquired my Bachelors in Computer Science from <a href="https://wgu.edu/" style={{ paddingBottom: "0.2em" }}>Western Governors University</a>. As a problem solver, I love tackling complex challenges and breaking them down into smaller, more manageable pieces. I'm constantly experimenting with new technologies and frameworks to stay up-to-date and provide the best solutions for my clients.
              <br /><br />
              In addition to my technical skills, I'm also a family person and enjoy spending time with my loved ones. When I'm not coding, you can find me hiking, reading about the latest advancements in AI, or playing some games with friends.
              <br /><br />
              I believe that collaboration is key to achieving great results, and I'm always looking for new opportunities to work with positive and ambitious people on exciting projects.
              <br /><br /><br /><br />
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
                <br /><br />
                During my experience at Reeve Network I have successfully created ecommerce web applications which hooked into user management systems, and various management tools in Java which served to support the high amount of daily users.
              </div>
              <div className='skillswork'>

                Reeve Network, LLC
                <br />
                Software Engineer<br />
                <span style={{ fontSize: '16px', color: 'gray' }}>2019 - 2021
                  <br /><br />
                  Developed java-based server applications for a large number of daily active users and incorporated APIs and libraries to interact with the server.</span>
              </div>
            </>)}
          {descriptors.showContactMeDesc && (<><div className='desctypewriterskills' style={{ textAlign: 'left' }}>
            <br /><br /><br />
            I'm interested in any potential opportunities, especially ambitious or large projects. However, if you have other request or question, don't hesitate to use the form. <br /><br /><br /><br />
            Fill in the form and I'll respond to all emails as quickly as possible. <br />If you do not receive a response back within a few days, please check your SPAM folder or filter.



          </div><div className='contactmebox'>
              <label for="name" style={{ display: 'block', marginbottom: '5px'}}>Name: </label>
              <input type="text" id="name" name="name" style={{height: '1.5vh'}}></input> <br />

              <label for="subject" style={{ display: 'block', marginbottom: '5px' }}>Email: </label>
              <input type="text" id="subject" name="subject" style={{height: '1.5vh'}}></input>

              <label for="email" style={{ display: 'block', marginbottom: '5px' }}>Subject: </label>
              <input type="text" id="email" name="email" style={{height: '1.5vh'}}></input>
              
              <label for="email" style={{ display: 'block', marginbottom: '5px' }}>Message: </label>
              <textarea id="email" name="email" className='textarea' style={{height: '8vh', width:'40vh', fontFamily:'Arial, sans-serif'}}></textarea>

              <input type="button" className='submitbutton' value="Submit" id="submitbutton" style={{ fontFamily: 'Damion', fontSize: '19px' }}></input>
            </div></>)}
          {descriptors.showProjectsDesc && (<>
            <div className='desctypewriterflex'>
              <p style={{ flex: 1 }}><br /><br />The sentiment analysis model is developed using the BiLSTM algorithm, trained and tested on the publicly available Stanford Sentiment Dataset.
                <br /><br />This model achieved an accuracy of ~84% on the validation set.</p>
              <p style={{ flex: 1 }}><br /><br />A reinforcement learning Snake game that implements an agent an lets it learn how to play.
                <br /><br />The model is capable of playing proficiantly after ~200 episodes.</p>
              <p style={{ flex: 1 }}><br /><br />Path finding using the A* Algorithm. You can draw the starting point, ending point, and walls that it will try to navigate around.</p>
            </div>
            <div className='projectslist'>
              <div className='sentimentanalysis'>
                <span style={{ fontFamily: 'Damion', fontSize: '22px' }}>Sentiment Analysis</span>
                <img src={sa} width="400" height="300" style={{ objectFit: 'cover', borderRadius: '5px' }} />
              </div>
              <div className='snakie'>
                <span style={{ fontFamily: 'Damion', fontSize: '22px' }}>Reinforcement Learning Agent</span>
                <img src={snakie} width="400" height="300" style={{ objectFit: 'cover', borderRadius: '5px' }} />
              </div>
              <div className='algo'>
                <span style={{ fontFamily: 'Damion', fontSize: '22px' }}>A* Pathfinding Algorithm</span>
                <img src={algo} width="400" height="300" style={{ objectFit: 'cover', borderRadius: '5px' }} />
              </div>
            </div></>)}
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
