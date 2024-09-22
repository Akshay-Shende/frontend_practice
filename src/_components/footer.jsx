import React from "react";

const Footer = () => {
  return (
    <footer className="container bg-slate-800 text-white h-12">
      <div className="grid grid-cols-3 gap-4 text-center bg-slate-800 py-10">
        <div>
          <h2 className="text-lg font-semibold mb-4">Company</h2>
          <ul className="list-none pl-0 ">
            <li className="">
              <a href="#" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Press
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Resources</h2>
          <ul>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Guides
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact</h2>
          <ul>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Email
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
