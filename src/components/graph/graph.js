import React from "react";
import styled from "styled-components"

const GraphContainer = styled.div`
    width: 50vw;
    height: 20vw;
    margin: 1vw 0;
`
const Iframe = styled.iframe`
    border-radius: 5px;
    width: 100%;
    height: 100%;
    border: 1px solid grey;
`

const Graph = (props) => {
    return(
        <GraphContainer>
        <Iframe src={`https://widget.finnhub.io/widgets/stocks/chart?symbol=${props.name}&watermarkColor=%231db954&backgroundColor=%23222222&textColor=white`}></Iframe>
        </GraphContainer>
    )
}

export default Graph;