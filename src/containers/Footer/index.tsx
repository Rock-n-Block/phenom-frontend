import { Link } from 'react-router-dom';

import { Button, Logo, Text } from 'components';

import { routes } from 'appConstants';
import { CategoryName } from 'types';

import styles from './styles.module.scss';

const Footers: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.linksAndControls}>
          <div className={styles.footerLogo}>
            <Logo className={styles.logo} color="light" />
          </div>
          <div className={styles.info}>
            <Text color="white">UAE, Dubai, Office 1233, </Text>
            <Text color="white">Owned by RASHED MOHAMMED ABDULLA ALMAZROUEI,</Text>
            <Text color="white">Al Thanyah 1</Text>
          </div>
          <div className={styles.links}>
            <div className={styles.linkBlock}>
              <a href="https://twitter.com/MetaversePhenom">
                <Button padding="0" className={styles.button} color="transparent">
                  <Text color="white">Twitter</Text>
                </Button>
              </a>
              <a href="https://www.instagram.com/phenom.metaverse/">
                <Button padding="0" className={styles.button} color="transparent">
                  <Text color="white">Instagram</Text>
                </Button>
              </a>
              <a href="https://t.me/phenom_metaverse">
                <Button padding="0" className={styles.button} color="transparent">
                  <Text color="white">Telegram channel</Text>
                </Button>
              </a>
              <a href="https://t.me/+noh1Ida1YckzNGVk">
                <Button padding="0" className={styles.button} color="transparent">
                  <Text color="white">Telegram public chat</Text>
                </Button>
              </a>
            </div>
            <div className={styles.linkBlock}>
              <a href="https://www.youtube.com/channel/UCUts37ohrTSwobJ5JqHfUbg">
                <Button padding="0" className={styles.button} color="transparent">
                  <Text color="white">Youtube</Text>
                </Button>
              </a>
              <a href="https://medium.com/@metaverse.phenom">
                <Button padding="0" className={styles.button} color="transparent">
                  <Text color="white">Medium</Text>
                </Button>
              </a>
              <a href="https://discord.gg/2Pdv3Gpdf5">
                <Button padding="0" className={styles.button} color="transparent">
                  <Text color="white">Discord</Text>
                </Button>
              </a>
            </div>
            <div className={styles.linkBlock}>
              <Link to={routes.explore.filter(CategoryName.allCategories)}>
                <Button padding="0" className={styles.button} color="transparent">
                  <Text color="white">Explore</Text>
                </Button>
              </Link>
              <Link to="/">
                <Button padding="0" className={styles.button} color="transparent">
                  <Text color="green" className={styles.docs}>
                    Documents
                  </Text>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.copyrightBlock}>
          <Text className={styles.copyrightBlockItem} color="white">
            PhenomMetaverse©{new Date().getFullYear()}
          </Text>
          <div className={styles.privacy}>
            <Link to="/">
              <Button padding="0" className={styles.button} color="transparent">
                <Text color="white">Privacy Policy</Text>
              </Button>
            </Link>
            <Link to="/">
              <Button padding="0" className={styles.button} color="transparent">
                <Text color="white">Terms of Service</Text>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
