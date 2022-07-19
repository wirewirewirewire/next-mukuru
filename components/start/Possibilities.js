import React from 'react';
import styles from './possibilities.module.scss';
import Image from 'next/image';

import Link from 'next/link';
import MoreLink from '../MoreLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Wrapper } from '@un/react';
import {
  faBellPlus,
  faFloppyDisk,
  faGlassWaterDroplet,
  faHandshakeAlt,
  faLeaf,
  faSatellite,
  faStarShooting,
  faVectorCircle,
  faVectorPolygon,
} from '@fortawesome/pro-light-svg-icons';

import { faReact } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'next-i18next';

function PossibilitiesContainer({
  className = '',
  background,
  title,
  icon,
  content,
}) {
  return (
    <div
      className={`${styles.container} ${className}`} /*style={{ background }}*/
    >
      <div className={styles.icon}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={styles.content}>
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default function Possiblities() {
  return (
    <Wrapper pageWidth="lg" className={styles.possibilities}>
      <div className={styles.possibilitiesWrapper}>
        <PossibilitiesContainer
          title="> 50 components"
          className={styles.components}
          content={
            <>
              are currently implemented in react.js or use the tools with other
              UI libraries
              <br />
              <br />
              <MoreLink href="./posts/aktivierung" className={styles.link}>
                Lorem Ipsum
              </MoreLink>
            </>
          }
          background="#E7DFFF"
          icon={faReact}
        />
        {/*<PossibilitiesContainer
        title="Gerät autonom bedienbar"
        content="Die integrierte Funkverbindung funktioniert ohne Internet, Bluetooth oder extra Sim-Karte direkt nach dem Auspacken."
        background="#F1F3FA"
        icon="📡"
      />*/}
        <PossibilitiesContainer
          title="Build & maintain an icon library"
          content="A complete tool box to take advantage of using SVGs in your React applications."
          //background="#E7FFDF"
          icon="🌿"
          icon={faVectorCircle}
        />
        <PossibilitiesContainer
          title="Style once – use everywhere"
          content="define styles once and use them in your web, Android, iOS or other projects"
          //  background="#DFFDFF"
          icon="🐜"
          icon={faHandshakeAlt}
        />
        <PossibilitiesContainer
          title="Recommendations"
          content="Lorem ipsum dolor sit amet"
          // background="#FFDFDF"
          icon="⏰"
          icon={faStarShooting}
        />
        <PossibilitiesContainer
          title="Legacy support"
          content="Lorem ipsum dolor sit dal."
          // background="#DFF0FF"
          icon="💦"
          icon={faFloppyDisk}
        />
      </div>
    </Wrapper>
  );
}
