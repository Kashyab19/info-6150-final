import React from 'react'
import FeedBack from 'react-feedback-popup';


function Feedback() {
    return (
        <div className="App">
            <FeedBack
                style={{ zIndex: '2', marginLeft: '20px', position: 'fixed' }}
                position="right"
                numberOfStars={5}
                headerText="Your feedback is important!!"
                bodyText="Please fill in below fileds."
                buttonText="Kindle Share your valuable feedback"
                handleClose={() => console.log("handleclose")}
                handleSubmit={(data) =>
                    fetch('xxxxxx', {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'POST', // or 'PUT'
                        body: JSON.stringify(data),
                    }).then((response) => {
                        if (!response.ok) {
                            return Promise.reject('Our servers are having issues! We couldn\'t send your feedback!');
                        }
                        response.json()
                    }).then(() => {
                        alert('Success!');
                    }).catch((error) => {
                        alert('Our servers are having issues! We couldn\'t send your feedback!', error);
                    })
                }
                handleButtonClick={() => console.log("handleButtonClick")}
            />
        </div>
    )
}

export default Feedback;