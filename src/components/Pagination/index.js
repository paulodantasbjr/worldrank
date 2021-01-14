import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './Pagination.module.css';

const inde = ({ countryPerPage, totalCountry, paginate }) => {
  const pageNumber = [];

  const totalArredondado = Math.ceil(totalCountry / countryPerPage);

  for (let i = 0; i < totalArredondado; i++) {
    pageNumber.push(i);
  }

  return (
    <nav className={styles.pagination}>
      <ul className={styles.pagination_list}>
        {pageNumber.map((number) => (
          <li className={styles.pagination_item} key={number}>
            <a
              className={styles.pagination_link}
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))}
        <li></li>
      </ul>
    </nav>
  );
};

inde.propTypes = {};

export default inde;
