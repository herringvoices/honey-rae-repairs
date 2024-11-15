import { useEffect, useState } from "react";
import { User } from "../Users/User"; // Importing the User component to display individual users
import { getStaffUsers } from "../../services/userService";
import "./Staff.css"; // Importing CSS for styling
import { Link } from "react-router-dom";

export const StaffList = () => {
  // Declare state for staff, initialized to an empty array
  const [staff, setStaff] = useState([]);

  // useEffect to fetch staff data on component mount
  useEffect(() => {
    // Call service to get staff users and set the state with the fetched data
    getStaffUsers().then((staffArray) => {
      setStaff(staffArray); // Update staff state with the fetched array
    });
  }, []); // Empty dependency array means this effect runs only once (on mount)

  return (
    <div className="employees">
      {/* Map over the staff array and render a User component for each staff */}
      {staff.map((staffObj) => {
        return (
          <Link to={`/staff/${staffObj.id}`} key={staffObj.id}>
            <User user={staffObj} key={staffObj.id} />
          </Link>
        );
      })}
    </div>
  );
};
