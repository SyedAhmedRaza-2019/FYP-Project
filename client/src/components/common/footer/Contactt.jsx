import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'
const Contactt = () => {
  return (

      <section className='footerContact'>
        <div className='container max-w-7xl mx-auto'>
          <div className='send flex'>
            <div className='text'>
              <h1>Do You Have Questions ?</h1>
              <p>We'll help you to grow your career and growth.</p>
            </div>
            <Link to='/contact'>  <button className='btn5'>Contact Us Today</button></Link>
          </div>
        </div>
      </section>
  
  )
}

export default Contactt
