import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import Card from "../clientside/Card";
import { User, Mail, Phone, Globe, Calendar, MapPin } from "lucide-react";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  // ... (keep your decodeToken and fetchUserData logic here) ...

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10 p-4">
        <Card noPadding={true}>
          {/* Header using your Chatbot yellow color */}
          <div className="p-10 bg-[#f8c12a] text-center rounded-t-lg">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border-4 border-white shake">
               <User size={48} className="text-[#f8c12a]" />
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-wider text-black">
              User Profile
            </h2>
          </div>

          <div className="p-8 bg-white rounded-b-lg">
            {userData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                
                <ProfileField icon={<User size={18}/>} label="First Name" value={userData.firstname} />
                <ProfileField icon={<User size={18}/>} label="Last Name" value={userData.lastname} />
                <ProfileField icon={<Mail size={18}/>} label="Email" value={userData.email} />
                <ProfileField icon={<Phone size={18}/>} label="Phone" value={userData.phone} />
                <ProfileField icon={<Calendar size={18}/>} label="Birthdate" value={userData.birthdate} />
                <ProfileField icon={<Globe size={18}/>} label="Country" value={userData.country} />

              </div>
            ) : (
              <div className="text-center py-10 font-bold animate-pulse">Loading...</div>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

// Sub-component to handle the "Proper" CSS shapes
const ProfileField = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    {/* This is the Icon Shape Container */}
    <div className="custom-icon-button w-12 h-12 bg-[#f8c12a] rounded-xl flex items-center justify-center text-black shadow-md flex-shrink-0">
      {icon}
    </div>
    
    <div className="border-b border-gray-100 w-full pb-1">
      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{label}</p>
      <p className="text-gray-800 font-semibold">{value || "---"}</p>
    </div>
  </div>
);

export default Profile;