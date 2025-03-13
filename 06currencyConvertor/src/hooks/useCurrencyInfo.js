import { useEffect, useState } from 'react';

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        // Correct API endpoint
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data"); // Handle HTTP errors
                }
                return res.json();
            })
            .then((res) => {
                setData(res[currency]); // Access the correct data
            })
            .catch((err) => {
                console.error("Error fetching currency data:", err); // Handle errors
            });
    }, [currency]);

    return data; // Return the data
}

export default useCurrencyInfo;