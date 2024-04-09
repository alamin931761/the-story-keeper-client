import { useForm } from "react-hook-form";
import PageTitle from "../../../components/PageTitle";
import Form from "../../../components/reusableForm/Form";
import FormSection from "../../../components/reusableForm/FormSection";
import FormSubmit from "../../../components/reusableForm/FormSubmit";
import Input from "../../../components/reusableForm/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCouponSchema } from "../../../components/reusableForm/Validation";
import { useAddCouponMutation } from "../../../redux/api/couponApi";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
import DynamicLinkButton from "../../../components/DynamicLinkButton";
import { MdKeyboardBackspace } from "react-icons/md";

const AddCoupon = () => {
  const [addCoupon, { isLoading, error }] = useAddCouponMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(addCouponSchema) });

  const handleAddCoupon = async (data) => {
    const couponData = {
      code: data.code,
      discount: parseFloat(data.discount),
      limit: parseInt(data.limit),
      expiryDate: new Date(data.expiryDate).toISOString(),
    };

    const result = await addCoupon(couponData);
    if (result?.data?.success) {
      toast.info(result?.data?.message);
    }

    if (result?.error?.data?.success === false) {
      toast.error(result?.error?.data?.message);
    }
    reset();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      className="min-h-screen"
      data-aos="fade-right"
      data-aos-duration="1000"
    >
      <PageTitle title="Add Coupon" />
      <h2 className="text-center text-3xl mb-5 second-font">Add Coupon</h2>

      <div className="border border-red-500 flex justify-center">
        <div className="w-full max-w-lg">
          <Form onSubmit={handleSubmit(handleAddCoupon)}>
            <FormSection>
              <Input
                register={register("code")}
                type="text"
                name="code"
                label="code"
                errors={errors}
              />

              <Input
                register={register("discount")}
                type="text"
                name="discount"
                label="discount (%)"
                errors={errors}
              />

              <Input
                register={register("expiryDate")}
                type="date"
                name="expiryDate"
                label="Expiry date"
                errors={errors}
              />

              <Input
                register={register("limit")}
                type="text"
                name="limit"
                label="limit"
                errors={errors}
              />

              {error ? (
                <p className="text-red-500">
                  <span className="font-semibold">Error:</span>{" "}
                  {error?.data?.message}
                </p>
              ) : (
                ""
              )}
            </FormSection>
            <FormSubmit>Add Coupon</FormSubmit>
          </Form>
        </div>
      </div>

      {/* back button */}
      <div className="flex justify-center">
        <DynamicLinkButton to={`/dashboard/coupons`}>
          <MdKeyboardBackspace className="text-2xl mr-2" />
          Back to Coupons
        </DynamicLinkButton>
      </div>
    </div>
  );
};

export default AddCoupon;
