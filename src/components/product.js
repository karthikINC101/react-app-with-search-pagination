import React from "react";

import Button from "@mui/material/Button";

function Product({ data, setCartCount }) {
  const results = data;

//for handling count of products added to basket
  const addToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="container">
      {results && results.length > 0
        ? results.map((result) => (
            <div className="item-component" key={result.id}>
              <img
                className="item-img"
                src={result.thumbnailImageUrl}
                alt={result.name}
              />
              <p className="item-name">{result.name}</p>
              <span className="item-price">
                ${(result.price * 1).toFixed(2)}
              </span>
              <Button
                variant="contained"
                className="item-btn"
                onClick={addToCart}
              >
                ADD TO CART
              </Button>
            </div>
          ))
        : results(<h1>NO PRODUCTS FOUND</h1>)}
    </div>
  );
}

export default Product;
