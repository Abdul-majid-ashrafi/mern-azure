import React from 'react';
import { useAuth0 } from '../../contexts/auth0-context';

export default function InActiveHomeModal() {
    const { logout } = useAuth0();
    const onLogout = () => {
        localStorage.clear();
        logout({ returnTo: window.location.origin });
    };

    return (
        <div id="overLayModal">
            <div style={{ background: "white" }}>
                <div className="text-right">
                    <button onClick={onLogout} className="btn btn-link text-right">
                        <i className="fa fa-times" style={{ fontSize: "20px" }} aria-hidden="true"></i></button></div>
                <h3>Your status is inactive. Please contact</h3>
                <p>support@kitchenkonnection.com</p>
            </div>
        </div>
    );
}
