import { useState, useEffect } from "react";
import { getAllEmployees } from "../../services/employeeService";
import { assignTicket } from "../../services/userService";
import { deleteTicket, updateTicketDate } from "../../services/ticketService";

export const Ticket = ({ ticket, currentUser, getAndSetTickets }) => {
  const [employees, setEmployees] = useState([]);
  const [assignedEmployee, setAssignedEmployee] = useState({});

  useEffect(() => {
    getAllEmployees().then((employeesArray) => setEmployees(employeesArray));
  }, []);

  useEffect(() => {
    const foundEmployee = employees.find(
      (item) => ticket.employeeTickets[0]?.employeeId === item.id
    );
    setAssignedEmployee(foundEmployee);
  }, [employees, ticket]);

  const handleClaim = () => {
    const currentEmployee = employees.find(
      (employee) => employee.userId === currentUser.id
    );
    const newEmployeeTicket = {
      employeeId: currentEmployee.id,
      serviceTicketId: ticket.id,
    };
    assignTicket(newEmployeeTicket).then(() => getAndSetTickets());
  };

  const handleClose = () => {
    updateTicketDate(ticket).then(() => getAndSetTickets());
  };

  const handleDelete = () => {
    deleteTicket(ticket).then(() => getAndSetTickets());
  };

  return (
    <section className="ticket" key={ticket.id}>
      <header className="ticket-info">#{ticket.id}</header>
      <div>{ticket.description}</div>
      <footer>
        <div>
          <div className="ticket-info">assignee</div>
          <div>
            {assignedEmployee ? assignedEmployee.user?.fullName : "None"}
          </div>
        </div>
        <div>
          <div className="ticket-info">Emergency</div>
          <div>{ticket.emergency ? "yes" : "no"}</div>
        </div>
        <div className="btn-container">
          {/* If the logged in user is an employee and there's no employee ticket associated with the service ticket, then a button to claim the ticket should display. */}
          {currentUser.isStaff && !assignedEmployee ? (
            <button className="btn btn-secondary" onClick={handleClaim}>
              Claim
            </button>
          ) : (
            ""
          )}
          {/* If the logged in use is the assigned employee for the ticket and there is no dateCompleted, then a button to close the ticket should display. */}
          {currentUser.id === assignedEmployee?.userId &&
          !ticket.dateCompleted ? (
            <button className="btn btn-warning" onClick={handleClose}>
              Close
            </button>
          ) : (
            ""
          )}

          {!currentUser.isStaff ? (
            <button className="btn btn-warning" onClick={handleDelete}>
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      </footer>
    </section>
  );
};
