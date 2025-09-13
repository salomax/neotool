"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const Schema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email"),
});
type FormVals = z.infer<typeof Schema>;

export default function ProfilePage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormVals>({ resolver: zodResolver(Schema), defaultValues: { fullName: "", email: "" } });

  const onSubmit = async (data: FormVals) => {
    // TODO: wire up API
    console.log("Profile save", data);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>My Profile</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} maxWidth={440}>
          <TextField
            label="Full name"
            {...register("fullName")}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
          <TextField
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Save
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
