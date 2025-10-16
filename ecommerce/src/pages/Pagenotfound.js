import React from 'react'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router-dom'
import Lottie from 'react-lottie';
import book from '../styles/lottie/open-book.json'
const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: book,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Pagenotfound = () => {
  return (
    <Layout title={"Page Not Found | 404"}>
    <div className='pnf'>
      <div className='pnf-title'>404 ERROR !</div>
      <Lottie options={defaultOptions}
              height={300}
              width={300} />
              
      <div className='pnf-heading'>Oops! Page Not Found</div>
     
      <Link to = "/" className="pnf-btn">Go Back </Link>
    </div>
    </Layout>
  )
}

export default Pagenotfound