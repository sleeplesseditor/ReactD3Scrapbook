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
    const nameLength = React.useMemo(() => (name) => {
        if(name.length >= 10) {
            return name.length * 7;
        }
        return 80
    }, [])

    const tooltipComponent = React.useMemo(() => {
        const {aids, Entity, x, y} = tooltipState || {};
        return (
            <g className="tooltip" x={x / 1.1} y={y / 1.1}>
                {aids ? (
                    <>
                        <rect x={(x / 1.1) + 10} y={(y / 1.1) - 15} width={nameLength(Entity)} height="36" className="tooltip-background" />
                        <text x={(x / 1.1) + 15} y={(y / 1.1)}>{Entity}</text>
                        <text x={(x / 1.1) + 15} y={(y / 1.1) + 15}>Pop.: {aids.toFixed(2)}%</text>
                    </>
                ) : null}
            </g>
        )
    }, [nameLength, tooltipState]);

    return (
        <g className="marks">
            <path className="sphere" id="sphere" d={path({ type: 'Sphere' })} />
            <path className="graticules" d={path(graticule())} />
            {countries.features.map(feature => {
                const d = rowByNumericCode.get(feature.id);
                return (
                    <path
                        key={feature.properties.name}
                        fill={d ? colourScale(colourValue(d)) : missingDataColour}
                        d={path(feature)}
                        onMouseEnter={(event) => setTooltipState({...d, x: pointer(event)[0], y: pointer(event)[1]})}
                        onMouseLeave={() => setTooltipState(null)}
                    />
                );
            })};
            <path className="interiors" d={path(interiors)} />
            {tooltipState ? tooltipComponent : null}
        </g>
    )
}