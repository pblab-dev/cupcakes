import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAuthStore from "../../store/useAuthStore";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();
  const navigate = useNavigate();
  const registerUser = useAuthStore((state) => state.register);

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data.name, data.email, data.password);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg border-0">
              <div className="p-5">
                <h2 className="text-center mb-4">Create Account</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup>
                    <Label for="name">Full Name</Label>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      }}
                      render={({ field }) => (
                        <Input id="name" {...field} invalid={!!errors.name} />
                      )}
                    />
                    {errors.name && (
                      <span className="text-danger">{errors.name.message}</span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          id="email"
                          type="email"
                          {...field}
                          invalid={!!errors.email}
                        />
                      )}
                    />
                    {errors.email && (
                      <span className="text-danger">
                        {errors.email.message}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          id="password"
                          type="password"
                          {...field}
                          invalid={!!errors.password}
                        />
                      )}
                    />
                    {errors.password && (
                      <span className="text-danger">
                        {errors.password.message}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      rules={{
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords do not match",
                      }}
                      render={({ field }) => (
                        <Input
                          id="confirmPassword"
                          type="password"
                          {...field}
                          invalid={!!errors.confirmPassword}
                        />
                      )}
                    />
                    {errors.confirmPassword && (
                      <span className="text-danger">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </FormGroup>
                  <Button
                    color="primary"
                    block
                    size="lg"
                    className="mt-4"
                    type="submit"
                  >
                    Create Account
                  </Button>
                </Form>
                <div className="text-center mt-4">
                  <p className="mb-0">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary">
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
