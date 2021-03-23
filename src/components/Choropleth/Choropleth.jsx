import * as React from 'react';
import { max, scaleSequential, schemeYlOrRd } from 'd3';
import { useWorldAtlas } from './useWorldAtlas';
import { useData } from './useData';
import { Marks } from './ChoroplethHelpers';
import './Choropleth.scss';

const width = 960;
const height = 500;
const selectedYear = '2017';

const Choropleth = () => {
    const [tooltipState, setTooltipState] = React.useState(null);
    const worldAtlas = useWorldAtlas();
    const data = useData();

    if(!worldAtlas || !data) {
        return <pre>Loading...</pre>
    }

    const filteredData = data.filter(d => d.Year === selectedYear);

    const colourValue = d => d.aids;

    const colourScale = scaleSequential(schemeYlOrRd)
        .domain([0, max(data, colourValue)])

    return (
        <div className="main-container">
            <svg width={width} height={height}>
                <Marks  
                    setTooltipState={setTooltipState}
                    colourScale={colourScale}
                    colourValue={colourValue}
                    tooltipState={tooltipState}
                    worldAtlas={worldAtlas}
                />
            </svg>
        </div>
    )
};

export default Choropleth;
