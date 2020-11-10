import React from 'react';
import { connect } from 'react-redux';

class SupplierNavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: ""
        }
    }

    static getDerivedStateFromProps(props, { }) {
        return { type: props.type }
    }

    componentDidMount() {
        let li = document.getElementsByClassName('nav-link');
        for (let i = 0, j = 1; i < li.length; i++, j++) {
            if (li[i].classList.contains("active")) {
                li[i].innerHTML += "<hr align='center' width='20px' color='white' />";
                let j = i - 1;
                if (j < 0) {
                } else {
                    li[j].classList.add('border-none');
                }
            } else {
            }
        }
    }

    render() {
        return (
            <nav className="container px-5 text-center">
                <ul className="nav nav-pills nav-stacked">
                    <li className="nav-item">
                        <a href="#" className="nav-link active"> ORDER MANAGEMENT</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">ITEMS</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">MENU</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">DEALS</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        type: auth.user.type,
    }
};

export default connect(mapStateToProps, {})(SupplierNavigationBar);
