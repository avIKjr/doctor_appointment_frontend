import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCertificate,
  faCheck,
  faThumbsUp,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { Outlet, Link } from "react-router-dom";

function Details() {
  const location = useLocation();
  const [position] = useState(location.state.name);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState();

  useEffect(() => {
    var d = new Date().getDay();
    axios
      .get(`https://doctor-appointment-backend-7ovs.onrender.com/getAllDoctorsBasedOnDept/${position}`)
      .then((response) => {
        setDoctors(response.data[0].doctor);
        setDate(d);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [position]);

  return (
    <div className="container-fluid text-center">
      <h1 className="p-3 fw-bold">{position}</h1>
      <Link to="/">
        <FontAwesomeIcon
          icon={faHouse}
          size="2xl"
          style={{ color: "#5a07f2" }}
          className="mb-4"
        />
      </Link>
      <div>
        {loading === true ? (
          <div
            className="spinner-border text-primary m-5 p-5 text-center"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="container text-center">
            <hr />
            {doctors
              ? doctors.map((item, index) => {
                  return (
                    <div key={index}>
                      <div
                        className="card doctors_card"
                        style={{ width: "100%" }}
                      >
                        <div className="row g-0">
                          <div className="col-md-4 text-center">
                            <img
                              src={item.image}
                              className="img-fluid image"
                              alt="..."
                            />
                            <FontAwesomeIcon
                              icon={faCertificate}
                              size="2xl"
                              style={{ color: "#8904f6" }}
                              className="verified"
                            />
                            <FontAwesomeIcon
                              icon={faCheck}
                              size="lg"
                              style={{ color: "#fcfcfc" }}
                              className="verified1"
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body text-start">
                              <h5 className="card-title fw-bold">
                                {item.name}
                              </h5>
                              <p className="card-text">
                                <small className="text-body-secondary ">
                                  {position}
                                  <br />
                                  {item.experience} years experience overall
                                  <br />
                                  <strong>{item.address.city}</strong> |{" "}
                                  {item.address.clinic}
                                  <br />
                                  {item.fees} Consultation fee at clinic
                                  <hr />
                                  <span className="d-flex justify-content-between">
                                    <span>
                                      <span className="likeBox p-1 rounded me-4">
                                        <FontAwesomeIcon
                                          icon={faThumbsUp}
                                          style={{ color: "#ffffff" }}
                                        />
                                        &nbsp;
                                        {item.ratings}%
                                      </span>
                                      <span>
                                        <a
                                          href="*"
                                          className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                        >
                                          {item.patient_count} patient counts
                                        </a>
                                      </span>
                                      <br />
                                      {date !== item.not_available ? (
                                        <p className="mt-2">
                                          <FontAwesomeIcon
                                            icon={faCalendarDays}
                                            style={{ color: "#08c90c" }}
                                          />{" "}
                                          Available Today
                                        </p>
                                      ) : (
                                        <p className="mt-2">
                                          <FontAwesomeIcon
                                            icon={faCalendarDays}
                                            style={{ color: "#ff0505" }}
                                          />{" "}
                                          Not Available Today
                                        </p>
                                      )}
                                    </span>
                                    <span className="align-items-end">
                                      <button
                                        type="button"
                                        className="fw-bold white rounded"
                                      >
                                        Book Appointment <br />
                                        <small className="">
                                          No Booking Fee
                                        </small>
                                      </button>
                                    </span>
                                  </span>
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                  );
                })
              : null}
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
}
export default Details;
