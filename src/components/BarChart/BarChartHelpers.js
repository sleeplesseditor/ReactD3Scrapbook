import * as React from 'react';

export const AxisBottom = ({ innerHeight, tickFormat, xScale }) => xScale.ticks().map(tickValue =>
    <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
        <line y2={innerHeight} stroke="#" />
        <text dy=".71em" y={innerHeight + 3} style={{textAnchor: 'middle'}}>{tickFormat(tickValue)}</text>
    </g>
)

export const AxisLeft = ({ yScale }) => yScale.domain().map(tickValue =>
    <g className="tick" key={tickValue}>
        <text
            key={tickValue}
            dy=".32em"
            x={-3}
            y={yScale(tickValue) + yScale.bandwidth() / 2}
            style={{textAnchor: 'end'}}
        >
            {tickValue}
        </text>
    </g>
)

export const Marks = ({ data, tooltipFormat, xScale, xValue, yScale, yValue }) =>  data.map(d => (
    <rect
        className="mark"
        key={yValue(d)}
        x={0}
        y={yScale(yValue(d))}
        width={xScale(xValue(d))}
        height={yScale.bandwidth()}
    >
        <title>{tooltipFormat(xValue(d))}</title>
    </rect>
))