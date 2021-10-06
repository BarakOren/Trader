import React, {useEffect, useCallback} from "react";
import { createChart, ColorType } from 'lightweight-charts';
import "./graph.css"

const TOKEN = "c5bgn0qad3ifmvj0jthg"
const BASE_URL2 = "https://finnhub.io/api/v1/stock/candle?symbol="

const Graph = () => {

    const [Dstock, setDStock] = useState("AAPL")

    const getLezo = () => {
        return axios
        .get(`${BASE_URL}?symbol=${Dstock}&token=${TOKEN}`)
        .catch((error) => {
            console.error("Error", error.message);
        })
    }


    let lezo = [];
    lezo.push(getLezo().then((res) => {
        console.log(res.data)
    }))


    useEffect(() => {
        init();
      }, []);
      


      const init = useCallback(() => {  
        const chart = createChart(document.getElementById("chart"), {
            localization: {
             priceFormatter: price =>
             '$' + price
             ,
        dateFormat: 'yyyy/MM/dd',
   
    }
  })


  
  const lineSeries = chart.addLineSeries();
  lineSeries.setData([
      { time: '2019-04-11', value: 80.01 },
      { time: '2019-04-12', value: 96.63 },
      { time: '2019-04-13', value: 76.64 },
      { time: '2019-04-14', value: 81.89 },
      { time: '2019-04-15', value: 74.43 },
      { time: '2019-04-16', value: 80.01 },
      { time: '2019-04-17', value: 96.63 },
      { time: '2019-04-18', value: 76.64 },
      { time: '2019-04-19', value: 81.89 },
      { time: '2019-04-20', value: 74.43 },
  ]);
  
  chart.resize(700, 300);
  
  chart.applyOptions({
    layout: {
        background: {
           type: ColorType.Solid, color: '#000000' 
        },
        textColor: 'white',
        fontSize: 12,
        fontFamily: 'Calibri',
    },
  
    grid: {
      vertLines: {
          color: 'grey',
          style: 1,
          visible: true,
      },
      horzLines: {
          color: 'grey',
          style: 1,
          visible: true,
      },
  },
  
    watermark: {
      color: 'rgba(11, 94, 29, 0.4)',
      visible: true,
      text: 'TradingView Watermark Example',
      fontSize: 24,
      horzAlign: 'left',
      vertAlign: 'bottom',
  },
  
  
  });
      
},[])

    return(
        <div id="chart">

        </div>
    )
}

export default Graph;
  
  
  