import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { allVendors, deleteUser, clearErrors } from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";

import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

const VendorsList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, vendors } = useSelector((state) => state.allVendors);
  const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allVendors());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Vendor deleted successfully");
      history.push("/admin/vendors");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, alert, error, isDeleted, history]);

  const [open, setOpen] = React.useState(false);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const setVendors = () => {
    const data = {
      columns: [
        {
          label: "Vendor ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    vendors
      .slice()
      .reverse()
      .forEach((vendor) => {
        data.rows.push({
          id: vendor._id,
          name: vendor.name,
          email: vendor.email,
          role: vendor.role,

          actions: (
            <Fragment>
              <Link
                to={`/admin/user/${vendor._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              {/* <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteUserHandler(vendor._id)}
              >
                <i className="fa fa-trash"></i>
              </button> */}

              <Button className=" py-2 px-1 ml-2" onClick={handleClickToOpen}>
                <i className="fa fa-trash  btn btn-danger"></i>
              </Button>
              <Dialog
                open={open}
                onClose={handleToClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Delete?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to Delete?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    id="delete"
                    className="btn btn-danger"
                    onClick={() => deleteUserHandler(vendor._id)}
                    autoFocus
                  >
                    Delete
                  </Button>
                  <Button onClick={handleToClose}>Cancel</Button>
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
      <MetaData title={"All Users"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Vendors</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setVendors()}
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

export default VendorsList;
