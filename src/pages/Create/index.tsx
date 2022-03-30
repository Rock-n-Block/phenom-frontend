import { ReactElement, useMemo, VFC } from 'react';
import { useLocation } from 'react-router-dom';

import cn from 'classnames';
import { useLanguage } from 'context';

import { Text } from 'components';

import { CreateCard } from 'pages/Create/components';

import { CollectionAddSVG, MultipleAddSVG, SingleAddSVG } from 'assets/img';

import styles from './styles.module.scss';

type TSingleOption = {
  icon: ReactElement;
  title: string | ReactElement;
  href: string;
  className?: string;
};
type TCreateOption = TSingleOption[];

const CreatePage: VFC = () => {
  const { isReady } = useLanguage();
  const path = useLocation().pathname;

  const options: TCreateOption = useMemo(
    () => [
      {
        icon: <SingleAddSVG />,
        title: (
          <Text tag="h4" color="gray" align="center" id="createOptions.Single">
            Single NFT
          </Text>
        ),
        href: `${path}/single`,
      },
      {
        icon: <MultipleAddSVG />,
        title: (
          <Text tag="h4" color="gray" align="center" id="createOptions.Multiple">
            Multiple NFT
          </Text>
        ),
        href: `${path}/multiple`,
      },
      {
        icon: <CollectionAddSVG />,
        title: (
          <Text tag="h4" color="gray" align="center" id="createOptions.CreateACollection">
            Create a collection
          </Text>
        ),
        href: `${path}/collection/single`,
      },
    ],
    [path],
  );
  return (
    <div className={cn(styles['create-page__wrapper'], { [styles['loading-page']]: !isReady })}>
      <section className={styles['create-menu__wrapper']}>
        <Text
          tag="h1"
          align="center"
          weight="semibold"
          className={styles['create-menu__wrapper__title']}
        >
          Create
        </Text>
        <div className={styles['create-menu__wrapper__body']}>
          {options.map((opt) => (
            <CreateCard
              className={styles['create-menu__wrapper__body-card']}
              key={opt.href}
              {...opt}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CreatePage;
