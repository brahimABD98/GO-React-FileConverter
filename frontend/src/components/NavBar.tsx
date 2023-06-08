import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="text-neutral-conten navbar bg-base-200  ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn lg:hidden">
              <Menu />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-sm mt-3 w-52  bg-base-100 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a>Convert files</a>
                <ul className="p-2">
                  <li>
                    <Link to="/images">convert images</Link>
                  </li>
                  <li>
                    <p>more files coming soon !</p>
                  </li>
                </ul>
              </li>
              <li>About</li>
            </ul>
          </div>
          <Link to="/" className="btn-ghost btn text-xl normal-case">
            file converter
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-x-6 px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Convert files</summary>
                <ul className="p-2 ">
                  <li>
                    <Link to="/images">convert images </Link>
                  </li>
                  <li>
                    <p>more files comming soon !</p>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link to="/login" className="btn bg-base-100 ">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
