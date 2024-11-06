import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import withPageTransition from '../components/withPageTransition';

const Privacy = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <PolicyWrapper>
            <HeroSection>
                <HeroContent>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Privacy Policy
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Your privacy is important to us
                    </motion.p>
                </HeroContent>
            </HeroSection>

            <ContentSection>
                <SectionTitle>What information do we collect?</SectionTitle>
                <p>
                    We collect information from you when you register on our site. When
                    ordering or registering on our site, as appropriate, you may be asked
                    to enter your: name and e-mail address. You may, however, visit our
                    site anonymously.
                </p>

                <SectionTitle>What do we use your information for?</SectionTitle>
                <p>
                    Any of the information we collect from you may be used in one of the
                    following ways:
                </p>
                <ul>
                    <li>
                        To personalize your experience (your information helps us to better
                        respond to your individual needs)
                    </li>
                    <li>
                        To improve our website (we continually strive to improve our website
                        offerings based on the information and feedback we receive from you)
                    </li>
                    <li>
                        To improve customer service (your information helps us to more
                        effectively respond to your customer service requests and support
                        needs)
                    </li>
                </ul>

                <SectionTitle>How do we protect your information?</SectionTitle>
                <p>
                    We implement a variety of security measures to maintain the safety of
                    your personal information when you enter, submit, or access your
                    personal information.
                </p>

                <SectionTitle>Do we use cookies?</SectionTitle>
                <p>
                    Yes (Cookies are small files that a site or its service provider
                    transfers to your computers hard drive through your Web browser (if
                    you allow) that enables the sites or service providers systems to
                    recognize your browser and capture and remember certain information
                </p>
                <p>
                    We use cookies to understand and save your preferences for future
                    visits, keep track of advertisements and compile aggregate data about
                    site traffic and site interaction so that we can offer better site
                    experiences and tools in the future.
                </p>

                <SectionTitle>Do we disclose any information to outside parties?</SectionTitle>
                <p>
                    We do not sell, trade, or otherwise transfer to outside parties your
                    personally identifiable information. This does not include trusted
                    third parties who assist us in operating our website, conducting our
                    business, or servicing you, so long as those parties agree to keep
                    this information confidential. We may also release your information
                    when we believe release is appropriate to comply with the law, enforce
                    our site policies, or protect ours or others rights, property, or
                    safety. However, non-personally identifiable visitor information may
                    be provided to other parties for marketing, advertising, or other
                    uses.
                </p>

                <SectionTitle>Third party links</SectionTitle>
                <p>
                    Occasionally, at our discretion, we may include or offer third party
                    products or services on our website. These third party sites have
                    separate and independent privacy policies. We therefore have no
                    responsibility or liability for the content and activities of these
                    linked sites. Nonetheless, we seek to protect the integrity of our
                    site and welcome any feedback about these sites.
                </p>

                <SectionTitle>California Online Privacy Protection Act Compliance</SectionTitle>
                <p>
                    Because we value your privacy we have taken the necessary precautions
                    to be in compliance with the California Online Privacy Protection Act.
                    We therefore will not collect or distribute your personal information
                    to outside parties without your consent.
                </p>

                <SectionTitle>Children's Online Privacy Protection Act Compliance</SectionTitle>
                <p>
                    We are in compliance with the requirements of COPPA (Childrens Online
                    Privacy Protection Act), Our website, products and services are all
                    directed to people who are at least 18 years old or older. We do not
                    knowingly collect any information from anyone under 18 years of age.
                    If a parent or guardian becomes aware that his or her child has
                    provided us with Personal Information without their consent, he or she
                    should contact us. If we become aware that a child under 18 has
                    provided us with Personal Information, we will delete such information
                    from our files.
                </p>

                <SectionTitle>Online Privacy Policy Only</SectionTitle>
                <p>
                    This online privacy policy applies only to information collected
                    through our website and not to information collected offline.
                </p>

                <SectionTitle>Terms and Conditions</SectionTitle>
                <p>
                    Please also visit our Terms and Conditions section establishing the
                    use, disclaimers, and limitations of liability governing the use of
                    our website at <a href="/terms-of-service">Terms of Service</a>
                </p>

                <SectionTitle>Your Consent</SectionTitle>
                <p>By using our site, you consent to our privacy policy.</p>

                <SectionTitle>Changes to our Privacy Policy</SectionTitle>
                <p>
                    If we decide to change our privacy policy, we will post those changes
                    on this page, send an email notifying you of any changes, and/or
                    update the Privacy Policy modification date below.
                </p>
            </ContentSection>
        </PolicyWrapper>
    );
};

const PolicyWrapper = styled.div`
  font-family: 'Poppins', sans-serif;
`;

const HeroSection = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80');
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
  }
`;

const ContentSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  p, ul, ol {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  ul, ol {
    padding-left: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #4a90e2;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

export default withPageTransition(Privacy);