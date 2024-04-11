import DynamicLink from "../../components/DynamicLink";
import FrequentlyAskedQuestion from "../../components/FrequentlyAskedQuestion";

const FrequentlyAskedQuestions = () => {
  return (
    <div className="mb-10" data-aos="fade-down" data-aos-duration="1000">
      <h2 className="text-3xl text-center second-font mb-5">
        Frequently Asked Questions
      </h2>

      <div>
        <FrequentlyAskedQuestion collapseTitle="I can't sign in to my account">
          <p>
            {" "}
            If you've forgotten your password, please go to the{" "}
            <DynamicLink to="/sign-in">Sign in</DynamicLink> page and follow the
            link 'Reset Password'.
          </p>
        </FrequentlyAskedQuestion>

        <FrequentlyAskedQuestion collapseTitle="How do I change my password and details?">
          <p>
            To change your password, go to{" "}
            <DynamicLink to="/dashboard">Dashboard</DynamicLink> page and then
            click on{" "}
            <DynamicLink to="/dashboard/my-profile">My Profile</DynamicLink>.
            You can also change or delete personal information, such as your
            image, address, and phone number.
          </p>
        </FrequentlyAskedQuestion>

        <FrequentlyAskedQuestion collapseTitle="How can I delete my account?">
          <p>
            If you wish to delete your account, contact us at{" "}
            <a
              className="text-blue-500 second-font underline-offset-2 underline hover:decoration-wavy"
              href="mailto:alamin931761@gmail.com"
            >
              alamin931761@gmail.com
            </a>{" "}
            so we can proceed erasing your account. This action will result in
            the deletion of all your order history and no rollback will be
            possible.
          </p>
        </FrequentlyAskedQuestion>

        <FrequentlyAskedQuestion collapseTitle="What are the payment options?">
          <p>
            The website accepts credit card and debit card payments from most
            major banks worldwide. We are not able to accept payments by check
            for purchases made online.
          </p>
        </FrequentlyAskedQuestion>

        <FrequentlyAskedQuestion collapseTitle="How long will it take for my refund to be processed?">
          <p>
            Once we have received your return, your refund will take
            approximately 14 days to appear in your account to allow enough time
            for us to process the return.
          </p>
        </FrequentlyAskedQuestion>

        <FrequentlyAskedQuestion collapseTitle="How long do I have to return my items?">
          <p>
            You have a period of 14 (fourteen) days from receipt of your order
            to return an item that does not suit you.
          </p>
        </FrequentlyAskedQuestion>

        <FrequentlyAskedQuestion collapseTitle="Delivery options & deadlines?">
          <p className="font-medium">We propose 2 delivery options:</p>
          <p>
            <span className="font-medium">Home Delivery - Standard:</span>{" "}
            average delivery between 7-10 working days (we don't work on
            week-ends or on public holidays)
          </p>
          <p>
            {" "}
            <span className="font-medium">Home Delivery - Express:</span>
            average delivery between 2-3 working days (we don't work on
            week-ends or on public holidays)
          </p>
        </FrequentlyAskedQuestion>

        <FrequentlyAskedQuestion collapseTitle="What if my order was not delivered or lost?">
          <p>
            If your order was not delivered or lost, please get in touch with
            our Customer Service by email at{" "}
            <a
              className="text-blue-500 second-font underline-offset-2 underline hover:decoration-wavy"
              href="mailto:alamin931761@gmail.com"
            >
              alamin931761@gmail.com
            </a>
            . Our team will contact the carrier to initiate the necessary
            procedures.{" "}
          </p>
        </FrequentlyAskedQuestion>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
