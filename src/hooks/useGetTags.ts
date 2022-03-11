import { useCallback, useEffect, useMemo, useState } from 'react';

import { Categories, TNullable } from 'types';

const useGetTags = (activeCategory: any, categories: TNullable<Categories[]>) => {
  const [activeTag, setActiveTag] = useState('');
  const tags = useMemo(() => {
    let initialArray: any = [];

    if (activeCategory === Categories.allCategories)
      initialArray = categories?.reduce(
        (result: any, currentCategory: any) => [...result, ...currentCategory.tags],
        initialArray,
      );

    if (activeCategory !== Categories.allCategories) {
      categories?.forEach((currentCategory: any) => {
        if (activeCategory === currentCategory.name) {
          initialArray = [...currentCategory.tags];
        }
      });
    }

    if (initialArray?.length) {
      setActiveTag(initialArray[0].name);
    }
    return initialArray;
  }, [activeCategory, categories]);

  const handleSetActiveTag = useCallback((tag: string) => {
    setActiveTag(tag);
  }, []);

  useEffect(() => {
    if (tags && tags[0]?.name) {
      setActiveTag(tags[0].name);
    }
  }, [tags]);

  return { activeTag, tags, handleSetActiveTag };
};

export default useGetTags;
