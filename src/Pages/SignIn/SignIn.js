import { useState } from "react";
import { useEffect } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
// import useToken from "../../Hooks/useToken";
import Loading from "../../components/Loading";
import { SlLogin } from "react-icons/sl";
import { BsArrowRight } from "react-icons/bs";
import PageTitle from "../../components/PageTitle";
import { TogglePassword } from "../../components/TogglePassword";
import GoogleReCAPTCHA from "./GoogleReCAPTCHA";
import Form from "../../components/reusableForm/Form";
import FormSection from "../../components/reusableForm/FormSection";
import Input from "../../components/reusableForm/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordSchema,
  SignInSchema,
} from "../../components/reusableForm/Validation";
import FormSubmit from "../../components/reusableForm/FormSubmit";
import DynamicLink from "../../components/DynamicLink";
import Modal from "../../components/Modal";
import Social from "../../components/Social";

const SignIn = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, resetPasswordError] =
    useSendPasswordResetEmail(auth);
  const [recaptcha, setRecaptcha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  // const [token] = useToken(user);

  // sign in
  const {
    register: SignInRegister,
    formState: { errors: SignInErrors },
    handleSubmit: handleSubmitSignIn,
    reset: SignInReset,
  } = useForm({ resolver: zodResolver(SignInSchema) });

  const handleSignIn = (data) => {
    const { email, password } = data;
    signInWithEmailAndPassword(email, password);
    SignInReset();
  };

  // reset password
  const {
    register: resetPasswordRegister,
    formState: { errors: resetPasswordErrors },
    handleSubmit: resetPasswordHandleSubmit,
    reset: ResetPasswordReset,
  } = useForm({ resolver: zodResolver(ResetPasswordSchema) });

  const handleResetPassword = async (data) => {
    await sendPasswordResetEmail(data.email);
    toast.info("An email has been sent to reset your password");
    ResetPasswordReset();
  };

  if (resetPasswordError) {
    toast.error(`${resetPasswordError}`);
  }

  // redirect
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  // useEffect(() => {
  //   if (token) {
  //     navigate(from, { replace: true });
  //   }
  // }, [token, navigate, from]);

  // sign in error
  let errorElement;
  if (error) {
    errorElement = (
      <p className="text-error mt-5 text-center">{error.message}</p>
    );
  }

  // google recaptcha
  const handleGoogleRECAPTCHA = (value) => {
    setRecaptcha(value);
  };

  // loading
  if (loading || sending) {
    return <Loading />;
  }

  return (
    <div
      className="common-style w-full"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <PageTitle title="Sign In" />
      <h2 className="text-4xl text-center my-10 second-font">
        Sign In to The Story Keeper
      </h2>

      <div className="flex justify-center w-full">
        <div className="w-full max-w-lg">
          <Form onSubmit={handleSubmitSignIn(handleSignIn)}>
            <FormSection>
              <Input
                name="email"
                label="Your Email Address"
                errors={SignInErrors}
                type="text"
                register={SignInRegister("email")}
              />

              <Input
                name="password"
                label="Your Password"
                errors={SignInErrors}
                type={`${showPassword ? "text" : "password"}`}
                register={SignInRegister("password")}
              />
              <TogglePassword state={showPassword} setState={setShowPassword} />
            </FormSection>

            <GoogleReCAPTCHA onChange={handleGoogleRECAPTCHA} />

            <FormSubmit disabled={recaptcha ? false : true}>
              Sign In <SlLogin className="text-xl ml-2" />
            </FormSubmit>

            <label className="mt-5 second-font" htmlFor="reset-password-modal">
              Forgot your password?{" "}
              <span className="text-blue-500 cursor-pointer underline hover:decoration-wavy underline-offset-2">
                Reset Password
                <BsArrowRight className="inline text-2xl ml-2" />
              </span>
            </label>

            <p className="mt-5 second-font">
              New to The Story Keeper?{" "}
              <DynamicLink to="/sign-up">
                Please Sign Up
                <BsArrowRight className="inline text-2xl ml-2" />
              </DynamicLink>
            </p>
          </Form>
        </div>
      </div>
      {errorElement}
      {/* <Social /> */}

      <Modal modalName="reset-password-modal" title="reset password">
        <Form onSubmit={resetPasswordHandleSubmit(handleResetPassword)}>
          <FormSection>
            <Input
              name="email"
              label="your email address"
              errors={resetPasswordErrors}
              type="email"
              register={resetPasswordRegister("email")}
            />
          </FormSection>
          <FormSubmit>reset password</FormSubmit>
        </Form>
      </Modal>
    </div>
  );
};

export default SignIn;
