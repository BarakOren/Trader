import './App.css';
import React, {useState} from "react";
import Header from './components/header/header';
import NewsFeed from './components/newsfeed/newsfeed';
import Stats from './components/stats/stats';
import styled from "styled-components";
import Line from "./components/line/line";

const Main = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const Scnd = styled.div`
width: 100vw;
margin-top: 5vh;
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: flex-start;
`

function App() {
  const [name, setName] = useState("AAPL")
  return (
    <div className="App">
        <Header />
        <Main>
        <Line />
          <Scnd>
          <NewsFeed name={name}/>
          <Stats setName={setName}/>
          </Scnd>
        </Main>
      </div>
  );
}

export default App;
