import * as React from 'react';
import { geoGraticule, geoNaturalEarth1, geoPath } from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
    cities,
    setTooltipState,
    sizeScale,
    sizeValue,
    tooltipState,
    worldAtlas: { land, interiors }
}) => {
    const tooltipComponent = () => {
        const [a, b] = projection([tooltipState.lng, tooltipState.lat]);
        return (
            <g className="tooltip" x={a} y={b}>
                <rect x={a + 10} y={b - 15} width="100" height="50" className="tooltip-background"></rect>
                <text x={a + 15} y={b}>{tooltipState.city},</text>
                <text x={a + 15} y={b + 15}>{tooltipState.country}</text>
                <text x={a + 15} y={b + 30}>Pop.: {tooltipState.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</text>
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
            {cities.map(d => {
                const [x, y] = projection([d.lng, d.lat]);
                return <circle className="city-marker" cx={x} cy={y} r={sizeScale(sizeValue(d))} onMouseOver={() => setTooltipState(d)} onMouseOut={() => setTooltipState(null)} />
            })}
            {tooltipState ? tooltipComponent() : null}
        </g>
    )
}