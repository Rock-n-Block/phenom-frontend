import { FC, ReactElement } from 'react';

import { Footer } from 'containers';

interface IProps {
  component: ReactElement<any, any>;
  needFooter?: boolean;
}

const Page: FC<IProps> = ({ component, needFooter = true }) => {
  return (
    <>
      {component}
      {needFooter && <Footer />}
    </>
  );
};

export default Page;
