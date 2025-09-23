"use client";
// Simple Products CRUD page hitting REST endpoints.
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function ProductsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", sku: "", priceCents: 0, stock: 0 });

  async function load() {
    const res = await fetch(`${API}/api/products/`);
    setItems(await res.json());
  }

  async function create() {
    await fetch(`${API}/api/products/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, priceCents: Number(form.priceCents), stock: Number(form.stock) }),
    });
    setForm({ name: "", sku: "", priceCents: 0, stock: 0 });
    await load();
  }

  async function del(id: number) {
    await fetch(`${API}/api/products/${id}`, { method: "DELETE" });
    await load();
  }

  useEffect(() => { load(); }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>Products</Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Create Product</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, mt: 1 }}>
          <TextField label="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <TextField label="SKU" value={form.sku} onChange={e=>setForm({...form, sku:e.target.value})}/>
          <TextField label="Price (cents)" type="number" value={form.priceCents} onChange={e=>setForm({...form, priceCents:e.target.value})}/>
          <TextField label="Stock" type="number" value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})}/>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={create}>Create</Button>
        </Box>
      </Paper>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell><TableCell>Name</TableCell><TableCell>SKU</TableCell>
              <TableCell align="right">Price</TableCell><TableCell align="right">Stock</TableCell><TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(p => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.sku}</TableCell>
                <TableCell align="right">{(p.priceCents/100).toFixed(2)}</TableCell>
                <TableCell align="right">{p.stock}</TableCell>
                <TableCell align="right">
                  <Button color="error" onClick={()=>del(p.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
