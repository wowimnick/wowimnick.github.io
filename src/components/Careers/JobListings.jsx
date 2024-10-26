import React from 'react';
import styled from 'styled-components';
import '@fontsource/poppins';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const JobListings = ({ filteredJobs, selectedJob, handleJobSelect, handleApplyClick }) => {
  return (
    <JobListingsSection>
      <h2>Open Positions</h2>
      {filteredJobs.length === 0 ? (
        <NoJobsMessage>No jobs match your search criteria.</NoJobsMessage>
      ) : (
        filteredJobs.map((job) => (
          <JobCard key={job.id}>
            <JobHeader onClick={() => handleJobSelect(job)}>
              <JobInfo>
                <JobTitle>{job.title}</JobTitle>
                <JobMeta>
                  <JobMetaItem>{job.department}</JobMetaItem>
                  <JobMetaItem>{job.location}</JobMetaItem>
                  <JobMetaItem>{job.type}</JobMetaItem>
                </JobMeta>
              </JobInfo>
              <ChevronIcon>
                {selectedJob && selectedJob.id === job.id ? (
                  <ChevronUp size={24} />
                ) : (
                  <ChevronDown size={24} />
                )}
              </ChevronIcon>
            </JobHeader>
            <AnimatePresence>
              {selectedJob && selectedJob.id === job.id && (
                <JobDetails
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{job.description}</p>
                  <h4>Requirements:</h4>
                  <ul>
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                  <ApplyButton onClick={() => handleApplyClick(job)}>
                    Apply Now
                  </ApplyButton>
                </JobDetails>
              )}
            </AnimatePresence>
          </JobCard>
        ))
      )}
    </JobListingsSection>
  );
};

const JobListingsSection = styled.div`
  font-family: 'Poppins', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  }
`;

const JobCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
`;

const JobInfo = styled.div`
  flex-grow: 1;
`;

const JobTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const JobMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const JobMetaItem = styled.span`
  font-size: 0.9rem;
  color: #666;
  background-color: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ChevronIcon = styled.div`
  margin-left: 1rem;
`;

const JobDetails = styled(motion.div)`
  padding: 1rem;
  background-color: #f9f9f9;
  border-top: 1px solid #eee;

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  h4 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  ul {
    list-style-type: disc;
    margin-left: 1.5rem;
    margin-bottom: 1rem;

    li {
      margin-bottom: 0.5rem;
    }
  }

  @media (max-width: 768px) {
    p, ul {
      font-size: 0.9rem;
    }

    h4 {
      font-size: 1rem;
    }
  }
`;

const ApplyButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    background-color: #357abd;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const NoJobsMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 2rem 0;
  color: #666;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default JobListings;