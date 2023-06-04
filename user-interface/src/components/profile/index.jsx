import React, { useState, useEffect } from "react";
import { getUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser();
        alert(response.message);
        setData(response.data);
      } catch (error) {
        alert(error.message);
        if (error.message === "Unauthorized") {
          navigate("/login");
        }
      }
    };
    fetchData();
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }
  //   console.log(data);
  return (
    <div>
      <h2>Profile Details</h2>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <p>Contact: {data.contact}</p>
      <p>Date of Birth: {data.dateofbirth}</p>
      <p>Gender: {data.gender}</p>
      {/* Render other data properties as needed */}
    </div>
  );
};

export default Profile;
