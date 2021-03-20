import * as React from 'react';

import { BubbleMap } from './BubbleMap';
import { DateHistogram } from './DateHistogram';
import { useData, useWorldAtlas } from './useData';
import './MultipleView.scss';
  
const width = 960;
const height = 500;
const dateHistogramSize = 0.3;

const MultipleViews = () => {
    const data = useData();
    const worldAtlas = useWorldAtlas();
  
    if (!data || !worldAtlas) {
      return <pre></pre>;
    }
   
    return (
        <div className="main-container">
            <svg width={width} height={height}>
                <BubbleMap data={data} worldAtlas={worldAtlas} />
                <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
                    <DateHistogram data={data} height={dateHistogramSize * height} width={width} />
                </g>
            </svg>
        </div>
    );
};

export default MultipleViews;