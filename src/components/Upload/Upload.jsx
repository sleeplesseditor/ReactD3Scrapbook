import * as React from 'react';
import * as d3 from 'd3';
import CSVReader from 'react-csv-reader';
import { CSVPieChart } from './UploadHelpers';
import './upload.scss';

function toCamel(string){
    return string.replace(/(?:_| |\b)(\w)/g, function($1){return $1.toUpperCase().replace('_',' ');});
}

const partyColours = ["#0087DC", "#DC241f", "#FDBB30", "#D46A4C", "#FFFF00", "#326760", "#008142", "##528D6B", "#CCC"];

const Upload = () => {
    const [selectedFile, setSelectedFile] = React.useState(null);
	const [isFilePicked, setIsFilePicked] = React.useState(false);
    const [yearDisplay, setYearDisplay] = React.useState(null);

    const handleLoad = (data, fileInfo) => {
        setSelectedFile(data)
        setYearDisplay(fileInfo.name.substring(2, 6))
        setIsFilePicked(true);
    };

    const parsingOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };

    const create_table = (data) => {
        var keys = Object.keys(data[0]);
      
        d3.select("#table")
            .html("")
            .append("tr")
            .attr("class","fixed")
            .selectAll("th")
            .data(keys)
            .enter().append("th")
            .text(function(d) { return toCamel(d); });
      
        d3.select("#table")
            .selectAll("tr.row")
            .data(data)
            .enter().append("tr")
            .attr('class', function(d, i) {
                return 'row' + i
            })
            .selectAll("td")
            .data(function(d) { return keys.map(function(key) { return d[key] }) ; })
            .enter().append("td")
                .text(function(d) { return d; });
    }

    React.useEffect(() => {
        if(isFilePicked) {
            create_table(selectedFile)
        }
    }, [isFilePicked, selectedFile]);

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
                        <table id="table"></table>
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