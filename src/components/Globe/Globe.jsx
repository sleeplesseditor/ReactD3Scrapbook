import * as React from 'react';
import { useData } from './useData';
import { Marks } from './GlobeHelpers';
import './Globe.scss';

import {Stage} from '../helpers/Stage';
import {ZoomContainer} from '../helpers/zoomContainer';

const width = 960;
const height = 500;

const Globe = () => {
    const data = useData();

    if(!data) {
        return <pre>Loading...</pre>
    }

    return (
        <div className="main-container">
            <Stage width={width} height={height}>
                <ZoomContainer>
                    <Marks data={data} />
                </ZoomContainer>
            </Stage>
        </div>
    )
};

export default Globe;
