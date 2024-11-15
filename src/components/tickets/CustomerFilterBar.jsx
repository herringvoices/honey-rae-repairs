import { useNavigate } from "react-router-dom";

export const CustomerFilterBar = ({ setShowOpenOnly }) => {
  const navigate = useNavigate();
  return (
    <div className="filter-bar">
      <button
        className="filter-btn btn-primary"
        onClick={() => navigate("/tickets/create")}
      >
        Create Ticket
      </button>
      <button
        className="filter-btn btn-info"
        onClick={() => setShowOpenOnly(true)}
      >
        Open Tickets
      </button>
      <button
        className="filter-btn btn-secondary"
        onClick={() => setShowOpenOnly(false)}
      >
        All My Tickets
      </button>
    </div>
  );
};
