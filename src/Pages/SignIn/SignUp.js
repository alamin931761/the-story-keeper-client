import { useNavigate } from "react-router-dom";
import Social from "../../components/Social";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useState } from "react";
import Loading from "../../components/Loading";
import { useForm } from "react-hook-form";
import useToken from "../../Hooks/useToken";
import { BsArrowRight } from "react-icons/bs";
import { SlLogin } from "react-icons/sl";
import PageTitle from "../../components/PageTitle";
import { TogglePassword } from "../../components/TogglePassword";
import DynamicLink from "../../components/DynamicLink";
import GoogleReCAPTCHA from "./GoogleReCAPTCHA";
import Form from "../../components/reusableForm/Form";
import FormSection from "../../components/reusableForm/FormSection";
import Input from "../../components/reusableForm/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../../components/reusableForm/Validation";
import FormSubmit from "../../components/reusableForm/FormSubmit";
import Modal from "../../components/Modal";
import Container from "../../components/Container";

const SignUp = () => {
  const [agree, setAgree] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    // useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile, updating, updateProfileError] = useUpdateProfile(auth);
  const [showPassword, setShowPassword] = useState(false);
  const [recaptcha, setRecaptcha] = useState("");
  const { token } = useToken(user);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(SignUpSchema) });

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    setAgree(false);
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    reset();
  };

  if (token) {
    navigate("/home");
  }

  if (loading || updating) {
    return <Loading />;
  }

  // error
  let errorElement;
  if (error || updateProfileError) {
    errorElement = (
      <p className="text-error mt-5 text-center">
        {error.message || updateProfileError.message}
      </p>
    );
  }

  // google recaptcha
  const onChange = (value) => {
    setRecaptcha(value);
  };

  return (
    <Container>
      <div className="mb-5" data-aos="fade-down" data-aos-duration="1000">
        <PageTitle title="Sign Up" />

        <h2 className="text-4xl text-center my-5 second-font">
          Sign Up to The Story Keeper
        </h2>

        <div className="flex justify-center w-full">
          <div className="w-full max-w-lg">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormSection>
                <Input
                  name="name"
                  label="Your name"
                  errors={errors}
                  type="text"
                  register={register("name")}
                />

                <Input
                  name="email"
                  label="Your email address"
                  errors={errors}
                  type="email"
                  register={register("email")}
                />

                <Input
                  name="password"
                  label="Your Password"
                  errors={errors}
                  type={`${showPassword ? "text" : "password"}`}
                  register={register("password")}
                />

                <TogglePassword
                  state={showPassword}
                  setState={setShowPassword}
                />

                <div className="flex items-center">
                  <input
                    onClick={() => setAgree(!agree)}
                    className="checkbox"
                    name="terms"
                    id="terms"
                    type="checkbox"
                  />

                  <label
                    className={`ml-2 ${agree ? "text-black" : "text-error"}`}
                    htmlFor="terms"
                  >
                    I accept the{" "}
                    <label
                      htmlFor="terms-and-conditions"
                      className="underline hover:decoration-wavy underline-offset-2 text-blue-500 cursor-pointer"
                    >
                      terms and conditions
                    </label>
                  </label>
                </div>
              </FormSection>
              <GoogleReCAPTCHA onChange={onChange} />

              <FormSubmit disabled={recaptcha && agree ? false : true}>
                Sign Up
                <SlLogin className="text-xl ml-2" />
              </FormSubmit>
            </Form>

            <p className="mt-5 second-font">
              Already have an account?{" "}
              <DynamicLink
                to="/sign-in"
                className="text-blue-500 underline cursor-pointer hover:decoration-wavy underline-offset-2"
              >
                Please Sign In
                <BsArrowRight className="inline text-2xl ml-2" />
              </DynamicLink>
            </p>
          </div>
        </div>

        {errorElement}
        {/* <Social /> */}

        {/* terms and conditions modal */}
        <Modal modalName="terms-and-conditions" title="Terms and Conditions">
          <ul className="ml-5">
            <li className="list-disc mb-2">
              All books are sold subject to the condition that they shall not,
              by way of trade or otherwise, be lent, re-sold, hired out or
              otherwise circulated without prior consent in any form of binding
              or cover than that in which it is published and without a
              condition to the same effect as this condition being imposed on
              the subsequent purchase.
            </li>

            <li className="list-disc">
              The price of books is exclusive of any applicable value added or
              other tax or bank charges which the customer shall be additionally
              liable to pay to Context as shown on the invoice.
            </li>

            <li className="list-disc mb-2">
              Payment shall be by credit card - Visa, Mastercard, or debit cards
              can be accepted in Pounds sterling, euros, and dollars.
            </li>

            <li className="list-disc mb-2">
              Goods are supplied on 14 day return basis assuming returned in
              perfect condition.
            </li>

            <li className="list-disc mb-2">
              The customer shall inspect the goods on delivery and inform
              Context in writing within 48 hours. Replacement can be refused if
              it is not in stock.
            </li>

            <li className="list-disc">
              It is the customer's responsibility to provide Context with a full
              and correct postal address. Context reserves the right to charge
              for redelivery in the event of incorrect details.
            </li>
          </ul>
        </Modal>
      </div>
    </Container>
  );
};

export default SignUp;
