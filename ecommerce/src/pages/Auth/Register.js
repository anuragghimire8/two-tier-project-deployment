import React, { useState } from "react";
import Layout from "./../../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer,setAnswer]=useState('')
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState(""); // New state for phone error
  const [addressError, setAddressError] = useState(""); // New state for address error
  const [answerError, setAnswerError] = useState(""); // New state for answer error
  
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

    // Answer format validation (alphabet-only)
    if (!answer || !/^[a-zA-Z\s]+$/.test(answer.trim())) {
      setAnswerError("Valid alphabet-only answer is required");
      return;
    }
   
      // Name format validation
      if (!/^[a-zA-Z\s]+$/.test(name)) {
        setNameError("Invalid name format.Alphabets required");
        return;
      }
     // Email format validation
const emailRegex = /^[a-zA-Z]\S*@\S+\.\S+$/;
if (!emailRegex.test(email)) {
  setEmailError("Invalid Email");
  return;
}
const passwordRegex = /^.{5,}$/;
if (!password || !passwordRegex.test(password)) {
  setPasswordError(
    "Reuire Strong One."
  );
  return;
}
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error("Already Registerd");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(""); // Clear name error on input change
            }}
            className={`form-control ${nameError ? "is-invalid" : ""}`}
            id="exampleInputEmail1"
            placeholder="Enter Your Name"
            required
            autoFocus
          />
          {nameError && <div className="invalid-feedback">{nameError}</div>}
          </div>
          <div className="mb-3">
            <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // Clear email error on input change
            }}
            className={`form-control ${emailError ? "is-invalid" : ""}`}
            id="exampleInputEmail1"
            placeholder="Enter Your Username"
            required
          />
          {emailError && <div className="invalid-feedback">{emailError}</div>}
          </div>
          <div className="mb-3">
            <input
            type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
              className={`form-control ${passwordError ? "is-invalid" : ""}`}
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
            {passwordError && (
              <div className="invalid-feedback">{passwordError}</div>
            )}
          </div>
          <div className="mb-3">
            <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`form-control ${phoneError ? "is-invalid" : ""}`}
            id="exampleInputPhone"
            placeholder="Enter Your Phone"
            required
          />
          {phoneError && <div className="invalid-feedback">{phoneError}</div>}
        </div>

        <div className="mb-3">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`form-control ${addressError ? "is-invalid" : ""}`}
            id="exampleInputAddress"
            placeholder="Enter Your Address"
            required
          />
          {addressError && <div className="invalid-feedback">{addressError}</div>}
        </div>

        <div className="mb-3">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={`form-control ${answerError ? "is-invalid" : ""}`}
            id="exampleInputAnswer"
            placeholder="What is Your Favorite sports"
            required
          />
          {answerError && <div className="invalid-feedback">{answerError}</div>}
        </div>

          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;