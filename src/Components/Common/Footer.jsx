import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h6 className="uppercase font-semibold mb-4">Contact Us</h6>
            <p>
              My Company
              <br />
              Addres: xyz, street number 9
              <br />
              Phone no: XXXX XXXX XX
              <br />
              test@MyCompany
            </p>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h6 className="uppercase font-semibold mb-4">Quick Links</h6>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h6 className="uppercase font-semibold mb-4">Follow Us</h6>
            <ul>
              <li>
                <a href="#" className="text-white hover:underline">
                  Facebook
                </a>
              </li>

              <li>
                <a href="#" className="text-white hover:underline">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h6 className="uppercase font-semibold mb-4">Newsletter</h6>
            <p>
              Sign up for our newsletter to get the latest news and special
              offers.
            </p>
            {/* You can add a form for the newsletter subscription here */}
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} MyCompany Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
