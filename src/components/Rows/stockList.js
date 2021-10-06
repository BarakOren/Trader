import React, {useState} from "react";

import styled from "styled-components";
import BuyWindow from "../buyWindow/buyWindow";

const RowContainer = styled.div`
display: flex;
justify-content: space-between;
height: auto;
padding: 10px 4%;
align-items: center;
border-bottom: 1px solid grey;
`

const Name = styled.h1`
font-size: 1.5vw;
margin: 0;
cursor: pointer;
    &:active{
        transform: scale(0.98);
        transition: scale 300ms;
    }
`

const Other = styled.p`
font-size: 1.1vw;
margin: 0 10px 0 3px;
min-width: 30%;
`
const FirstContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;   
`

const ScnContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`
const Button = styled.p`
font-size: 1vw;
padding: 0.1vw 1vw;
border-radius: 5px;
margin: 3px 10px 3px 3px;
cursor: pointer;
&:active{
                transform: scale(0.98);
                transition: scale 300ms;
            }
`


const StockList = (props) => {    
  
    const [window, setWindow] = useState(false);
    const [button, setButton] = useState();

    function openBuyWindow(status){
        setWindow(true)
        setButton(status)
    }


    return(
        <RowContainer>
            <FirstContainer>

            <Name
            onClick={() => props.setName(props.name)}
            >{props.name}</Name>
            </FirstContainer>
            <div style={{
                display: "flex",
                flexDirection: "row",
                width: "70%",
                alignItems: "center"
            }}>
            
          {/* <Other style={{margin: 0, fontSize: "0.8vw"}}>
              {props.shares && (props.shares + " Shares")}</Other> */}
            
            <ScnContainer>
                <Button onClick={() => openBuyWindow("buy")} style={{backgroundColor: "#00cc00"}}>buy</Button>
                <Button onClick={() => openBuyWindow("sell")} style={{backgroundColor: "#ff3333"}}>sell</Button>
            </ScnContainer>
          <Other >{props.price.toString().substring(0,6)}$</Other>
          <Other style={{color: props.change < 0 ? "#ff3333" : "#00cc00"}} >{props.change.toString().substring(0,4)}%</Other>
          </div>
            {
                window ? 
                <BuyWindow
                fromMyStocks={false}
                setWindow={setWindow} 
                name={props.name}
                price={props.price}
                shares={props.shares}
                button={button}
                setToggle={props.setToggle}
                />
                :
                ""
            }
      </RowContainer>
    )
}

export default StockList;