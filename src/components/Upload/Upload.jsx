import * as React from 'react';
import * as d3 from 'd3';
import CSVReader from 'react-csv-reader';
import './upload.scss';

function toCamel(string){
    return string.replace(/(?:_| |\b)(\w)/g, function($1){return $1.toUpperCase().replace('_',' ');});
}

const Upload = () => {
    const [selectedFile, setSelectedFile] = React.useState(null);
	const [isFilePicked, setIsFilePicked] = React.useState(false);

    const handleLoad = (data) => {
        setSelectedFile(data)
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
            .attr("class", "row")
            .selectAll("td")
            .data(function(d) { return keys.map(function(key) { return d[key] }) ; })
            .enter().append("td")
                .text(function(d) { return d; });
      }

    React.useEffect(() => {
        if(isFilePicked) {
            create_table(selectedFile)
        }
    }, [isFilePicked]);

    return (
        <div className="main-container">
            <CSVReader
                cssClass="react-csv-input"
                label="Select CSV File"
                onFileLoaded={handleLoad}
                parserOptions={parsingOptions}
            />
            {isFilePicked ? (
                <div className="data-container">
                    <table id="table"></table>
                </div>
            ) : null}
        </div>
    )
}

export default Upload;