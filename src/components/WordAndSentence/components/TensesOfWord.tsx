import React, {Fragment, memo} from 'react';

import cx from 'classnames';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import IconButton from '@mui/material/IconButton';

import {useAppDispatch} from 'hooks/redux';

import {currentWordSlice} from 'store/currentWord/slice';

import styles from '../index.module.css';
import {TensesOfWordProps} from '../types';

const TensesOfWord: React.FC<TensesOfWordProps> = memo(({currentWord, tenseIndex, speech: {isSpeaking, speak, cancelSpeaking}, voice}) => {
  const dispatch = useAppDispatch();
  const onSpeechWord = (): void => {
    if (isSpeaking) cancelSpeaking();
    speak({text: currentWord?.tenses[tenseIndex], voice, rate: 0.8});
  };

  const handleSelectTenseVariant = (tenseIndex: number): void => {
    dispatch(currentWordSlice.actions.changeSelectedTense(tenseIndex));
    dispatch(currentWordSlice.actions.checkTenseVariant(''));
  };

  return (
    <div className={styles.tensesOfWord}>
      {currentWord?.tenses.map((tense, index, thisArg) => (
        <Fragment key={tense}>
          <button onClick={() => handleSelectTenseVariant(index)} className={cx(styles.tenseVariant, {[styles.currentTenseVariant]: index === tenseIndex})}>
            {tense}
          </button>
          {index !== thisArg.length - 1 ? ', ' : null}
        </Fragment>
      ))}
      <IconButton onClick={() => onSpeechWord()} color="primary" size="small" sx={{mt: -1, ml: 1}}>
        <VolumeUpIcon />
      </IconButton>
    </div>
  );
});

export default TensesOfWord;
