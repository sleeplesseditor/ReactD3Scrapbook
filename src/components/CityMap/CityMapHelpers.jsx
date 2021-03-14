import * as React from 'react';
import { geoGraticule, geoNaturalEarth1, geoPath } from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
    cities,
    worldAtlas: { land, interiors }
}) => (
    <g className="marks">
        <path className="sphere" d={path({ type: 'Sphere' })} />
        <path className="graticules" d={path(graticule())} />
        {land.features.map(feature => (
           <path key={feature.properties.name} className="land" d={path(feature)} />
        ))};
        <path className="interiors" d={path(interiors)} />
        {cities.map(d => {
            const [x, y] = projection([d.lng, d.lat]);
            return <circle cx={x} cy={y} r={1.5} />
        })}
    </g>
);