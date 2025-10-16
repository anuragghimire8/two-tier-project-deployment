import React from "react";
import Layout from "../components/layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import Lottie from 'react-lottie';
import Contacts from '../styles/lottie/contactus.json'

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: Contacts,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
const Contact = () => {
  return (
    <Layout title={"Contact us | HomeStore"}>
      <div className="row contactus ">
     
        <div className="col-md-6 ">
        <Lottie options={defaultOptions}
              height={300}
              width={300} />
        
          {/* <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          /> */}
        </div>
        <div className="col-md-4 m-3">
          {/* <h1 className=" p-2 text-white text-center m-3"  >CONTACT US</h1> */}
          <h2 className="text-justify mt-2">Available 24 X 7 Service </h2>
          <p className="text-justify mt-2">
            
            Any Query and Information realated to the Book can directly contact us.Details are listed below:
          </p>
          <p className="mt-3">
            <BiMailSend /> : <a href="mailto:help@epustakalyinfo.com" style={{textDecoration:"none"}}>www.help@homesStore.com</a>
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : <a href="tel:+977056582894" style={{textDecoration:"none"}}> 056-582894</a>
          </p>
          <p className="mt-3">
            <BiSupport /> : <a href="tel:+977056582894" style={{textDecoration:"none"}}> 1234-0000-0000 (toll free)</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
