import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { BsBagCheck } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicLinkButton from "../components/DynamicLinkButton";
import { deliveryDetailsSchema } from "../components/reusableForm/Validation";
import Form from "../components/reusableForm/Form";
import FormSection from "../components/reusableForm/FormSection";
import Input from "../components/reusableForm/Input";
import FormSubmit from "../components/reusableForm/FormSubmit";
import auth from "../firebase.init";
import PageTitle from "../components/PageTitle";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { info } from "../redux/features/orderInfoSlice";
import { toast } from "react-toastify";

const DeliveryDetails = () => {
  const [user] = useAuthState(auth);
  const [checkoutButtonDisabled, setCheckoutButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderInfo);
  const navigate = useNavigate("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(deliveryDetailsSchema) });
  const onSubmit = (data) => {
    const deliveryDetails = {
      name: user.displayName,
      email: user?.email,
      phoneNumber: data.phoneNumber,
      deliveryAddress: data.deliveryAddress,
    };
    dispatch(info(deliveryDetails));
    reset();
  };

  useEffect(() => {
    if (order?.deliveryAddress && order?.email) {
      setCheckoutButtonDisabled(false);
      toast.success("Delivery details submitted successfully");
    }

    if (!order.books && !order.deliveryCharge) {
      navigate("/cart");
    }
  }, [order, navigate]);

  return (
    <Container>
      <div data-aos="fade-up" data-aos-duration="1000">
        <PageTitle title="Delivery Details" />
        <h2 className="text-center text-3xl my-5 second-font">
          Delivery Details
        </h2>

        <div className="flex justify-center w-full">
          <div className="w-full max-w-lg">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormSection>
                <Input
                  name="name"
                  label="name"
                  errors={errors}
                  type="text"
                  value={user?.displayName}
                  disabled={true}
                />

                <Input
                  name="email"
                  label="email"
                  errors={errors}
                  type="email"
                  value={user?.email}
                  disabled={true}
                />

                <Input
                  name="phoneNumber"
                  label="Phone number"
                  errors={errors}
                  type="text"
                  register={register("phoneNumber")}
                />

                <Input
                  name="deliveryAddress"
                  label="Delivery Address"
                  errors={errors}
                  type="text"
                  register={register("deliveryAddress")}
                />
              </FormSection>
              <FormSubmit>submit details</FormSubmit>
            </Form>
          </div>
        </div>

        <div className="flex justify-center mb-5">
          <DynamicLinkButton to="/checkout" disabled={checkoutButtonDisabled}>
            Proceed to checkout
            <BsBagCheck className="ml-2 text-2xl mb-1" />
          </DynamicLinkButton>
        </div>
      </div>
    </Container>
  );
};

export default DeliveryDetails;
