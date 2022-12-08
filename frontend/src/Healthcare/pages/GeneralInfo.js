import React from 'react'

function GeneralInfo() {
  return (
    <div className='mainDiv myBgFC mainDivCheckups'>
      <div className='paraOne'><br></br>

        <h2 className='paraHeading'>Welcome to Northeastern's Wellness Portal</h2><br></br>

        <p className='paraContent'> Throughout the COVID-19 pandemic Northeastern University has maintained a safe and healthy environment across all of its campuses. For the latest on what you need to know about COVID-19 and campus life across all of Northeastern campuses, visit
          <a href='https://news.northeastern.edu/coronavirus/#_ga=2.253443338.209565438.1669823546-912079606.1669502458' target={'blank'}> news.northeastern.edu/coronavirus/</a> For general COVID-19 related questions, email <a href="mailto: NUCovid19Qs@northestern.edu">NUCovid19Qs@northestern.edu</a>
          or call 617.373.7333. This inbox and phone line are monitored from 8:30 a.m. ET to 4:30 p.m. ET, Monday through Friday.
          If experiencing a medical emergency, contact the Northeastern University Police Department at 617.373.3333 or call 911. Students can also contact <a href='https://www.northeastern.edu/uhcs/#_ga=2.185875882.209565438.1669823546-912079606.1669502458' target={'blank'}> University Health and Counseling Services</a> at 617.373.2772, or by email at uhcs@northeastern.edu.</p>

      </div><br></br>

      <div className='paraTwo'>
        <h2 className='paraHeading'>Research Participation</h2>
        <p className='paraContent'>Help the Northeastern research community study COVID-19, which may lead to breakthroughs in social science, medicine, and public health. Participate in this important work using the consent form below!</p>
        <span className='paraContent'>Contact</span><a href="mailto:COVID-19Registry@northeastern.edu"> COVID-19Registry@northeastern.edu </a>with any questions.
      </div>

      <section class="information">
        <div class="wrap">
          <div class="info-message">
            <h3>If you are experiencing an emergency on campus please contact Northeastern University Police Department at 617.373.3333. For off-campus emergencies, please call 911 or go to your nearest emergency department.</h3>
            <p>For all medical or mental health related issues during business hours please call 617.373.2772 or call <strong>Find@Northeastern</strong> for 24/7 mental health support 877.233.9477 (in the U.S.), 855.229.8797 (Canada), +1.781.457.7777 (International).</p>
          </div>
        </div>
      </section>

      <section className='information'>
        <div className='wrap'>
          <h2 className='headingInfo'>Information</h2>
          <div className='buckets'>
            <div className='info hours'>
              <h3 className='headingInner'>Hours</h3>
              <p>Monday, Wednesday and <br></br> Friday 8:00 AM - 5:00 PM</p>
              <p>Tuesday and Thursday 8:00<br></br> AM - 8:00 PM</p>
              <p>Saturday 12:00 PM - 4:00<br></br> PM</p>
              <p className='headingPara'></p>
              <p className='headingPara'></p>
              <p className='headingPara'></p>

            </div>
            <div className='info'>
              <h3 className='headingInner'>Contact</h3>
              <p>617.373.2772</p>
              <p><a href="mailto:uhcs@northeastern.edu">uhcs@northeastern.edu</a></p>
              <nav class="social">
                <a href="https://twitter.com/NU_UHCS">TT</a>

                <a href="https://www.instagram.com/nu_uhcs/?hl=en">TT</a>

              </nav>
              <p>UHCS offers Find@Northeastern, a 24/7 <br></br> mental health support line,<br></br> at 877.233.9477 (U.S.)<br></br> 855.229.8797 (Canada),<br></br> +1.781.457.7777<br></br> (International). </p>
            </div>
            <div className='info'>
              <h3 className='headingInner'>Location</h3>
              <p>Forsyth Building, 1st Floor<br></br>
                70 Forsyth Street<br></br>
                Boston, MA 02115
              </p>
            </div>
            <div className='info'>
              <h3 className='headingInner'>Access</h3>
              <p>UHCS offers same-day visits<br></br>
                during business hours.<br></br>
                Please  <a href="//https://www.northeastern.edu/uhcs/access-to-care/">check here</a> to see the<br></br>
                complete list of our visit options.

              </p>

            </div>


          </div>
        </div>
      </section>
    </div>
  )
}

export default GeneralInfo;
//https://www.northeastern.edu/uhcs/access-to-care/