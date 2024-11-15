import { useEffect, useState } from "react";
import { getEmployeeByUserId } from "../../services/employeeService";
import { useParams } from "react-router-dom";

export const StaffDetails = () => {
  const [staff, setStaff] = useState({});
  const { staffId } = useParams();

  useEffect(() => {
    getEmployeeByUserId(staffId).then((item) => setStaff(item[0]));
  }, [staffId]);

  return (
    <section className="employee">
      <header className="employee-header">{staff.user?.fullName}</header>

      <div>
        <span className="employee-info">Email: </span>
        {staff.user?.email}
      </div>
      <div>
        <span className="employee-info">Specialty: </span>
        {staff.specialty}
      </div>
      <div>
        <span className="employee-info">Rate: </span>${staff.rate}
      </div>
      <footer className="employee-footer">
        Currently working on {staff.employeeTickets?.length} tickets.
      </footer>
    </section>
  );
};
