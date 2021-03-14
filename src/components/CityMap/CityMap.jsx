import * as React from 'react';
import { useWorldAtlas } from './useWorldAtlas';
import { useCities } from './useCities';
import { Marks } from './CityMapHelpers';
import './CityMap.scss';

const width = 960;
const height = 500;

const CityMap = () => {
    const worldAtlas = useWorldAtlas();
    const cities = useCities();

    if(!worldAtlas || !cities) {
        return <pre>Loading...</pre>
    }

    return (
        <div className="main-container">
            <svg width={width} height={height}>
                <Marks cities={cities} worldAtlas={worldAtlas} />
            </svg>
        </div>
    )
};

export default CityMap;
