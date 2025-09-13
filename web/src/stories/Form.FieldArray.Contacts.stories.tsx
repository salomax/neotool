// web/src/stories/Form.FieldArray.Contacts.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormLayout,
  FormSection,
  FormActions,
  FormErrorBanner,
  FormRow,
  ControlledTextField,
  ControllerPhoneBRField,
  ControlledCheckbox,
} from "../components/form";
import { Button, Stack, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Contact = { name: string; email: string; phone: string; primary: boolean };
type FormData = { contacts: Contact[] };

const ContactSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10), // só dígitos
  primary: z.boolean().optional().default(false),
});

const Schema = z.object({
  contacts: z.array(ContactSchema).min(1),
});

const meta: Meta = { title: "Forms/FieldArray — Contacts" };
export default meta;
type Story = StoryObj;

function ContactsArrayDemo() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    defaultValues: {
      contacts: [
        {
          name: "Alice",
          email: "alice@email.com",
          phone: "11987654321",
          primary: true,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

    const onSubmit = async (data: FormData) => {
      await new Promise((r) => setTimeout(r, 300));
      alert(JSON.stringify(data, null, 2));
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormLayout>
          <FormErrorBanner
            message={
              Object.keys(errors).length
                ? "Fix the highlighted fields."
                : undefined
            }
          />

          <FormSection title="Contacts">
            <Stack spacing={2}>
              {fields.map((field, idx) => (
                <div
                  key={field.id}
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 8,
                    padding: 12,
                  }}
                >
                  <FormRow cols={{ xs: 1, sm: 3, md: 4 }}>
                    <ControlledTextField
                      control={control}
                      name={`contacts.${idx}.name`}
                      label="Name"
                    />
                    <ControlledTextField
                      control={control}
                      name={`contacts.${idx}.email`}
                      label="Email"
                      type="email"
                    />
                    <ControllerPhoneBRField
                      control={control}
                      name={`contacts.${idx}.phone`}
                      label="Phone (BR)"
                    />
                    <ControlledCheckbox
                      control={control}
                      name={`contacts.${idx}.primary`}
                      label="Primary"
                    />
                  </FormRow>
                  <Stack direction="row" justifyContent="flex-end">
                    <IconButton onClick={() => remove(idx)} aria-label="Remove">
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </div>
              ))}
              <Button
                variant="outlined"
                onClick={() =>
                  append({ name: "", email: "", phone: "", primary: false })
                }
              >
                Add contact
              </Button>
            </Stack>
          </FormSection>

          <FormActions submitting={isSubmitting} />
        </FormLayout>
      </form>
    );
}

export const ContactsArray: Story = {
  render: () => <ContactsArrayDemo />,
};
