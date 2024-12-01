import React from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { Address } from "../../types";
import { userApi } from "../../services/api";
import toast from "react-hot-toast";

interface AddressFormProps {
  isOpen: boolean;
  toggle: () => void;
  onAddAddress: (address: Address) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  isOpen,
  toggle,
  onAddAddress,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Address>();

  const onSubmit = async (data: Address) => {
    try {
      const response = await userApi.addAddress(data);
      onAddAddress(response.data);
      toast.success("Address added successfully");
      reset();
      toggle();
    } catch (error) {
      toast.error("Failed to add address");
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Address</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="street">Street Address</Label>
            <Controller
              name="street"
              control={control}
              rules={{ required: "Street address is required" }}
              render={({ field }) => (
                <Input id="street" {...field} invalid={!!errors.street} />
              )}
            />
            {errors.street && (
              <span className="text-danger">{errors.street.message}</span>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <Input id="city" {...field} invalid={!!errors.city} />
              )}
            />
            {errors.city && (
              <span className="text-danger">{errors.city.message}</span>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="state">State</Label>
            <Controller
              name="state"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <Input id="state" {...field} invalid={!!errors.state} />
              )}
            />
            {errors.state && (
              <span className="text-danger">{errors.state.message}</span>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="zipCode">ZIP Code</Label>
            <Controller
              name="zipCode"
              control={control}
              rules={{ required: "ZIP code is required" }}
              render={({ field }) => (
                <Input id="zipCode" {...field} invalid={!!errors.zipCode} />
              )}
            />
            {errors.zipCode && (
              <span className="text-danger">{errors.zipCode.message}</span>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="country">Country</Label>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <Input id="country" {...field} invalid={!!errors.country} />
              )}
            />
            {errors.country && (
              <span className="text-danger">{errors.country.message}</span>
            )}
          </FormGroup>
          <Button color="primary" type="submit">
            Add Address
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddressForm;
