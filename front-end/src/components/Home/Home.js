import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const baseURL = "http://localhost:8080";
  // handle the log out from the system
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const navigate = useNavigate();

  // to decode the token in localstorage
  const parseJwt = (token) => {
    var base64url = token.split(".")[1];
    var base64 = decodeURIComponent(
      atob(base64url)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(base64)._id;
  };

  // get the userID from the token
  const userID = parseJwt(localStorage.getItem("token"));

  // to handle all things in the page
  const [parking, setParking] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [modal, setModal] = useState();
  const [parkingPage, setParkingPage] = useState(true);
  const [ticketPage, setTicketPage] = useState(false);
  const [data, setData] = useState({
    startDate: "",
    endDate: "",
    price: 5,
  });
  const [editData, setEditData] = useState({
    startDate: "",
    endDate: "",
    price: "",
  });

  // get all the parking from the back-end
  useEffect(() => {
    axios
      .get(baseURL + "/parking/")
      .then((res) => {
        setParking(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get all user tickets
  useEffect(() => {
    axios
      .get(baseURL + "/ticket/" + userID)
      .then((res) => {
        setTicket(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // handle the modal
  const handleModal = (id) => {
    setModal(id);
  };

  // to close the modal
  const closeModal = () => {
    setModal("");
  };

  // to switch to the ticket page
  const handleTicketPage = () => {
    setParkingPage(false);
    setTicketPage(true);
  };

  // to switch to the parking page
  const handleParkingPage = () => {
    setTicketPage(false);
    setParkingPage(true);
  };

  // to handle the input change
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // to handle the edit input change
  const handleEditChange = ({ currentTarget: input }) => {
    setEditData({ ...editData, [input.name]: input.value });
  };

  // to handle the purchase request
  const handleSubmit = async (id) => {
    try {
      const { data: res } = await axios.post(
        baseURL + "/ticket/" + userID + "/" + id,
        data
      );
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // to handle the change on edit ticket
  const handleEditSubmit = async (id) => {
    try {
      const { editData: res } = await axios.put(
        baseURL + "/ticket/" + id,
        editData
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // to handle delete ticket
  const handleDeleteTicket = async (id) => {
    try {
      const result = await axios.put(baseURL + "/ticket/delete/" + id, "");
      console.log(result);
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
                  <form
                    className="form_container"
                    onSubmit={() => handleSubmit(item._id)}
                  >
                    <h1>Scheduling the Ticket</h1>
                    <input
                      type="text"
                      name="startDate"
                      onChange={handleChange}
                      value={data.startDate}
                      required
                      className="input"
                    />
                    <input
                      type="text"
                      name="endDate"
                      onChange={handleChange}
                      value={data.endDate}
                      required
                      className="input"
                    />
                    <button type="submit" className="navy_btn">
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
      {/* --- User Ticket page --- */}
      {ticketPage && (
        <div className="box_container">
          {ticket.map((tic) => (
            <>
              <Card className="box text-center">
                <Card.Header>
                  Location: {tic.parkingLocation.parkingLocation}
                </Card.Header>
                <Card.Body>
                  <Card.Title>Price: {tic.price}</Card.Title>
                  <Card.Text>Start Date: {tic.startDate}</Card.Text>
                  <Card.Text>End Date: {tic.endDate}</Card.Text>
                  <button
                    className="navy_btn"
                    onClick={() => handleModal(tic._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="red_btn"
                    onClick={() => handleDeleteTicket(tic._id)}
                  >
                    Delete
                  </button>
                </Card.Body>
              </Card>
              <Modal show={modal === tic._id} onHide={closeModal}>
                <Modal.Header closeButton>
                  {tic.parkingLocation.parkingLocation}
                </Modal.Header>
                <Modal.Body>
                  <form
                    className="form_container"
                    onSubmit={() => handleEditSubmit(tic._id)}
                  >
                    <h1>Re-scheduling the Ticket</h1>
                    <input
                      type="date"
                      name="startDate"
                      onChange={handleEditChange}
                      value={editData.startDate}
                      required
                      className="input"
                    />
                    <input
                      type="date"
                      name="endDate"
                      onChange={handleEditChange}
                      value={editData.endDate}
                      required
                      className="input"
                    />
                    <button type="submit" className="navy_btn">
                      Edit
                    </button>
                  </form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
