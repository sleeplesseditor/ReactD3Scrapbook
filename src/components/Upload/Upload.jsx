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


const create_chart = (data) => {
    const width = 860;
    const height = 500;
    const radius = Math.min(width, height) / 2;
    const labelHeight = 18;
  
    const color = d3.scaleOrdinal()
        .range(["#0087DC", "#DC241f", "#FDBB30", "#D46A4C", "#FFFF00", "#326760", "#008142", "##528D6B", "#CCC"]);
  
    const arc = d3.arc()
        .outerRadius(radius - 80)
        .innerRadius(0);
  
    const pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.percentage_of_vote; });
  
    const svg = d3.select("#svg-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 3 + "," + height / 1.95 + ")");
  
    const g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");
  
    g.append("path")
        .attr("d", arc)
        .attr('stroke', 'black')
        .attr("fill", function(d) {
            return color(d.data.political_party);
        })
        .attr('id', function(d, i) {
            return 'arc_' + i
        })
        .style('opacity', 0.7);
  
    const legend = svg
        .append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${radius - 30}, -130)`);
  
    legend
        .selectAll(null)
        .data(pie(data))
        .enter()
        .append('rect')
        .attr('y', (d, i) => labelHeight * i * 1.8)
        .attr('width', labelHeight)
        .attr('height', labelHeight)
        .attr('fill', d => color(d.data.political_party))
        .attr('stroke', 'grey')
        .on('mouseover', function(d, i) {
            d3.select('#arc_' + i.index).style("opacity", 1);
            d3.select('tr.row' + i.index).style("background", "gray").style('color', 'white');
        })
        .on('mouseout', function(d, i) {
            d3.selectAll("path").style("opacity", 0.7);
            d3.select('tr.row' + i.index).style("background", "none").style('color', 'black');
        })
        .style('stroke-width', '1px')
        .style('opacity', 0.7);

    legend
        .selectAll(null)
        .data(pie(data))
        .enter()
        .append('text')
        .text(d => d.data.political_party)
        .attr('x', labelHeight * 1.5)
        .attr('y', (d, i) => labelHeight * i * 1.79 + labelHeight)
        .style('font-family', 'sans-serif')
        .style('font-size', `${labelHeight}px`);
    }

    React.useEffect(() => {
        if(isFilePicked) {
            create_table(selectedFile)
            create_chart(selectedFile)
        }
    }, [isFilePicked, selectedFile]);

    React.useEffect(() => {
        if(selectedFile !== null) {
            d3.select('#svg-container').select('svg').remove();
        }
    }, [selectedFile])

    return (
        <div className="main-container">
            <CSVReader
                cssClass="react-csv-input"
                onFileLoaded={handleLoad}
                parserOptions={parsingOptions}
            />
            <p>Select a CSV file from the data folder</p>
            {isFilePicked ? (
                <div className="viz-container">
                    <div className="data-container">
                        <table id="table"></table>
                        <div id="svg-container"></div>
                    </div>
                    <h4>UK General Election {yearDisplay} Votes</h4>
                </div>
            ) : null}
        </div>
    )
}

export default Upload;