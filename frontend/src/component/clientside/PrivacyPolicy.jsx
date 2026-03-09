import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-amber-500">Privacy Policy</h1>
      <p className="mb-4">Welcome to Planit Journey. Your privacy is critically important to us.</p>
      <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
      <p>We collect information to provide better services to all our users, such as your name, email address, and booking preferences when you register for a tour.</p>
      <h2 className="text-xl font-semibold mt-6">2. How We Use Information</h2>
      <p>We use the information we collect to process your bookings, provide customer support, and send you updates about your upcoming trips.</p>
      <div className="mt-10 p-4 bg-gray-100 rounded">
        <p className="text-sm italic">This is a project-based privacy policy for academic purposes.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;