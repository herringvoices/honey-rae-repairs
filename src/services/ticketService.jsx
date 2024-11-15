export const getAllTickets = () => {
  return fetch(
    `http://localhost:8088/serviceTickets?_embed=employeeTickets`
  ).then((res) => res.json());
};

export const updateTicketDate = (ticket) => {
  return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dateCompleted: new Date(),
    }),
  });
};

export const deleteTicket = (ticket) => {
  return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};

export const createTicketService = (ticket) => {
  return fetch("http://localhost:8088/serviceTickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });
};
