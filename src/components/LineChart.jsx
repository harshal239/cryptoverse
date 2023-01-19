import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import moment from "moment/moment";

const { Title } = Typography;

ChartJS.register(...registerables);

function LineChart({ coinHistory, currentPrice, coinName }) {
  // console.log(coinHistory);
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    let timeStamp = coinHistory?.data?.history[i].timestamp;
    let date = moment.unix(timeStamp).format("DD/MM/YYYY");
    console.log(date);
    coinTimestamp.push(date);
  }
  console.log(coinTimestamp);
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
        pointRadius: 2,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {},
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: ${currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
}

export default LineChart;
