import { Route, Routes, Outlet } from "react-router-dom";
import { EmployeeForm } from "../components/forms/EmployeeForm";
import { CustomerDetails } from "../components/Customers/CustomerDetails";
import { StaffDetails } from "../components/Staff/StaffDetails";
import { TicketList } from "../components/tickets/TicketList";
import { CustomerList } from "../components/Customers/Customers";
import { StaffList } from "../components/Staff/Staff";
import { Welcome } from "../components/welcome/Welcome";
import { StaffNavBar } from "../components/nav/StaffNavBar";

export const EmployeeViews = ({ currentUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <StaffNavBar />
            <Outlet />
            {/* Outlet will render the index route or other nested routes */}
          </>
        }
      >
        {/* Index route for the home page */}
        <Route index element={<Welcome />} />

        {/* Other nested routes */}
        <Route
          path="tickets"
          element={<TicketList currentUser={currentUser} />}
        />
        <Route path="customers">
          <Route index element={<CustomerList />} />
          <Route path=":customerId" element={<CustomerDetails />} />
        </Route>
        <Route path="staff">
          <Route index element={<StaffList />} />
          <Route path=":staffId" element={<StaffDetails />} />
        </Route>
        <Route
          path="profile"
          element={<EmployeeForm currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
