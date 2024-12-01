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
import { userApi } from "../../services/api";
import useAuthStore from "../../store/useAuthStore";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      toast.success("Successfully logged in!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid credentials");
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
                <h2 className="text-center mb-4">Welcome Back!</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
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
                  <Button
                    color="primary"
                    block
                    size="lg"
                    className="mt-4"
                    type="submit"
                  >
                    Sign In
                  </Button>
                </Form>
                <div className="text-center mt-4">
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary">
                      Sign Up
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

export default Login;
