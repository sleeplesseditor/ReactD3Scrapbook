import * as React from 'react';

import { BubbleMap } from './BubbleMap';
import { DateHistogram } from './DateHistogram';
import { useData, useWorldAtlas } from './useData';
import './MultipleView.scss';
  
const width = 960;
const height = 500;
const dateHistogramSize = 0.3;
const xValue = d => d['Reported Date'];


const MultipleViews = () => {
    const data = useData();
    const worldAtlas = useWorldAtlas();
    const [brushExtent, setBrushExtent] = React.useState();
  
    if (!data || !worldAtlas) {
      return <pre></pre>;
    }

    const filteredData = brushExtent ? data.filter(d =>{
        const date = xValue(d)
        return date > brushExtent[0] && date < brushExtent[1]
    }) : data;
   
    return (
        <div className="main-container">
            <svg width={width} height={height}>
                <BubbleMap
                    data={filteredData}
                    worldAtlas={worldAtlas}
                />
                <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
                    <DateHistogram
                        data={data}
                        height={dateHistogramSize * height}
                        setBrushExtent={setBrushExtent}
                        width={width} xValue={xValue}
                    />
                </g>
            </svg>
        </div>
    );
};

export default MultipleViews;