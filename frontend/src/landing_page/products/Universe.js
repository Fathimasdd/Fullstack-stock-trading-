import React from 'react';
function Universe() {
    return ( 
        <div className='container'>
            <div className='row'>
                <div className=' mt-5 text-muted text-center'>
                <h1>The Ferodha Universe</h1>
                <p>Extend your trading and investment experience even further with our partner platforms</p>
                </div>
                <div className='col-4 p-3 mt-5'>
                    <img src='media/images/zerodhafundhouse.png'/>
                    <p className='text-small text-muted '> </p>
                </div>
                <div className='col-4 p-3 mt-5'><img src='media/images/sensibull.png'/>
                    <p className='text-small text-muted '> </p></div>
                <div className='col-4 p-3 mt-5 '>
                    <img src='media/images/tijori.png'/>
                    <p className='text-small text-muted '> </p>
                </div>
                <div className='col-4  p-3 mt-5'>
                    <img src='media/images/streak.png'/>
                    <p className='text-small text-muted '> </p>
                </div>
                <div className='col-4 p-3 mt-5 '><img src='media/images/smallcase.png'/>
                    <p className='text-small text-muted '> </p></div>
                <div className='col-4 p-3 mt-5 '>
                    <img src='media/images/ditto.png'/>
                    <p className='text-small text-muted '> </p>
                </div>
                
                <button className='p-3 btn btn-primary fs-5 mb-5' style={{width:"20%",margin:"0 auto"}}>Signup now</button>
            </div>
        </div>
     );
}

export default Universe;