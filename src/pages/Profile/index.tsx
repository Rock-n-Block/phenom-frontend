import { VFC } from 'react';

interface IProfile {
  id?: string;
}

const Profile: VFC<IProfile> = ({ id }) => {
  return <section>{id}</section>;
};

export default Profile;
