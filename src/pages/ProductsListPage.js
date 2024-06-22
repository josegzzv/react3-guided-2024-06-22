import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import products from "../products";
import { useState } from "react";

const ProductsListPage = () => {
  const [productsList, setProductsList] = useState(JSON.parse(localStorage.getItem("products")) || []);
  
  return (
    <>
      <Row>
        {productsList.map((product) => (
          <Col key={product.id} md={6} sm={12} lg={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductsListPage;
