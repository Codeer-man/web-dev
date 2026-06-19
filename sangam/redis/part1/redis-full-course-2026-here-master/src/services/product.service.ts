import { pool } from "../db/pool";
import { redisClient } from "../redis/client";
import {
  Product,
  ProductRow,
  CreateProductInput,
  UpdateProductInput,
} from "../types/product";

function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    category: row.category,
    stock: row.stock,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

function getProductKey(productId: number) {
  return `product:key:${productId}`;
}

const allProductKey = "Product:key";
const productCachedTTl = 60;

export async function fetchAllProductsFromDB(filters: {
  category?: string;
  search?: string;
}): Promise<Product[]> {
  let query = "SELECT * FROM products WHERE 1=1";
  const values: string[] = [];

  if (filters.category) {
    values.push(filters.category);
    query += ` AND LOWER(category) = LOWER($${values.length})`;
  }

  if (filters.search) {
    values.push(`%${filters.search}%`);
    query += ` AND (LOWER(name) LIKE LOWER($${values.length}) OR LOWER(description) LIKE LOWER($${values.length}))`;
  }

  query += " ORDER BY id ASC";

  const result = await pool.query<ProductRow>(query, values);
  return result.rows.map(mapProductRow);
}

export async function getAllProducts(filters: {
  category?: string;
  search?: string;
}): Promise<Product[]> {
  const hasFilter = Boolean(filters.category || filters.search);

  if (hasFilter) {
    console.log("cache bypassed : filter product list");
    return await fetchAllProductsFromDB(filters);
  }

  const cachedProduct = await redisClient.get(allProductKey);

  if (cachedProduct) {
    console.log("Cache hit");
    return JSON.parse(cachedProduct) as Product[];
  }

  console.log("Cache miss");
  const dbProdcut = fetchAllProductsFromDB(filters);

  await redisClient.setEx(
    allProductKey,
    productCachedTTl,
    JSON.stringify(dbProdcut),
  );

  return dbProdcut;
}

export async function fetchProductById(id: number): Promise<Product | null> {
  const result = await pool.query<ProductRow>(
    "SELECT * FROM products WHERE id = $1",
    [id],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapProductRow(result.rows[0]);
}

export async function getProductById(id: number): Promise<Product | null> {
  const cache = getProductKey(id);

  const cachedProduct = await redisClient.get(cache);

  if (cachedProduct) {
    console.log("Cache hit");
    return JSON.parse(cachedProduct);
  }
  console.log("cache miss");

  const productFromdb = await fetchProductById(id);

  await redisClient.setEx(
    cache,
    productCachedTTl,
    JSON.stringify(productFromdb),
  );

  return productFromdb;
}

export async function createProduct(
  input: CreateProductInput,
): Promise<Product> {
  const result = await pool.query<ProductRow>(
    `INSERT INTO products (name, description, price, category, stock)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [input.name, input.description, input.price, input.category, input.stock],
  );

  await redisClient.del(JSON.stringify(allProductKey));

  return mapProductRow(result.rows[0]);
}

export async function updateProduct(
  id: number,
  input: UpdateProductInput,
): Promise<Product | null> {
  const existing = await getProductById(id);
  if (!existing) {
    return null;
  }

  const name = input.name ?? existing.name;
  const description = input.description ?? existing.description;
  const price = input.price ?? existing.price;
  const category = input.category ?? existing.category;
  const stock = input.stock ?? existing.stock;

  const result = await pool.query<ProductRow>(
    `UPDATE products
     SET name = $1,
         description = $2,
         price = $3,
         category = $4,
         stock = $5,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $6
     RETURNING *`,
    [name, description, price, category, stock, id],
  );

  return mapProductRow(result.rows[0]);
}
