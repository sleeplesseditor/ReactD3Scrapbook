import {
    select,
    json,
    tree,
    hierarchy,
    linkHorizontal,
    zoom,
    event
} from 'd3';

const project = (height, theta, r, width) => {
    theta += Math.PI/2;
    return [
        width / 2 + r * Math.sin(theta),
        height / 2 + r * Math.cos(theta) + 4
    ]
}

export {
    project
}