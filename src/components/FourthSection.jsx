import React, { useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import confetti from 'canvas-confetti';
import './FourthSection.css';

const FourthSection = () => {
  const form = useRef();
  
  const sendEmail = (e) => {
    e.preventDefault();
  
    const nameInput = form.current.elements.name;
    const emailInput = form.current.elements.email;
    const subjectInput = form.current.elements.subject;
    const messageInput = form.current.elements.message;
  
    if (nameInput.value === '' || emailInput.value === '' || subjectInput.value === '' || messageInput.value === '') {
      const submitButton = document.querySelector('#submitbutton');
      submitButton.value = '❌ Error';
      submitButton.style.backgroundColor = '#870021';
  
      setTimeout(() => {
        submitButton.style.transition = 'background-color 0.5s, color 0.5s';
        submitButton.style.backgroundColor = '';
        submitButton.value = 'Submit';
    }, 3000);
      return;
    }
  
    emailjs.sendForm('service_hpeadoj', 'template_doikkmo', form.current, 'mxhVfavVsSqczEg8r')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      form.current.reset();
  
    const element = document.querySelector('#submitbutton');
    const { top, bottom, left, right } = element.getBoundingClientRect();
  
    confetti({
      origin: {
        x: ((left + right) / 2) / window.innerWidth,
        y: ((top + bottom) / 2) / window.innerHeight
      },
      spread: 90
    });
  
    element.value = '✅ Sent!';
    element.style.backgroundColor = '#00743b';
  
    setTimeout(() => {
      element.style.transition = 'background-color 0.5s, color 0.5s';
      element.style.backgroundColor = '';
      element.value = 'Submit';
    }, 3000);
  };
  return (
    <div className='fourthsection' data-aos="zoom-out-up" style={{ display: 'flex', alignitems: 'center', flexDirection: 'column' }}>
        <div className='desctypewriter' style={{ display: 'flex', flexDirection: 'row', gap: '4vw', position: 'relative'}}>
          <div className='hide' >
          <h2 data-aos="fade-up">Contact me. 🤝</h2>
          <p style={{fontSize:'unset'}}>
          
            I'm interested in any potential opportunities, especially ambitious or large projects. However, if you have other request or question, don't hesitate to use the form. <br /><br /><br />
            Fill in the form and I'll respond to all emails as quickly as possible. <br />If you do not receive a response back within a few days, please check your SPAM folder or filter.
          </p>
          </div>
          <div className='contactmebox'>
            <form onSubmit={sendEmail} ref={form}>
            <h3>Get in touch.</h3>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2vw' }}>
                <input type="text" name='name' className='textBox' placeholder="name" /> <br />
                <input type="text" name='email' className='textBox' placeholder="email" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <input type="text" name='subject' className='textBox' placeholder="subject" />
                <textarea name='message' className='textBox' placeholder="message" style={{ height: '6vh', width: '95%'}}></textarea>
              <input type="submit" className='submitbutton' value="Submit" id="submitbutton" />
            </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default FourthSection;