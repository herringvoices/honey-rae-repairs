import { useEffect, useState } from "react";
import "./Form.css";
import { createTicketService } from "../../services/ticketService";
import { useNavigate } from "react-router-dom";

export const CreateTicket = ({ currentUser }) => {
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({});

  useEffect(() => {
    setTicket({
      userId: currentUser.id,
      description: "",
      emergency: false,
      dateCompleted: "",
    });
  }, [currentUser]);

  const updateEmergency = (event) => {
    setTicket((prev) => ({
      ...prev,
      emergency: event.target.checked,
    }));
  };

  const updateDescription = (event) => {
    setTicket((prev) => ({
      ...prev,
      description: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTicketService(ticket).then(() => {
      navigate("/tickets");
    });
  };

  return (
    <form>
      <h2>New Service Ticket</h2>
      <fieldset>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={ticket.description}
            onChange={updateDescription}
            className="form-control"
            placeholder="Enter a brief description of the problem"
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label>
            Emergency
            <input
              name="emergency"
              checked={ticket.emergency}
              type="checkbox"
              onChange={updateEmergency}
            />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-info" onClick={handleSubmit}>
            Submit Ticket
          </button>
        </div>
      </fieldset>
    </form>
  );
};
