import { useCallback, useEffect, useRef } from 'react';

type returnType = {
  add: (nClass: string) => void;
  remove: (nClass: string) => void;
  toggle: (nClass: string) => void;
};
type TUseClasses = (selector: string, classes?: string[], withTransition?: boolean) => returnType;

const useClasses: TUseClasses = (selector, classes, withTransition = true) => {
  const ref = useRef<Element | null>(null);

  const add = useCallback((nClass: string) => {
    if (ref.current) {
      ref.current.classList.add(nClass);
    }
  }, []);

  const remove = useCallback((nClass: string) => {
    if (ref.current) {
      ref.current.classList.remove(nClass);
    }
  }, []);

  const toggle = useCallback((nClass: string) => {
    if (ref.current) {
      ref.current.classList.toggle(nClass);
    }
  }, []);

  useEffect(() => {
    const element = document.querySelector(selector);
    if (element) {
      ref.current = element;
      const currentClasses = Array.from(element.classList);
      const shouldBeAdded = classes?.filter((c) => !currentClasses.includes(c));
      const shouldBeRemoved = currentClasses?.filter(
        (c) => !classes?.includes(c) && c !== (withTransition ? 'with-transition' : ''),
      );
      element.classList[withTransition ? 'add' : 'remove']('with-transition');
      shouldBeAdded?.forEach((c) => element.classList.add(c));
      shouldBeRemoved?.forEach((c) => element.classList.remove(c));
    } else {
      console.error('there is no element with such selector');
    }
  }, [classes, selector, withTransition]);

  return { add, remove, toggle };
};

export default useClasses;
