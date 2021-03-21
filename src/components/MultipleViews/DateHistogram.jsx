import * as React from 'react';
import {
    scaleLinear,
    scaleTime,
    max,
    timeFormat,
    extent,
    histogram as bin,
    timeMonths,
    sum,
    brushX,
    select,
    event
  } from 'd3';
import { AxisLeft, AxisBottom, Marks } from './MultipleViewHelpers';

const margin = { top: 0, right: 30, bottom:30, left: 30 };
const xAxisLabelOffset = 24;
const yAxisLabelOffset = 40;

export const DateHistogram = ({ data, height, setBrushExtent, width, xValue }) => {
  const brushRef = React.useRef();

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

  React.useEffect(() => {
    const brush = brushX()
      .extent([[0, 0], [innerWidth, innerHeight]])
    brush(select(brushRef.current))
    brush.on('brush end', function(event) {
      setBrushExtent(event.selection && event.selection.map(xScale.invert));
    })
  }, [innerWidth, innerHeight])

  return (
    <>
      <rect height={height} width={width} fill="white" />
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
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
        <g ref={brushRef} />
      </g> 
    </>
  )
}
