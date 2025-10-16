import React from "react";
import Layout from "./../components/layout/Layout";
import Lottie from 'react-lottie';
import Policys from '../styles/lottie/privacy-policy.json'
const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: Policys,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Policy = () => {
  return (
    <Layout title={"Privacy Policy | E-Pustakalya"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
        <Lottie options={defaultOptions}
              height={300}
              width={300} />
        </div>
        <div className="col-md-4 m-5" style={{marginTop:"20px"}}>
          <p style={{fontFamily: "Arial" , fontSize:"12px",marginTop:"40px"}}>The privacy policy will explain what types of personal information the website collects from its users.</p>
          <p style={{fontFamily: "Arial" , fontSize:"12px"}}>It will outline how the collected information is used by the website or its affiliated parties</p>
          <p style={{fontFamily: "Arial" , fontSize:"12px"}}>The policy may state whether and how the website shares user information with third parties.</p>
          <p style={{fontFamily: "Arial" , fontSize:"12px"}}> The privacy policy should address the measures taken to protect user data from unauthorized access, loss, or disclosure.</p>
          <p style={{fontFamily: "Arial" , fontSize:"12px"}}>If the website uses cookies or other tracking technologies to collect user data, the policy should explain the purpose of their use</p>
          <p style={{fontFamily: "Arial" , fontSize:"12px"}}>The policy may outline the rights users have regarding their personal information, such as the right to access, correct, or delete their data</p>
          <p style={{fontFamily: "Arial" , fontSize:"12px"}}>The policy may state how changes or updates to the privacy policy will be communicated to users and when they will come into effect</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
