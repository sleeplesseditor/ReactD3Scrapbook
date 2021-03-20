import * as React from 'react';
import {max, scaleSqrt} from 'd3';
import { Globe } from './MultipleViewHelpers';

export const BubbleMap = ({ data, worldAtlas }) => {
    const sizeValue = d => d['Total Dead and Missing'];
    const maxRadius = 15;

    const sizeScale = scaleSqrt()
        .domain([0, max(data, sizeValue)])
        .range([0, maxRadius]);

    return (
        <Globe 
            data={data}
            sizeScale={sizeScale}
            sizeValue={sizeValue}
            worldAtlas={worldAtlas}
        />
    )
}