import React from "react";
import { Col, Collapse, Row, Typography, Avatar } from "antd";
import Loader from "./Loader";
import { useGetExchangesQuery } from "../api/cryptoapi";
import HTMLReactParser from "html-react-parser";
import millify from "millify";

const { Text } = Typography;
const { Panel } = Collapse;

function Exchanges() {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;
  if (isFetching) {
    return <Loader />;
  }
  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24H Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse accordion>
              <Panel
                showArrow={false}
                header={
                  <Row>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.rank}</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      ></Avatar>
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Exchanges;
