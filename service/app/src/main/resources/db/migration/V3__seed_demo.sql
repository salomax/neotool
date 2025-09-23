-- V3__seed_demo.sql
INSERT INTO products (name, sku, price_cents, stock) VALUES
('USB-C Cable 1m', 'SKU-USB-1M', 4900, 120),
('Mechanical Keyboard', 'SKU-MECH-KB', 39900, 35),
('Wireless Mouse', 'SKU-MOUSE', 15900, 80);

INSERT INTO customers (name, email, status) VALUES
('Alice Johnson', 'alice@example.com', 'ACTIVE'),
('Bob Smith', 'bob@example.com', 'INACTIVE'),
('Carol Lee', 'carol@example.com', 'ACTIVE');
