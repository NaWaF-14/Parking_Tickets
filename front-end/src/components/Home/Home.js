import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const navigate = useNavigate();

  const [parking, setParking] = useState([]);
  const [modal, setModal] = useState();
  const [parkingPage, setParkingPage] = useState(true);
  const [ticketPage, setTicketPage] = useState(false);
  const [data, setData] = useState({
    startDate: "",
    endDate: "",
    price: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/parking/")
      .then((res) => {
        setParking(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleModal = (id) => {
    setModal(id);
  };

  const closeModal = () => {
    setModal("");
  };

  const handleTicketPage = () => {
    setParkingPage(false);
    setTicketPage(true);
  };

  const handleParkingPage = () => {
    setTicketPage(false);
    setParkingPage(true);
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (id, e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/ticket/" + id;
      const { data: res } = await axios.post(url, data);
      navigate("/");
      console.log(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main_container">
      <nav className="navbar">
        <h1>Parking Tickets</h1>
        <div>
          <Link to="/" className="tabs" onClick={handleParkingPage}>
            Parking
          </Link>
        </div>
        <div>
          <Link to="/" className="tabs" onClick={handleTicketPage}>
            My Tickets
          </Link>
        </div>
        <button className="white_btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      {parkingPage && (
        <div className="box_container">
          {parking.map((item) => (
            <>
              <Card className="box text-center">
                <Card.Header>Location: {item.parkingLocation}</Card.Header>
                <Card.Body>
                  <Card.Title>City: {item.city}</Card.Title>
                  <Card.Text>Parking left: {item.parkingNumber}</Card.Text>
                  <button
                    className="navy_btn"
                    onClick={() => handleModal(item._id)}
                  >
                    Purchase
                  </button>
                </Card.Body>
              </Card>
              <Modal show={modal === item._id} onHide={closeModal}>
                <Modal.Header closeButton>{item.parkingLocation}</Modal.Header>
                <Modal.Body>
                  <form className="form_container" onSubmit={handleSubmit}>
                    <h1>Scheduling the Ticket</h1>
                    <input
                      type="date"
                      name="startDate"
                      onChange={handleChange}
                      value={data.startDate}
                      required
                      className="input"
                    />
                    <input
                      type="date"
                      name="endDate"
                      onChange={handleChange}
                      value={data.endDate}
                      required
                      className="input"
                    />
                    <button
                      type="submit"
                      className="navy_btn"
                      onSubmit={() => handleSubmit(item._id)}
                    >
                      Purchase
                    </button>
                  </form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal>
            </>
          ))}
        </div>
      )}
      {ticketPage && <div className="box_container"></div>}
    </div>
  );
};

export default Home;
