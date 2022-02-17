import { Link } from 'react-router-dom';

import { Button, Logo, Text } from 'components';

// import { routes } from 'appConstants';

import styles from './styles.module.scss';
// import { userApi } from 'services';

const Footers: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.linksAndControls}>
          <div className={styles.footerLogo}>
            <Logo className={styles.logo} color="light" />
          </div>
          <div className={styles.info}>
            <Text color="white">Unit 173004, </Text>
            <Text color="white">Second Floor, 6 Market Place, London, </Text>
            <Text color="white">Fitzrovia, United Kingdom, W1W 8AF</Text>
          </div>
          <div className={styles.links}>
            <div className={styles.linkBlock}>
              <Link to="/">
                <Button padding="0" className={styles.button} color="transparent">
                  <Text color="white">Twitter</Text>
                </Button>
              </Link>
              <Link to="/">
                <Button padding="0" className={styles.button} color="transparent">
                  <Text color="white">Instagram</Text>
                </Button>
              </Link>
            </div>
            <div className={styles.linkBlock}>
              <Link to="/">
                <Button padding="0" className={styles.button} color="transparent">
                  <Text color="white">Telegram</Text>
                </Button>
              </Link>
              <Link to="/">
                <Button padding="0" className={styles.button} color="transparent">
                  <Text color="white">Facebook</Text>
                </Button>
              </Link>
            </div>
            <div className={styles.linkBlock}>
              <Link to="/">
                <Button padding="0" className={styles.button} color="transparent">
                  <Text color="white">Explore</Text>
                </Button>
              </Link>
              <Link to="/">
                <Button padding="0" className={styles.button} color="transparent">
                  <Text color="green" className={styles.docs}>Documents</Text>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.copyrightBlock}>
          <Text color="gray">PhenomMetaverse©{new Date().getFullYear()}</Text>
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
