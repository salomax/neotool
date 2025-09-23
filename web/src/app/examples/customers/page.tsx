"use client";
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

export default function CustomersPage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", email: "", status: "ACTIVE" });

  async function load() {
    const res = await fetch(`${API}/api/customers/`);
    setItems(await res.json());
  }

  async function create() {
    await fetch(`${API}/api/customers/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", email: "", status: "ACTIVE" });
    await load();
  }

  async function del(id: number) {
    await fetch(`${API}/api/customers/${id}`, { method: "DELETE" });
    await load();
  }

  useEffect(() => { load(); }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>Customers</Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Create Customer</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, mt: 1 }}>
          <TextField label="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <TextField label="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
          <TextField label="Status" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}/>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={create}>Create</Button>
        </Box>
      </Paper>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell><TableCell>Name</TableCell><TableCell>Email</TableCell><TableCell>Status</TableCell><TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(c => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.status}</TableCell>
                <TableCell align="right">
                  <Button color="error" onClick={()=>del(c.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
