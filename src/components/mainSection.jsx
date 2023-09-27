import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://doctor-appointment-backend-7ovs.onrender.com/allCategories")
      .then(function (response) {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const handleClick = (position, id) => {
    navigate(`/details`, { state: { id: `${id}`, name: `${position}` } });
  };

  return (
    <div className="container-fluid text-center">
      <h1 className="p-3 fw-bold">
        <FontAwesomeIcon
          icon={faPlus}
          beatFade
          size="lg"
          style={{ color: "#4cb269" }}
        />{" "}
        Find The Best Doctors Here
      </h1>
      <div className="container text-start mt-5">
        <h2>Book an Appointment for an in-clinic consultation</h2>
        <h5>Find experienced doctors across all specialties</h5>
        <div className="text-center">
          {loading === true ? (
            <div
              className="spinner-border text-primary m-5 p-5 text-center"
              role="status"
            >
              <span className="visually-hidden text-center">Loading...</span>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-sm-2 g-4 mt-3">
              {categories
                ? categories.map((item, index) => {
                    return (
                      <div
                        className="col category"
                        key={index}
                        onClick={() => handleClick(item.position, item.id)}
                      >
                        <div className="card h-100">
                          <img
                            src={item.image}
                            className="card-img-top"
                            alt="..."
                            style={{ height: "220px" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.position}</h5>
                            <p className="card-text">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Category;
