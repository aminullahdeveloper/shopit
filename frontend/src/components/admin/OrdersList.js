import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  deleteOrder,
  clearErrors,
} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

const OrdersList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order deleted successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, alert, error, isDeleted, history]);

  const [open, setOpen] = React.useState(false);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numofItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    orders
      .slice()
      .reverse()
      .forEach((order) => {
        data.rows.push({
          id: order._id,
          numofItems: order.orderItems.length,
          amount: `Rs ${order.totalPrice}`,
          status:
            order.orderStatus &&
            String(order.orderStatus).includes("Delivered") ? (
              <p style={{ color: "green" }}>{order.orderStatus}</p>
            ) : (
              <p style={{ color: "red" }}>{order.orderStatus}</p>
            ),
          actions: (
            <Fragment>
              <Link
                to={`/admin/order/${order._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-eye"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={handleClickToOpen}
              >
                <i className="fa fa-trash"></i>
              </button>

              {/* <Button color="primary" onClick={handleClickToOpen}>
                <i className="fa fa-trash btn btn-danger "></i>
              </Button> */}

              <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>{"Delete"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to Delete?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <button
                    id="delete"
                    className="btn btn-danger py-1 px-2 ml-2"
                    onClick={() => deleteOrderHandler(order._id)}
                  >
                    Delete
                  </button>
                  <Button onClick={handleToClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </Fragment>
          ),
        });
      });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Orders"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Orders</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setOrders()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default OrdersList;
