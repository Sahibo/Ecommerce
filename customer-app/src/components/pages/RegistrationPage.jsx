import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/reducer";

export default function RegistrationPage() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    dispatch(registerUser({ email, password }));
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="@example.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
