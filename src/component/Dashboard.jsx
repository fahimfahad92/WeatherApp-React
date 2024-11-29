import AdvancedModal from "./SimplePopup";

export default function Dashboard({ handleLogout }) {
  return (
    <>
      <div>Dahsboard Page</div>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
