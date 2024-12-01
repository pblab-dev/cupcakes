import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { User } from "../../types";
import { userApi } from "../../services/api";
import toast from "react-hot-toast";

interface ProfileFormProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, onUpdate }) => {
  const [name, setName] = useState(user.name);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = async (data: Partial<User>) => {
    data.name = name || user.name;
    console.log(data);
    try {
      const response = await userApi.updateProfile(data);
      onUpdate(response.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          id="name"
          value={name}
          {...register("name", {
            required: "Name is required",
            onChange: handleNameChange,
          })}
          invalid={!!errors.name}
        />
        {errors.name && (
          <span className="text-danger">{errors.name.message}</span>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          disabled
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          invalid={!!errors.email}
          defaultValue={user.email}
        />
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}
      </FormGroup>
      <Button color="primary" type="submit">
        Update Profile
      </Button>
    </Form>
  );
};

export default ProfileForm;
