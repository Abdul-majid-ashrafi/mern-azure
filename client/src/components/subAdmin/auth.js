import React from 'react';

const SubAdminAuthComponent = (props) => {
    return (
        <div className="login-box">
            <div className="login-header">
                <img src="https://firebasestorage.googleapis.com/v0/b/mage-user.appspot.com/o/logo%20KC%2Fkitchenkonnection_Logo-03.png?alt=media&token=20233e49-8d17-430d-bdb1-c69cc1918b78" />
            </div>
            <div className="login-container" >
                <div className="container-flux">
                    <div className="col-md-12 text-center" >
                        <button id="tab1" className="btn btn-defualt custom-btn"><i className="fas fa-lock-open icon" style={{marginRight:"10px"}}></i>Login</button>
                    </div>
                </div>
                <div className="container-flux" id="login-box">
                    <form onSubmit={props.onLogin}>
                        <div className="form-group">
                            <label htmlFor="name">Email address</label>
                            <input onChange={props.inputHadler} type="email" className="form-control custom-input" name="email" id="email" placeholder="Enter Register email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Password</label>
                            <input onChange={props.inputHadler} type="password" className="form-control custom-input" name="password" id="password" placeholder="Enter your password" />
                        </div>
                        <button type="submit" id="btn-login" className="btn btn-danger btn-block colors">Log In</button>
                        {/* <div className="text-right reset">
                            <span className="forgot-password ">
                                <a href="no-javascript1.html" title="Forgot Password" id="link-reset">Forgot Password?</a>
                            </span>
                        </div> */}
                    </form>
                </div>
            </div >
        </div >

    );
};

export default SubAdminAuthComponent;
