import * as React from 'react';
import { max, scaleSqrt } from 'd3';
import { useWorldAtlas } from './useWorldAtlas';
import { useCities } from './useCities';
import { Marks } from './CityMapHelpers';
import './CityMap.scss';

const width = 960;
const height = 500;

const CityMap = () => {
    const [tooltipState, setTooltipState] = React.useState(null);
    const worldAtlas = useWorldAtlas();
    const cities = useCities();

    if(!worldAtlas || !cities) {
        return <pre>Loading...</pre>
    }

    const sizeValue = d => d.population;
    const maxRadius = 15; 

    const sizeScale = scaleSqrt()
        .domain([0, max(cities, sizeValue)])
        .range([0, maxRadius])

    return (
        <div className="main-container">
            <svg width={width} height={height}>
                <Marks  
                    cities={cities}
                    setTooltipState={setTooltipState}
                    sizeScale={sizeScale}
                    sizeValue={sizeValue}
                    tooltipState={tooltipState}
                    worldAtlas={worldAtlas}
                />
            </svg>
        </div>
    )
};

export default CityMap;
