import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import Countries from '../components/CountriesTable';
import ReactPaginate from 'react-paginate';
import styles from '../styles/Home.module.css';

const index = ({ countries }) => {
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [countryPerPage] = useState(10);

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

  const pageCount = countries.length / countryPerPage;

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>
      <SearchInput
        placeholder="Filter by name, region or sub region"
        onChange={onInputChange}
      />
      <Countries countries={currentCountry} />

      <div className={styles.pagination_conteiner}>
        <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
          pageCount={pageCount}
          initialPage={1}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          previousLinkClassName={styles.pagination_link}
          nextLinkClassName={styles.pagination_link}
          disabledClassName={styles.pagination_link__disabled}
          activeClassName={styles.pagination_link__active}
        />
      </div>
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
