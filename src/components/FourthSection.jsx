import React, {useRef} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import emailjs from 'emailjs-com';
import confetti from 'canvas-confetti';
import LottieAnimation from './animation';

import './FourthSection.css';

const FourthSection = () => {

  const errorAnim = <LottieAnimation loop={false} src={require('../resources/error.json')} className='error' speed2={1} />;
  const form = useRef(null);



  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    emailjs.sendForm('service_hpeadoj', 'template_doikkmo', form.current, 'mxhVfavVsSqczEg8r')
      .then((result) => {
        console.log(result.text);
        setSubmitting(false);
        resetForm();
      })
      .catch((error) => {
        console.log(error.text);
        setSubmitting(false);
      });
  };

  return (
    <div className='fourthsection' data-aos="fade-up">
      <div className='grid-container'>
        <h2 style={{ padding: '15px', boxShadow: 'rgb(223 225 255 / 66%) 1px 1px 20px 6px', background: 'rgba(255, 255, 255, 0.63)', color:'black' }}> Contact me. 🤝</h2>
        <div className='hide'/>
        <p className='hide' style={{ textAlign: 'left', color: 'black' }}>
          I'm interested in any potential opportunities, especially ambitious or large projects. However, if you have other requests or questions, don't hesitate to use the form. <br /><br /><br />
          Fill in the form and I'll respond to all emails as quickly as possible. <br />If you do not receive a response back within a few days, please check your SPAM folder or filter.
        </p>
        <Formik
          initialValues={{ name: '', email: '', subject: '', message: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = errorAnim;
            }
            if (!values.email) {
              errors.email = errorAnim;
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = errorAnim;
            }
            if (!values.subject) {
              errors.subject = errorAnim;
            }
            if (!values.message) {
              errors.message = errorAnim;
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className='contactmebox' ref={form}>
              <h3 style={{ color: 'white', fontSize: '15px' }}>Get in touch.</h3>
              <div className='inputGrid'>
                <div className='rowFlex'>
                  <Field type="text" name='name' className='textBox' placeholder="name" />
                  <ErrorMessage name="name" component="div" className="error" />

                </div>
                <div className='rowFlex'>
                  <Field type="text" name='email' className='textBox' placeholder="email" />
                  <ErrorMessage name="email" component="div" className="error" />
                </div >

                <div className='rowFlex'>
                  <Field type="text" name='subject' className='textBox' placeholder="subject" />
                  <ErrorMessage name="subject" component="div" className="error" />
                </div>
                <div />
                <div className='rowFlex'>
                  <Field as="textarea" name='message' className='textBox' placeholder="message" />
                  <ErrorMessage name="message" component="div" className="error" />
                </div>
              </div>
              <button type="submit" className='submitbutton' disabled={isSubmitting} id="submitbutton">
                {isSubmitting ? (
                  <>
                    Sent
                    <LottieAnimation loop={false} src={require('../resources/checkmark.json')} style={{ width: '40px' }} speed2={1} />
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FourthSection;