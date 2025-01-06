import Lottie from "lottie-react";
import animationData from "../../Animation - 1733596939443.json";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-700 text-white pl-2 py-7">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Website Info */}
          <div>
            <div className="flex items-center">
            <h3 className="text-xl font-bold mb-4 mr-1">Skyline Visas
            </h3>
            <div className="text-center ">

               <Lottie animationData={animationData} loop={true} className=" w-12" />
             </div>
            </div>
            <p>Your trusted platform for managing visa applications and tracking progress seamlessly.</p>
            <p className="mt-2 text-sm">© {new Date().getFullYear()} Skyline Visas
            . All rights reserved.</p>
          </div>
  
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p>Email: fazlullahtamim003@gmail.com
            </p>
            <p>Phone: 01791430459</p>
            <p>Address: Azimpur, Dhaka, Bangladesh</p>
          </div>
  
          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                 <FaFacebook></FaFacebook> Facebook
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <FaTwitter></FaTwitter> Twitter
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
               <FaInstagram></FaInstagram> Instagram
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                <FaLinkedin></FaLinkedin> LinkedIn
              </a>
            </div>
          </div>
        </div>
  
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
          
        </div>
      </footer>
    );
};

export default Footer;