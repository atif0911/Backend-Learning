import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-zinc-600 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">About</h3>
          <p className="text-zinc-500">
            We are passionate about books and providing an easy platform to view
            and add books. Our mission is to connect readers with great
            literature.
          </p>
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <ul className="text-zinc-500">
            <li>Email: info@mybooks.com</li>
            <li>Phone: +91 33-6553-7285</li>
            <li>Address: 69, Red Light Area, Sonagachi</li>
          </ul>
        </div>

        {/* Other Details */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Other</h3>
          <ul className="text-zinc-500">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>© 2025 BookSite. All rights reserved.</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
