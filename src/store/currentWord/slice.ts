import {getFromLocalStorage, saveToLocalStorage} from 'utils';

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Word} from 'models/Word';

import {State} from './types';

const currentWordId_LS: State['currentWordIndex'] = getFromLocalStorage('currentWordId');

const initialState: State = {
  writtenText: '',
  currentWord: undefined,
  currentWordId: currentWordId_LS ?? 0,
  currentWordIndex: currentWordId_LS ? currentWordId_LS - 1 : 0,
  tenseIndex: 0,
  tenseVariants: [],
  tenseVariantIndex: 0,
  isTenseVariantsCorrectlyTyped: false,
};

export const currentWordSlice = createSlice({
  name: 'currentWord',
  initialState,
  reducers: {
    setCurrentWord(state, action: PayloadAction<Word>) {
      state.currentWord = action.payload;
    },
    initTenseVariants(state, action: PayloadAction<string>) {
      const word = action.payload;

      state.tenseVariants = word.split('').map((letter, index, thisArg) => ({
        correct: false,
        variant: thisArg
          .slice(0, index + 1)
          .join('')
          .toLowerCase(),
      }));
    },
    writeText(state, action: PayloadAction<string>) {
      state.writtenText = action.payload;
    },
    checkTenseVariant(state, action: PayloadAction<string>) {
      const variantLetter = action.payload.at(-1);
      const variantLetterIndex = action.payload.length - 1;
      const currentTenseVariant = state.tenseVariants[state.tenseVariantIndex].variant;
      const currentTenseVariantLetter = currentTenseVariant[variantLetterIndex];

      if (currentTenseVariantLetter === undefined || variantLetter !== currentTenseVariantLetter.toLowerCase()) {
        state.tenseVariants.map((item) => (item.correct = false));

        state.writtenText = initialState.writtenText;
        state.tenseVariantIndex = initialState.tenseVariantIndex;
        state.isTenseVariantsCorrectlyTyped = initialState.isTenseVariantsCorrectlyTyped;
      }

      if (state.writtenText.length === currentTenseVariant.length && state.writtenText === currentTenseVariant.toLowerCase()) {
        state.tenseVariants[state.tenseVariantIndex].correct = true;
        state.tenseVariantIndex++;

        state.writtenText = initialState.writtenText;
      }

      if (state.tenseVariants[state.tenseVariants.length - 1].correct) {
        state.isTenseVariantsCorrectlyTyped = true;
      }
    },
    nextTense(state) {
      state.tenseIndex++;

      state.writtenText = initialState.writtenText;
      state.tenseVariantIndex = initialState.tenseVariantIndex;
      state.isTenseVariantsCorrectlyTyped = initialState.isTenseVariantsCorrectlyTyped;
    },
    changeWord(state, action: PayloadAction<number>) {
      state.currentWordId = action.payload;
      state.currentWordIndex = action.payload - 1;
      saveToLocalStorage('currentWordId', action.payload);

      state.writtenText = initialState.writtenText;
      state.tenseIndex = initialState.tenseIndex;
      state.tenseVariantIndex = initialState.tenseVariantIndex;
      state.isTenseVariantsCorrectlyTyped = initialState.isTenseVariantsCorrectlyTyped;
    },
  },
});

export default currentWordSlice.reducer;
