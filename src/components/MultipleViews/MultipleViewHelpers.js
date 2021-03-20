import * as React from 'react';

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