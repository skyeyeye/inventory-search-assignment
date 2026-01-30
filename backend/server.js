const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

/**
 * In-memory inventory data (10 records)
 */
const inventory = [
  { id: 1, name: "iPhone 12", category: "Electronics", price: 500 },
  { id: 2, name: "Samsung Galaxy S21", category: "Electronics", price: 450 },
  { id: 3, name: "MacBook Air", category: "Electronics", price: 900 },
  { id: 4, name: "Office Chair", category: "Furniture", price: 150 },
  { id: 5, name: "Wooden Table", category: "Furniture", price: 300 },
  { id: 6, name: "Bluetooth Speaker", category: "Electronics", price: 120 },
  { id: 7, name: "Running Shoes", category: "Fashion", price: 80 },
  { id: 8, name: "Leather Jacket", category: "Fashion", price: 200 },
  { id: 9, name: "LED Monitor", category: "Electronics", price: 250 },
  { id: 10, name: "Bookshelf", category: "Furniture", price: 180 },
];

/**
 * GET /search
 * Query params:
 * q (partial product name)
 * category
 * minPrice
 * maxPrice
 */
app.get("/search", (req, res) => {
  let { q, category, minPrice, maxPrice } = req.query;

  let results = [...inventory];

  // Edge case: invalid price range
  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    return res.status(400).json({
      message: "Invalid price range: minPrice cannot be greater than maxPrice",
    });
  }

  // Filter by product name (case-insensitive, partial)
  if (q) {
    const searchText = q.toLowerCase();
    results = results.filter((item) =>
      item.name.toLowerCase().includes(searchText)
    );
  }

  // Filter by category
  if (category) {
    results = results.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by min price
  if (minPrice) {
    results = results.filter((item) => item.price >= Number(minPrice));
  }

  // Filter by max price
  if (maxPrice) {
    results = results.filter((item) => item.price <= Number(maxPrice));
  }

  return res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
