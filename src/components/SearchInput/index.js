import React from 'react';
import PropTypes from 'prop-types';
import { SearchRounded } from '@material-ui/icons';
import styles from './SearchInput.module.css';

const index = ({ ...rest }) => {
  return (
    <div className={styles.wrapper}>
      <SearchRounded color="inherit" />
      <input className={styles.input} {...rest} />
    </div>
  );
};

index.propTypes = {};

export default index;
