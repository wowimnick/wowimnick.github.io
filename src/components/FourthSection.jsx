import React, { useEffect } from 'react';
import './FourthSection.css';

const FourthSection = () => {
  useEffect(() => {
    const submitButton = document.getElementById("submitbutton");

    const handleFocus = () => {
      submitButton.value = "✅";
      submitButton.style.background = "rgb(4, 129, 42)";
    };

    submitButton.addEventListener("focus", handleFocus);

    return () => {
      submitButton.removeEventListener("focus", handleFocus);
    };
  }, []);
  return (
    <div className='fourthsection' data-aos="fade-in" style={{ display: 'flex', alignitems: 'center', flexDirection: 'column' }}>
        <div className='desctypewriter' style={{ display: 'flex', flexDirection: 'row', gap: '4vw', position: 'relative'}}>
          <p className='hide'>
          <h2 data-aos="fade-up">Contact me.</h2>
            I'm interested in any potential opportunities, especially ambitious or large projects. However, if you have other request or question, don't hesitate to use the form. <br /><br /><br />
            Fill in the form and I'll respond to all emails as quickly as possible. <br />If you do not receive a response back within a few days, please check your SPAM folder or filter.
          </p>
          <div className='contactmebox'>
            <h3>Get in touch.</h3>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2vw' }}>
                <input type="text" className='textBox' placeholder="name" /> <br />
                <input type="text" id="subject" className='textBox' placeholder="email" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <input type="text" id="email" className='textBox' placeholder="subject" />
                <textarea id="message" className='textBox' placeholder="message" style={{ height: '6vh', width: '95%'}}></textarea>
              <input type="button" className='submitbutton' value="Submit" id="submitbutton" />
            </div>
          </div>
        </div>
      </div>
  );
};

export default FourthSection;