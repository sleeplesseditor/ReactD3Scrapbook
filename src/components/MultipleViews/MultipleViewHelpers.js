import * as React from 'react';
import { geoGraticule, geoNaturalEarth1, geoPath, timeFormat } from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();
const tooltipDateFormat = timeFormat('%m/%d/%Y');

export const AxisBottom = ({ innerHeight, tickFormat, tickOffset, xScale }) => xScale.ticks().map(tickValue =>
    <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
        <line y2={innerHeight} stroke="#" />
        <text dy=".71em" y={innerHeight + tickOffset} style={{textAnchor: 'middle'}}>{tickFormat(tickValue)}</text>
    </g>
)

export const AxisLeft = ({ innerWidth, tickOffset, yScale }) => yScale.ticks().map(tickValue =>
    <g className="tick" key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
        <line x2={innerWidth} />
        <text
            key={tickValue}
            dy=".32em"
            x={-tickOffset}
            style={{textAnchor: 'end'}}
        >
            {tickValue}
        </text>
    </g>
)

export const Marks = ({ data, innerHeight, tooltipFormat, xScale, yScale }) =>  data.map(d => (
    <rect
        className="mark"
        x={xScale(d.x0)}
        y={yScale(d.y)}
        width={xScale(d.x1) - xScale(d.x0)}
        height={innerHeight - yScale(d.y)}
    >
        <title>{tooltipFormat(d.y)}</title>
    </rect>
))

export const Globe = ({
        worldAtlas: { land, interiors },
        data,
        setTooltipState,
        sizeScale,
        sizeValue,
        tooltipState
    }) => {
        const tooltipComponent = () => {
            const [a, b] = projection(tooltipState.coords);
            return (
                <g className="tooltip" x={a} y={b}>
                    <rect x={a + 10} y={b - 15} width="100" height="70" className="tooltip-background"></rect>
                    <text x={a + 15} y={b}>{tooltipDateFormat(tooltipState.reported)}</text>
                    <text x={a + 15} y={b + 15}>X: {tooltipState.coords[0]}</text>
                    <text x={a + 15} y={b + 30}>Y: {tooltipState.coords[1]}</text>
                    <text x={a + 15} y={b + 45}>Total:  {tooltipState.total}</text>
                </g>
            )
        }

        return (
            <g className="marks">
                {React.useMemo(() => (
                    <>
                        <path className="sphere" id="sphere" d={path({ type: 'Sphere' })} />
                        <path className="graticules" d={path(graticule())} />
                        {land.features.map(feature => (
                            <path key={feature.properties.name} className="land" d={path(feature)} />
                        ))};
                        <path className="interiors" d={path(interiors)} />
                    </>
                ), [graticule, interiors, land, path])}
                {data.map(d => {
                    const [x, y] = projection(d.coords);
                    return <circle className="city-marker" cx={x} cy={y} r={sizeScale(sizeValue(d))} onMouseOver={() => setTooltipState(d)} onMouseOut={() => setTooltipState(null)} />
                })}
                {tooltipState ? tooltipComponent() : null}
            </g>
        )
    };