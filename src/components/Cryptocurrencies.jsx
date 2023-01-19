import { Card, Col, Input, Row } from "antd";
import millify from "millify";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../api/cryptoapi";
import Loader from "./Loader";

function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [crypto, setCrypto] = useState(cryptoList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCrypto(cryptoList?.data?.coins);
    const filteredData = cryptoList?.data?.coins.filter((coins) =>
      coins.name.toLowerCase().includes(searchTerm)
    );
    setCrypto(filteredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      <div className="search-crypto">
        {!simplified && (
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        )}
      </div>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {crypto?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank} . ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    alt={currency.name}
                    src={currency.iconUrl}
                  ></img>
                }
                hoverable
              >
                <p>Price : {millify(currency.price)} $ </p>
                <p>Market Cap : {millify(currency.marketCap)}</p>
                <p>Daily Change : {millify(currency.change)} %</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies;
