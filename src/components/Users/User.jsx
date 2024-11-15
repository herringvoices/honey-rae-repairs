// Import the CSS file for styling the User component
import "./User.css";

// Functional component 'User' that takes 'user' as a prop
export const User = ({ user }) => {
  return (
    <div className="user">
      {/* Name Section */}
      <div>
        {/* Label for Name */}
        <div className="user-info">Name</div>
        {/* Display the full name of the user */}
        <div>{user.fullName}</div>
      </div>

      {/* Email Section */}
      <div>
        {/* Label for Email */}
        <div className="user-info">Email</div>
        {/* Display the email of the user */}
        <div>{user.email}</div>
      </div>
    </div>
  );
};
