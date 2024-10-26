import React from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';

// Import the locations data
import locations from '../Locations/locationData';

const JobSearch = ({ searchTerm, handleSearch, filter, handleFilter, isSmallScreen }) => {
  return (
    <JobSearchSection>
      <SearchBar>
        <Search size={isSmallScreen ? 16 : 20} />
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
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 25px;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;

  input {
    border: none;
    background: transparent;
    margin-left: 0.5rem;
    flex-grow: 1;
    font-size: 1rem;

    &:focus {
      outline: none;
    }
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;

    input {
      font-size: 0.9rem;
    }
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: ${props => props.$isSmallScreen ? 'column' : 'row'};
    gap: ${props => props.$isSmallScreen ? '0.5rem' : '1rem'};
  }
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;
  }
`;

export default JobSearch;