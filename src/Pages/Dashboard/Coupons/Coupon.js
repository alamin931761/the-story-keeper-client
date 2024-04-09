import React from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TableRow from "../../../components/reusableTable/TableRow";

const Coupon = ({ index, coupon, setDeleteState }) => {
  const { code, discount, expiryDate, limit, totalUsage, _id } = coupon;
  const couponExpiryDate = new Date(expiryDate);
  const navigate = useNavigate("");

  // status
  const currentTime = new Date().getTime();
  const couponExpiryTime = couponExpiryDate.getTime();
  let status = <span className="text-green-500">active</span>;
  if (currentTime > couponExpiryTime) {
    status = <span className="text-red-500">expired</span>;
  }

  return (
    <TableRow>
      <th>{index + 1}</th>
      <td className="text-center">{code}</td>
      <td className="text-center">{discount}%</td>
      <td className="text-center">
        {totalUsage} / {limit}
      </td>
      <td className="text-center">{couponExpiryDate.toLocaleDateString()}</td>
      <td className="text-center capitalize">{status}</td>
      <td className="text-center">
        <button
          onClick={() => navigate(`/dashboard/coupons/update-coupon/${_id}`)}
          className="btn btn-outline transition ease-linear duration-500"
        >
          <BiEdit className="text-2xl" />
        </button>
      </td>
      <td className="text-center">
        <label
          onClick={() => setDeleteState(coupon)}
          htmlFor="coupon-delete-confirmation-modal"
          className="btn btn-outline btn-error transition ease-linear duration-500"
        >
          <MdDelete className="text-2xl" />
        </label>
      </td>
    </TableRow>
  );
};

export default Coupon;
