import * as React from 'react';
import { geoGraticule, geoNaturalEarth1, geoPath } from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();
const missingDataColour = 'gray';

export const Marks = ({
    setTooltipState,
    colourScale,
    colourValue,
    rowByNumericCode,
    tooltipState,
    worldAtlas: { countries, interiors }
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
            {countries.features.map(feature => {
                const d = rowByNumericCode.get(feature.id);
                return (
                    <path key={feature.id} fill={d ? colourScale(colourValue(d)) : missingDataColour} d={path(feature)} />
                );
            })};
            <path className="interiors" d={path(interiors)} />
            {tooltipState ? tooltipComponent() : null}
        </g>
    )
}