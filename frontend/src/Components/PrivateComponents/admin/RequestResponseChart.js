import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetUserGrowth } from "../../../Redux/adminData/action";
import { Card } from "react-bootstrap";
import moment from "moment";


import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "right",
    },
    title: {
      display: true,
      text: "New Response and Request",
      font:{size:20}
    },
   
    },
    scales: {
        x: {
          title: {
            display: true,
            text: "Date",
            font:{size:15}
          },
        },
        y: {
          title: {
            display: true,
           
            
          },
          min: 0,
          ticks: {
            stepSize: 1,
          },
        },
    }
  }


export function RequestResponseChart() {

  const { chart } = useSelector((state) => state.adminRequestStore);
  console.log(chart);
  var labels;
  var dataParsed;

  if (chart&&chart.length>0) {
    labels = chart.map((item) => moment(item.Date).format('YYYY-MM-DD'));
    let cumulativeUser=chart.map((item) => item["Response Count"])

    console.log(cumulativeUser)
    console.log(labels)
    dataParsed = {
      labels,
      datasets: [
        {
          type: "bar",
          label: "Response",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 2,
          fill: false,
          data: cumulativeUser,
        },
        {
          type: "bar",
          label: "Request",
          backgroundColor: "rgb(75, 192, 192)",
          data: chart.map((item) => item["Request Count"]),
          borderColor: "white",
          borderWidth: 2,
        },
      ],
    };
  }

 
  return (
    <Card className='chart'>
      {chart&&chart.length>0 ? <Chart datasetIdKey='id' options={options} type="bar" data={dataParsed} /> : null}
    </Card>
  );
}
