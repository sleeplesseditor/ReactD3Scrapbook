import * as React from 'react';
import { geoGraticule, geoNaturalEarth1, geoPath, select } from 'd3';

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
            <g className="tooltip" x={a} y={b}>
                <text x={a} y={b}>{tooltipState.city},</text>
                <text x={a} y={b + 15}>{tooltipState.country}</text>
                <text x={a} y={b + 30}>Pop.:  {tooltipState.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</text>
            </g>
        )
    }

    return (
        <g className="marks">
            <path className="sphere" id="sphere" d={path({ type: 'Sphere' })} />
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