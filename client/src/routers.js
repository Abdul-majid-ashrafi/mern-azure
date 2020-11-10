import React from "react";
import { connect } from "react-redux";
import { Result, Button } from "antd";
import {
  getMenu,
  getMenuItems,
  fetchKitchens,
  getOrders,
  fetchSupplier,
  fetchCustomers,
  fetchSubAdmins,
  removeMenuLocally,
} from "./store/actions";
import "./style.css";
import {
  getStorage,
  screenLockEnableOfflineMood,
  screenLockDisableOfflineMood,
  NoRecordFound,
  isPageNotFound
} from "./shared";
import { Router, Switch, Route, Link } from "react-router-dom";
import {
  Header,
  NavigationBar,
  Footer,
  OrderDetailsComponent,
} from "./components";
import { Detector } from "react-detect-offline";
import {
  HomeContainer,
  SupplierRegContainer,
  CustomerRegContainer,
  CustomerDetailsContainer,
  SupplierDetailsContainer,
  // MenuContainer,
  SupplierHomeContainer,
  DailyMenuContainer,
  ItemsMenuContainer,
  WeeklyMenuContainer,
  FrozenMenuContainer,
  OcassionsMenuContainer,
  CakesMenuContainer,
  OrdersContainer,
  SubAdminAuthContainer,
  CustomerContainer,
  SupplierContainer,
  TransactionContainer,
  SubAdminDetailsContainer,
} from "./containers";
import history from "./history";
import Profile from "./components/profile";
import SupplierHomeGridComponent from "./components/orders/supplierHomeGrid";
import AdminGridContainer from "./containers/admin/adminGrid/adminGrid";
import CustomerModalComponent from "./components/customerRegistration/customerModal";
import InActiveHomeModal from "./components/home/inactiveHome";
import background1 from './images/background1.png'
import background2 from './images/background2.png'
import background3 from './images/background3.png'
import background4 from './images/background4.png'

// this component will render if got wrong url/path
const PageNotFound = () => {
  return (
    <div style={{ position: "absolute", top: "10%", left: "35%" }}>
      <Result
        status='404'
        title='404 That’s an error.'
        subTitle='The requested URL was not found on this server'
      // extra={
      //   <Link to='/'>
      //     <Button type='primary'>Back Home</Button>
      //   </Link>
      // }
      />
    </div>
  );
};

var type = getStorage("type");

class Routing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetched: false,
      isOrderFetched: false,
      width: 0,
      height: 0
    };
  }

  updateDimensions = () => {
    this.forceUpdate();
    let classes = document.getElementsByClassName("screen-fixed");
    if (!classes.length) return;
    classes[0].style.width = window.innerHeight + 300 + "px";
    classes[0].style.margin = "auto";
    if (
      window.innerHeight > window.innerWidth ||
      window.innerHeight + 200 > window.innerWidth
    ) {
      classes[0].style.width = "100%";
    }

    if (
      window.innerHeight > window.innerWidth &&
      window.innerHeight === 1366 &&
      window.innerWidth === 1024
    ) {
      var imgResponsive = document.getElementsByClassName("img-responsive");
      for (var i = 0, il = imgResponsive.length; i < il; i++) {
        imgResponsive[i].style.height = "16vh !important";
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (window.location.pathname === "/") {
      props.removeMenuLocally();
    }
    let isOrderFetched = false;
    let isFetched = false;
    const token = getStorage("token");
    const supplierId = getStorage("sid");
    const type = getStorage("type");

    if (supplierId && !token) {
      // clear storage when user not loggedin
      localStorage.clear();
    }

    if ((!type || type === "customer") && !props.isKitchensFetching && !props.isKitchenRequestHasBeenFetched) {
      props.fetchKitchens();
    }

    if (!state.isOrderFetched && (props.userid || props.activeAdmin._id)) {
      // const token = getStorage('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        userid: props.userid || props.activeAdmin._id,
        type: props.user.type || props.activeAdmin.type,
        admin_type: type,
      };
      isOrderFetched = true;
      props.getOrders(headers);
    }

    if (props.user && props.user.type === "supplier" && props.userid && !state.isFetched) {
      // const token = getStorage('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        userid: props.userid,
      };
      props.getMenu(headers);
      props.getMenuItems(headers);
      isFetched = true;
    }

    if (isOrderFetched && isFetched) {
      return { isOrderFetched: true, isFetched: true };
    } else if (isOrderFetched && !isFetched && props.user && props.user.type === "supplier") {
      return { isOrderFetched: true, isFetched: true };
    }
    if ((props.user.type || type) === "admin" && props.user._id || (props.activeAdmin.type || type) === "sub_admin" && props.activeAdmin._id) {
      const customerObj = {
        Authorization: `Bearer ${token}`,
        userid: props.user._id || props.userid || props.activeAdmin._id,
        status: "none",
        admin_type: type,
        type: "customer",
      };
      const supplierObj = {
        Authorization: `Bearer ${token}`,
        userid: props.user._id || props.userid || props.activeAdmin._id,
        admin_type: type,
        status: "none",
        type: "supplier",
      };
      const adminObj = {
        Authorization: `Bearer ${token}`,
        userid: props.user._id || props.userid,
        admin_type: type,
        status: "none",
        type: "sub_admin",
      };
      if ((props.user.type || type) === "admin") {
        props.fetchSubAdmins(adminObj);
      }
      props.fetchSupplier(supplierObj);
      props.fetchCustomers(customerObj);
    }

    return false;
  }

  Dashboard = () => {
    const type = getStorage('type');
    let component = "";
    // console.log(this.props);
    if (this.props.isProcessed || this.props.isAdminProcessed) {
      if (this.props.isUserExist || this.props.isAdminExist) {
        if (type === "supplier") {
          if (this.props.user.status === "inactive") {
            component = <InActiveHomeModal />;
          } else {
            component = this.props.user.status === "pending" ? (
              <React.Fragment>
                <Header />
                < SupplierRegContainer />
              </React.Fragment>
            ) :
              (<React.Fragment>
                <Header />
                <SupplierHomeContainer />
                <SupplierHomeGridComponent />
              </React.Fragment>);
          }
        } else if (type === "admin" || type === "sub_admin") {
          component =
            <React.Fragment>
              <Header />
              <CustomerContainer />
            </React.Fragment>;
        } else if (this.props.user.type === "customer" && this.props.user.status === "inactive") {
          component = <InActiveHomeModal />;
        } else {
          component = (
            <React.Fragment>
              <Header />
              <NavigationBar />
              <HomeContainer />
            </React.Fragment>
          );
        }
      } else {
        if (this.props.user.type || type === "customer") {
          component =
            <React.Fragment>
              <Header />
              <CustomerRegContainer />
            </React.Fragment>
            ;
        } else if (this.props.user.type || type === "supplier") {
          component =
            <React.Fragment>
              <Header />
              <SupplierRegContainer />
            </React.Fragment>
            ;
        } else if (type === "admin") {
          component =
            <React.Fragment>
              <Header />
              <NoRecordFound>Admin Is Not Exist</NoRecordFound>
            </React.Fragment>;
        }
      }
    } else {
      const showVerificationEmailPopup = getStorage("showVerificationEmailPopup");
      if (showVerificationEmailPopup === "true") {
        component = (
          <React.Fragment>
            <Header />
            <CustomerModalComponent />
            <NavigationBar />
            <HomeContainer />
          </React.Fragment>
        );
      } else {
        component = (
          <React.Fragment>
            <Header />
            <NavigationBar />
            <HomeContainer />
          </React.Fragment>
        );
      }
    }
    return component;
  };

  componentDidMount = () => {
    window.addEventListener('resize', this.updateDimensions);
  }

  render() {
    if (isPageNotFound()) {
      return <PageNotFound />;
    }
    return (
      <div className='app-background'>
        <Detector
          render={({ online }) => {
            if (online) {
              screenLockDisableOfflineMood();
              return true;
            } else {
              screenLockEnableOfflineMood();
              return false;
            }
          }}
        />
        <img src={background1} className="background1" />
        <img src={background2} className="background2" />
        <img src={background3} className="background3" />
        <img src={background4} className="background4" />
        <div className='screen-fixed'>
          <Router history={history}>
            <Switch>
              <Route exact path='/'>
                {this.Dashboard}
              </Route>
              <Route exact path='/profile'>
                <Header />
                <Profile />
              </Route>
              <Route exact path='/customerdetail'>
                {(this.props.user.type || type) === "admin" || (this.props.activeAdmin.type || type) === "sub_admin" ? (
                  <React.Fragment>
                    <Header />
                    <CustomerDetailsContainer />
                  </React.Fragment>
                ) : (<PageNotFound />)}
              </Route>
              <Route exact path='/supplierdetail'>
                {(this.props.user.type || type) === "admin" || (this.props.activeAdmin.type || type) === "sub_admin" ? (
                  <React.Fragment>
                    <Header />
                    <SupplierDetailsContainer />
                  </React.Fragment>
                ) : (<PageNotFound />)}
              </Route>
              <Route exact path='/subadmindetail'>
                {(this.props.user.type || type) === "admin" ? (
                  <React.Fragment>
                    <Header />
                    <SubAdminDetailsContainer />
                  </React.Fragment>
                ) : (<PageNotFound />)}
              </Route>
              {/* menu */}
              <Route path='/items'>
                {(this.props.user.type || type) === "supplier" ? (
                  <React.Fragment>
                    <Header />
                    <ItemsMenuContainer />
                  </React.Fragment>
                ) : (<PageNotFound />)}
              </Route>
              <Route path='/daily'>
                {(this.props.user.type || type) === "admin" || (this.props.activeAdmin.type || type) === "sub_admin" ? (<PageNotFound />) : (
                  <React.Fragment>
                    <Header />
                    <DailyMenuContainer />
                  </React.Fragment>
                )}
              </Route>
              <Route path='/weekly'>
                {(this.props.user.type || type) === "admin" || (this.props.activeAdmin.type || type) === "sub_admin" ? (<PageNotFound />) : (
                  <React.Fragment>
                    <Header />
                    <WeeklyMenuContainer />
                  </React.Fragment>
                )}
              </Route>
              <Route path='/frozen'>
                {(this.props.user.type || type) === "admin" || (this.props.activeAdmin.type || type) === "sub_admin" ? (<PageNotFound />) : (
                  <React.Fragment>
                    <Header />
                    <FrozenMenuContainer />
                  </React.Fragment>
                )}
              </Route>
              <Route path='/ocassions'>
                {(this.props.user.type || type) === "admin" || (this.props.activeAdmin.type || type) === "sub_admin" ? (<PageNotFound />) : (
                  <React.Fragment>
                    <Header />
                    <OcassionsMenuContainer />
                  </React.Fragment>
                )}
              </Route>
              <Route path='/cakes'>
                {(this.props.user.type || type) === "admin" || (this.props.activeAdmin.type || type) === "sub_admin" ? (<PageNotFound />) : (
                  <React.Fragment>
                    <Header />
                    <CakesMenuContainer />
                  </React.Fragment>
                )}
              </Route>
              <Route path='/supplierHome'>
                {(this.props.user.type || type) === "supplier" ? (<SupplierHomeContainer />) : (<PageNotFound />)}
              </Route>
              <Route exact path='/orders'>
                {(this.props.user.type || type) === "admin" || (this.props.activeAdmin.type || type) === "sub_admin" ? (<PageNotFound />) : (
                  <React.Fragment>
                    <Header />
                    <OrdersContainer />
                  </React.Fragment>
                )}
              </Route>
              <Route exact path='/adminsList'>
                {(this.props.user.type || type) === "admin" ? (
                  <React.Fragment>
                    <Header />
                    <AdminGridContainer />
                  </React.Fragment>
                ) : (<PageNotFound />)}
              </Route>
              <Route exact path='/orders/details'>
                <OrderDetailsComponent />
              </Route>
              <Route exact path='/admin'>
                <SubAdminAuthContainer />
              </Route>
              {/* <Route exact path='/customersList'>
                <CustomerContainer />
              </Route> */}
              <Route exact path='/kitchensList'>
                {(this.props.user.type || type) === "admin" || (this.props.activeAdmin.type || type) === "sub_admin" ? (
                  <React.Fragment>
                    <Header />
                    <SupplierContainer />
                  </React.Fragment>
                ) : (<PageNotFound />)}
                {/* <SupplierContainer /> */}
              </Route>
              <Route exact path='/ordersList'>
                {(this.props.user.type || type) === "admin" || (this.props.activeAdmin.type || type) === "sub_admin" ? (
                  <React.Fragment>
                    <Header />
                    <TransactionContainer />
                  </React.Fragment>
                ) : (<PageNotFound />)}
                {/* <TransactionContainer /> */}
              </Route>
              {/* <Route path='/customer'>
                <SupplierRegContainer />
              </Route> */}
              <Route>
                <PageNotFound />
              </Route>
            </Switch>
          </Router>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, supplierKitchens, customers, admin }) => {
  return {
    isAdminExist: admin.isAdminExist,
    isAdminProcessed: admin.isAdminProcessed,
    isUserExist: auth.isUserExist,
    isProcessed: auth.isProcessed,
    userid: auth.user && auth.user._id,
    activeAdmin: admin.activeAdmin,
    user: auth.user,
    isKitchensFetching: supplierKitchens.isKitchensFetching,
    kitchens: supplierKitchens.kitchens,
    singleUserData: customers.singleUserData,
    isKitchenRequestHasBeenFetched:
      supplierKitchens.isKitchenRequestHasBeenFetched,
    isVerificationEmailHasSend: auth.isVerificationEmailHasSend,
  };
};
export default connect(mapStateToProps, {
  fetchCustomers,
  getMenu,
  getMenuItems,
  fetchKitchens,
  getOrders,
  fetchSubAdmins,
  fetchSupplier,
  removeMenuLocally,
})(Routing);
