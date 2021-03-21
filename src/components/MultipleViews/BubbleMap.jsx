import * as React from 'react';
import {max, scaleSqrt} from 'd3';
import { Globe } from './MultipleViewHelpers';

const sizeValue = d => d.total;
const maxRadius = 15;

export const BubbleMap = ({ data, filteredData, setTooltipState, tooltipState, worldAtlas }) => {
    const sizeScale = React.useMemo(() => scaleSqrt()
        .domain([0, max(data, sizeValue)])
        .range([0, maxRadius]), 
    [data, maxRadius, sizeValue]);

    return (
        <Globe 
            data={filteredData}
            setTooltipState={setTooltipState}
            sizeScale={sizeScale}
            sizeValue={sizeValue}
            tooltipState={tooltipState}
            worldAtlas={worldAtlas}
        />
    )
}