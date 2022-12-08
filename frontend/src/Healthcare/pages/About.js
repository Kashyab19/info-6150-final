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
    <div>
      {/*     <h1 className="myHome">Welcome {email}</h1>
 */}
      {/* <h1 className="myHome">Welcome {auth.firstName}</h1> */}
      <Card>
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
{/*          <Card.Img variant="top" className="myImg" src={img} />
 */}        <Card.Body className='myCardBody'>
          <Card.Title className="myHome">About Us</Card.Title>
          <Card.Subtitle className="mb-2 text-muted, myHomeSubtitle">We've got you covered and secured!!</Card.Subtitle>
          <Card.Text className="myHomeText">
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>

            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.

          </Card.Text>
        </Card.Body>
      </Card>

    </div>)
}

export default About