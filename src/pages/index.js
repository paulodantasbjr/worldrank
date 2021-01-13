import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import Countries from '../components/CountriesTable';
import styles from '../styles/Home.module.css';

const index = ({ countries }) => {
  const [keyword, setKeyword] = useState('');

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

  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>
      <SearchInput
        placeholder="Filter by name, region or sub region"
        onChange={onInputChange}
      />
      <Countries countries={filteredCountries} />
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
