import * as React from 'react';
import { useData } from './useData';
import { Marks } from './GlobeHelpers';
import './Globe.scss';

const width = 960;
const height = 500;

const Globe = () => {
    const data = useData();

    if(!data) {
        return <pre>Loading...</pre>
    }

    return (
        <div className="main-container">
            <svg width={width} height={height}>
                <Marks data={data} />
            </svg>
        </div>
    )
};

export default Globe;
