import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import Countries from '../components/CountriesTable';
import Pagination from '../components/Pagination';
import styles from '../styles/Home.module.css';

const index = ({ countries }) => {
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [countryPerPage, setCountryPerPage] = useState(10);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword),
  );

  const onInputChange = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  };

  //get current country
  const indexOfLastCountry = currentPage * countryPerPage;
  const indexOfFirstPost = indexOfLastCountry - countryPerPage;
  const currentCountry = filteredCountries.slice(
    indexOfFirstPost,
    indexOfLastCountry,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>
      <SearchInput
        placeholder="Filter by name, region or sub region"
        onChange={onInputChange}
      />
      <Countries countries={currentCountry} />
      <Pagination
        countryPerPage={countryPerPage}
        totalCountry={countries.length}
        paginate={paginate}
      />
    </Layout>
  );
};

index.propTypes = {};

export default index;

export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
