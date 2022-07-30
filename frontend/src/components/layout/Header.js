import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";
// import About from "../about/About";

import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

import Search from "./Search";

import "../../App.css";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = React.useState(false);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully.");
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/logo.png" style={{ width: "170px" }} />
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="navbar-btn">
            <Link
              className="nav-btn"
              id="nav-btn"
              style={{ textDecoration: "none" }}
              to="/orders/me"
            >
              My Orders
            </Link>
            <Link
              className="nav-btn"
              id="nav-btn"
              style={{ textDecoration: "none" }}
              to="/me"
            >
              Profile
            </Link>
            <Link
              className="nav-btn"
              id="nav-btn"
              style={{ textDecoration: "none" }}
              to="/contact"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-3 mt-2 mt-md-0" id="search">
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              {cartItems.length}
            </span>
          </Link>

          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>

              {/* ........................................... */}

              {/* ........................................... */}
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === "admin" && (
                  <Link className="dropdown-item text-success" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                {user && user.role === "vendor" && (
                  <Link className="dropdown-item text-success" to="/vdashboard">
                    Vendor Panel
                  </Link>
                )}
                {/* <Link className="dropdown-item " to="/orders/me">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link className="dropdown-item" to="/contact">
                  Contact Us
                </Link> */}
                <Link className="dropdown-item" to="/">
                  <div>
                    <Button
                      className="btn btn-primary text-danger"
                      onClick={handleClickToOpen}
                    >
                      Logout
                    </Button>
                    <Dialog
                      open={open}
                      onClose={handleToClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Logout?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure you want to Logout?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          className="btn btn-danger"
                          onClick={logoutHandler}
                          autoFocus
                        >
                          Logout
                        </Button>
                        <Button onClick={handleToClose}>Cancel</Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link
                to="/login"
                className="btn ml-4"
                id="login_btn"
                onClick={handleToClose}
              >
                Login
              </Link>
            )
          )}
          {/* ......................................................... */}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
