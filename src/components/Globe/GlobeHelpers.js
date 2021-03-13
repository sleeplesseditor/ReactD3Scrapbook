import * as React from 'react';
import { geoEqualEarth, geoPath } from 'd3';

const projection = geoEqualEarth();
const path = geoPath(projection);

export const Marks = ({
    data: { countries, interiors }
}) => (
    <g className="marks">
        <path className="sphere" d={path({ type: 'Sphere' })} />
        {countries.features.map(feature => (
           <path className="country" d={path(feature)} />
        ))};
        <path className="interiors" d={path(interiors)} />
    </g>
);