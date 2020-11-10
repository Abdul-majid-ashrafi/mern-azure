import React from 'react'

const Footer = () => {
    const path = window.location.host
    return (
        <React.Fragment>
            <div className="footer text-center">
                <span>Copyright © 2020 {path} </span>
            </div>
            <div className="display-none">

            </div>
        </React.Fragment>
    )
}

export default Footer
