import {
  createElement,
  CSSProperties,
  FC,
  PropsWithChildren,
  RefObject,
  useEffect,
  useState,
} from 'react';

import cx from 'classnames';
import { useLanguage } from 'context';
import Parser from 'html-react-parser';

import {
  TextAlign as Align,
  TextColor as Color,
  TextSize as Size,
  TextWeight as Weight,
} from 'types';

import styles from './styles.module.scss';

type Tag = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type Props = {
  tag?: Tag;
  className?: string;
  style?: CSSProperties;
  size?: Size;
  color?: Color;
  align?: Align;
  weight?: Weight;
  elRef?: RefObject<any>;
  description?: string;
};

const isDebug = true;

const TextGenerator: FC<PropsWithChildren<Props>> = ({
  tag = 'p',
  children,
  className,
  style = {},
  size = 's',
  color = 'black',
  align = 'left',
  weight = 'normal',
  elRef,
  description,
}) =>
  createElement(
    tag,
    {
      style,
      ref: elRef,
      description,
      className: cx(
        styles.text,
        styles[`type_${tag}`],
        styles[`size_${size}`],
        styles[`color_${color}`],
        styles[`align_${align}`],
        styles[`weight_${weight}`],
        className,
      ),
    },
    children,
  );

const translatedElement = (translate: string, html: boolean) => {
  if (html && translate) {
    return Parser(translate);
  }
  return translate;
};

interface IText extends Props {
  id?: string;
  values?: { [key: string]: any };
  html?: boolean;
}

/**
 *
 * @param {Tag} [tag] - type of element {p}
 * @param {CSSProperties}  [style] - inline styles {}
 * @param {Size} [size] - font size of text {s}
 * * xxxs - 10px
 * * xxs - 11px
 * * xs - 12px
 * * s - 14px
 * * m - 16px
 * * l - 18px
 * * xl - 20px
 * * xxl - 24px
 * * xxxl - 32px
 * * xxxxl - 40px
 * * inherit - inherit
 * @param {Color} [color] - color of text {black}
 * @param {Align} [align] - align of text {left}
 * @param {Weight} [weight] - font weight {normal}
 * @returns Text component
 */
export const Text: FC<IText> = (props) => {
  const { id, values, html = false } = props;
  const { i18nProvider } = useLanguage();
  const { t } = i18nProvider;
  const [failed, setFailed] = useState(false);
  const [translate, setTranslate] = useState('');

  useEffect(() => {
    if (id) {
      setFailed(!i18nProvider.exists(id));
    } else {
      setFailed(false);
    }
  }, [i18nProvider, id]);

  useEffect(() => {
    const pathChecker = /^(.+)\.([^.]+)$/gm;
    if (id && pathChecker.test(id) && id !== 'none') {
      let trans = t(id);
      if (values) {
        Object.entries(values).forEach(([key, val]) => {
          trans = trans.replace(`{{${key}}}`, pathChecker.test(val) ? t(val) : val);
        });
        setTranslate(trans);
      } else {
        setTranslate(trans);
      }
      setFailed(false);
    } else if (id !== 'none' && isDebug) {
      console.error(
        `✔️ id of translate is not valid. Try to load "${id}". Fallback: "${props.children}"`,
      );
      setFailed(true);
    }
  }, [id, props.children, t, translate, values, i18nProvider.options.defaultNS]);

  return (
    <TextGenerator {...props}>
      {failed ? props.children : translatedElement(translate, html)}
    </TextGenerator>
  );
};

export default Text;
