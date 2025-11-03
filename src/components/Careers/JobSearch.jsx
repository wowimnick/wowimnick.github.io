import React from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';

// Import the locations data
import locations from '../Locations/locationData';

const JobSearch = ({ searchTerm, handleSearch, filter, handleFilter, isSmallScreen }) => {
  return (
    <JobSearchSection>
      <SearchBar>
        <Search size={isSmallScreen ? 18 : 20} />
        <input
          type="text"
          placeholder="Search for jobs..."
          value={searchTerm}
          onChange={handleSearch}
          name='search'
        />
      </SearchBar>
      <FilterContainer $isSmallScreen={isSmallScreen}>
        <FilterSelect name="department" onChange={handleFilter} value={filter.department}>
          <option value="">All Departments</option>
          <option value="Nursing">Nursing</option>
          <option value="Therapy">Therapy</option>
          <option value="Patient Care">Patient Care</option>
        </FilterSelect>
        <FilterSelect name="location" onChange={handleFilter} value={filter.location}>
          <option value="">All Locations</option>
          {locations.map(location => (
            <option key={location.id} value={location.name}>
              {location.name}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect name="type" onChange={handleFilter} value={filter.type}>
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </FilterSelect>
      </FilterContainer>
    </JobSearchSection>
  );
};

const JobSearchSection = styled.div`
  margin-bottom: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.75rem;
    margin-bottom: 1.25rem;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 25px;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  svg {
    color: #666;
    flex-shrink: 0;
  }

  input {
    border: none;
    background: transparent;
    margin-left: 0.75rem;
    flex-grow: 1;
    font-size: 1rem;
    color: #333;

    &::placeholder {
      color: #999;
    }

    &:focus {
      outline: none;
    }
  }

  @media (max-width: 768px) {
    padding: 0.65rem 1rem;
    margin-bottom: 0.875rem;

    input {
      font-size: 0.95rem;
      margin-left: 0.65rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.6rem 0.875rem;
    border-radius: 20px;
    margin-bottom: 0.75rem;

    input {
      font-size: 0.9rem;
      margin-left: 0.6rem;
    }
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: ${props => props.$isSmallScreen ? 'column' : 'row'};
    gap: ${props => props.$isSmallScreen ? '0.75rem' : '0.875rem'};
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.65rem;
  }
`;

const FilterSelect = styled.select`
  padding: 0.65rem 0.875rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  flex: 1;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 0;

  &:hover {
    border-color: #4a90e2;
  }

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.95rem;
    padding: 0.6rem 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.55rem 0.7rem;
    border-radius: 6px;
  }
`;

export default JobSearch;