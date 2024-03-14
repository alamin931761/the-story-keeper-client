import { useAuthState } from "react-firebase-hooks/auth";
import { useUpdatePassword } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "../../components/Loading";
import { useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import PageTitle from "../../components/PageTitle";
import Form from "../../components/reusableForm/Form";
import FormSection from "../../components/reusableForm/FormSection";
import Input from "../../components/reusableForm/Input";
import FormSubmit from "../../components/reusableForm/FormSubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdatePasswordSchema,
  updateProfileSchema,
} from "../../components/reusableForm/Validation";
import { TogglePassword } from "../../components/TogglePassword";
import Modal from "../../components/Modal";
import {
  useGetSingleUserQuery,
  useUpdateProfileMutation,
} from "../../redux/api/userApi";

const MyProfile = () => {
  // update profile
  const [user] = useAuthState(auth);
  const email = user.email;
  const { data, isLoading } = useGetSingleUserQuery(email);
  const [updateProfile, { isLoading: updateProfileLoading }] =
    useUpdateProfileMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [updatePassword, updating, error] = useUpdatePassword(auth);

  const {
    register: registerUpdateProfile,
    formState: { errors: errorsUpdateProfile },
    handleSubmit: handleSubmitUpdateProfile,
    reset: resetUpdateProfileProfile,
  } = useForm({ resolver: zodResolver(updateProfileSchema) });

  const handleUpdateProfile = async (data) => {
    const updateProfileData = {
      imageURL: data.imageURL,
      address: data.address,
      phoneNumber: data.phoneNumber,
    };

    const options = {
      data: updateProfileData,
      email,
    };
    const result = await updateProfile(options);
    if (result?.error?.data?.success === false) {
      toast.error(result?.error?.data?.message);
    }

    if (result?.data?.success) {
      toast.success(result?.data?.message);
    }

    resetUpdateProfileProfile();
  };

  // update password
  const {
    register: registerPassword,
    formState: { errors: errorsPassword },
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
  } = useForm({ resolver: zodResolver(UpdatePasswordSchema) });

  const changePassword = async (data) => {
    const newPassword = data.password;
    const confirmNewPassword = data.confirmPassword;

    if (newPassword === confirmNewPassword) {
      const success = await updatePassword(newPassword);
      if (success) {
        toast.info(`Password updated successfully`);
        resetPassword();
      }
    } else {
      toast.error("Passwords did not match. Try again.");
    }
  };

  if (error) {
    toast.error(`${error.message}`);
  }
  if (updating || isLoading || updateProfileLoading) {
    return <Loading />;
  }

  const {
    name,
    email: userEmail,
    address,
    phoneNumber,
    imageURL,
  } = data?.data?.data;
  // image
  let profilePicture = "https://i.ibb.co/4WCwkWc/user-default-image.png";
  if (imageURL) {
    profilePicture = imageURL;
  }

  return (
    <div className="mx-3" data-aos="fade-right" data-aos-duration="1000">
      <PageTitle title="My Profile" />
      <h2 className="text-center text-3xl my-5 second-font">My Profile</h2>

      <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-y-5">
        <div className="flex justify-center items-center">
          <div className="lg:w-[450px] w-full">
            <div className="bg-[#DFF6FF] p-4 rounded-lg">
              <div className="flex justify-end mb-5">
                <label
                  htmlFor="update-profile-modal"
                  className="btn btn-outline transition ease-linear duration-500"
                >
                  <BiEdit className="text-2xl mr-2" />
                  Update Profile
                </label>
              </div>
              <div className="avatar flex justify-center mb-5">
                <div className="w-64 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={profilePicture} alt="" />
                </div>
              </div>
              <p className="mb-3">
                <span className="font-bold text-xl second-font">Name: </span>
                {name}
              </p>
              <p className="mb-3 break-all">
                <span className="font-bold text-xl second-font">Email: </span>
                {userEmail}
              </p>
              <p className="mb-3 break-all">
                <span className="font-bold text-xl second-font">Address: </span>
                <span>{address}</span>
              </p>
              <p className="mb-3 break-all">
                <span className="font-bold text-xl second-font">
                  Phone Number:{" "}
                </span>
                {phoneNumber}
              </p>
            </div>
          </div>
        </div>

        {/* change password  */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl text-center mb-5 second-font">
            Update Password
          </h2>

          <Form onSubmit={handleSubmitPassword(changePassword)}>
            <FormSection>
              <Input
                name="password"
                register={registerPassword("password")}
                label="New Password"
                type={`${showPassword ? "text" : "password"}`}
                errors={errorsPassword}
              />

              <Input
                name="confirmPassword"
                register={registerPassword("confirmPassword")}
                label="Confirm New Password"
                type={`${showPassword ? "text" : "password"}`}
                errors={errorsPassword}
              />

              <TogglePassword state={showPassword} setState={setShowPassword} />
            </FormSection>
            <FormSubmit>Update Password</FormSubmit>
          </Form>
        </div>

        {/* update profile modal */}
        <Modal modalName="update-profile-modal" title="update profile">
          <Form onSubmit={handleSubmitUpdateProfile(handleUpdateProfile)}>
            <FormSection>
              <Input
                type="text"
                label="Name"
                name="name"
                errors={errorsUpdateProfile}
                value={name}
                disabled={true}
              />

              <Input
                type="text"
                label="Email"
                name="email"
                errors={errorsUpdateProfile}
                value={userEmail}
                disabled={true}
              />

              <Input
                type="text"
                label="Image URL"
                name="imageURL"
                errors={errorsUpdateProfile}
                register={registerUpdateProfile("imageURL")}
              />

              <Input
                type="text"
                label="Phone Number"
                name="phoneNumber"
                errors={errorsUpdateProfile}
                register={registerUpdateProfile("phoneNumber")}
              />

              <Input
                type="text"
                label="Address"
                name="address"
                errors={errorsUpdateProfile}
                register={registerUpdateProfile("address")}
              />
            </FormSection>
            <FormSubmit>Update Profile</FormSubmit>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default MyProfile;
