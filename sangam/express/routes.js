const express = require("express");

const app = express();

// root
app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

// products
app.get("/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
    },
  ];
  res.json(products); 
});

// get single product
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id); 
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
    },
  ];

  const singleProduct = products.find((product) => product.id === productId); // Fixed parameter name

  if (singleProduct) {
    res.json(singleProduct);
  } else {
    res.status(404).send("Product not found");
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});
