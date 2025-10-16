import React from "react";
import Layout from "../components/layout/Layout";

import Lottie from 'react-lottie';
import Book from '../styles/lottie/books.json'

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: Book,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
const Ebook = () => {
  return (
    <Layout title={"Contact us | E-Pustakalya"}>
      <div className="row contactus ">
     
        <div className="col-md-6 ">
      <marquee>  <h2 className="text-justify " style={{marginTop:"50px",color:"red",marginLeft:"190px" }}>Best Free E-Book Sites!! </h2></marquee>
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
         
          <p className="text-justify mt-2"style={{fontFamily: "Arial" , fontSize:"12px",marginTop:"40px"}}>
Project Gutenberg <a href="https://www.gutenberg.org" target="_blank">(https://www.gutenberg.org)</a>: This platform offers over 60,000 free e-books, including many classics, available in various formats.</p>

<p className="text-justify mt-2"style={{fontFamily: "Arial" , fontSize:"12px",marginTop:"40px"}}>
Open Library <a href="https://openlibrary.org" target="_blank"> (https://openlibrary.org)</a>: Open Library is an open, editable library catalog that provides access to millions of free e-books, including both contemporary and classic titles.
</p>
<p className="text-justify mt-2"style={{fontFamily: "Arial" , fontSize:"12px",marginTop:"40px"}}>
ManyBooks <a href="https://manybooks.net" target="_blank">(https://manybooks.net)</a>: ManyBooks hosts thousands of free e-books across different genres, available in multiple formats for various e-reader devices.
</p>
<p className="text-justify mt-2"style={{fontFamily: "Arial" , fontSize:"12px",marginTop:"40px"}}>
Librivox <a href="https://librivox.org" target="_blank">(https://librivox.org)</a>: Librivox offers free audiobooks of public domain works. Volunteers record audiobook versions of books that are then made available for free.
</p>
<p className="text-justify mt-2"style={{fontFamily: "Arial" , fontSize:"12px",marginTop:"40px"}}>
Internet Archive <a href="https://archive.org" target="_blank">(https://archive.org)</a>: The Internet Archive provides access to a wide range of digital content, including products, movies, music, and more. You can find both free and paid e-books on this platform.
</p>
<p className="text-justify mt-2"style={{fontFamily: "Arial" , fontSize:"12px",marginTop:"40px"}}>
Remember to verify the legality and copyright status of any products you download, and always respect the authors' rights by obtaining their works from authorized sources.
          </p>
        
        </div>
      </div>
    </Layout>
  );
};

export default Ebook;
