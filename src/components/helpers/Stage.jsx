import React from 'react';

const Context = React.createContext(null)

export function Stage({ width, height, children }) {
    const svgRef = React.useRef(null)
    const [svg, setSvg] = React.useState(null)
    React.useEffect(() => setSvg(svgRef.current), [])
    return (
        <svg ref={svgRef} width={width} height={height}>
            <Context.Provider value={svg}>{children}</Context.Provider>
        </svg>
    )
}

export function useSvg() {
    return React.useContext(Context)
}