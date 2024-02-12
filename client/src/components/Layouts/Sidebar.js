import React from 'react';

const Sidebar = () => {
    return (
        <div className="sidebar" style={{color: 'black'}}> 
            <h2>BIchor</h2>
            <ul>
                <li>
                    <a href="/#">Information</a>
                </li>
                <li>
                    <a href="/#">Events</a>
                </li>
                <li>
                    <a href="/#">About Us</a>
                </li>
                <li>
                    <a href="/#">Donation</a>
                </li>
                <li>
                    <a href="/#">Hostpitals</a>
                </li>
                <li>
                    <a href="/#">Maps</a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
