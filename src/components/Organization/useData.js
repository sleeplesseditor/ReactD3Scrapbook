import * as React from 'react';
import { json } from 'd3';

const jsonUrl = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';

export const useData = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        json(jsonUrl).then(res => {
            setData(res);
        });
    }, []);
    return data;
}