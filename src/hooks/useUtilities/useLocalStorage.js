import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
    // Initialize state with the value from localStorage or the provided initial value
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error accessing localStorage:', error);
            return initialValue;
        }
    });

    // Update localStorage whenever the state changes
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error('Error accessing localStorage:', error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

