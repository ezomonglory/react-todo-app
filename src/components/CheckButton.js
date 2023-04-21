import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import style from '../styles/modules/todoItem.module.scss';

const checkedVariants = {
  initial: {
    color: '#fff',
  },

  checked: {
    pathLength: 1,
  },

  unchecked: {
    pathLength: 0,
  },
};

const boxVariants = {
  checked: {
    background: 'var(--primaryPurple)',
    transition: {
      duration: 0.1,
    },
  },

  unchecked: {
    background: 'var(--gray-1)',
    transition: {
      duration: 0.1,
    },
  },
};

function CheckButton({ checked, handleChecked }) {
  const [status, setStatus] = useState('incomplete');

  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <motion.div
      className={style.svgBox}
      onClick={() => {
        console.log('jkjkj');
      }}
      tabIndex={0}
      onKeyDown={handleChecked}
      role="button"
      variants={boxVariants}
      animate={checked ? 'checked' : 'unchecked'}
    >
      <motion.svg
        viewBox="0 0 53 38"
        fill="blue"
        xmlns="http://www.w3.org/2000/svg"
        className={style.svg}
      >
        <motion.path
          variaints={checkedVariants}
          animate={checked ? 'checked' : 'unchecked'}
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="6"
          d="M1.5 22L16 36.5L51.5 1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.div>
  );
}

export default CheckButton;
