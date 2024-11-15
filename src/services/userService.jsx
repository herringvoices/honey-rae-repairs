export const getNonStaffUsers = () => {
  // Use the fetch API to make a GET request to the local server
  return fetch("http://localhost:8088/users?isStaff=false").then((res) =>
    res.json()
  ); // Convert the response to JSON format
};

export const getStaffUsers = () => {
  return fetch("http://localhost:8088/users?isStaff=true").then((res) =>
    res.json()
  );
};

export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  );
};

export const createUser = (customer) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((res) => res.json());
};

export const assignTicket = (employeeTicket) => {
  return fetch(`http://localhost:8088/employeeTickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employeeTicket),
  });
};
