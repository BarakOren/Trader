import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {db} from "../../firebase";

const BuyWindowContainer = styled.div`
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.500);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const BuySection = styled.div`
    z-index: 3;
    position: relative;
    min-width: 30vw;
    height: 20vh;
    background-color: #1E2023;
    border: 1px solid grey;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const X = styled.p`
    font-size: 1.5vw;
    margin: 0;
    z-index: 1;
    position: absolute;
    left: 2%;
    top: 0%;
    cursor: pointer;
`

const First = styled.div`
    text-align: center;
    width: 100%;
    margin-top: 1vh;
    
`

const P = styled.p`
    margin: 0;
`
const Second = styled.div`
    margin-right: 1vw;
    width: 100%;    
    /* margin: 0; */
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`

const Input = styled.input`
    height: 2vh;
    width: 10vw;
    margin: 0;
    color: white;
    padding: 3px 5px;
    background-color: #1E2023;
    border: solid 1px white;
    border-radius: 5px;

`
const Button = styled.button`
    width: 100%;
    height: 30px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:active{
        transform: scale(0.98);
        transition: scale 300ms;
        }
`

const Message = styled.p`
    position: absolute;
    bottom: 5%;
    right: 3%;
    font-size: 1vw;

`


const BuyWindow = (props) => {
    const URL = `https://finnhub.io/api/v1/stock/profile2?symbol=${props.name}&token=c5bgn0qad3ifmvj0jthg`

    const getData = useCallback(() => {
        return axios
        .get(URL)
        .catch((error) => {
            console.error("Error", error.message);
        })
    }, [URL])  
    


    const [data, setData] = useState("");
    const [shares, setShares] = useState("")
    const [amount, setAmount] = useState("0");
    const [message, setMessage] = useState(false);

    useEffect(() => {
        setShares(props.shares);
        getData().then((res) => {
            setData(res.data);
        })
    }, [getData, props.shares])

    function buyStock(){
        db.collection("myStocks")
        .where("ticker", "==", props.name)
        .get()
        .then((querySnapshot) => {
            if(!querySnapshot.empty){ 
            querySnapshot.forEach(function(doc){
                db.collection("myStocks")
                .doc(doc.id)
                .update({
                    shares: doc.data().shares + amount
                })
                setShares(doc.data().shares + amount)
            })} else {
                db.collection("myStocks")
                .add({
                    ticker: props.name,
                    shares: amount,
                    entryPrice: props.price
                })
                setShares(amount);
            }

        })
        setTimeout(() => {
            props.setWindow(false);
            props.setToggle(true);
        }, 1000);
    }


    function sellStock(){
        db.collection("myStocks")
        .where("ticker", "==", props.name)
        .get()
        .then((querySnapshot) => {
            if(!querySnapshot.empty){
            querySnapshot.forEach(function(doc){
                db.collection("myStocks")
                .doc(doc.id)
                .update({
                    shares: (doc.data().shares - amount) >= 0 ? (doc.data().shares - amount) : 0
                })
                setShares((doc.data().shares - amount) >= 0 ? (doc.data().shares - amount) : 0)
            })} else {
                setMessage(true)
            }
        })
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
        setTimeout(() => {
            props.setWindow(false);
            props.setToggle(true);
        }, 1000);
    }



    return(
        <BuyWindowContainer>
            <BuySection>
                <X onClick={() => props.setWindow(false)}>x</X>
                <First>
                <P style={{marginBottom: "3px"}}>{data.name}</P>
                <P style={{fontSize: "1vw", color: "grey"}}>{props.name}</P>
                </First>
                <Second>
                <div>
                <P style={{marginBottom: "1vh"}}>{props.price}$</P>
                <Input 
                placeholder="shares" 
                type="number"
                onChange={e => setAmount(parseInt(e.target.value))}                
                ></Input>
                {
                    props.fromMyStocks ? 
                    <P style={{fontSize: "1.1vw", color: "grey"}}>{shares ? (`current shares: ${shares}` ) : ""}</P>
                    :
                    ""
                }
                </div>
                <div style={{
                    display: "flex",
                    height: "100%",
                    width: "20%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "1vw"
                }}>
                <Button
                style={{backgroundColor: props.button === "buy" ? "#00cc00" : "#ff3333"}}
                onClick={props.button === "buy" ? () => buyStock() : () => sellStock()}
                >{props.button}</Button>
                </div>
                {
                    message ?
                    <Message>Shorting Stocks Is Not Available</Message>
                    :
                    ""
                }
                </Second>
                
            </BuySection>
        </BuyWindowContainer>
    )
}

export default BuyWindow;