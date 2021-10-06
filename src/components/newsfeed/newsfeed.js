import React, {useCallback, useEffect, useState} from "react";
import Graph from "../graph/graph";
import styled from "styled-components";
import axios from "axios";

const NewsFeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

const Name = styled.h1`
    font-size: 4vw;
    margin: 0;
`
const Price = styled.h1`
    font-size: 1.8vw;
    margin: 0;
`
const Change = styled.p`
    font-size: 1.2vw;
    margin: 0;
`

const TOKEN = "c5bgn0qad3ifmvj0jthg"
const BASE_URL = "https://finnhub.io/api/v1/quote"



const NewsFeed = (props) => {


    const [price, setPrice] = useState("")
    const [change, setChange] = useState("")
    const [color, setColor] = useState("white");

    const getData = useCallback(() => {
        return axios
        .get(`${BASE_URL}?symbol=${props.name}&token=${TOKEN}`)
        .catch((error) => {
            console.error("Error", error.message);
        })
    }, [props.name])

    useEffect(() => {
        getData().then((res) => {
            setChange(res.data.dp)
            setPrice(res.data.c)
            if(res.data.o > res.data.c){
                setColor("#ff3333")
            } else {
                setColor("#00cc00")
            }
        })
    }, [getData])


    return(
        <NewsFeedContainer>
                <Name>{props.name}</Name>
                <Price style={{color: color}}>{price.toString().substring(0,6)}$</Price>
                <Change style={{color: color}}>{change.toString().substring(0,5)}%</Change>
                <Graph name={props.name} />
        </NewsFeedContainer>
    )
}

export default NewsFeed;