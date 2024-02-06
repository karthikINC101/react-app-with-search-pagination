import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";


function Navbar(props) {
  return (
    <nav className="navbar bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand">Categories</a>
        <ul className="navbar-nav mb-2 mb-lg-0 flex-row  d-flex">
          <li className="nav-item pr-3">
            <a
              className="nav-link me-3 text-white "
              aria-current="page"
              href="#"
            >
              DRESS
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link me-3  text-white btn-secondary" href="#">
              SUIT
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link me-3 text-white btn-secondary" href="#">
              TOP
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link me-3  text-white btn-secondary" href="#">
              HEELS
            </a>
          </li>
        </ul>
        <span className="Basket">
          <ShoppingBasketIcon></ShoppingBasketIcon>
          <span className="itemcount">{props.cartCount}</span>
        </span>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={props.searchItem}
            onChange={props.setsearchitem}
          />
          <button
            className="btn btn-secondary"
            type="submit"
            onClick={props.handleSearchItem}
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
