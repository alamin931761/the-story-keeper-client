import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import PageTitle from "../../../components/PageTitle";
import {
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
} from "../../../redux/api/couponApi";
import Coupon from "./Coupon";
import { useState } from "react";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import { toast } from "react-toastify";
import { ImGift } from "react-icons/im";
import Table from "../../../components/reusableTable/Table";
import TableHead from "../../../components/reusableTable/TableHead";
import TableBody from "../../../components/reusableTable/TableBody";

const Coupons = () => {
  const { data, isLoading } = useGetAllCouponsQuery();
  const [deleteCoupon, { isLoading: deleteCouponLoading }] =
    useDeleteCouponMutation();
  const [deleteState, setDeleteState] = useState(null);

  if (isLoading || deleteCouponLoading) {
    return <Loading />;
  }

  const handleDelete = async (couponData) => {
    const result = await deleteCoupon(couponData._id);
    toast.success(result?.data?.message);
    setDeleteState(null);
  };

  let couponContainer;
  if (data?.data?.data?.length > 0) {
    couponContainer = (
      <div>
        <Table>
          <TableHead>
            <th className="text-center">Code</th>
            <th className="text-center">Discount</th>
            <th className="text-center">Usage / Limit</th>
            <th className="text-center">Expiry date</th>
            <th className="text-center">Status</th>
            <th className="text-center">Edit</th>
            <th className="text-center">Delete</th>
          </TableHead>

          <TableBody>
            {data?.data?.data?.map((coupon, index) => (
              <Coupon
                key={coupon._id}
                coupon={coupon}
                index={index}
                setDeleteState={setDeleteState}
              />
            ))}
          </TableBody>
        </Table>

        <DeleteConfirmationModal
          modalName="coupon-delete-confirmation-modal"
          message={
            <>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteState?.code}</span>
            </>
          }
          deleteState={deleteState}
          handleDelete={handleDelete}
        />
      </div>
    );
  } else {
    couponContainer = (
      <div className="w-full flex flex-col items-center justify-center">
        <ImGift className="text-7xl opacity-5" />
        <p className="second-font">
          No Coupons have been added to this website yet
        </p>
      </div>
    );
  }

  return (
    <div
      data-aos="fade-right"
      data-aos-duration="1000"
      className="min-h-screen relative"
    >
      <PageTitle title="Coupons" />

      <Link
        to="/dashboard/coupons/add-coupon"
        className="btn btn-outline btn-xs lg:btn-sm transition ease-linear duration-500 absolute top-2 left-2"
      >
        Add Coupon
      </Link>

      <h2 className="text-center text-3xl mb-5 second-font">
        Coupons ({data?.data?.data?.length})
      </h2>

      {couponContainer}
    </div>
  );
};

export default Coupons;
