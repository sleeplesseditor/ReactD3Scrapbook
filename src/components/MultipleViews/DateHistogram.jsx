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
    select
  } from 'd3';
import { AxisLeft, AxisBottom, Marks } from './MultipleViewHelpers';

const margin = { top: 0, right: 30, bottom:30, left: 30 };
const xAxisLabelOffset = 24;
const yAxisLabelOffset = 40;
const xAxisTickFormat = timeFormat('%m/%d/%Y');
const xAxisLabel = 'Time';
const yValue = d => d.total;
const yAxisLabel = 'Total Dead and Missing';

export const DateHistogram = ({ data, height, setBrushExtent, width, xValue }) => {
  const brushRef = React.useRef();

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = React.useMemo(() => scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice(), [data, innerWidth, xValue]);

  const binnedData = React.useMemo(() => {
    const [start, stop] = xScale.domain();

    return bin()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(timeMonths(start, stop))(data)
      .map(array => ({
        y: sum(array, yValue),
        x0: array.x0,
        x1: array.x1
      }));
   }, [data, xScale, xValue, yValue]);

  const yScale = React.useMemo(() => scaleLinear()
    .domain([0, max(binnedData, d => d.y)])
    .range([innerHeight, 0]),
    [binnedData, innerHeight]
  );

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
