import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BsBagCheck } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";
import DynamicLinkButton from "../../components/DynamicLinkButton";
import { deliveryDetailsSchema } from "../../components/reusableForm/Validation";
import Form from "../../components/reusableForm/Form";
import FormSection from "../../components/reusableForm/FormSection";
import Input from "../../components/reusableForm/Input";
import FormSubmit from "../../components/reusableForm/FormSubmit";
import auth from "../../firebase.init";
import { OrderContext } from "../../Context/Order";
import PageTitle from "../../components/PageTitle";

const DeliveryDetails = () => {
  const [user] = useAuthState(auth);
  const [order, setOrder] = useContext(OrderContext);
  const [checkoutButton, setCheckoutButton] = useState(true);

  const navigate = useNavigate("");
  if (!order.total && !order.delivery && !order.books) {
    navigate("/cart");
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(deliveryDetailsSchema) });
  const onSubmit = (data) => {
    const myOrder = {
      name: user?.displayName,
      email: user?.email,
      phoneNumber: data.phone,
      address: data.address,
      date: new Date().toISOString(),
      books: order.books,
      delivery: order.delivery,
      total: order.total,
    };
    setOrder(myOrder);
    toast.success("Details submitted successfully");
    reset();
  };

  // proceed to checkout button
  useEffect(() => {
    if (Object.keys(order).length === 8) {
      setCheckoutButton(false);
    }
  }, [order]);

  return (
    <div className="common-style" data-aos="fade-up" data-aos-duration="1000">
      <PageTitle title="Delivery Details" />
      <h2 className="text-center text-3xl my-6 second-font">
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
        <DynamicLinkButton to="/checkout" disabled={checkoutButton}>
          Proceed to checkout
          <BsBagCheck className="ml-2 text-2xl mb-1" />
        </DynamicLinkButton>
      </div>
    </div>
  );
};

export default DeliveryDetails;
