import * as React from 'react';
import { csv, select } from 'd3';
import './upload.scss';

const Upload = () => {
    const [selectedFile, setSelectedFile] = React.useState(null);
	const [isFilePicked, setIsFilePicked] = React.useState(false);

    function create_table(data) {
        // table stats

        csv('./data/ge2010.csv').then(res => { console.log(res) })

        console.log('TABLE', data)

        var tableKeys = Object.keys(selectedFile[0]);

        console.log('tableKeys', tableKeys)

      
        // select("#table")
        //   .html("")
        //   .append("tr")
        //   .attr("class","fixed")
        //   .selectAll("th")
        //   .data(tableKeys)
        //   .enter().append("th")
        //     .text(function(d) { return d; });
      
        // select("#table")
        //   .selectAll("tr.row")
        //     .data(data)
        //   .enter().append("tr")
        //     .attr("class", "row")
        //     .selectAll("td")
        //     .data(function(d) { return tableKeys.map(function(key) { return d[key] }) ; })
        //     .enter().append("td")
        //       .text(function(d) { return d; });
      }
    
    const uploadHandler = (event) => {
        const reader = new FileReader();
        const csvFile = event.target.files[0]
    	reader.readAsText(csvFile)

        reader.onload = function (e) {
            setSelectedFile(e.target.result)
            setIsFilePicked(true);
        }
    }

    React.useEffect(() => {
        if(selectedFile !== null) {
            console.log('HERP')
            create_table(selectedFile)
        }
    }, [selectedFile]);


    return (
        <div className="main-container">
            <input aria-label="file-upload" type="file" id="uploader" accept=".csv" onChange={uploadHandler}/>
            {isFilePicked ? (
                <div className="data-container">
                    <table id="table">
                        <th></th>
                    </table>
                </div>
            ) : null}
        </div>
    )
}

export default Upload;