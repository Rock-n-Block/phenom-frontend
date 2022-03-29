import { Children, FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import userSelector from 'store/user/selectors';

import { isMainnet } from 'config/constants';

import { useShallowSelector } from 'hooks';
import { State, UserState } from 'types';

export const requirements = {
  logged: ({ isLogged }: { isLogged: boolean }) => isLogged,
  whitelisted: ({ isWhitelisted }: { isWhitelisted: boolean }) => isWhitelisted,
} as const;

export type TRequirements = keyof typeof requirements;

interface IGuardRoute {
  require: TRequirements[];
  children: ReactElement;
  name?: string;
}

const GuardRoute: FC<IGuardRoute> = ({ require, children, name }) => {
  const { address } = useShallowSelector<State, UserState>(userSelector.getUser);
  const { isWhitelisted } = useShallowSelector<State, UserState>(userSelector.getUser);
  if (
    require.every((req) => requirements[req]({ isLogged: address.length !== 0, isWhitelisted }))
  ) {
    return children;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!isMainnet) console.warn(`guarded ${name || Children.toArray(children)[0]?.type.name}`);
  return <Navigate to="/" />;
};

export default GuardRoute;
