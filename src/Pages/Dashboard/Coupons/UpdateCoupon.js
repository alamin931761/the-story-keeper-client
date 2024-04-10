import { useForm } from "react-hook-form";
import Form from "../../../components/reusableForm/Form";
import FormSection from "../../../components/reusableForm/FormSection";
import FormSubmit from "../../../components/reusableForm/FormSubmit";
import Input from "../../../components/reusableForm/Input";
import {
  useGetSingleCouponQuery,
  useUpdateCouponMutation,
} from "../../../redux/api/couponApi";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import { updateCouponSchema } from "../../../components/reusableForm/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import PageTitle from "../../../components/PageTitle";
import { toast } from "react-toastify";
import DynamicLinkButton from "../../../components/DynamicLinkButton";
import { MdKeyboardBackspace } from "react-icons/md";
import UnauthorizedError from "../../../components/UnauthorizedError";

const UpdateCoupon = () => {
  const { id } = useParams();
  const [updateBook, { isLoading: updating, error }] =
    useUpdateCouponMutation();
  const {
    data,
    isLoading,
    isError,
    error: getSingleCouponQueryError,
  } = useGetSingleCouponQuery({
    id,
    token: localStorage.getItem("accessToken"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(updateCouponSchema) });

  const handleUpdateCoupon = async (data) => {
    const updatedData = {
      expiryDate: new Date(data.expiryDate).toISOString(),
      limit: parseInt(data.limit),
    };

    const options = {
      id,
      updatedData,
      token: localStorage.getItem("accessToken"),
    };
    const result = await updateBook(options);
    if (result?.data?.success) {
      toast.info(result?.data?.message);
    }

    if (result?.error?.data?.success === false) {
      toast.error(result?.error?.data?.message);
    }
    reset();
  };

  if (isLoading || updating) {
    return <Loading />;
  }

  return (
    <div
      className="min-h-screen"
      data-aos="fade-right"
      data-aos-duration="1000"
    >
      <PageTitle title="Update Coupon" />
      {isError ? (
        <UnauthorizedError error={getSingleCouponQueryError} />
      ) : (
        <>
          {" "}
          <h2 className="text-center text-3xl mb-5 second-font">
            Update Coupon
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <Form onSubmit={handleSubmit(handleUpdateCoupon)}>
                <FormSection>
                  <Input
                    register={register("code")}
                    type="text"
                    name="code"
                    label="code"
                    errors={errors}
                    value={data?.data?.data?.code}
                    disabled={true}
                  />
                  <Input
                    register={register("discount")}
                    type="text"
                    name="discount"
                    label="discount (%)"
                    errors={errors}
                    value={data?.data?.data?.discount}
                    disabled={true}
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

                <FormSubmit>Update Coupon</FormSubmit>
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
        </>
      )}
    </div>
  );
};

export default UpdateCoupon;
