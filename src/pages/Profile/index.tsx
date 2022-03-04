import { VFC } from 'react';

import { Clipboard, TabBar } from 'components';

import { routes } from 'appConstants';
import { TBarOption } from 'types';

interface IProfile {
  id?: string;
}

const Tabs: TBarOption[] = [
  {
    value: '/aboutme',
    name: 'About me',
  },
];

const Profile: VFC<IProfile> = ({ id }) => {
  return (
    <section>
      {id}
      <TabBar options={Tabs} rootPath={routes.profile.root} />
      <Clipboard value="nafnjsnfjnjsnfjbuenrjenjfnejnjerjgbergjfkdnjnfdjn1n21in3in32njn" />
    </section>
  );
};

export default Profile;
