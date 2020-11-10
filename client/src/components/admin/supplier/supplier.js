import React, { useEffect } from "react";
import { Button } from "antd";
// import '../style.css';
// import { DownOutlined } from '@ant-design/icons';
// import Pagination from '../../pagination/pagination';
import AdminHeaderComponent from "../adminHeader/AdminHeader";
// import ThreeHorseLoading from 'react-loadingg/lib/ThreeHorseLoading';
import Scrollbars from "react-custom-scrollbars";
// import Scrollbars from 'react-custom-scrollbars';

const SupplierListComponent = (props) => {
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

  const TableBody = ({ statusType }) => {
    let filteredList = props.suppliers.filter((x) => x.status === statusType);
    return filteredList.map((items, index) => {
      return (
        <tr style={{ cursor: "pointer" }} key={index}>
          <td data-label='Entity Name' style={{ wordWrap: "anywhere" }}>
            {items.entity_name}
          </td>
          <td data-label='Email' style={{ wordWrap: "anywhere" }}>
            {items.email}
          </td>
          <td data-label='Address' style={{ wordWrap: "anywhere" }}>
            {items.address}
          </td>
          <td
            data-label='Status'
            style={{
              width: "110px",
              textAlign: "center",
              wordWrap: "anywhere",
            }}
          >
            {items.status}
          </td>
          <td data-label='Activation' style={{ padding: "4px 0px" }}>
            {props.isActivation && props.supplierid === items._id ? (
              <div className='d-flex justify-content-center'>
                <div className='spinner-border text-primary' role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            ) : items.status === "pending" ? (
              <span>
                <Button
                  type='danger'
                  onClick={() =>
                    props.doActivation("inactive", items, "Reject")
                  }
                >
                  Reject
                </Button>
                <Button
                  type='primary'
                  onClick={() => props.doActivation("active", items, "Approve")}
                >
                  Accept
                </Button>
              </span>
            ) : (
              <Button
                type={items.status === "active" ? "danger" : "primary"}
                onClick={() =>
                  props.doActivation(
                    items.status === "active" ? "inactive" : "active",
                    items,
                    items.status === "active" ? "inactive" : "active"
                  )
                }
              >
                {items.status === "active" ? "Inactive" : "Active"}
              </Button>
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
      {props.isSupplierLoad ? (
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
                    href='#pendingKitchens'
                    className='order-nav-link active'
                    data-toggle='tab'
                  >
                    Pending
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    href='#activeKitchens'
                    className='order-nav-link'
                    data-toggle='tab'
                  >
                    Active
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    href='#inactiveKitchens'
                    className='order-nav-link'
                    data-toggle='tab'
                  >
                    Inactive
                  </a>
                </li>
              </ul>
              <div className='tab-content'>
                <div className='tab-pane fade show active' id='pendingKitchens'>
                  <div className='overflow-x-scroll'>
                    <Scrollbars
                      style={{ height: "45vh" }}
                      className='supplier-order-table-scroll'
                    >
                      <table className='table table-striped table-hover border-radius-table admin-grid'>
                        <thead>
                          <tr>
                            <td>Entity Name</td>
                            <td>Email</td>
                            <td>Address</td>
                            <td style={{ width: "110px" }}>Status</td>
                            <td style={{ padding: "4px 0px" }}>Activation</td>
                            <td style={{ width: "100px" }}>Details</td>
                          </tr>
                        </thead>
                        <tbody>
                          {props.suppliers.filter((x) => x.status === "pending")
                            .length ? (
                            <TableBody statusType='pending' />
                          ) : (
                            <tr>
                              <td colSpan='6' className='text-center p-3'>
                                No List Found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </Scrollbars>
                  </div>
                </div>
                <div className='tab-pane fade show' id='activeKitchens'>
                  <div className='overflow-x-scroll'>
                    <Scrollbars
                      style={{ height: "45vh" }}
                      className='supplier-order-table-scroll'
                    >
                      <table className='table table-striped table-hover border-radius-table admin-grid'>
                        <thead>
                          <tr>
                            <td>Entity Name</td>
                            <td>Email</td>
                            <td>Address</td>
                            <td style={{ width: "110px" }}>Status</td>
                            <td style={{ padding: "4px 0px" }}>Activation</td>
                            <td style={{ width: "100px" }}>Details</td>
                          </tr>
                        </thead>
                        <tbody>
                          {props.suppliers.filter((x) => x.status === "active")
                            .length ? (
                            <TableBody statusType='active' />
                          ) : (
                            <tr>
                              <td colSpan='6' className='text-center p-3'>
                                No List Found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </Scrollbars>
                  </div>
                </div>
                <div className='tab-pane fade show' id='inactiveKitchens'>
                  <div className='overflow-x-scroll'>
                    <Scrollbars
                      style={{ height: "45vh" }}
                      className='supplier-order-table-scroll'
                    >
                      <table className='table table-striped table-hover border-radius-table admin-grid'>
                        <thead>
                          <tr>
                            <td>Entity Name</td>
                            <td>Email</td>
                            <td>Address</td>
                            <td style={{ width: "110px" }}>Status</td>
                            <td style={{ padding: "4px 0px" }}>Activation</td>
                            <td style={{ width: "100px" }}>Details</td>
                          </tr>
                        </thead>
                        <tbody>
                          {props.suppliers.filter(
                            (x) => x.status === "inactive"
                          ).length ? (
                            <TableBody statusType='inactive' />
                          ) : (
                            <tr>
                              <td colSpan='6' className='text-center p-3'>
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

export default SupplierListComponent;
