import { useCallback, useEffect, useMemo, useState } from 'react';

import { Category, CategoryName, Tag, TNullable, TResponseCategories } from 'types';

const useGetTags = (activeCategory: any, categories: TNullable<TResponseCategories>) => {
  const [activeTag, setActiveTag] = useState('');
  const tags = useMemo(() => {
    let initialArray: Tag[] = [];

    if (activeCategory === CategoryName.allCategories) {
      if (categories) {
        initialArray = categories.reduce(
          (result: Tag[], currentCategory: Category) => [...result, ...currentCategory.tags],
          initialArray,
        );
      }
    }

    if (activeCategory !== CategoryName.allCategories) {
      categories?.forEach(function (currentCategory: Category) {
        if (activeCategory === currentCategory.name) {
          initialArray = [...currentCategory.tags];
        }
      });
    }

    if (initialArray?.length) {
      setActiveTag(String(initialArray[0].id) || '');
    }
    return initialArray;
  }, [activeCategory, categories]);

  const handleSetActiveTag = useCallback((tag: string) => {
    setActiveTag(tag);
  }, []);

  useEffect(() => {
    if (tags && tags[0]?.id) {
      setActiveTag(String(tags[0].id));
    }
  }, [tags]);

  return { activeTag, tags, handleSetActiveTag };
};

export default useGetTags;
