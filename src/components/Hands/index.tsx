import React, {useEffect, useState} from 'react';

import cx from 'classnames';

import styles from './index.module.css';
import {Props} from './types';

const Hands: React.FC<Props> = React.memo(({nextTypeKey}) => {
  const [translateCoords, setTranslateCoords] = useState<number[]>([0, 0]);
  const translateOffset = {
    left: nextTypeKey.finger ? (/[1-4]/.test(nextTypeKey.finger.toString()) ? 46 : 60) : 0,
    top: 42,
  };

  const handClassNames = cx(styles.hand, styles[`hand-${nextTypeKey.finger}`]);
  const handInlineStyles: React.CSSProperties = {
    transform: `translate(${translateCoords[0]}px, ${translateCoords[1]}px)`,
  };

  useEffect(() => {
    const left = Math.round(nextTypeKey.coords.left + nextTypeKey.coords.width - translateOffset.left);
    const top = Math.round(nextTypeKey.coords.top + translateOffset.top);

    setTranslateCoords([left, top]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextTypeKey]);

  return <div className={handClassNames} style={handInlineStyles} />;
});

export default Hands;
