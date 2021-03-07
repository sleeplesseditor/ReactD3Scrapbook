import * as React from 'react';
import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';

const BarChart = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        csv(csvUrl).then(setData)
    }, []);

    if(!data) {
        return <pre>Loading...</pre>
    }

    return (
        <div>

        </div>
    )
};

export default BarChart;