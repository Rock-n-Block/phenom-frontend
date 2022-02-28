import { VFC } from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

interface ILoader {
  color?: string;
  loadColor?: string;
  className?: string;
}

const Loading: VFC<ILoader> = ({ color = '#0C07FD', loadColor = '#223DFF', className }) => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(styles['loader-wrapper'], className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM50 91.6667C73.0119 91.6667 91.6667 73.0119 91.6667 50C91.6667 26.9881 73.0119 8.33333 50 8.33333C26.9881 8.33333 8.33333 26.9881 8.33333 50C8.33333 73.0119 26.9881 91.6667 50 91.6667Z"
        fill="url(#paint0_angular_170_10653)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M94.923 40.0029C97.2053 39.7085 99.2941 41.3199 99.5886 43.6022C99.8623 45.7238 99.9996 47.8608 99.9996 50C99.9996 52.3012 98.1341 54.1667 95.8329 54.1667C93.5318 54.1667 91.6663 52.3012 91.6663 50C91.6663 48.2173 91.5519 46.4365 91.3238 44.6685C91.0293 42.3862 92.6408 40.2974 94.923 40.0029Z"
        fill={loadColor}
      />
      <defs>
        <radialGradient
          id="paint0_angular_170_10653"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(50 50) scale(50)"
        >
          <stop stopColor={color} stopOpacity="0" />
          <stop offset="1" stopColor={color} />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default Loading;

