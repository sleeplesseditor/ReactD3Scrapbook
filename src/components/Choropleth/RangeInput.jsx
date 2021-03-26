import * as React from 'react';
import { timeFormat, scaleTime, timeYear } from 'd3';
import './RangeInput.scss';

const xAxisTickFormat = timeFormat("%Y");

const x = scaleTime()
    .domain([new Date(1990, 0, 1, 0), new Date(2017, 0, 1, 0)])
    .range([0, 500]);

const RangeInput = ({ currentYear, defaultValue, min, max, setCurrentYear }) => {
    const getValue = (e) => {
        setCurrentYear(e.target.value);
    }

    React.useEffect(() => {
        const slider = document.getElementById("range");
        slider.addEventListener("input", getValue);
    }, [])

    const AxisBottom = ({ xScale, innerHeight, tickFormat }) =>
    xScale.ticks(timeYear).map(tickValue => (
        <g
            className="tick"
            key={tickValue}
            transform={`translate(${xScale(tickValue) + 20}, 20)`}
        >
            <line y2={innerHeight / 10} />
            <text style={{ textAnchor: 'start', fontSize: 7, transform: 'rotate(45deg)', transformOrigin: 'left' }} dy=".71em" y={innerHeight / 9}>
                {tickFormat(tickValue)}
            </text>
        </g>
    ));


    return(
        <div id="range">
            <div id="current-year">
                <h3>{currentYear}</h3>
            </div>
            <svg id="svg">
                <line style={{ stroke: 'black' }} x1={20} x2={520} y1={40} y2={40} />
                <AxisBottom
                    innerHeight={390}
                    tickFormat={xAxisTickFormat}
                    xScale={x}
                />
            </svg>
            <input
                aria-label="range-input"
                type="range"
                min={min}
                max={max}
                step="1"
                defaultValue={defaultValue}
                id="range-input"
            >
            </input>
        </div>
    )
}

export default RangeInput;