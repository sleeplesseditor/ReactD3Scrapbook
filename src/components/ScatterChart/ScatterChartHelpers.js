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

export const Marks = ({ circleRadius, data, tooltipFormat, xScale, xValue, yScale, yValue }) =>  data.map(d => (
    <circle
        key={d.sepal_width}
        className="mark"
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
    >
        <title>{tooltipFormat(xValue(d))}</title>
    </circle>
))