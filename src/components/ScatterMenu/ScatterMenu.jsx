import * as React from 'react';
import { extent, format, scaleLinear, scaleOrdinal } from 'd3';
import { useData } from './useData';
import { AxisBottom, AxisLeft, ColourLegend, Marks } from './ScatterMenuHelpers';
import { Dropdown } from '../Dropdown/Dropdown';
import './ScatterMenu.scss';

const width = 960;
const menuHeight = 75;
const height = 500 - menuHeight;
const margin = {
    top: 20,
    right: 200,
    bottom: 65,
    left: 90
}
const fadeOpacity = 0.2;
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;
const siFormat = format('.2s');
const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

const attributes = [
    { value: 'sepal_length', label: 'Sepal Length' },
    { value: 'sepal_width', label: 'Sepal Width' },
    { value: 'petal_length', label: 'Petal Length' },
    { value: 'petal_width', label: 'Petal Width' },
    { value: 'species', label: 'Species' }
];

const getLabel = (value) => {
    for(let i = 0; i < attributes.length; i++) {
        if (attributes[i].value === value) {
            return attributes[i].label;
        }
    }
}

const ScatterMenu = () => {
    const data = useData();
    const [hoveredValue, setHoveredValue] = React.useState(null);

    const initialXAttribute = 'sepal_length';
    const xValue = d => d[xAttribute];
    const [xAttribute, setXAttribute] = React.useState(initialXAttribute);
    const xAxisLabel = getLabel(xAttribute);

    const initialYAttribute = 'sepal_width';
    const yValue = d => d[yAttribute];
    const [yAttribute, setYAttribute] = React.useState(initialYAttribute);
    const yAxisLabel = getLabel(yAttribute);

    const colourValue = d => d.species;
    const circleRadius = 7;
    const colourLegendLabel = 'Species';

    if(!data) {
        return <pre>Loading...</pre>
    }

    const filteredData = data.filter(d => hoveredValue === colourValue(d));

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xScale = scaleLinear()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([0, innerHeight]);

    const colourScale = scaleOrdinal()
        .domain(data.map(colourValue))
        .range(['#E6842A', '#137B80', '#8E6C8A']);

    return (
        <div className="main-container">
            <div className="menu-container">
                <label for="x-select">X:</label>
                <Dropdown id="x-select" options={attributes} selectedValue={xAttribute} onSelectedValueChange={setXAttribute} />
                <label for="y-select">Y:</label>
                <Dropdown id="y-select" options={attributes} selectedValue={yAttribute} onSelectedValueChange={setYAttribute} />
            </div>
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
                    <g className="legend" transform={`translate(${innerWidth + 50}, 60)`}>
                        <text
                            className="axis-label"
                            textAnchor="middle"
                            x={35}
                            y={-25}
                        >
                            {colourLegendLabel}
                        </text>
                        <ColourLegend
                            colourScale={colourScale}
                            fadeOpacity={fadeOpacity}
                            hoveredValue={hoveredValue}
                            onHover={setHoveredValue}
                            tickSpacing={22}
                            tickSize={circleRadius}
                            tickTextOffset={12}
                        />
                    </g>
                    <g opacity={hoveredValue ? fadeOpacity : 1}>
                        <Marks
                            circleRadius={circleRadius}
                            colourScale={colourScale}
                            colourValue={colourValue}
                            data={data}
                            tooltipFormat={xAxisTickFormat}
                            xScale={xScale}
                            yScale={yScale}
                            xValue={xValue}
                            yValue={yValue} 
                        />
                    </g>  
                    <Marks
                        circleRadius={circleRadius}
                        colourScale={colourScale}
                        colourValue={colourValue}
                        data={filteredData}
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

export default ScatterMenu;
