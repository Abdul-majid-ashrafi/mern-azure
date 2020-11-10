import React, { useEffect } from "react";
import "../style.css";
import AdminHeaderComponent from "../adminHeader/AdminHeader";
import Scrollbars from "react-custom-scrollbars";

const CustomerListComponent = (props) => {
  useEffect(() => {
    let li = document.getElementsByClassName("order-nav-link");
    for (let i = 0, j = 1; i < li.length; i++, j++) {
      if (li[i].classList.contains("active")) {
        let j = i - 1;
        if (j < 0) {
        } else {
          li[j].classList.add("border-none");
        }
      } else {
      }
    }
  });

  // const
  const TableBody = ({ statusType }) => {
    let filteredList = props.customers.filter((x) => x.status === statusType);
    return filteredList.map((items, index) => {
      return (
        <tr key={index} className='customer-table-body'>
          <td data-label='full_name' style={{ wordWrap: "anywhere" }}>
            {items.full_name}
          </td>
          <td data-label='mobile_number' style={{ wordWrap: "anywhere" }}>
            {items.mobile_number}
          </td>
          <td data-label='email' style={{ wordWrap: "anywhere" }}>
            {items.email}
          </td>
          <td data-label='Address' style={{ wordWrap: "anywhere" }}>
            {items.address}
          </td>
          <td data-label='Country' style={{ wordWrap: "anywhere" }}>
            {items.country}
          </td>
          <td data-label='Activation' style={{ wordWrap: "anywhere" }}>
            {props.isActivation && items._id === props.customerid ? (
              <div className='d-flex justify-content-center'>
                <div className='spinner-border text-primary' role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            ) : (
              <button
                className={
                  items.status === "inactive"
                    ? "btn btn-primary"
                    : "btn btn-danger"
                }
                onClick={() =>
                  props.doActivation(
                    items.status === "active" ? "inactive" : "active",
                    items
                  )
                }
              >
                {items.status === "inactive" ? "Active" : "InActive"}
              </button>
            )}
          </td>
          <td>
            <i
              onClick={() => props.viewDetails(items)}
              className='fa fa-id-card-o'
              style={{ fontSize: "30px" }}
              aria-hidden='true'
            ></i>
          </td>
        </tr>
      );
    });
  };
  return (
    <React.Fragment>
      <AdminHeaderComponent />
      {props.isLoading ? (
        <div className='text-center loader-alignment' style={{ top: "55%" }}>
          <div className='form-check form-check-inline'>
            <span
              style={{ width: "3rem", height: "3rem" }}
              className='spinner-border myInput text-primary spinner-border-sm'
            ></span>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div className='container px-5 mt-3'>
            <div className='bs-example'>
              <ul className='nav nav-tabs noBorder'>
                <li className='nav-item'>
                  <a
                    href='#activeCustomer'
                    className='order-nav-link active'
                    data-toggle='tab'
                  >
                    Active
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    href='#inactiveCustomer'
                    className='order-nav-link'
                    data-toggle='tab'
                  >
                    Inactive
                  </a>
                </li>
              </ul>
              <div className='tab-content'>
                <div className='tab-pane fade show active' id='activeCustomer'>
                  <div className='overflow-x-scroll'>
                    <Scrollbars
                      style={{ height: "45vh" }}
                      className='supplier-order-table-scroll'
                    >
                      <table className='table table-striped table-hover border-radius-table admin-grid'>
                        <thead>
                          <tr>
                            <td>Full Name</td>
                            <td style={{ width: "150px" }}>Phone</td>
                            <td>Email</td>
                            <td>Address</td>
                            <td style={{ width: "110px" }}>Country</td>
                            <td>Activation</td>
                            <td style={{ width: "100px" }}>Details</td>
                          </tr>
                        </thead>
                        <tbody>
                          {props.customers.filter((x) => x.status === "active")
                            .length ? (
                            <TableBody statusType='active' />
                          ) : (
                            <tr>
                              <td colSpan='7' className='text-center p-3'>
                                No List Found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </Scrollbars>
                  </div>
                </div>
                <div className='tab-pane fade show' id='inactiveCustomer'>
                  <div className='overflow-x-scroll'>
                    <Scrollbars
                      style={{ height: "45vh" }}
                      className='supplier-order-table-scroll'
                    >
                      <table className='table table-striped table-hover border-radius-table admin-grid'>
                        <thead>
                          <tr>
                            <td>Full Name</td>
                            <td style={{ width: "150px" }}>Phone</td>
                            <td>Email</td>
                            <td>Address</td>
                            <td style={{ width: "110px" }}>Country</td>
                            <td>Activation</td>
                            <td style={{ width: "100px" }}>Details</td>
                          </tr>
                        </thead>
                        <tbody>
                          {props.customers.filter(
                            (x) => x.status === "inactive"
                          ).length ? (
                            <TableBody statusType='inactive' />
                          ) : (
                            <tr>
                              <td colSpan='7' className='text-center p-3'>
                                No List Found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </Scrollbars>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default CustomerListComponent;
