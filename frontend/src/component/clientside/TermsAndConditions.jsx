import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-amber-500">Terms & Conditions</h1>
      <p className="mb-4">By using Planit Journey, you agree to the following terms.</p>
      <h2 className="text-xl font-semibold mt-6">1. Booking & Payments</h2>
      <p>All tour bookings are subject to availability. Payments must be cleared at least 7 days before the tour date.</p>
      <h2 className="text-xl font-semibold mt-6">2. Cancellation Policy</h2>
      <p>Cancellations made within 48 hours of the tour start time may not be eligible for a full refund.</p>
      <h2 className="text-xl font-semibold mt-6">3. User Conduct</h2>
      <p>Users must provide accurate information during registration and follow the safety guidelines provided by tour guides.</p>
    </div>
  );
};

export default TermsAndConditions;