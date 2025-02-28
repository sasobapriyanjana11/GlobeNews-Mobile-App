import { useCallback, useState } from "react";
import CountryList from "../constants/CountryList";

export const useNewsCountries = () => {
    const [newsCountries, setNewsCountries] = useState(CountryList);

    const toggleNewsCountries = useCallback((id: number) => {
        setNewsCountries((prevNewsCountries) => {
            return prevNewsCountries.map((item,index) => {
                if (index === id) {
                    return {
                        ...item,
                        selected: !item.selected,
                    };
                }
                return item;
            });
        });
    }, []);

    return { newsCountries, toggleNewsCountries };
};