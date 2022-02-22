import { ReactElement, useMemo, VFC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { H1, H4 } from 'components';
import { toPC } from 'utils';

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

const Create: VFC = () => {
  const { t } = useTranslation('Create', { keyPrefix: 'createOptions' });
  const path = useLocation().pathname;

  const options: TCreateOption = useMemo(
    () => [
      {
        icon: <SingleAddSVG />,
        title: (
          <H4 color="gray" align="center">
            {t(toPC('Single Nft'))}
          </H4>
        ),
        href: `${path}/single-NFT`,
      },
      {
        icon: <MultipleAddSVG />,
        title: (
          <H4 color="gray" align="center">
            {t(toPC('Multiple Nft'))}
          </H4>
        ),
        href: `${path}/multiple-NFT`,
      },
      {
        icon: <CollectionAddSVG />,
        title: (
          <H4 color="gray" align="center">
            {t(toPC('Create a collection'))}
          </H4>
        ),
        href: `${path}/collection`,
      },
    ],
    [path, t],
  );
  return (
    <section className={styles['create-menu__wrapper']}>
      <H1 align="center" weight="semibold" className={styles['create-menu__wrapper__title']}>{t(toPC('create'))}</H1>
      <div className={styles['create-menu__wrapper__body']}>
        {options.map((opt) => (
          <CreateCard key={opt.href} {...opt} />
        ))}
      </div>
    </section>
  );
};

export default Create;
