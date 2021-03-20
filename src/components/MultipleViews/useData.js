import * as React from 'react';
import { csv, json } from 'd3';
import { feature, mesh } from 'topojson-client';

const csvUrl = 'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/267eac8b97d161c479d950ffad3ddd5ce2d1f370/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';
const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

export const useData = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        const row = d => {
            d.coords = d['Location Coordinates'].split(',').map(d => +d).reverse();
            d['Total Dead and Missing'] = +d['Total Dead and Missing'];
            d['Reported Date'] = new Date(d['Reported Date']);
            return d;
        };
        csv(csvUrl, row).then(setData);
    }, []);
    return data;
}

export const useWorldAtlas = () => {
    const [data, setData] = React.useState(null);
  
    React.useEffect(() => {
        json(jsonUrl).then(topology => {
            const { countries, land } = topology.objects;
            setData({
                land: feature(topology, land),
                interiors: mesh(topology, countries, (a, b) => a !== b)
            });
        });
    }, []);
  
    return data;
  };
  