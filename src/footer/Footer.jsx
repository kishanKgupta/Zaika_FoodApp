import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-4">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">About Us</h2>
            <p className="text-sm">
              We provide the best resources and tools for developers to enhance
              their skills.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h2>
            <ul className="space-y-2">
              {["Home", "Features", "Pricing", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Resources</h2>
            <ul className="space-y-2">
              {["Blog", "Docs", "API", "Support"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">
              Newsletter
            </h2>
            <p className="text-sm mb-4">
              Subscribe to our newsletter to get updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-l bg-gray-800 text-white border border-gray-600"
              />
              <button className="bg-red-500 px-4 py-2 rounded-r text-white hover:bg-red-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between text-sm">
          <p>&copy; 2025 Your Company. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
