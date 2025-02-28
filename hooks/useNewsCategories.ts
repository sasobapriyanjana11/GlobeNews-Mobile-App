import { useCallback, useState } from "react";
import newsCategoryList from "../constants/Categories";

type NewsCategory = {
    id: number;
    title: string;
    slug: string;
    selected: boolean;
};

export const useNewsCategories = () => {
    const [newsCategories, setNewsCategories] = useState<NewsCategory[]>(newsCategoryList);

    const toggleNewsCategory = useCallback((id: number) => {
        setNewsCategories((prevNewsCategories) => {
            return prevNewsCategories.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        selected: !item.selected,
                    };
                }
                return item;
            });
        });
    }, []);

    return { newsCategories, toggleNewsCategory };
};