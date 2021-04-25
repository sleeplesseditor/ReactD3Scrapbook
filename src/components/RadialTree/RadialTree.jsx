import * as React from 'react';
import { cluster, hierarchy, linkHorizontal, scaleSqrt, select, tree, zoom } from 'd3';
import { project, useData } from './RadialTreeHelpers';
import './RadialTree.scss';

const width = 960;
const height = 940;
const margin = {
    top: 20,
    right: 30,
    bottom: 65,
    left: 220
}
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const RadialTree = () => {
    const treeData = useData();

    const clusters = React.useMemo(() => 
        cluster().size([Math.PI, width / 2 - 100])
    , [])

    const fontSize = React.useMemo(() =>
        scaleSqrt().range([30, 4])
    , [])

    const treeLayout = React.useMemo(() => tree().size([innerHeight, innerWidth]), []);

    const svg = select('.svg-container');
    const zoomG = svg
        .attr('width', width)
        .attr('height', height)
        .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.call(zoom().on('zoom', (event) => {
        zoomG.attr('transform', event.transform);
    }));

    const dataFetch = () => {
        if(treeData) {
            const root = hierarchy(treeData);
            clusters(root)
            const links = treeLayout(root).links();
            const linkPathGenerator = linkHorizontal()
                .x(d => d.y)
                .y(d => d.x);
        
            zoomG.selectAll('path').data(links)
                .enter().append('path')
                    .attr('class', 'link')
                    .attr('d', linkPathGenerator);
        
            zoomG.selectAll('text').data(root.descendants())
                .enter().append('text')
                    .attr('x', d => d.y)
                    .attr('y', d => d.x)
                    .attr('dy', '0.32em')
                    .attr('text-anchor', d => d.children ? 'middle' : 'start')
                    .attr('font-size', d => 3.25 - d.depth + 'em')
                    .text(d => d.data.data.id);
        }
    }

    React.useEffect(() => {
        dataFetch()
    }, [treeData])

    return (
        <div className="main-container">
            <svg className="svg-container" width={width} height={height}></svg>
        </div>
    )
};

export default RadialTree;