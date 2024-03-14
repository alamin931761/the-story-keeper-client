import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer className="footer footer-center p-10 bg-black text-base-content">
      <div>
        <div className="grid grid-flow-col gap-4">
          <a target="_blank" href="https://www.facebook.com/alamin931761/">
            <FaFacebookF className="social-icon text-4xl" />
          </a>
          <a target="_blank" href="https://twitter.com/AlAmin17401991">
            <FaTwitter className="social-icon text-4xl" />
          </a>
          <a target="_blank" href="https://www.instagram.com/alamin931761/">
            <FaInstagram className="social-icon text-4xl" />
          </a>
        </div>
      </div>
      <div>
        <p className="text-white">
          Copyright &copy; {year} - All right reserved by The Story Keeper
        </p>
      </div>
    </footer>
  );
};

export default Footer;
