import { VFC } from 'react';

import cn from 'classnames';

import { Text } from 'components';

import { useClipboard } from 'hooks';
import { TAvailableSocials } from 'types';

import { CopySVG, EmailSVG, InstagramSVG, SiteSVG, TwitterSVG } from 'assets/img';

import styles from './styles.module.scss';

interface IAboutMe {
  socials: { [key in TAvailableSocials]?: string | null | undefined };
  description: string;
  name: string;
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
  value: string | undefined | null;
}

const SocialItem: VFC<ISocialItem> = ({ type, value }) => {
  const { copyStatus, copy } = useClipboard(value || '', 2000);
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

const AboutMe: VFC<IAboutMe> = ({ socials, description, name }) => {
  return (
    <section className={styles['about-me__wrapper']}>
      {Object.entries(socials).filter(([, value]) => value).length === 0 && !description.length ? (
        <Text className={styles['empty-profile']} size="xl" align="center" weight="bold">
          Nothing here yet 😣
        </Text>
      ) : (
        <>
          <div className={styles['about-me__wrapper__socials']}>
            {Object.entries(socials)
              .filter(([, value]) => value)
              .map(([key, value]) => (
                <SocialItem type={key as TAvailableSocials} value={value} key={key} />
              ))}
            {Object.entries(socials).filter(([, value]) => value).length === 0 &&
              `${name} doesn't left social networks 😣`}
          </div>
          <div className={styles['about-me__wrapper__description']}>
            <Text color="dark" size="s">
              {description.length ? description : `${name} doesn't left bio 😣`}
            </Text>
          </div>
        </>
      )}
    </section>
  );
};

export default AboutMe;
