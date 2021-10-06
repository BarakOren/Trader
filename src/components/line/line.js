import React, {useState, useEffect, useCallback} from "react";
import styled from "styled-components"
import axios from "axios";
import {db} from "../../firebase";

const LineContainer = styled.div`
    padding: 0 1vw;
    width: 70vw;
    height: 5vh;
    border: 1px solid grey;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

const First = styled.div`
  width: auto;
  height: 100%;
  margin: 2vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const P = styled.p`
  font-size: 1vw;
  margin: 0 0.2vw;
`

const TOKEN = "c5bgn0qad3ifmvj0jthg"
const BASE_URL = "https://finnhub.io/api/v1/quote"

const Line = () => {

    const [myStocks, setMyStocks] = useState([])
    const [stockData, setStockData] = useState("")


    const getStocksData = useCallback((stock) => {
      return axios
      .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
      .catch((error) => {
          console.error("Error", error.message);
      })
    }, [])  

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
          })
          Promise.all(promises).then(() => {
              setMyStocks(tempData)
          })
      })
    }, [getStocksData]) 
        

    useEffect(() => {
        let tempStocksData = []
        const stocksList = ["AAPL", "MSFT", "TSLA", "FB", "BABA", "UBER", "DIS", "SBUX"];
        getMyStocks();
        let promises = [];
        stocksList.forEach((stock) => {
          promises.push(
            getStocksData(stock)
            .then((res) => {
                tempStocksData.push({
                name: stock,
                ...res.data
              })
            })
          )
        });
    
        Promise.all(promises).then(()=>{
          setStockData(tempStocksData);

        })
      }, [getStocksData, getMyStocks]);

    return(
        <LineContainer>
          <P>Profit/Lost</P>
            {myStocks.map((stock) => {
              var shares = stock.data.shares;
              var currentPrice = stock.info.c;
              var entryPrice = stock.data.entryPrice;
              // var testEntryPrice = 286.19
              var percentageProfite = (currentPrice - entryPrice) / entryPrice * 100
              const profit = ((currentPrice * shares) - (entryPrice * shares)).toString().substring(0,8)
              function sendProfit(){
                // if(profit.length > 4 || profit.length < -4){
                  if(profit > 9999 || profit < -9999){
                  const a = profit.slice(0, 2)
                  const b = profit.slice(2, 7)
                  return `${a},${b}`
                } else {
                  return profit;
                }
              }

              return(
              <First key={stock.data.ticker}>
                    <P>{stock.data.ticker}</P>
                    <P style={{color: profit > 0 ? "green" : "red"}}>{sendProfit()}$</P>
                    <P style={{color: profit > 0 ? "green" : "red"}}>{percentageProfite.toString().substring(0,4)}%</P>
                  </First>      
              )})} 

        </LineContainer>
    )
}

export default Line;