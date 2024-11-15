export const StaffFilterBar = ({
  setShowEmergencyOnly,
  setSearchInput,
  searchInput,
}) => {
  return (
    <div className="filter-bar">
      <button
        className="filter-btn btn-primary"
        onClick={() => setShowEmergencyOnly(true)}
      >
        Emergency
      </button>
      <button
        className="filter-btn btn-info"
        onClick={() => setShowEmergencyOnly(false)}
      >
        Show All
      </button>

      <input
        type="text"
        placeholder="Search Tickets"
        className="ticket-search"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
    </div>
  );
};
