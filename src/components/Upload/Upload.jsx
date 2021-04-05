import * as React from 'react';
import CSVReader from 'react-csv-reader';
import { CSVPieChart, CSVTable } from './UploadHelpers';
import './upload.scss';

const partyColours = ["#0087DC", "#DC241f", "#FDBB30", "#D46A4C", "#FFFF00", "#326760", "#008142", "##528D6B", "#CCC"];

const Upload = () => {
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [yearDisplay, setYearDisplay] = React.useState(null);

    const handleLoad = (data, fileInfo) => {
        setSelectedFile(data)
        setYearDisplay(fileInfo.name.substring(2, 6))
    };

    const parsingOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };

    return (
        <div className="main-container">
            <CSVReader
                cssClass="react-csv-input"
                onFileLoaded={handleLoad}
                parserOptions={parsingOptions}
            />
            <p>Select a CSV file from the data folder</p>
            {selectedFile ? (
                <div className="viz-container">
                    <div className="data-container">
                        <CSVTable 
                            data={selectedFile}
                        />
                        <CSVPieChart
                            arcValue="political_party"
                            coloursArr={partyColours}
                            data={selectedFile}
                            height={500}
                            id="svg-container"
                            labelHeight={18}
                            pieValue="percentage_of_vote"
                            width={860}
                        />
                    </div>
                    <h4>UK General Election {yearDisplay} Votes</h4>
                </div>
            ) : null}
        </div>
    )
}

export default Upload;