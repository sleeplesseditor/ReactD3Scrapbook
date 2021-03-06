import * as React from 'react';
import * as d3 from 'd3';

function toCamel(string){
    return string.replace(/(?:_| |\b)(\w)/g, function($1){return $1.toUpperCase().replace('_',' ');});
}

const CSVPieChart = ({ arcValue, coloursArr, data, id, height, labelHeight, pieValue, width }) => {
    const radius = Math.min(width, height) / 2;
  
    const color = d3.scaleOrdinal()
        .range(coloursArr);
  
    const arc = d3.arc()
        .outerRadius(radius - 80)
        .innerRadius(0);
  
    const pie = d3.pie()
        .sort(null)
        .value(function(d) { return d[pieValue]; });

    d3.select('#svg-container').select('svg').remove();
  
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
            return color(d.data[arcValue]);
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
        .attr('fill', d => color(d.data[arcValue]))
        .attr('stroke', 'grey')
        .on('mouseover', function(d, i) {
            d3.select('#arc_' + i.index)
                .style("opacity", 1)
                .style("transform", "scale(1.1)");
            d3.select('tr.row' + i.index)
                .style("background", "gray")
                .style('color', 'white');
        })
        .on('mouseout', function(d, i) {
            d3.selectAll("path")
                .style("opacity", 0.7)
                .style("transform", "scale(1)");
            d3.select('tr.row' + i.index)
                .style("background", "none")
                .style('color', 'black');
        })
        .style('stroke-width', '1px')
        .style('opacity', 0.7);

    legend
        .selectAll(null)
        .data(pie(data))
        .enter()
        .append('text')
        .text(d => d.data[arcValue])
        .attr('x', labelHeight * 1.5)
        .attr('y', (d, i) => labelHeight * i * 1.79 + labelHeight)
        .style('font-family', 'sans-serif')
        .style('font-size', `${labelHeight}px`);
    
    return (
        <div id={id}>
        </div>
    )
}

const CSVTable = ({ data }) => {
    const keys = Object.keys(data[0]);

    d3.select("#table")
        .html("")
        .append("tr")
        .attr("class", "fixed")
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

    return (
        <table id="table"></table>
    )
}


export { 
    CSVPieChart,
    CSVTable
}