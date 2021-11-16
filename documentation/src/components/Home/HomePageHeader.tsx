import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import React, { FC, memo } from 'react';
import styles from './HomePageHeader.module.css';
import InstallTabs from './InstallButton/InstallTabs';

const HomePageHeader: FC = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <>
      <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <img src={`${siteConfig.baseUrl}img/discordjs-docs-parser.png`} alt="DiscordJS Docs Parser Logo" className={styles.logo}></img>
          <h1 className="hero__title">{siteConfig.title}</h1>
          <InstallTabs />
        </div>
      </header>
    </>
  );
};

export default memo(HomePageHeader);
