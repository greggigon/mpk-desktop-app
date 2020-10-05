import React from 'react';
import Box from '@material-ui/core/Box';
import Board from '../components/Board';
import SideBar from '../components/SideBar';
import styles from './HomePage.css';

export default function HomePage() {
  return (
    <div>
      <Box
        className={styles.sideBar}
        border={1}
        borderLeft={0}
        borderBottom={0}
        borderTop={0}
        borderColor="grey.700"
      >
        <SideBar />
      </Box>
      <Box className={styles.content}>
        <Board />
      </Box>
    </div>
  );
}
