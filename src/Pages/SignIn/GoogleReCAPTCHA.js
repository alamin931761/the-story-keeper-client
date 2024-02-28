import ReCAPTCHA from "react-google-recaptcha";

const GoogleReCAPTCHA = ({ onChange }) => {
  return (
    <ReCAPTCHA
      className="my-5"
      sitekey={process.env.REACT_APP_google_recaptcha_site_key}
      onChange={onChange}
    />
  );
};

export default GoogleReCAPTCHA;
