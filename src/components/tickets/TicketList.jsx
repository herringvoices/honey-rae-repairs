import { useState, useEffect } from "react";
import { getAllTickets } from "../../services/ticketService";
import "./Tickets.css";
import { Ticket } from "./Ticket";
import { StaffFilterBar } from "./StaffFilterBar";
import { CustomerFilterBar } from "./CustomerFilterBar";

export const TicketList = ({ currentUser }) => {
  // State to hold all tickets
  const [allTickets, setAllTickets] = useState([]);
  // State to toggle emergency-only view
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);

  const [showOpenOnly, setShowOpenOnly] = useState(false);
  // State to hold filtered tickets based on emergency status or search input
  const [filteredTickets, setFilteredTickets] = useState([]);
  // State for search input to filter tickets by description
  const [searchInput, setSearchInput] = useState("");

  //Function to get and set the tickets
  const getAndSetTickets = () => {
    getAllTickets().then((ticketsArray) => {
      if (currentUser.isStaff) {
        setAllTickets(ticketsArray);
      } else {
        const customerTickets = ticketsArray.filter(
          (ticket) => ticket.userId === currentUser.id
        );
        setAllTickets(customerTickets);
      }
    });
  };

  // Fetch all tickets once the component mounts
  useEffect(getAndSetTickets, [currentUser]); // Empty dependency array means this runs only once when the component mounts

  // Filter tickets based on the "showEmergencyOnly" toggle
  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter((item) => item.emergency);
      setFilteredTickets(emergencyTickets);
    } else {
      setFilteredTickets(allTickets); // Show all tickets if the emergency filter is off
    }
  }, [showEmergencyOnly, allTickets]); // Runs whenever showEmergencyOnly or allTickets changes

  useEffect(() => {
    if (showOpenOnly) {
      const openTickets = allTickets.filter((item) => !item.dateCompleted);
      setFilteredTickets(openTickets);
    } else {
      setFilteredTickets(allTickets); // Show all tickets if the emergency filter is off
    }
  }, [showOpenOnly, allTickets]);

  // Filter tickets by search input (description)
  useEffect(() => {
    const foundTickets = allTickets.filter((ticket) =>
      ticket.description.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredTickets(foundTickets);
  }, [searchInput, allTickets]); // Runs whenever searchInput or allTickets changes

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>

      {currentUser.isStaff ? (
        // FilterBar handles user input for filters like emergency-only or search
        <StaffFilterBar
          setShowEmergencyOnly={setShowEmergencyOnly}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
      ) : (
        <CustomerFilterBar setShowOpenOnly={setShowOpenOnly} />
      )}

      <article className="tickets">
        {/* Render each ticket in the filtered list */}
        {filteredTickets.map((item) => {
          return (
            <Ticket
              ticket={item}
              currentUser={currentUser}
              key={item.id}
              getAndSetTickets={getAndSetTickets}
            />
          );
        })}
      </article>
    </div>
  );
};
