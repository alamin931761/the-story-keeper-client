import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
// import useAdmin from "../../Hooks/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Container from "../../components/Container";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  // const [admin] = useAdmin(user);

  return (
    <Container>
      <div data-aos="fade-down" data-aos-duration="1000">
        <div className="drawer drawer-mobile h-full">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <div className="flex justify-end">
              <label
                htmlFor="my-drawer-2"
                className="lg:hidden fixed z-[60] mt-6 mr-2"
              >
                <RiMenu3Line className="text-3xl cursor-pointer" />
              </label>
            </div>

            <div className="lg:ml-64">
              <Outlet />
            </div>
          </div>

          <div className="drawer-side min-h-full">
            <label htmlFor="my-drawer-2" className="drawer-overlay" />
            <ul className="menu p-4 w-64 bg-[#000000de] text-white min-h-full fixed">
              <NavLink
                className="nav-link ml-4 mb-3"
                to="/dashboard/my-profile"
              >
                My Profile
              </NavLink>

              <NavLink className="nav-link ml-4 mb-3" to="/dashboard/my-orders">
                My Orders
              </NavLink>

              <NavLink className="nav-link ml-4 mb-3" to="/dashboard/books">
                Books
              </NavLink>

              <NavLink className="nav-link ml-4 mb-3" to="/dashboard/coupons">
                Coupons
              </NavLink>

              <NavLink className="nav-link ml-4 mb-3" to="/dashboard/orders">
                Orders
              </NavLink>

              <NavLink className="nav-link ml-4 mb-3" to="/dashboard/users">
                Users
              </NavLink>
              {/* {admin && (
              <>
                <NavLink
                  className="nav-link ml-4 mb-3"
                  to="/dashboard/addBooks"
                >
                  Add Books
                </NavLink>
                <NavLink
                  className="nav-link ml-4 mb-3"
                  to="/dashboard/manageBooks"
                >
                  Manage Books
                </NavLink>
                <NavLink className="nav-link ml-4 mb-3" to="/dashboard/orders">
                  Orders
                </NavLink>
                <NavLink className="nav-link ml-4 mb-3" to="/dashboard/users">
                  Users
                </NavLink>
              </>
            )}
            {!admin && (
              <>
                <NavLink
                  className="nav-link ml-4 mb-3"
                  to="/dashboard/myOrders"
                >
                  My Orders
                </NavLink>
              </>
            )} */}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
