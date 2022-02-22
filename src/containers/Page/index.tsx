import { FC, ReactElement } from 'react';

import cx from 'classnames';
import { Footer } from 'containers';

import { ellipse } from 'assets/img';

import styles from './styles.module.scss';

interface IProps {
  component: ReactElement<any, any>;
  needFooter?: boolean;
}

const Page: FC<IProps> = ({ component, needFooter = true }) => {
  return (
    <>
      <img src={ellipse} alt="ellipse" className={styles.ellipse} />
      <img src={ellipse} alt="ellipse" className={cx(styles.ellipse, styles.ellipseReverted)} />
      {component}
      {needFooter && <Footer />}
    </>
  );
};

export default Page;
