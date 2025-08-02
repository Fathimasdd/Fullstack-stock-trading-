import React from 'react';
function Team() {
    return ( <div className='container'>
        <div className='row p-3  mt-5  mb-5 border-top'>
            <h1 className=' mt-5 text-center'>People</h1>
        </div>
        <div className='row p-3  text-muted ' style={{lineHeight:"1.8",fontSize:"1.2em"}}>
            <div className='col-6 p-3 text-center'>
                <img src='media/images/my_photo.jpg' style={{
  borderRadius: "50%",
  width: "450px",                  
  height: "450px",
  objectFit: "cover",
  border: "8px solid #ffffff",    
  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25)",
  display: "block",
  margin: "0 auto"                
}} />
                <h4 className='mt-3'>Ashraf Fathima</h4>
                <h6 >Ceo,Founder.</h6>
            </div>
            <div className='col-6 p-5'>
               <p>Ashraf Fathima bootstrapped and founded Ferodha in 2024 to overcome the hurdles she faced during her journey as a passionate learner and tech enthusiast. Today, Ferodha aims to transform the landscape of the Indian broking and trading experience for the next generation.</p>

<p>She actively engages in tech communities and believes in building accessible, user-first platforms that empower everyday investors.</p>

<p>Learning languages and building meaningful products is her zen.</p>

<p>Connect on Homepage / TradingQnA </p>
            </div>
        </div>

    </div>  );
}

export default Team;