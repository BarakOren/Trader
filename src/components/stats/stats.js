import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import MyStocks from "../Rows/myStocks";
import StockList from "../Rows/stockList";
import {db} from "../../firebase";
import styled from "styled-components";

const TOKEN = "c5bgn0qad3ifmvj0jthg"
const BASE_URL = "https://finnhub.io/api/v1/quote"


const StatsContainer = styled.div`
margin: 20px 0; 
width: 20vw;
flex-direction: column;
background-color: #1E2023;
border-radius: 5px;
border: 1px solid grey;
`

const Changer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
`

const Title = styled.h1`
text-align: center;
font-size: 1.3vw;
padding: 20px 0;
width: 50%;
border-bottom: 1px solid grey;
margin: 0;
cursor: pointer;
`



const Stats = (props) => {

    const [myStocks, setMyStocks] = useState([])
    const [stockData, setStockData] = useState("")

    const getMyStocks = useCallback(() => {
        db.collection("myStocks")
        .onSnapshot(snapshot => {
            let promises = [];
            let tempData = [];
            snapshot.docs.forEach((doc) => {
                promises.push(getStocksData(doc.data().ticker)
                .then(res => {
                    tempData.push({
                        id: doc.id,
                        data: doc.data(),
                        info: res.data
                    })
                })
                )
                db.collection("myStocks")
                .where("shares", "<=", 0)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach(function(doc){
                        db.collection("myStocks")
                        .doc(doc.id)
                        .delete()
                    })
                })
            })
            Promise.all(promises).then(() => {
                setMyStocks(tempData)
            }) 
        })
    }, []
    )
    
    const getStocksData = (stock) => {
        return axios
        .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
        .catch((error) => {
            console.error("Error", error.message);
        })
    }

    useEffect(() => {
        let tempStocksData = []
        const stocksList = ["AAPL", "NVDA", "MSFT", "TSLA", "MRNA", "FB", "BABA", "UBER", "DIS", "SBUX"];
        getMyStocks();
        let promises = [];
        stocksList.map((stock) => {
          promises.push(
            getStocksData(stock)
            .then((res) => {
                tempStocksData.push({
                name: stock,
                ...res.data
              });
            })
          )
          return null
        });
    
        Promise.all(promises).then(()=>{
          setStockData(tempStocksData);
        })
      }, [getMyStocks]);
    

    const [toggle, setToggle] = useState(true);      
      
    return(
        <StatsContainer>
            <Changer>
            <Title onClick={() => setToggle(true)} style={{borderRight: "0.5px solid grey", backgroundColor: toggle ? "#1E2023" : "#0d0d0d"}}>My Stocks</Title>
            <Title onClick={() => setToggle(false)} style={{borderLeft: "0.5px solid grey", backgroundColor: toggle ? "#0d0d0d" : "#1E2023"}}>Watch List</Title>
            </Changer>

            {toggle ? 
            <div>
            {myStocks.map((stock) => (
                    <MyStocks
                        setToggle={setToggle}
                        setName={props.setName}
                        key={stock.data.ticker}
                        name={stock.data.ticker}
                        change={stock.info.dp}
                        prevDay={stock.info.o}
                        shares={stock.data.shares}
                        price={stock.info.c}
                    />
                    ))} 
            </div>
            :
            <div>
            {stockData.map((stock) => (
                    <StockList
                        setName={props.setName}
                        setToggle={setToggle}
                        key={stock.name}
                        name={stock.name}
                        openPrice={stock.o}
                        price={stock.c}
                        change={stock.dp}
                        prevDay={stock.o}
                    />
                    ))}
            </div>
            }
                 
            </StatsContainer>
    )
}

export default Stats;