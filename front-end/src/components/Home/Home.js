import "./home.css";

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="main_container">
      <nav className="navbar">
        <h1>Parking Tickets</h1>
        <button className="white_btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Home;
