import * as React from 'react';
import { geoGraticule, geoNaturalEarth1, geoPath } from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
    cities,
    setTooltipState,
    tooltipState,
    worldAtlas: { land, interiors }
}) => {
    const tooltipComponent = () => {
        const [a, b] = projection([tooltipState.lng, tooltipState.lat]);
        return (
            <g  x={a} y={b}>
            <rect className="marker" x={a} y={b} />
            <text className="marker-text" x={a} y={b}>{tooltipState.city}, {tooltipState.country}</text>
            </g>
        )
    }

    return (
        <g className="marks">
            {console.log('A', tooltipState)}
            <path className="sphere" d={path({ type: 'Sphere' })} />
            <path className="graticules" d={path(graticule())} />
            {land.features.map(feature => (
            <path key={feature.properties.name} className="land" d={path(feature)} />
            ))};
            <path className="interiors" d={path(interiors)} />
            {tooltipState ? tooltipComponent() : null}
            {cities.map(d => {
                const [x, y] = projection([d.lng, d.lat]);
                return <circle className="city-marker" cx={x} cy={y} r={1.5} onMouseOver={() => setTooltipState(d)} onMouseOut={() => setTooltipState(null)} />
            })}
        </g>
    )
}