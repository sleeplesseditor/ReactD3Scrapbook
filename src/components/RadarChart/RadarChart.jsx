import * as React from 'react';
import './RadarChart.scss';

const data = [
    { battery: 0.7, design: 1, useful: 0.9, speed: 0.67, weight: 0.8 },
    { battery: 0.6, design: 0.9, useful: 0.8, speed: 0.7, weight: 0.6 },
    { battery: 0.9, design: 0.4, useful: 0.6, speed: 0.9, weight: 0.4 }
];
const chartSize = 600;
const numberOfScales = 4;
const colourArr = ['#edc951', '#eb4d31', '#3188eb']

const scale = value => (
    <circle
        key={`scale-${value}`}
        cx={0}
        cy={0}
        r={((value / numberOfScales) * chartSize) / 2}
        fill="#FAFAFA"
        stroke="#999"
        strokeWidth="0.2"
    />
);

const polarToX = (angle, distance) => Math.cos(angle - Math.PI / 2) * distance;
const polarToY = (angle, distance) => Math.sin(angle - Math.PI / 2) * distance;

const pathDefinition = points => {
    let d = 'M' + points[0][0].toFixed(4) + ',' + points[0][1].toFixed(4);
    for (let i = 1; i < points.length; i++) {
        d += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4);
    }
    return d + 'z';
};

const shape = columns => (chartData, i) => {
    const [hover, setHover] = React.useState(false);
    const data = chartData;
    return (
        <path
            className="radar-shape"
            key={`shape-${i}`}
            d={pathDefinition(
                columns.map(col => {
                    const value = data[col.key];
                    return [
                        polarToX(col.angle, (value * chartSize) / 2),
                        polarToY(col.angle, (value * chartSize) / 2)
                    ];
                })
            )}
            stroke={colourArr[i]}
            fill={colourArr[i]}
            fillOpacity={hover ? ".5" : ".25"}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        />
    );
};

const points = points => {
    return points
        .map(point => point[0].toFixed(4) + ',' + point[1].toFixed(4))
        .join(' ');
};

const axis = () => (col, i) => (
    <polyline
        key={`poly-axis-${i}`}
        points={points([
            [0, 0],
            [polarToX(col.angle, chartSize / 2), polarToY(col.angle, chartSize / 2)]
        ])}
        stroke="#555"
        strokeWidth=".2"
    />
);

const caption = () => col => (
    <text
        key={`caption-of-${col.key}`}
        x={polarToX(col.angle, (chartSize / 2) * 1.15).toFixed(4)}
        y={polarToY(col.angle, (chartSize / 2) * 1.1).toFixed(4)}
        dy={10 * 2}
        dx={-25}
        fill="#444"
        fontWeight="400"
        textShadow="1px 1px 0 #fff"
    >
        {col.key.charAt(0).toUpperCase() + col.key.slice(1)}
    </text>
);

const RadarChart = () => {
    const groups = [];
    const scales = [];
    for (let i = numberOfScales; i > 0; i--) {
        scales.push(scale(i));
    }
    groups.push(<g key={`scales`}>{scales}</g>);

    const middleOfChart = ((chartSize / 2) + 50).toFixed(2);
    const captions = Object.keys(data[0]);
    const columns = captions.map((key, i, all) => {
        return {
            key,
            angle: (Math.PI * 2 * i) / all.length
        };
    });
    groups.push(<g key={`group-axes`}>{columns.map(axis())}</g>);
    groups.push(<g key={`groups}`}>{data.map(shape(columns))}</g>);
    groups.push(<g key={`group-captions`}>{columns.map(caption())}</g>);
    return (
        <div className="main-container">
            <svg
                width={chartSize + 100}
                height={chartSize}
                viewBox={`0 0 ${chartSize + 100} ${chartSize + 100}`}
            >
                <g transform={`translate(${middleOfChart},${middleOfChart})`}>{groups}</g>
            </svg>
        </div>
    );
};

export default RadarChart;