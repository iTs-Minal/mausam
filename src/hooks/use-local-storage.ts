import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredvalue] = useState<T>(() => {

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (error) {
            console.error(error);
            return initialValue;
        }

    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));

        }
        catch (error) {
            console.error(error);

        }
    }, [key, storedValue])

    return [storedValue, setStoredvalue] as const;
}