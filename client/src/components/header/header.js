import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { fetchUser, setOrdersInLocalStorage, getAllMenus } from '../../store/actions';
import { useAuth0 } from '../../contexts/auth0-context';
// import { Button } from 'antd';
import { setStorage, getStorage, removeStorage } from '../../shared';
import { sweetalert } from '../../shared';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { SearchContainer } from '../../containers';


// I'm using this flag functionRunOnlyFirstTime for due to some reason
// 1 can't use hooks in class component
// 2 I am using redux, whenever change state in redux auto called functional component like Header 
const areEqual = (prevProps, nextProps) => {
  let drafts = getStorage("draftOrders");
  return (
    prevProps.isUserExist === nextProps.isUserExist &&
    prevProps.draftOrders === nextProps.draftOrders &&
    prevProps.user === nextProps.user &&
    prevProps.draftOrders === drafts &&
    prevProps.menu === nextProps.menu &&
    prevProps.menus === nextProps.menus
  );
};
if (performance.navigation.type === 1) {
  removeStorage('thisFunctionHasBeenRun');
}
const Header = React.memo(props => {
  // if (window.location.search.substring(5) && window.location.search.substring(1).slice(0, 3) === "tkn") {
  //   // set param token for email
  //   setStorage("pTKN", window.location.search.substring(5));
  // }

  const { isAuthenticated, loginWithRedirect, logout, getIdTokenClaims, user } = useAuth0();
  if (!props.isUserExist && isAuthenticated) {
    const type = getStorage("type");
    // get user with token
    if (!getStorage("thisFunctionHasBeenRun")) {
      // set boolean froperty in storage for handling api
      setStorage("thisFunctionHasBeenRun", "true");
      getIdTokenClaims()
        .then(response => {
          if (response) {
            setStorage("token", response.__raw);
            // calling action for get user 
            if (type && response.email_verified) {
              props.fetchUser({ user: user, name: user.nickname, email: response.email || "c4634%V$#45@test.com", token: response.__raw, type });
            } else {
              if (!response.email_verified) {
                onLogout(this, true);
              }
            }
          }
        }).catch(error => {
          sweetalert("error ", error.message);
        });
    }
  }

  const switchAccount = (type) => {
    console.log(type);
    getIdTokenClaims()
      .then(response => {
        console.log('response', response);
        setStorage("token", response.__raw);
        setStorage("type", type);
        if (type) {
          props.fetchUser({ user: user, name: user.nickname, email: response.email || "c4634%V$#45@test.com", token: response.__raw, type }, 'reload');
        } else {
          onLogout();
        }
      }).catch(error => {
        sweetalert("error ", error.message);
      });
  };

  const useEffectOnlyOnce = (func) => useEffect(() => { props.setOrdersInLocalStorage(); }, []);
  useEffectOnlyOnce();

  const onLogout = (evnt, flag) => {
    localStorage.clear();
    logout({ returnTo: window.location.origin });
    if (flag) {
      setStorage("showVerificationEmailPopup", "true");
      window.location.reload();
    }
  };

  const authentication = (type) => {
    if (type) {
      // remove showVerificationEmailPopup from storage if exist
      removeStorage("showVerificationEmailPopup");
      setStorage("type", type);
      loginWithRedirect();
    }
  };

  // const openNav = () => {
  //   document.getElementById("LoginSidebar").style.width = "35%";
  // }

  // const closeNav = () => {
  //   document.getElementById("LoginSidebar").style.width = "0";
  // }

  const onChange = () => {
    let checkbox = document.getElementById('customSwitch1');
    let menu = document.getElementById('menuBaseSearch');
    let kitchen = document.getElementById('kitchenBaseSearch');
    if (checkbox.checked) {
      menu.classList.add("toggleColor");
      kitchen.classList.remove("toggleColor");
      let obj = {
        searchBase: "menu"
      };
      props.getAllMenus(obj);
      // removeStorage('sid');
      // removeStorage('kname');
      removeStorage('route');
    }
    else {
      kitchen.classList.add("toggleColor");
      menu.classList.remove("toggleColor");
      let obj = {
        searchBase: "kitchen"
      };
      props.getAllMenus(obj);
    }
  };

  // const Login = () => {
  //   return (
  //     <div id="LoginSidebar" className="sidebarLogin">
  //       <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>×</a>
  //       <iframe src="https://dev-e--008ul.au.auth0.com/login?state=g6Fo2SBueTloWDI1LXBtVHlESDZhRWlOSXVrVWFxdHhmcEJnb6N0aWTZIEhYOVgxNzBKQk0zRTdPMlVlTFJYWTk5QmJWZU0yaTRko2NpZNkgTm0xUUZER1RmOElDNU1BbmVnZU9sZFhjWU9FdHRWNEM&client=Nm1QFDGTf8IC5MAnegeOldXcYOEttV4C&protocol=oauth2&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=openid%20profile%20email&response_type=code&response_mode=query&nonce=YWN2NDMwRVJxSmQtX2o3U1dzOTRydnd5WUMzM1FrUWU2LmVJY2xrUlUtUg%3D%3D&code_challenge=H9emevU-7v9y1U9g-mhdi6l52enNdTnTUGi1GSoci0g&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtc3BhLWpzIiwidmVyc2lvbiI6IjEuMTEuMCJ9"></iframe>
  //     </div>
  //   )
  // }
  const totalOrder = JSON.parse(getStorage("draftOrders")) ? JSON.parse(getStorage("draftOrders")).length : 0;
  const type = getStorage("type");
  const token = getStorage("token");
  return (
    <header className="container px-5">
      {/* <Login /> */}

      {/* if there is no user. show the login button */}
      {/* {!isAuthenticated && (
        <div>
          <Button type='primary' style={{ margin: '10px' }} onClick={() => authentication("admin")}>Authentication as Admin</Button>
          <Button type='primary' style={{ margin: '10px' }} onClick={() => authentication("supplier")}>Authentication as Supplier</Button>
          <Button type='primary' style={{ margin: '10px' }} onClick={() => authentication("customer")}>Authentication as Customer</Button>
        </div>
      )} */}

      {/* if there is a user. show user name and logout button  */}
      {/* {isAuthenticated && (
        <>
          <Button style={{ margin: '10px' }} type='primary' onClick={onLogout}>Logout</Button>
        </>
      )}
      <hr /> */}

      <div className="row">
        <div className="col-md-3 col-6 mt-3">
          <Link to='/'>
            <img src={logo} className="logo" alt="logo" />
          </Link>
        </div>
        <div className="col-md-9 col-6 p-0 ">
          <div className="social-bar display mr-3  text-right icon-color-yellow-ish">
            <a href='https://www.facebook.com/' target='_blank' rel="noopener noreferrer">
              <i className="fa fa-facebook px-1" aria-hidden="true"></i>
            </a>
            <a href='https://www.google.com/intl/en-GB/gmail/about/#' target='_blank' rel="noopener noreferrer">
              <i className="fa fa-google-plus px-1" aria-hidden="true"></i>
            </a>
            <a href='https://www.twitter.com/' target='_blank' rel="noopener noreferrer">
              <i className="fa fa-twitter px-1" aria-hidden="true"></i>
            </a>
            <a href='https://www.linkedin.com/' target='_blank' rel="noopener noreferrer">
              <i className="fa fa-linkedin px-1" aria-hidden="true"></i>
            </a>
          </div>
          <div className="mobile-menu display-none">
            <Link to="/orders">
              <span>
                <span className="icon icon-cart"></span>
                {/* <span id='lblCartCount'>{!props.orders.length ? 0 : props.orders.filter(x => x.order_status === "In Progress").length}</span> */}
                <span id='lblCartCount'>{props.type !== "supplier" ? !props.draftOrders.length ? 0 : props.draftOrders.length : props.orders.length ? props.orders.filter(x => x.order_status === "In Progress").length : 0}</span>
              </span>
            </Link>
            <button id="loginMenu" type="button" className="display-none dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              <span className="icon icon-login mr-3"></span>
            </button>
            {!isAuthenticated && (
              <div className="dropdown-menu " aria-labelledby="loginMenu">
                <a className="dropdown-item" href="/#" onClick={() => authentication("admin")}>Login as Admin</a>
                {/* <a className="dropdown-item" href="/#" onClick={() => openNav()}>Login as Admin</a> */}
                <a className="dropdown-item" href="/#" onClick={() => authentication("customer")}>Login as Customer</a>
                <a className="dropdown-item" href="/#" onClick={() => authentication("supplier")}>Login as Kitchen</a>
              </div>
            )}
            {isAuthenticated && (
              <div className="dropdown-menu " aria-labelledby="loginMenu">
                {(props.isUserExist) && props.type !== "admin" ? <Link className="dropdown-item" to='/profile'>Profile</Link> : ""}
                {type !== 'admin' && props.user.status !== 'pending' ? <button className="dropdown-item" onClick={() => switchAccount(type === 'customer' ? 'supplier' : type === 'supplier' ? 'customer' : '')}>{type === 'customer' ? 'Supplier' : type === 'supplier' ? 'Customer' : ''}</button> : null}
                <a className="dropdown-item" href="/#" onClick={onLogout}>Logout</a>
              </div>
            )}
          </div>
          <div className="navigation-bar text-right">
            <span className="icon icon-clock" style={{ verticalAlign: "text-bottom" }}></span>
            <span className="px-2"> Make Query 24/7</span>
            <i className="fa fa-phone icon-color-pink-ish pl-1 pr-2" aria-hidden="true"></i>
            <span>021 3999 2345</span>
            {props.type === "supplier" || props.type === "admin" || props.activeAdmin.type === "sub_admin" ? null : <Link to="/orders" style={{ color: "black" }}>
              {props.type === "customer" || !props.type
                ? <button className="navbar-btn display ">
                  <span className="icon icon-cart"></span>
                  {/* <span id='lblCartCount'>{!props.orders.length ? 0 : props.orders.filter(x => x.order_status === "In Progress").length}</span> */}
                  {totalOrder ? <span id='lblCartCount'>{props.type !== "supplier" ? totalOrder : 0}</span> : null}
                  <span className={!totalOrder ? "ml-2" : "ml--5"}>My Orders</span>
                </button>
                : <button className="navbar-btn display ">
                  <span className="icon icon-cart"></span>
                  {/* <span id='lblCartCount'>{!props.orders.length ? 0 : props.orders.filter(x => x.order_status === "In Progress").length}</span> */}
                  <span id='lblCartCount'>{props.type !== "supplier" ? totalOrder : 0}</span>
                  <span className="ml--5">Orders</span>
                </button>}
            </Link>}


            <button id="loginMenu" type="button" className="display navbar-btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              {type === 'supplier' ? <i className="fa fa-cutlery mr-3" aria-hidden="true"></i>
                : type === 'admin' ? <span className="fas fa-user-tie mr-3"></span>
                  : <span className="icon icon-login mr-3"></span>}
              {(isAuthenticated && (props.isUserExist || props.isProfileSwitched)) ? <span className="ml--5">{user.nickname}</span>
                : props.activeAdmin.full_name ? <span className="ml--5">{props.activeAdmin.full_name}</span>
                  : (token && type) ? <div className="spinner-border text-primary" role="status" style={{ marginRight: '24px', height: '20px', width: '20px' }}></div>
                    : <span className="ml--5">Login</span>}
            </button>
            {!isAuthenticated && (
              <div className="dropdown-menu loginDrop" aria-labelledby="loginMenu">
                <a className="dropdown-item" href="/#" onClick={() => authentication("admin")}>Login as Admin</a>
                {/* <a className="dropdown-item" href="/#" onClick={() => openNav()}>Login as Admin</a> */}
                <a className="dropdown-item" href="/#" onClick={() => authentication("customer")}>Login as Customer</a>
                <a className="dropdown-item" href="/#" onClick={() => authentication("supplier")}>Login as Kitchen</a>
              </div>
            )}
            {isAuthenticated && (
              <div className="dropdown-menu loggedInDrop" aria-labelledby="loginMenu">
                {(props.isUserExist) && props.type !== "admin" ? <Link className="dropdown-item" to='/profile'>Profile</Link> : ""}
                {type !== 'admin' && props.user.status !== 'pending' ? <button className="dropdown-item" onClick={() => switchAccount(type === 'customer' ? 'supplier' : type === 'supplier' ? 'customer' : '')}>{type === 'customer' ? 'Supplier' : type === 'supplier' ? 'Customer' : ''}</button> : null}
                <a className="dropdown-item" href="/#" onClick={onLogout}>Logout</a>
              </div>
            )}

          </div>
          {props.type !== 'supplier' && props.type !== 'admin' && props.activeAdmin.type !== "sub_admin" ? <div className="search-toggle text-right display mr-3">
            <div className="custom-control custom-switch">
              <label id="kitchenBaseSearch" className="toggleLabel1 toggleColor">Kitchen Base Search</label>
              <input type="checkbox" className="custom-control-input" onChange={() => onChange()} id="customSwitch1" />
              <label id="menuBaseSearch" className={`custom-control-label toggleLabel2`} htmlFor="customSwitch1">Menu Base Search</label>
            </div>
          </div> : null}
        </div>
      </div>
      {(props.isUserExist && props.user.type === 'supplier') || ((props.isUserExist && props.user.type === 'admin') || props.activeAdmin.type === "sub_admin") ? "" : <SearchContainer />}
    </header>
  );
}, areEqual);


const mapStateToProps = ({ auth, supplierKitchens, menu, admin }) => {
  return {
    isUserExist: auth.isUserExist,
    isProfileSwitched: auth.isProfileSwitched,
    orders: supplierKitchens.orders,
    user: auth.user,
    type: auth.user.type,
    draftOrders: supplierKitchens.draftOrders,
    menu: menu.menu,
    menus: supplierKitchens.menus,
    kitchen: supplierKitchens.kitchens,
    activeAdmin: admin.activeAdmin,
    isAdminExist: admin.isAdminExist,
  };
};

export default connect(mapStateToProps, { fetchUser, setOrdersInLocalStorage, getAllMenus })(Header);