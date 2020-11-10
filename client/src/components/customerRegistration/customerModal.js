import React from 'react'
import { removeStorage } from '../../shared'
import { useAuth0 } from '../../contexts/auth0-context';

const CustomerModalComponent = () => {
    const { logout } = useAuth0();

    const onLogout = () => {
        localStorage.clear();
        logout({ returnTo: window.location.origin });
    };

    return (
        <div id="overLayModal">
            <div style={{ background: "white" }}>
                <div style={{ marginTop: "-70px", marginBottom: "15px" }}>
                    <i className="fas fa-check icon-verify"></i>
                </div>
                {/* <div className="text-right"><button onClick={() => {
                    onLogout()
                }} className="btn btn-link text-right"><i className="fa fa-times" style={{ fontSize: "20px" }} aria-hidden="true"></i></button></div> */}
                <h2>SUCCESS</h2>
                <h3>Please verify your account by clicking on verification link in email</h3>
                <button className="btn w-100 mt-3 btn-verify" onClick={() => {
                    onLogout()
                }}>OK</button>
            </div>
        </div>
    )
}

export default CustomerModalComponent;
