import * as React from 'react';
import { 
    select,
    forceCenter,
    forceCollide,
    forceSimulation,
    forceManyBody,
    forceLink,
    forceX,
    forceY,
    drag,
    json
} from 'd3';
import { useData } from './useData';

const jsonUrl = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';
const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const Organization = () => {
    let chartData;

    React.useEffect(() => {
        json(jsonUrl).then(res => {
            chartData = res.data;
        });
    }, [])

    if(!chartData) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    const chart = document.getElementById('#chart');

    const simulation = forceSimulation()
        .force('link', forceLink())
        .force('charge', forceManyBody())
        .force('collide', forceCollide())
        .force('center', forceCenter(width / 2, height / 2))
        .force("y", forceY(0))
        .force("x", forceX(0));

    //Drag functions
    const dragStart = (d, event) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    };

    const drag = (d, event) => {
        d.fx = event.x;
        d.fy = event.y;
    };

    const dragEnd = (d, event) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    const link = chart.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(chartData.links).enter()
        .append('line');

    const node = select('.chartContainer')
          .selectAll('div')
          .data(chartData.nodes).enter()
          .append('div')
          .attr('class', d => {return 'flag flag-' + d.code;})
          .call(drag()
             .on('start', dragStart)
             .on('drag', drag)
             .on('end', dragEnd))
        //   .on('mouseover',d => {
        //     tooltip.html(d.country)
        //       .style('left', d3.event.pageX + 5 +'px')
        //       .style('top', d3.event.pageY + 5 + 'px')
        //       .style('opacity', .9);
        //   }).on('mouseout', () => {
        //     tooltip.style('opacity', 0)
        //       .style('left', '0px')
        //       .style('top', '0px');
        //   });

    const ticked = () => {
        link
            .attr("x1", d => { return d.source.x; })
            .attr("y1", d => { return d.source.y; })
            .attr("x2", d => { return d.target.x; })
            .attr("y2", d => { return d.target.y; });
        node
            .attr("style", d => { 
              return 'left: ' + d.x + 'px; top: ' + (d.y + 72) + 'px'; 
            });
        };

    return (
        <div className="main-container">
            {console.log('DATA', chartData)}
            <div className="chartContainer">
                <svg id="chart" className="chart" width={width} height={height}>
                    <g className="links">
                        {chartData.map()}
                    </g>
                </svg>
            </div>
        </div>
    )
};

export default Organization;

        
//         //Creating tooltip
//         const tooltip = d3.select('.container')
//           .append('div')
//           .attr('class', 'tooltip')
//           .html('Tooltip');
        
//         //Setting location when ticked
//         const ticked = () => {
//           link
//             .attr("x1", d => { return d.source.x; })
//             .attr("y1", d => { return d.source.y; })
//             .attr("x2", d => { return d.target.x; })
//             .attr("y2", d => { return d.target.y; });
  
//         node
//             .attr("style", d => { 
//               return 'left: ' + d.x + 'px; top: ' + (d.y + 72) + 'px'; 
//             });
//         };
        
//         //Starting simulation
//         simulation.nodes(data.nodes)
//           .on('tick', ticked);
        
//         simulation.force('link')
//           .links(data.links);
      
//       });
//     }
    
//     render() {
//       return (
//         <div className='container'>
//           <h1>National Contiguity</h1>
//           <div className='chartContainer'>
//             <svg className='chart'>
//             </svg>
//           </div>
//         </div>
//       ); 
//     }
//   }