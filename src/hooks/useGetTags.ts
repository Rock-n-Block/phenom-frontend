import { useCallback, useEffect, useMemo, useState } from 'react';

import { Categories, TNullable } from 'types';

const useGetTags = (activeCategory: any, categories: TNullable<Categories[]>) => {
  const [isLoading, setIsLoading] = useState(true);
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

    return initialArray;
  }, [activeCategory, categories]);

  const [activeTag, setActiveTag] = useState(tags ? tags[0].name : '');

  const handleSetActiveTag = useCallback((tag: string) => {
    setActiveTag(tag);
  }, []);

  useEffect(() => {
    if (tags && tags[0]?.name) {
      setActiveTag(tags[0].name);
      setIsLoading(false);
    }
  }, [tags]);

  return { activeTag, tags, handleSetActiveTag, isLoading };
};

export default useGetTags;
