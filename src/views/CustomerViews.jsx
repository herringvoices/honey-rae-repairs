import { Outlet, Route, Routes } from "react-router-dom";
import { Welcome } from "../components/welcome/Welcome";
import { CustomerNavBar } from "../components/nav/CustomerNavBar";
import { TicketList } from "../components/tickets/TicketList";
import { CreateTicket } from "../components/forms/CreateTicket";

export const CustomerViews = ({ currentUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <CustomerNavBar />
            <Outlet />
            {/* Outlet will render the index route or other nested routes */}
          </>
        }
      >
        {/* Index route for the home page */}
        <Route index element={<Welcome />} />
        <Route path="tickets">
          <Route index element={<TicketList currentUser={currentUser} />} />
          <Route
            path="create"
            element={<CreateTicket currentUser={currentUser} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
