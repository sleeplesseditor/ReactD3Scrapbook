import * as React from 'react';
import { max, scaleSequential, interpolateYlOrRd } from 'd3';
import { useWorldAtlas } from './useWorldAtlas';
import { useCodes } from './useCodes';
import { useData } from './useData';
import { Marks } from './ChoroplethHelpers';
import RangeInput from './RangeInput';
import './Choropleth.scss';

const width = 960;
const height = 500;

const Choropleth = () => {
    const [tooltipState, setTooltipState] = React.useState(null);
    const [currentYear, setCurrentYear] = React.useState('2017');
    const worldAtlas = useWorldAtlas();
    const data = useData();
    const codes = useCodes();

    if(!worldAtlas || !data || !codes) {
        return <pre>Loading...</pre>
    }

    const numericCodeByAlphaCode = new Map();
    codes.forEach(code => {
        const alpha3Code = code['alpha-3'];
        const numericCode = code['country-code'];
        numericCodeByAlphaCode.set(alpha3Code, numericCode);
    })

    const filteredData = data.filter(d => d.Year === currentYear);

    const rowByNumericCode = new Map();

    filteredData.forEach(d => {
        const alpha3Code = d.Code;
        const numericCode = numericCodeByAlphaCode.get(alpha3Code);
        rowByNumericCode.set(numericCode, d)
    });

    const colourValue = d => d.aids;

    const colourScale = scaleSequential(interpolateYlOrRd)
        .domain([0, max(data, colourValue)])

    return (
        <div className="main-container">
            <svg width={width} height={height}>
                <Marks  
                    setTooltipState={setTooltipState}
                    colourScale={colourScale}
                    colourValue={colourValue}
                    rowByNumericCode={rowByNumericCode}
                    tooltipState={tooltipState}
                    worldAtlas={worldAtlas}
                />
            </svg>
            <div className="range-container">
                <RangeInput
                    currentYear={currentYear}
                    defaultValue="2017"
                    min="1990"
                    max="2017"
                    setCurrentYear={setCurrentYear}
                />
            </div>
        </div>
    )
};

export default Choropleth;
