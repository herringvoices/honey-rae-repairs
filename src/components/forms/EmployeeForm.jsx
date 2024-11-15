import { useEffect, useState } from "react";
import "./Form.css";
import {
  getEmployeeByUserId,
  setEmployeeChange,
} from "../../services/employeeService";
import { useNavigate } from "react-router-dom";

export const EmployeeForm = ({ currentUser }) => {
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeByUserId(currentUser?.id).then((item) => setEmployee(item[0]));
  }, [currentUser]);

  const handleSave = (event) => {
    event.preventDefault();
    const editedEmployee = {
      id: employee.id,
      specialty: employee.specialty,
      rate: employee.rate,
      userId: employee.userId,
    };
    setEmployeeChange(editedEmployee).then(() => {
      navigate(`/staff/${currentUser.id}`);
    });
  };

  return (
    <form className="profile">
      <h2>Update Profile</h2>
      <fieldset>
        <div className="form-group">
          <label>Specialty:</label>
          <input
            type="text"
            value={employee.specialty}
            onChange={(event) => {
              const copy = { ...employee };
              copy.specialty = event.target.value;
              setEmployee(copy);
            }}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Hourly Rate:</label>
          <input
            type="number"
            value={employee.rate}
            onChange={(event) => {
              const copy = { ...employee };
              copy.rate = event.target.value;
              setEmployee(copy);
            }}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-primary" onClick={handleSave}>
            Save Profile
          </button>
        </div>
      </fieldset>
    </form>
  );
};
