import * as React from 'react';
import { geoGraticule, geoNaturalEarth1, geoPath } from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
    data: { land, interiors }
}) => (
    <g className="marks">
        <path className="sphere" d={path({ type: 'Sphere' })} />
        <path className="graticules" d={path(graticule())} />
        {land.features.map(feature => (
           <path key={feature.properties.name} className="land" d={path(feature)} />
        ))};
        <path className="interiors" d={path(interiors)} />
    </g>
);