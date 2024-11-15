import { useEffect, useState } from "react";
import { User } from "../Users/User"; // Importing the User component to display individual users
import { getNonStaffUsers } from "../../services/userService.jsx";
import "./Customers.css"; // Importing CSS for styling
import { Link } from "react-router-dom";

export const CustomerList = () => {
  // Declare state for customers, initialized to an empty array
  const [customers, setCustomers] = useState([]);

  // useEffect to fetch customer data on component mount
  useEffect(() => {
    // Call service to get non-staff users and set the state with the fetched data
    getNonStaffUsers().then((customerArray) => {
      setCustomers(customerArray); // Update customers state with the fetched array
    });
  }, []); // Empty dependency array means this effect runs only once (on mount)

  return (
    <div className="customers">
      {/* Map over the customers array and render a User component for each customer */}
      {customers.map((customerObj) => {
        return (
          <Link to={`/customers/${customerObj.id}`} key={customerObj.id}>
            <User user={customerObj} key={customerObj.id} />
          </Link>
        ); // Render User component, passing customer object as a prop
      })}
    </div>
  );
};
