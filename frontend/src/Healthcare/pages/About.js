import React, { useContext } from 'react'
//import img from './Images/bgImage.jpeg';
import { Card } from 'react-bootstrap';
import "./css/StylesCommon.css";
import { MdArrowRightAlt } from "react-icons/md";
import '../pages/css/aboutUs.css'
import AuthenticationContext from '../../context/AuthenticationContext';




function About() {
  const {auth} = useContext(AuthenticationContext);
  return (

    <div className='mainDiv mainDivAbout'>


      {/*     <h1 className="myHome">Welcome {email}</h1>
            <h1 className="myHome">Welcome User</h1>
 */}

      <Card >
        <div className="banner myBg">
          <div className="w-9/12 mx-auto grid py-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            <div className="mt-10">
              <h1 className="bg-white text-gray-500 px-5 py-3  mt-10 lg:text-5xl md:text-3xl font-bold ">
                We give solution
              </h1>
              <h1 className="bg-gray-700 text-gray-200 lg:text-5xl md:text-3xl font-bold px-5 py-3 mt-1">
                to your Pain
              </h1>
              <p className="mt-10 text-gray-300">
                Northeastern is committed towards students' saftey and well being and puts every effort possible to ensure that students are safe. Our goal is to provide support in a safe and confidential setting and to facilitate student success and well-being.
              </p>
              <button className="flex items-center mt-5 bg-gray-800 text-gray-200 px-4 py-3 rounded-sm hover:bg-gray-900">
                Learn more <MdArrowRightAlt className="text-xl ml-1" />
              </button>
            </div>
          </div>

        </div>
     <Card.Body className='myCardBody'>
          <Card.Title className="myHome">Welcome to NUSHP</Card.Title>
          <Card.Subtitle className="mb-2 text-muted, myHomeSubtitle">Mandatory Health Coverage</Card.Subtitle>
          <Card.Text className="myHomeText">
            <p>In Massachusetts, it's the law. Massachusetts law requires that every full-time and part-time student enrolled in a certificate, diploma or degree-granting program of higher education must participate in his or her school's Student Health Program or in a health benefit plan with comparable coverage.</p>
            <br></br>
            <p>While mandatory health insurance is the law, at Northeastern, it is more than that; it is a commitment to the health and well-being of each of our students. We know from experience that good health and holistic wellness are critical elements of a student's academic success. Supporting that success is a commitment we take very seriously. We also know that with health care costs at all time highs, uninsured students, as well as those covered by plans with inadequate benefits and/or no limits on out-of-pocket costs, place their education at significant risk. The financial burden associated with an accident or illness could interrupt their studies, putting their academic pursuits—and ultimately their professional and career goals—on hold or ending them completely. That's a risk we find unacceptable.</p>
            <br></br>
            <h1 className='additionalHeader'>NUSHP is a High-Quality, Affordable Health Plan</h1>
            <br></br>
            <p className='benefitsHIS'>
              <ul>
                <li><b>Coverage anywhere :</b> Comprehensive healthcare coverage at school, at home, while traveling, on co-op or study abroad.</li>
                <li><b>Savings :</b> Affordable coverage, low co-payments, caps on annual out-of-pocket costs, and access to reduced dental, vision and pharmacy.</li>
                <li><b>Global protection :</b> 24/7 emergency medical care and assistance anywhere in the world.</li>
              </ul>
            </p>
          </Card.Text>
        </Card.Body>
      </Card>

    </div>)

}

export default About