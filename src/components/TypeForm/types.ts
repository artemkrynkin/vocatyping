import {State as CurrentWordState} from 'store/currentWord/types';
import {State as WordsState} from 'store/words/types';

import {CurrentWord} from 'models/Word';

export interface Props extends CurrentWord, Pick<WordsState, 'loading'>, CurrentWordState {
  wordNumbers: number;
  nextWordId: number;
}
