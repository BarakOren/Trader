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
width: 4vw;
cursor: pointer;
    &:active{
        transform: scale(0.98);
        transition: scale 300ms;
            }
`

const Other = styled.p`
font-size: 1.1vw;
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
margin: 3px;
cursor: pointer;
    &:active{
        transform: scale(0.98);
        transition: scale 300ms;
            }
`


const MyStocks = (props) => {    
  
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
            style={{margin: 0}}>{props.name ? props.name : "lezo"}</Name>
          <Other style={{margin: 0, fontSize: "0.8vw"}}>
              {props.shares && (props.shares + " Shares")}</Other>
            </FirstContainer>
            <ScnContainer>
                <Button onClick={() => openBuyWindow("buy")} style={{backgroundColor: "#00cc00"}}>buy</Button>
                <Button onClick={() => openBuyWindow("sell")} style={{backgroundColor: "#ff3333"}}>sell</Button>
            </ScnContainer>
            <Other >{props.price.toString().substring(0,6)}$</Other>
          <Other style={{color: props.change < 0 ? "#ff3333" : "#00cc00"}} >{props.change.toString().substring(0,4)}%</Other>
            {
                window ? 
                <BuyWindow
                fromMyStocks={true}
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

export default MyStocks;