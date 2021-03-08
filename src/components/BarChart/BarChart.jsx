import * as React from 'react';
import { format, scaleBand, scaleLinear, max } from 'd3';
import { AxisLeft, AxisBottom, Marks } from './BarChartHelpers';
import { useData } from './useData';
import './BarChart.css';

const width = 960;
const height = 500;
const margin = {
    top: 20,
    right: 30,
    bottom: 65,
    left: 220
}
const xAxisLabelOffset = 50;
const siFormat = format('.2s');
const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

const BarChart = () => {
    const data = useData();

    if(!data) {
        return <pre>Loading...</pre>
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = d => d.Population;
    const yValue = d => d.Country;

    const yScale = scaleBand()
        .domain(data.map(yValue))
        .padding(0.1)
        .range([0, innerHeight]);

    const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth]);

    return (
        <div className="main-container">
            <svg width={width} height={height}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <AxisBottom
                        innerHeight={innerHeight}
                        tickFormat={xAxisTickFormat}
                        xScale={xScale}
                    />
                    <AxisLeft yScale={yScale} />
                    <text
                        className="axis-label"
                        x={innerWidth / 2} y={innerHeight + xAxisLabelOffset}
                        textAnchor="middle"
                    >
                        Population
                    </text>
                    <Marks
                        data={data}
                        tooltipFormat={xAxisTickFormat}
                        xScale={xScale}
                        yScale={yScale}
                        xValue={xValue}
                        yValue={yValue} 
                    />
                </g>
            </svg>
        </div>
    )
};

export default BarChart;