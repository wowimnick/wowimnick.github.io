import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import withPageTransition from '../components/withPageTransition';
import HeroBanner from '../components/Careers/HeroBanner';
import JobSearch from '../components/Careers/JobSearch';
import JobListings from '../components/Careers/JobListings';
import ApplicationForm from '../components/Careers/ApplicationForm';
import WhyWorkWithUs from '../components/Careers/WhyWorkWithUs';
import { mockJobListings } from '../components/Careers/mockJobListings';

const Careers = () => {
  const [jobListings, setJobListings] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ department: '', location: '', type: '' });
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setJobListings(mockJobListings);

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleJobSelect = (job) => {
    setSelectedJob(selectedJob && selectedJob.id === job.id ? null : job);
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredJobs = jobListings.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter.department === '' || job.department === filter.department) &&
      (filter.location === '' || job.location === filter.location) &&
      (filter.type === '' || job.type === filter.type)
    );
  });

  return (
    <CareersWrapper>
      <HeroBanner />
      <ContentSection>
        <JobSearch
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          filter={filter}
          handleFilter={handleFilter}
          isSmallScreen={isSmallScreen}
        />
        <JobListings
          filteredJobs={filteredJobs}
          selectedJob={selectedJob}
          handleJobSelect={handleJobSelect}
          handleApplyClick={handleApplyClick}
          isSmallScreen={isSmallScreen}
        />
        {selectedJob && (
          <ApplicationForm selectedJob={selectedJob} />
        )}
      </ContentSection>
      <WhyWorkWithUs />
    </CareersWrapper>
  );
};

const CareersWrapper = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #333;
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: 3rem auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export default withPageTransition(Careers);