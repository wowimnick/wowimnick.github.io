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
    color: #333;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;

    h2 {
      font-size: 1.75rem;
      margin-bottom: 1.25rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0 0.75rem;

    h2 {
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

  @media (max-width: 768px) {
    border-radius: 8px;
    margin-bottom: 0.875rem;
  }

  @media (max-width: 480px) {
    border-radius: 6px;
    margin-bottom: 0.75rem;
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f8f9fa;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    align-items: flex-start;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
  }
`;

const JobInfo = styled.div`
  flex-grow: 1;
  padding-right: 1rem;
  min-width: 0;
`;

const JobTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.65rem 0;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.15rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.05rem;
    margin-bottom: 0.45rem;
    line-height: 1.3;
  }
`;

const JobMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.4rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.35rem;
  }
`;

const JobMetaItem = styled.span`
  font-size: 0.9rem;
  color: #666;
  background-color: #f0f0f0;
  padding: 0.3rem 0.65rem;
  border-radius: 4px;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.25rem 0.55rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    display: inline-block;
    width: fit-content;
  }
`;

const ChevronIcon = styled.div`
  margin-left: 0.75rem;
  flex-shrink: 0;
  color: #4a90e2;

  @media (max-width: 768px) {
    svg {
      width: 22px;
      height: 22px;
    }
  }

  @media (max-width: 480px) {
    margin-left: 0.5rem;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const JobDetails = styled(motion.div)`
  padding: 1.25rem;
  background-color: #f9f9f9;
  border-top: 1px solid #eee;

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
    color: #555;
  }

  h4 {
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
    color: #333;
    font-weight: 600;
  }

  ul {
    list-style-type: disc;
    margin-left: 1.5rem;
    margin-bottom: 1.25rem;

    li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
      color: #555;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    p, li {
      font-size: 0.95rem;
      line-height: 1.5;
    }

    h4 {
      font-size: 1.05rem;
      margin-bottom: 0.65rem;
    }

    ul {
      margin-left: 1.25rem;
      margin-bottom: 1rem;

      li {
        margin-bottom: 0.45rem;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 0.875rem;

    p, li {
      font-size: 0.9rem;
      line-height: 1.45;
    }

    h4 {
      font-size: 1rem;
      margin-bottom: 0.6rem;
    }

    ul {
      margin-left: 1.15rem;
      margin-bottom: 0.875rem;

      li {
        margin-bottom: 0.4rem;
      }
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
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: #357abd;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(74, 144, 226, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.7rem 1.25rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 0.65rem 1.15rem;
    font-size: 0.9rem;
    border-radius: 4px;

    &:hover {
      transform: translateY(-1px);
    }
  }
`;

const NoJobsMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 3rem 0;
  color: #666;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 2.5rem 0;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 2rem 0;
  }
`;

export default JobListings;