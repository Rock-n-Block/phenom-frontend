import { ReactElement, useMemo, VFC } from 'react';
import { useLocation } from 'react-router-dom';

import cn from 'classnames';
import { useLanguage } from 'context';

import { Loader, Text } from 'components';

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
  const { hasNamespaceLoaded } = useLanguage();
  const path = useLocation().pathname;

  const options: TCreateOption = useMemo(
    () => [
      {
        icon: <SingleAddSVG />,
        title: (
          <Text tag="h4" color="gray" align="center">
            Single NFT
          </Text>
        ),
        href: `${path}/single`,
      },
      {
        icon: <MultipleAddSVG />,
        title: (
          <Text tag="h4" color="gray" align="center">
            Multiple NFT
          </Text>
        ),
        href: `${path}/multiple`,
      },
      {
        icon: <CollectionAddSVG />,
        title: (
          <Text tag="h4" color="gray" align="center">
            Create a collection
          </Text>
        ),
        href: `${path}/collection/single`,
      },
    ],
    [path],
  );

  if (!hasNamespaceLoaded('Create')) {
    return <Loader className="preload-page" />;
  }

  return (
    <div
      className={cn(styles['create-page__wrapper'], {
        [styles['loading-page']]: !hasNamespaceLoaded('Create'),
      })}
    >
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
