import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// CLIENT SIDE IMPORTS
import Home from "./component/clientside/Home";
import Register from "./component/clientside/Register";
import Login from "./component/clientside/Login";
import Profile from "./component/clientside/Profile";
import Tours from "./component/clientside/Tours";
import OneTourSection1 from "./component/clientside/OneTourSection1";
import Blogs from "./component/clientside/Blogs";
import SingleBlog from "./component/clientside/SingleBlog";
import ContactUs from "./component/clientside/ContactUs";
import VirtualTours from "./component/clientside/VirtualTours";
import Reviews from "./component/clientside/Reviews";
import TestReview from "./component/clientside/TestReview";
import PaymentPage from "./component/clientside/PaymentPage";
import Map from "./component/clientside/Map";
import View from "./component/clientside/360View";
import LocMap from "./component/clientside/LocMap";
import Chatbot from "./component/clientside/Chatbot";
import UserAllBookings from "./component/clientside/UserAllBookings";

// ADMIN SIDE IMPORTS
import Dashboard from "./component/adminside/Dashboard";
import AdminSignIn from "./component/adminside/Adminsignin"; // Check if it's AdminSignIn or Adminsignin
import AdminLog from "./component/adminside/adminlog";
import AllTours from "./component/adminside/AllTours";
import AddTours from "./component/adminside/AddTours";
import UpdateTours from "./component/adminside/UpdateTours";
import AddDest from "./component/adminside/AddDesPoint";
import Onedest from "./component/adminside/Onedest";
import EditDes from "./component/adminside/EditDes";
import UpdateDes from "./component/adminside/UpdateDes";
import OneUpdateDes from "./component/adminside/OneUpdateDes";
import AllContactUs from "./component/adminside/AllContactUs";
import AllCResponse from "./component/adminside/AllCResponse";
import ContactUsRes from "./component/adminside/ContactUsRes";
import ClientsDetails from "./component/adminside/ClientsDetails";
import AdminAllBookings from "./component/adminside/AdminAllBookings";
import ViewBooking from "./component/adminside/ViewBooking";
import UpdateBooking from "./component/adminside/UpdateBooking";
import AllTestReview from "./component/adminside/AllTestReview";
import AddBlog from "./component/adminside/AddBlog";
import AllBlog from "./component/adminside/AllBlog";
import UpdateBlog from "./component/adminside/UpdateBlog";
import AddVirtualTour from "./component/adminside/AddVirtualTour";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* CLIENT SIDE ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<OneTourSection1 />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/singleBlog/:id" element={<SingleBlog />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/virtualtours" element={<VirtualTours />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/testreview" element={<TestReview />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/map2/:id" element={<LocMap />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/bookings/user/:id" element={<UserAllBookings />} />

        {/* ADMIN SIDE ROUTES */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/adminsignin" element={<AdminSignIn />} />
        <Route path="/adminLog" element={<AdminLog />} />
        <Route path="/alltours" element={<AllTours />} />
        <Route path="/addTours" element={<AddTours />} />
        <Route path="/updateTours" element={<UpdateTours />} />
        <Route path="/updateTours/:id" element={<UpdateTours />} />
        <Route path="/adddes/:id" element={<AddDest />} />
        <Route path="/getdes" element={<Onedest />} />
        <Route path="/editdes/:id" element={<EditDes />} />
        <Route path="/updatedes/:id" element={<UpdateDes />} />
        <Route path="/oneupdatedes/:id" element={<OneUpdateDes />} />
        <Route path="/allcontactus" element={<AllContactUs />} />
        <Route path="/allcresponse" element={<AllCResponse />} />
        <Route path="/contactus/:id" element={<ContactUsRes />} />
        <Route path="/clientsdetails" element={<ClientsDetails />} />
        <Route path="/bookings" element={<AdminAllBookings />} />
        <Route path="/bookings/:id" element={<ViewBooking />} />
        <Route path="/update/:id" element={<UpdateBooking />} />
        <Route path="/alltestreview" element={<AllTestReview />} />
        <Route path="/addBlog" element={<AddBlog />} />
        <Route path="/AllBlog" element={<AllBlog />} />
        <Route path="/updateBlog" element={<UpdateBlog />} />
        <Route path="/updateBlog/:id" element={<UpdateBlog />} />
        <Route path="/addvirtualtour" element={<AddVirtualTour />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;