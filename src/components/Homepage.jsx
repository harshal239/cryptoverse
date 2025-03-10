import React from "react";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";
import { Cryptocurrencies, News } from "./index";
import { useGetCryptosQuery } from "../api/cryptoapi";
import Loader from "./Loader";

const { Title } = Typography;

function Homepage() {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(globalStats?.total || 0)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats?.totalExchanges || 0)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats?.totalMarketCap || 0)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24 hour volume"
            value={millify(globalStats?.total24hVolume || 0)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats?.totalMarkets || 0)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>

        <Title level={3} className="show-more">
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News simplified />
    </div>
  );
}

export default Homepage;
