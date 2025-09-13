"use client";
import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Stack,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

type User = { id: string; name: string; email: string };

async function api<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  // 204 sem body
  return (res.status === 204 ? (null as any) : await res.json()) as T;
}

export default function MSWUsersPage() {
  const qc = useQueryClient();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const { data = [], isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => api<User[]>("/api/mock/users"),
  });

  const add = useMutation({
    mutationFn: async () =>
      api<User>("/api/mock/users", {
        method: "POST",
        body: JSON.stringify({ name, email }),
      }),
    onSuccess: (user) => {
      qc.setQueryData<User[]>(["users"], (prev = []) => [...prev, user]);
      setName("");
      setEmail("");
    },
  });

  const del = useMutation({
    mutationFn: (id: string) =>
      api(`/api/mock/users/${id}`, { method: "DELETE" }),
    onSuccess: (_, id) => {
      qc.setQueryData<User[]>(["users"], (prev = []) =>
        prev.filter((u) => u.id !== id),
      );
    },
  });

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        MSW Users
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 2 }}
        alignItems="center"
        data-testid="users-form"
      >
        <TextField
          label="Name"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-testid="users-name"
          inputProps={{ "data-testid": "users-name-input" }}
        />
        <TextField
          label="Email"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="users-email"
          inputProps={{ "data-testid": "users-email-input" }}
        />
        <Button
          variant="contained"
          onClick={() => add.mutate()}
          disabled={!name || !email}
          data-testid="users-add"
        >
          Add
        </Button>
      </Stack>

      <List data-testid="users-list">
        {isLoading ? (
          <ListItem>
            <ListItemText primary="Loading..." />
          </ListItem>
        ) : (
          data.map((u) => (
            <ListItem key={u.id} data-testid="user-item" divider>
              <ListItemText primary={u.name} secondary={u.email} />
              <Button
                size="small"
                onClick={() => del.mutate(u.id)}
                data-testid={`user-del-${u.id}`}
              >
                Delete
              </Button>
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
}
