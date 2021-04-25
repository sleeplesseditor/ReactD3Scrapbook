import * as React from 'react';
import {
    json,
} from 'd3';

const project = (height, theta, r, width) => {
    theta += Math.PI/2;
    return [
        width / 2 + r * Math.sin(theta),
        height / 2 + r * Math.cos(theta) + 4
    ]
}

const dataUrl = 'https://gist.githubusercontent.com/sleeplesseditor/d0c4c66132ea4f22dc22092b3711fe3c/raw/5ca540453159eaaeed725a759fda29ffa0d3d672/radialCountryData.json';

const useData = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        json(dataUrl).then(res => {
            setData(res)
        })
    }, []);

    return data;
}

export {
    project,
    useData
}
