import * as React from 'react';
import { cluster, scaleSqrt, event } from 'd3';
import { project } from './RadialTreeHelpers';

const width = 960;
const height = 940;
const margin = {
    top: 20,
    right: 30,
    bottom: 65,
    left: 220
}

const RadialTree = () => {
    const clusters = React.useMemo(() => cluster().size([Math.PI, width / 2 - 100]), [])

    const fontSize = React.useMemo(() =>
        scaleSqrt().range([30, 4])
    , [])

    return (
        <div className="main-container">
            <svg width={width} height={height}>
                <g transform={`translate(${margin.left}, ${margin.top})`, event.transform}>
                    
                </g>
            </svg>
        </div>
    )
};

export default RadialTree;