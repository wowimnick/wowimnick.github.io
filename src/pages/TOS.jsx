import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import withPageTransition from '../components/withPageTransition';

const TermsOfService = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <TermsWrapper>
      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Please read these terms carefully before using our services
          </motion.p>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <SectionTitle>Terms of Service</SectionTitle>
        
        <p>PLEASE READ THE TERMS AND CONDITIONS OF USE CAREFULLY BEFORE USING THIS SITE. This site is free to use by our visitors. By using this site, you the user are certifying that you are at least 18 years of age and are agreeing to comply with and be bound by the following terms of use. After reviewing the following terms and conditions thoroughly, if you do not agree to the terms and conditions, please do not use this site.</p>

        <SectionTitle>1. Acceptance of Agreement</SectionTitle>
        <p>You agree to the terms and conditions outlined in this Terms and Conditions of use Agreement (Agreement) with respect to our site (the Site). This Agreement constitutes the entire and only agreement between us and you, and supersedes all prior or contemporaneous agreements, representations, warranties and understandings with respect to the Site, the content, free product samples or freebie offers or services provided by or listed on the Site, and the subject matter of this Agreement. This Agreement may be amended by us at any time and at any frequency without specific notice to you. The latest Agreement will be posted on the Site, and you should review this Agreement prior to using the Site.</p>

        <SectionTitle>2. Privacy Policy</SectionTitle>
        <p>By using our site, you consent to our privacy policy.</p>

        <SectionTitle>3. Copyright</SectionTitle>
        <p>The content, organization, graphics, design, and other matters related to the Site are protected under applicable copyrights and other proprietary laws, including but not limited to intellectual property laws. The copying, reproduction, use, modification or publication by you of any such matters or any part of the Site is strictly prohibited, without our express prior written permission.</p>

        <SectionTitle>4. Deleting and Modification</SectionTitle>
        <p>We reserve the right, but are not obligated, in our sole discretion, without any obligation and without any notice requirement to you, to edit or delete any documents, information or other content appearing on the Site, including this Agreement.</p>

        <SectionTitle>5. Indemnification</SectionTitle>
        <p>You agree to indemnify, defend and hold us, our officers, our share holders, our partners, attorneys and employees harmless from any and all liability, loss, damages, claim and expense, including reasonable attorney's fees, related to your violation of this Agreement or use of the Site.</p>

        <SectionTitle>6. Disclaimer</SectionTitle>
        <p>THE CONTENT, SERVICES, FREE PRODUCT SAMPLES AND FREEBIE OFFERS FROM OR LISTED THROUGH THE SITE ARE PROVIDED "AS-IS," "AS AVAILABLE," AND ALL WARRANTIES, EXPRESS OR IMPLIED, ARE DISCLAIMED, INCLUDING BUT NOT LIMITED TO THE DISCLAIMER OF ANY IMPLIED WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY, QUALITY AND FITNESS FOR A PARTICULAR PURPOSE, WITH RESPECT TO THIS SITE AND ANY WEBSITE WITH WHICH IT IS LINKED. THE INFORMATION AND SERVICES MAY CONTAIN BUGS, ERRORS, PROBLEMS OR OTHER LIMITATIONS. WE HAVE NO LIABILITY WHATSOEVER FOR YOUR USE OF ANY INFORMATION OR SERVICE. IN PARTICULAR, BUT NOT AS A LIMITATION, WE ARE NOT LIABLE FOR ANY INDIRECT, INCIDENTAL OR CONSEQUENTIAL DAMAGES (INCLUDING DAMAGES FOR LOSS OF BUSINESS, LOSS OF PROFITS, LOSS OF MONEY, LITIGATION, OR THE LIKE), WHETHER BASED ON BREACH OF CONTRACT, BREACH OF WARRANTY, NEGLIGENCE, PRODUCT LIABILITY OR OTHERWISE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THE NEGATION OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN US AND YOU THE USER. THIS SITE AND THE INFORMATION WOULD NOT BE PROVIDED WITHOUT SUCH LIMITATIONS. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM US THROUGH THE SITE SHALL CREATE ANY WARRANTY, REPRESENTATION OR GUARANTEE NOT EXPRESSLY STATED IN THIS AGREEMENT. THE INFORMATION AND ALL OTHER MATERIALS ON THE SITE ARE PROVIDED FOR GENERAL INFORMATION PURPOSES ONLY AND DO NOT CONSTITUTE PROFESSIONAL ADVICE. IT IS YOUR RESPONSIBILITY TO EVALUATE THE ACCURACY AND COMPLETENESS OF ALL INFORMATION AVAILABLE ON THIS SITE OR ANY WEBSITE WITH WHICH IT IS LINKED.</p>

        <SectionTitle>7. Limits</SectionTitle>
        <p>All responsibility or liability for any damages caused by viruses contained within the electronic file containing the form or document is disclaimed. We will not be liable to you for any incidental, special or consequential damages of any kind that may result from use of or inability to use the site.</p>

        <SectionTitle>8. Third-Party Website</SectionTitle>
        <p>All rules, terms and conditions, other policies (including privacy policies) and operating procedures of third-party linked websites will apply to you while on such websites. We are not responsible for the content, accuracy or opinions express in such Websites, and such Websites are not investigated, monitored or checked for accuracy or completeness by us. Inclusion of any linked Website on our Site does not imply approval or endorsement of the linked Website by us. This Site and the third-party linked websites are independent entities and neither party has authority to make any representations or commitments on behalf of the other. If you decide to leave our Site and access these third-party linked sites, you do so at your own risk.</p>

        <SectionTitle>9. Third-Party Products and Services</SectionTitle>
        <p>We advertise third-party linked websites from which you may purchase or otherwise obtain certain sample goods, freebie offerings or free trial services. You understand that we do not operate or control the products, free offerings or services offered by third-party linked websites. Third-party linked websites are responsible for all aspects of order processing, fulfillment, billing and customer service. We are not a party to the transactions entered into between you and third-party linked websites. You agree that use of such third-party linked websites is at your sole risk and is without warranties of any kind by us, expressed, implied or otherwise. Under no circumstances are we liable for any damages arising from the transactions between you and third-party linked websites or for any information appearing on third-party linked websites or any other site linked to or from our site.</p>

        <SectionTitle>10. Your responsibility for the content you submit to us</SectionTitle>
        <p>You agree to be fully responsible for your own content. The Website acts as a venue for you to Post your content. While the Website has the right to refuse to post or remove, edit or abridge any content for any reason, it is otherwise not involved in the writing or decisions as to the content of its users. As a result, the Website has no control over the quality, accuracy or legality of the content on the Website. All content posted on the Website is the sole responsibility of the person from whom such content originated. You agree that any content that you post to the Website does not and will not violate any applicable law or infringe the rights of any third party, including without limitation any Intellectual Property Rights (defined below), publicity rights or rights of privacy. We ask that you please be careful when deciding whether to make content available on our Website. All suggestions, ideas, notes, concepts and other information you may send to us (collectively, "Submissions") shall be deemed and shall remain our sole property and shall not be subject to any obligation of confidence on our part. Without limiting the foregoing, we shall be deemed to own all known and hereafter existing rights of every kind and nature regarding the Submissions and shall be entitled to unrestricted use of the Submissions for any purpose, without compensation to the provider of the Submissions.</p>

        <p>Definition of Intellectual Property Rights. When we refer to "Intellectual Property Rights" in these Terms, we mean all patent rights; copyright rights; moral rights; rights of publicity; trademark, trade dress and service mark rights (and associated goodwill); trade secret rights; and all other intellectual property and proprietary rights as may now exist or hereafter come into existence, and all applications for any of these rights and registrations, renewals and extensions of any of these rights, in each case under the laws of any state, country, territory or other jurisdiction.</p>

        <SectionTitle>11. User Obligations</SectionTitle>
        <p>In consideration of your use of the Service, you represent that you are of legal age to form a binding contract and are not a person barred from receiving services under the laws of the United States or other applicable jurisdiction. You agree to provide true, accurate, current and complete information about yourself upon registration and thereafter. You are responsible for maintaining the confidentiality of your password and account, and are fully responsible for all activities that occur under your password or account. You agree to immediately notify the Website of any unauthorized use of your password or account or any other breach of security. The Website cannot and will not be liable for any loss or damage arising from your failure to comply with this or any other Section of this Terms of Use. You agree to comply with all local rules regarding online conduct and acceptable Content, including all applicable laws regarding the transmission of technical data exported from the United States or the country in which you reside. You further agree not to use the Website websites or the Service to:</p>

        <ol>
          <li>Upload, post, email, transmit or otherwise make available ("Post") any content that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, false or inaccurate, invasive of another's privacy, hateful, or racially, ethnically or otherwise objectionable; that you do not have a right to make available under any law or under contractual or fiduciary relationships (such as inside information, proprietary and confidential information learned or disclosed as part of employment relationships or under nondisclosure agreements); or that infringes any patent, trademark, trade secret, copyright or other proprietary rights ("Rights") of any party;</li>
          <li>Harm minors in any way;</li>
          <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity;</li>
          <li>Post any unsolicited or unauthorized advertising, promotional materials, "junk mail","spam", "chain letters", "pyramid schemes", or any other form of solicitation;</li>
          <li>Post any material that contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment;</li>
          <li>Interfere with or disrupt the Service or servers or networks connected to the Service, or disobey any requirements, procedures, policies or regulations of networks connected to the Service;</li>
          <li>Violate any applicable local, state, national or international law, intentionally or unintentionally;</li>
          <li>"Stalk" or otherwise harass another; and/or</li>
          <li>Collect or store personal data about other users.</li>
        </ol>

        12. General. Your use of this website and any dispute arising out of such use of the website is subject to the laws of the United States.
      </ContentSection>
    </TermsWrapper>
  );
};

const TermsWrapper = styled.div`
  font-family: 'Poppins', sans-serif;
`;

const HeroSection = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');
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

export default withPageTransition(TermsOfService);