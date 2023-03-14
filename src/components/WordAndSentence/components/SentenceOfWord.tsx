import React, {useRef} from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import {SentenceOfWordProps, ContextMenu} from '../types';
import styles from '../index.module.css';

const SentenceOfWord: React.FC<SentenceOfWordProps> = ({currentWord, speak, voice}) => {
  const [contextMenu, setContextMenu] = React.useState<ContextMenu | null>(null);
  const sentenceRef = useRef<HTMLDivElement | null>(null);

  const closeContextMenu = (): void => {
    setContextMenu(null);
  };

  const openContextMenu = (event: React.MouseEvent): void => {
    event.preventDefault();

    /**
     * repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
     * Other native context menus might behave different.
     * With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
     */
    setContextMenu(contextMenu === null ? {mouseX: event.clientX + 2, mouseY: event.clientY - 6} : null);
  };

  const listenSelectionPhraseInSentence = (): void => {
    speak({text: window.getSelection()?.toString(), voice, rate: 0.8});
    closeContextMenu();
  };

  return (
    <>
      <div className={styles.sentenceOfWord} ref={sentenceRef} onContextMenu={openContextMenu}>
        {currentWord?.sentence}
      </div>
      <Menu
        open={contextMenu !== null}
        onClose={closeContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? {top: contextMenu.mouseY, left: contextMenu.mouseX} : undefined}
      >
        <MenuItem onClick={listenSelectionPhraseInSentence}>Listen</MenuItem>
      </Menu>
    </>
  );
};

export default SentenceOfWord;
