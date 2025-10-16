import React from "react";
import Layout from "./../components/layout/Layout";

const About = () => {
  return (
    <Layout >
      <div className="row contactus ">
        <div className="col-md-6 ">
          
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2 m-3">
E-Pustakalaya was developed by the Nepal Library and Information Consortium (NeLIC), with support from the Ministry of Education, Science, and Technology of Nepal. It aims to promote digital literacy, enhance access to information, and support quality education in Nepal.

          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
