import { VFC } from 'react';

import cn from 'classnames';

import { Text } from 'components';

import { useClipboard } from 'hooks';
import { TAvailableSocials } from 'types';

import { CopySVG, EmailSVG, InstagramSVG, SiteSVG, TwitterSVG } from 'assets/img';

import styles from './styles.module.scss';

interface IAboutMe {
  socials: { [key in TAvailableSocials]: string };
  description: string;
}

const getSocialIcon = (name: TAvailableSocials) => {
  switch (name) {
    case 'email':
      return <EmailSVG />;
    case 'instagram':
      return <InstagramSVG />;
    case 'site':
      return <SiteSVG />;
    case 'twitter':
      return <TwitterSVG />;
    default:
      return null;
  }
};

interface ISocialItem {
  type: TAvailableSocials;
  value: string;
}

const SocialItem: VFC<ISocialItem> = ({ type, value }) => {
  const { copyStatus, copy } = useClipboard(value, 2000);
  return (
    <button className={styles['social-item__wrapper']} type="button" onClick={copy}>
      <span className={cn(styles['social-item__wrapper__icon-copy'])}>
        <CopySVG />
      </span>
      <span
        className={cn(styles['social-item__wrapper__icon'], {
          [styles['can-copy']]: copyStatus === 0,
        })}
      >
        {getSocialIcon(type)}
      </span>
      <Text className={styles['social-item__wrapper__text']}>{value}</Text>
    </button>
  );
};

const AboutMe: VFC<IAboutMe> = ({ socials, description }) => {
  return (
    <section className={styles['about-me__wrapper']}>
      <div className={styles['about-me__wrapper__socials']}>
        {Object.entries(socials).map(([key, value], idx) => (
          <SocialItem
            type={key as TAvailableSocials}
            value={value}
            // TODO remove this
            key={`${idx * Math.random()}`}
          />
        ))}
      </div>
      <div className={styles['about-me__wrapper__description']}>
        <Text color="dark" size="s">
          {description}
        </Text>
      </div>
    </section>
  );
};

export default AboutMe;
