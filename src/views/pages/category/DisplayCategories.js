import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import { getCatgories } from "../../../services/Category";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../actions/Action";

const DisplayCategories = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const loadCategories = useCallback(() => {
    dispatch(showLoader());
    getCatgories()
    .then((data) => {
        console.log(Object.values(data)); // Log the response data
       dispatch(hideLoader());
       const dataofobj=Object.values(data);
        setCategories(dataofobj[0]); // Assuming the response is an array of categories
      })
      .catch((error) => {
        dispatch(hideLoader());
        setError(error.message || "Error occurred while fetching data");
      });
  }, [dispatch]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Nav>
    {categories.map((category, index) => (
      <Nav.Item key={index}>
        <Nav.Link to={`/category/${category._id}`} className="m-0"> {/* Assuming _id is the category ID */}
          <span className="d-lg-block"> {category.name}</span>
        </Nav.Link>
      </Nav.Item>
    ))}
  </Nav>
  
  );
};

export default DisplayCategories;
