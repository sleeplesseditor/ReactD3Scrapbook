import * as React from 'react';
import { cluster, extent, hierarchy, scaleSqrt, select, zoom } from 'd3';
import { project, useData } from './RadialTreeHelpers';
import './RadialTree.scss';

const width = 960;
const height = 940;

const RadialTree = () => {
    const treeData = useData();
    const svgRef = React.useRef();

    const clusters = React.useMemo(() => 
        cluster().size([Math.PI, width / 2 - 100])
    , [])

    const fontSize = React.useMemo(() =>
        scaleSqrt().range([30, 4])
    , [])

    const svg = select(svgRef.current);
    const zoomG = svg
        .attr('width', width)
        .attr('height', height)
        .append('g')

    svg.call(zoom().on('zoom', (event) => {
      zoomG.attr('transform', event.transform);
    }));

    const dataFetch = () => {
        if(treeData) {
            const root = hierarchy(treeData);
            clusters(root)
            var descendants = root.descendants();
            fontSize.domain(extent(descendants, function (d){ return d.depth; }))

            var link = zoomG.selectAll(".link")
                .data(descendants.slice(1))
                .enter().append("path")
                    .attr("class", "link")
                    .attr("d", function(d) {
                    if(d.parent === descendants[0]){
                        return "M" + project(height, d.x, d.y, width)
                        + " " + project(height, d.parent.x, d.parent.y, width);
                        } else {
                            return "M" + project(height, d.x, d.y, width)
                            + "C" + project(height, d.x, (d.y + d.parent.y) / 2, width)
                            + " " + project(height, d.parent.x, (d.y + d.parent.y) / 2, width)
                            + " " + project(height, d.parent.x, d.parent.y, width);
                        }
                    });

            var node = zoomG.selectAll(".node")
                .data(descendants)
                .enter().append("g")
                .attr("transform", function(d) {
                    return "translate(" + project(height, d.x, d.y, width) + ")";
                });

                node.append("text")
                .text(function (d){
                  return d.data.data.id;
                })
                .attr("font-size", function (d){
                  return fontSize(d.depth) + "pt";
                })
                .attr("transform", function(d) {
                  var theta = -d.x / Math.PI * 180;
                  if(d.x > Math.PI / 2){
                    theta += 180;
                  }
                  if(d.depth !== 3 && Math.abs(theta) < 40){
                    theta = 0;
                  }
                  if(d.depth > 1){
                    return "rotate(" + theta + ")";
                  } else {
                    return "";
                  }
                })
                .attr("text-anchor", function (d){
                  if(d.depth === 3){
                    return (d.x > Math.PI / 2) ? "end" : "start";
                  } else {
                    return "middle";
                  }
                })
                .attr("dx", function (d){
                  if(d.depth === 3){
                    return (d.x > Math.PI / 2) ? "-2px" : "2px";
                  } else {
                    return "0px";
                  }
                })
                .classed("glow", function (d){
                  return d.depth !== 3;
                })
                .attr("alignment-baseline", "central");
        }
    }

    React.useEffect(() => {
        dataFetch()
    }, [treeData])

    return (
        <div className="main-container">
            <svg className="svg-container" ref={svgRef} width={width} height={height} />
        </div>
    )
};

export default RadialTree;