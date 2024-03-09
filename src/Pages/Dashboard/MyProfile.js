// import { useAuthState } from "react-firebase-hooks/auth";
// import { useUpdatePassword } from "react-firebase-hooks/auth";
// import auth from "../../firebase.init";
// import { toast } from "react-toastify";
// import { useState } from "react";
// import { useEffect } from "react";
// import Loading from "../../components/Loading";
// import { useForm } from "react-hook-form";
// import { BiEdit } from "react-icons/bi";
// import { signOut } from "firebase/auth";
// import PageTitle from "../../components/PageTitle";
// import Form from "../../components/reusableForm/Form";
// import FormSection from "../../components/reusableForm/FormSection";
// import Input from "../../components/reusableForm/Input";
// import FormSubmit from "../../components/reusableForm/FormSubmit";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   UpdatePasswordSchema,
//   updateProfileSchema,
// } from "../../components/reusableForm/Validation";
// import { TogglePassword } from "../../components/TogglePassword";
// import Modal from "../../components/Modal";

// const MyProfile = () => {
//   const [user] = useAuthState(auth);
//   const [showPassword, setShowPassword] = useState(false);
//   const [updatePassword, updating, error] = useUpdatePassword(auth);
//   const [profileData, setProfileData] = useState([]);

//   // load user profile data
//   useEffect(() => {
//     fetch(`http://localhost:5000/api/v1//user/${user.email}`, {
//       method: "GET",
//       headers: {
//         authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         "content-type": "application/json",
//       },
//     })
//       .then((res) => {
//         if (res.status === 401 || res.status === 403) {
//           signOut(auth);
//           localStorage.removeItem("accessToken");
//         }
//         return res.json();
//       })
//       .then((data) => setProfileData(data));
//   }, [profileData, user.email]);

//   // image
//   const image = "https://i.ibb.co/4WCwkWc/user-default-image.png";
//   let profilePicture = "";
//   if (profileData[0]?.imageURL) {
//     profilePicture = profileData[0]?.imageURL;
//   } else {
//     profilePicture = image;
//   }

//   // update profile
//   const {
//     register: registerUpdateProfile,
//     formState: { errors: errorsUpdateProfile },
//     handleSubmit: handleSubmitUpdateProfile,
//     reset: resetUpdateProfileProfile,
//   } = useForm({ resolver: zodResolver(updateProfileSchema) });
//   const updateProfile = (data) => {
//     const updateProfileData = {
//       name: user?.displayName,
//       email: user?.email,
//       imageURL: data.imageURL,
//       address: data.address,
//       phoneNumber: data.phoneNumber,
//     };

//     fetch(`http://localhost:5000/api/v1//user/${user.email}`, {
//       method: "PUT",
//       headers: {
//         authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(updateProfileData),
//     })
//       .then((res) => {
//         if (res.status === 401 || res.status === 403) {
//           signOut(auth);
//           localStorage.removeItem("accessToken");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         if (data.result.modifiedCount > 0) {
//           toast.success("Profile updated successfully");
//         } else {
//           toast.info("All values are the same");
//         }
//       });
//     resetUpdateProfileProfile();
//   };

//   // update password
//   const {
//     register: registerPassword,
//     formState: { errors: errorsPassword },
//     handleSubmit: handleSubmitPassword,
//     reset: resetPassword,
//   } = useForm({ resolver: zodResolver(UpdatePasswordSchema) });

//   const changePassword = async (data) => {
//     const newPassword = data.password;
//     const confirmNewPassword = data.confirmPassword;

//     if (newPassword === confirmNewPassword) {
//       const success = await updatePassword(newPassword);
//       if (success) {
//         toast.info(`Password updated successfully`);
//         resetPassword();
//       }
//     } else {
//       toast.error("Passwords did not match. Try again.");
//     }
//   };

//   if (error) {
//     toast.error(`${error.message}`);
//   }
//   if (updating) {
//     return <Loading />;
//   }

//   return (
//     <div className="mx-3" data-aos="fade-right" data-aos-duration="1000">
//       <PageTitle title="My Profile" />
//       <h2 className="text-center text-3xl my-6 second-font">My Profile</h2>

//       <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
//         <div className="flex justify-center items-center">
//           <div className="lg:w-[450px] w-full">
//             <div className="bg-[#DFF6FF] p-4 rounded-lg">
//               <div className="flex justify-end mb-5">
//                 <label
//                   htmlFor="update-profile-modal"
//                   className="btn btn-outline transition ease-linear duration-500"
//                 >
//                   <BiEdit className="text-2xl mr-2" />
//                   Update Profile
//                 </label>
//               </div>
//               <div className="avatar flex justify-center mb-5">
//                 <div className="w-64 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//                   <img src={profilePicture} alt="" />
//                 </div>
//               </div>
//               <p className="mb-3">
//                 <span className="font-bold text-xl second-font">Name: </span>
//                 {user.displayName}
//               </p>
//               <p className="mb-3 break-all">
//                 <span className="font-bold text-xl second-font">Email: </span>
//                 {user.email}
//               </p>
//               <p className="mb-3 break-all">
//                 <span className="font-bold text-xl second-font">Address: </span>
//                 <span>{profileData[0]?.address}</span>
//               </p>
//               <p className="mb-3 break-all">
//                 <span className="font-bold text-xl second-font">
//                   Phone Number:{" "}
//                 </span>
//                 {profileData[0]?.phoneNumber}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* change password  */}
//         <div className="flex flex-col justify-center my-6">
//           <h2 className="text-2xl text-center mb-5 second-font">
//             Update Password
//           </h2>

//           <Form onSubmit={handleSubmitPassword(changePassword)}>
//             <FormSection>
//               <Input
//                 name="password"
//                 register={registerPassword("password")}
//                 label="New Password"
//                 type={`${showPassword ? "text" : "password"}`}
//                 errors={errorsPassword}
//               />

//               <Input
//                 name="confirmPassword"
//                 register={registerPassword("confirmPassword")}
//                 label="Confirm New Password"
//                 type={`${showPassword ? "text" : "password"}`}
//                 errors={errorsPassword}
//               />

//               <TogglePassword state={showPassword} setState={setShowPassword} />
//             </FormSection>
//             <FormSubmit>Update Password</FormSubmit>
//           </Form>
//         </div>

//         {/* update profile modal */}
//         <Modal modalName="update-profile-modal" title="update profile">
//           <Form onSubmit={handleSubmitUpdateProfile(updateProfile)}>
//             <FormSection>
//               <Input
//                 type="text"
//                 label="Name"
//                 name="name"
//                 errors={errorsUpdateProfile}
//                 value={user.displayName}
//                 disabled={true}
//               />

//               <Input
//                 type="text"
//                 label="Email"
//                 name="email"
//                 errors={errorsUpdateProfile}
//                 value={user.email}
//                 disabled={true}
//               />

//               <Input
//                 type="text"
//                 label="Image URL"
//                 name="imageURL"
//                 errors={errorsUpdateProfile}
//                 register={registerUpdateProfile("imageURL")}
//               />

//               <Input
//                 type="text"
//                 label="Phone Number"
//                 name="phoneNumber"
//                 errors={errorsUpdateProfile}
//                 register={registerUpdateProfile("phoneNumber")}
//               />

//               <Input
//                 type="text"
//                 label="Address"
//                 name="address"
//                 errors={errorsUpdateProfile}
//                 register={registerUpdateProfile("address")}
//               />
//             </FormSection>
//             <FormSubmit>Update Profile</FormSubmit>
//           </Form>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;
