import { FC, ReactElement } from 'react';

import { Footer } from 'containers';

import { useClasses } from 'hooks';

import styles from './styles.module.scss';

type classes = 'gradient-body' | 'gradient-body-2' | 'with-left-detail' | 'with-right-detail';
interface IProps {
  component: ReactElement<any, any>;
  needFooter?: boolean;
  classes?: classes[];
}

const Page: FC<IProps> = ({ component, classes = [], needFooter = true }) => {
  useClasses('#root', classes);
  return (
    <section className={styles.wrapper}>
      {component}
      {needFooter && <Footer />}
    </section>
  );
};

export default Page;
