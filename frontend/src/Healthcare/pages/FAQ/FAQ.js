import React from 'react'
import questions from "./faq.json";
import Banner from "./Banner";
import Feedback from '../Feedback';
import './faqCustom.css'

function FAQ() {


  return (
<div className='mainDiv myBgFC myDivFaq'>
<Feedback></Feedback>
<Banner>
      <Banner.Header>Frequently Asked Questions</Banner.Header>
      {questions.map((question) => (
        <Banner.Entity key={question.id}>
          <Banner.Question>{question.question}</Banner.Question>
          <Banner.Text>{question.answer}</Banner.Text>
        </Banner.Entity>
      ))}<br></br>
      <h4 className='addFAQ'>
        Question not on the list? Contact out help desk for further enquiries
      </h4>
    </Banner>
</div>
    



  );
}

export default FAQ;