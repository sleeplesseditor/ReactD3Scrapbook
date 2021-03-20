import * as React from 'react';
import {
    scaleLinear,
    scaleTime,
    max,
    timeFormat,
    extent,
    histogram as bin,
    timeMonths,
    sum
  } from 'd3';
  import { AxisLeft, AxisBottom, Marks } from './MultipleViewHelpers';
  import { useData } from './useData';
  import './MultipleView.scss';
  
  const width = 960;
  const height = 500;
  const margin = { top: 20, right: 50, bottom: 65, left: 90 };
  const xAxisLabelOffset = 54;
  const yAxisLabelOffset = 50;
  
const MultipleViews = () => {
    const data = useData();
  
    if (!data) {
      return <pre></pre>;
    }
  
    const xValue = d => d['Reported Date'];
    const xAxisLabel = 'Time';
  
    const yValue = d => d['Total Dead and Missing'];
    const yAxisLabel = 'Total Dead and Missing';
  
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
  
    const xAxisTickFormat = timeFormat('%m/%d/%Y');
  
    const xScale = scaleTime()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
      .nice();
  
    const [start, stop] = xScale.domain();
  
    const binnedData = bin()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(timeMonths(start, stop))(data)
      .map(array => ({
        y: sum(array, yValue),
        x0: array.x0,
        x1: array.x1
      }));
  
    const yScale = scaleLinear()
      .domain([0, max(binnedData, d => d.y)])
      .range([innerHeight, 0]);
  
    return (
        <div className="main-container">
            <svg width={width} height={height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                <AxisBottom
                    xScale={xScale}
                    innerHeight={innerHeight}
                    tickFormat={xAxisTickFormat}
                    tickOffset={15}
                />
                <text
                    className="axis-label"
                    textAnchor="middle"
                    transform={`translate(${-yAxisLabelOffset},${innerHeight /
                    2}) rotate(-90)`}
                >
                    {yAxisLabel}
                </text>
                <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
                <text
                    className="axis-label"
                    x={innerWidth / 2}
                    y={innerHeight + xAxisLabelOffset}
                    textAnchor="middle"
                >
                    {xAxisLabel}
                </text>
                <Marks
                    data={binnedData}
                    xScale={xScale}
                    yScale={yScale}
                    tooltipFormat={d => d}
                    innerHeight={innerHeight}
                />
                </g>
            </svg>
        </div>
    );
};

export default MultipleViews;