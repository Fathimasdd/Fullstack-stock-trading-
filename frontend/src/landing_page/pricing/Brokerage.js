import React from 'react';
function Brokerage() {
    return (<div className='container'>
        
        
            <div className='row p-5 mt-5 text-center border-top'>
            
            <div className='col-8 p-4'>
                <a href='' style={{textDecoration:"none"}}><h3 className='fs-5'>Brokerage Calculator</h3></a>
                <ul style={{textAlign:"left",lineHeight:"2.5",fontSize:"12px"}} className='text-muted'>
                    <li>Call & Trade and RMS auto-squareoff. Additional charges of 50+ GST per arder</li>  
            <li>Digital contract notes will be sent via e-mail</li>
    <li>Physical copies of contract notes, if required, shall be charged 20 per contract note. Courier charges apply</li>
    <li>For Ni account (non-PIS), 0.51% or ₹100 per executed order for equity (whichever is lower)</li>
    <li>For NR: account (PIS), 0.6% of ₹200 per executed order for equity (whichever is lower)</li>
    <li>If the account is in debit balance, any order placed will be charged #40 per executed order instead of ₹720 per executed onder</li>
                </ul>

            </div>
            <div className='col-4 p-4'>
                <a href='' style={{textDecoration:"none"}}><h3 className='fs-5'>List of Charges</h3></a>
            </div>
           
        </div> 

    </div>);
}

export default Brokerage;