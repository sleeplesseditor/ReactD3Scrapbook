import * as React from 'react';
import { geoGraticule, geoNaturalEarth1, geoPath, pointer } from 'd3';

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
    worldAtlas: { countries, interiors, land }
}) => {
    const tooltipComponent = () => {
        const [a, b] = projection([tooltipState.x, tooltipState.y]);
        console.log('STATE', tooltipState)
        return (
            <g className="tooltip" x={tooltipState.x} y={tooltipState.y}>
                <rect x={tooltipState.x + 10} y={tooltipState.y - 15} width="100" height="50" className="tooltip-background"></rect>
                <text x={tooltipState.x + 15} y={tooltipState.y}>{tooltipState.Entity},</text>
                <text x={tooltipState.x + 15} y={tooltipState.y + 15}>{tooltipState.aids}</text>
            </g>
        )
    }

    return (
        <g className="marks">
            {console.log('Land', countries)}
            <path className="sphere" id="sphere" d={path({ type: 'Sphere' })} />
            <path className="graticules" d={path(graticule())} />
            {countries.features.map(feature => {
                const d = rowByNumericCode.get(feature.id);
                return (
                    <path key={feature.id} fill={d ? colourScale(colourValue(d)) : missingDataColour} d={path(feature)} onMouseEnter={(event) => setTooltipState({...d, x: pointer(event)[0], y: pointer(event)[1]})} onMouseLeave={() => setTooltipState(null)} />
                );
            })};
            <path className="interiors" d={path(interiors)} />
            {tooltipState ? tooltipComponent() : null}
        </g>
    )
}