import React, { useState, useEffect } from "react";
import Card from "../clientside/Card";
import Layout from "./Layout";
import axios from "axios";
// Importing small, clean icons
import { User, Mail, Phone, Globe, Calendar, MapPin } from "lucide-react";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    decodeToken();
  }, []);

  const decodeToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const tokenParts = token.split(".");
        const decodedPayload = JSON.parse(atob(tokenParts[1]));
        fetchUserData(decodedPayload.id);
      } catch (e) {
        console.error("Token decoding failed", e);
      }
    }
  };

  const fetchUserData = async (userId) => {
    try {
      // Corrected URL path to match your server.js prefix
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-10 px-4">
        <Card noPadding={true}>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Header Section */}
            <div className="bg-amber-500 p-8 text-white">
              <h2 className="text-3xl font-bold">Account Profile</h2>
              <p className="opacity-90">Manage your personal information and travel preferences</p>
            </div>

            <div className="p-8">
              {userData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  
                  {/* Reuseable Profile Item Component */}
                  <ProfileItem 
                    icon={<User size={18} />} 
                    label="Full Name" 
                    value={`${userData.firstname} ${userData.lastname}`} 
                  />

                  <ProfileItem 
                    icon={<Mail size={18} />} 
                    label="Email Address" 
                    value={userData.email} 
                  />

                  <ProfileItem 
                    icon={<Calendar size={18} />} 
                    label="Date of Birth" 
                    value={new Date(userData.birthdate).toLocaleDateString()} 
                  />

                  <ProfileItem 
                    icon={<Globe size={18} />} 
                    label="Country" 
                    value={userData.country} 
                  />

                  <ProfileItem 
                    icon={<Phone size={18} />} 
                    label="Phone Number" 
                    value={userData.phone || "Not provided"} 
                  />

                  <ProfileItem 
                    icon={<MapPin size={18} />} 
                    label="Username" 
                    value={`@${userData.username}`} 
                  />

                </div>
              ) : (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

// Sub-component for the Info Rows
const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    {/* Icon Shape Container */}
    <div className="flex-shrink-0 w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
      {icon}
    </div>
    <div>
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
        {label}
      </label>
      <p className="text-gray-800 font-medium text-lg mt-0.5">{value}</p>
    </div>
  </div>
);

export default Profile;