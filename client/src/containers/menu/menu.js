// import React, { Component } from 'react';
// import { MenuComponent } from '../../components';
// import { getMenuItems } from '../../store/actions';
// import { connect } from 'react-redux';
// import { getStorage } from '../../shared';

// class MenuContainer extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             isFetched: false
//         }
//     }

//     static getDerivedStateFromProps(props, state) {
//         if (props.userID && !state.isFetched) {
//             const token = getStorage('token');
//             const obj = {
//                 Authorization: `Bearer ${token}`,
//                 userid: props.userID,
//             }
//             props.getMenuItems(obj);
//             return { isFetched: true };
//         }
//         return false;
//     }

//     render() {
//         return (
//             <div>
//                 <MenuComponent />
//             </div>
//         )
//     }
// }

// const mapStateToProps = ({ auth }) => {
//     return {
//         userID: auth.user._id
//     }
// };

// // export default SupplierRegContainer
// export default connect(mapStateToProps, { getMenuItems })(MenuContainer);
