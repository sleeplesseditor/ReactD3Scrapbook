import * as React from 'react';
import { curveNatural, line } from 'd3';

const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
    yScale.ticks().map(tickValue => (
        <g className="tick" transform={`translate(0,${yScale(tickValue)})`}>
            <line x2={innerWidth} />
            <text
                key={tickValue}
                style={{ textAnchor: 'end' }}
                x={-tickOffset}
                dy=".32em"
            >
            {tickValue}
            </text>
        </g>
    ));

const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
    xScale.ticks().map(tickValue => (
        <g
            className="tick"
            key={tickValue}
            transform={`translate(${xScale(tickValue)},0)`}
        >
            <line y2={innerHeight} />
            <text style={{ textAnchor: 'middle' }} dy=".71em" y={innerHeight + tickOffset}>
                {tickFormat(tickValue)}
            </text>
        </g>
    ));


const Marks = ({
        data,
        xScale,
        yScale,
        xValue,
        yValue,
        tooltipFormat,
        circleRadius
    }) =>
        <g className="marks">
            <path 
                d={line()
                    .x(d => xScale(xValue(d)))
                    .y(d => yScale(yValue(d)))
                    .curve(curveNatural)
                    (data)
                } 
            />
            {/* {data.map(d => (
                <circle
                    cx={xScale(xValue(d))}
                    cy={yScale(yValue(d))}
                    r={circleRadius}
                >
                    <title>{tooltipFormat(xValue(d))}</title>
                </circle>
            ))};  */}
        </g>

export { 
    AxisLeft,
    AxisBottom,
    Marks
}