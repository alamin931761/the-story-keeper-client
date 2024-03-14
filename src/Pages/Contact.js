import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { GoLocation } from "react-icons/go";
import { FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import emailjs from "@emailjs/browser";
import { SlPaperPlane } from "react-icons/sl";
import PageTitle from "../components/PageTitle";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema } from "../components/reusableForm/Validation";
import Form from "../components/reusableForm/Form";
import FormSection from "../components/reusableForm/FormSection";
import Input from "../components/reusableForm/Input";
import Textarea from "../components/reusableForm/Textarea";
import FormSubmit from "../components/reusableForm/FormSubmit";
import DynamicLinkButton from "../components/DynamicLinkButton";
import { MdKeyboardBackspace } from "react-icons/md";

const Contact = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(ContactSchema) });

  const sendEmail = (data) => {
    emailjs
      .send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        data,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        (result) => {
          toast.success("Your message has been sent successfully");
        },
        (error) => {
          toast.error(`${error.text}`);
        }
      );
    reset();
  };

  return (
    <div className="common-style" data-aos="fade-down" data-aos-duration="1000">
      <PageTitle title="Contact" />
      <h2 className="text-3xl text-center my-5 second-font">Contact us</h2>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 mt-8">
        <div className="flex items-center justify-center w-full">
          <div>
            <div className="flex items-center mb-10">
              <GoLocation className="text-5xl mr-3" />
              <div>
                <h5 className="text-2xl second-font">Address</h5>
                <p>Gazipur, Bangladesh</p>
              </div>
            </div>

            <a href="tel:+8801741931761">
              <div className="flex items-center mb-10">
                <FiPhone className="text-5xl mr-3" />
                <div>
                  <h5 className="text-2xl second-font">Phone</h5>
                  <p>+8801741931761</p>
                </div>
              </div>
            </a>

            <a href="mailto:alamin931761@gmail.com">
              <div className="flex items-center mb-10">
                <TfiEmail className="text-5xl mr-3" />
                <div>
                  <h5 className="text-2xl second-font">Email</h5>
                  <p>alamin931761@gmail.com</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xl text-center second-font">Tell Your Message</h2>

          <Form onSubmit={handleSubmit(sendEmail)}>
            <FormSection>
              <Input
                type="text"
                register={register("user_name")}
                label="Your Name"
                name="user_name"
                errors={errors}
              />

              <Input
                type="email"
                register={register("user_email")}
                name="user_email"
                label="Your Email"
                errors={errors}
              />
              <Textarea
                name="message"
                label="Your Message"
                errors={errors}
                register={register("message")}
              />
            </FormSection>

            <FormSubmit>
              Send Message <SlPaperPlane className="text-xl ml-2" />
            </FormSubmit>
          </Form>
        </div>
      </div>

      <div className="flex justify-center">
        <DynamicLinkButton to="/">
          <MdKeyboardBackspace className="text-2xl mr-2" />
          Back To Home
        </DynamicLinkButton>
      </div>
    </div>
  );
};

export default Contact;
