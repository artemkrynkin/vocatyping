// convert object to string and store in localStorage

import {WordVariant} from '../models/CheckText';

export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    const serialisedState = JSON.stringify(data);
    localStorage.setItem(key, serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

// load string from localStarage and convert into an Object
// invalid output must be undefined
export const getFromLocalStorage = (key: string): any | undefined => {
  try {
    const serialisedState = localStorage.getItem(key);
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

export const splitWordIntoLetters = (word: string): WordVariant[] => {
  return word.split('').map((letter, index, thisArg) => ({
    correct: false,
    variant: thisArg.slice(0, index + 1).join(''),
  }));
};
