import * as React from 'react';
import { extent, format, scaleLinear } from 'd3';
import { useData } from './useData';
import { AxisBottom, AxisLeft, Marks } from './ScatterChartHelpers';
import './ScatterChart.css';

const width = 960;
const height = 500;
const margin = {
    top: 20,
    right: 30,
    bottom: 65,
    left: 90
}
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;
const siFormat = format('.2s');
const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

const ScatterChart = () => {
    const data = useData();

    if(!data) {
        return <pre>Loading...</pre>
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = d => d.sepal_length;
    const yValue = d => d.sepal_width;
    const xAxisLabel = 'Sepal Length';
    const yAxisLabel = 'Sepal Width';

    const xScale = scaleLinear()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([0, innerHeight]);

    return (
        <div className="main-container">
            <svg width={width} height={height}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <AxisBottom
                        innerHeight={innerHeight}
                        tickFormat={xAxisTickFormat}
                        tickOffset={10}
                        xScale={xScale}
                    />
                    <text
                        className="axis-label"
                        textAnchor="middle"
                        transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}), rotate(-90) `}
                    >
                        {yAxisLabel}
                    </text>
                    <AxisLeft
                        innerWidth={innerWidth}
                        tickOffset={10}
                        yScale={yScale}
                    />
                    <text
                        className="axis-label"
                        x={innerWidth / 2}
                        y={innerHeight + xAxisLabelOffset}
                        textAnchor="middle"
                    >
                        {xAxisLabel}
                    </text>
                    <Marks
                        circleRadius={7}
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

export default ScatterChart;
