import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Container from "../../components/Container";
import { useGetSingleUserQuery } from "../../redux/api/userApi";
import Loading from "../../components/Loading";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const { data, isLoading } = useGetSingleUserQuery({
    email: user?.email,
  });

  if (isLoading) {
    return <Loading />;
  }

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
              {/* common */}
              <NavLink
                className="nav-link ml-4 mb-3"
                to="/dashboard/my-profile"
              >
                My Profile
              </NavLink>

              {/* user */}
              {data?.data?.data?.role === "user" ? (
                <NavLink
                  className="nav-link ml-4 mb-3"
                  to="/dashboard/my-orders"
                >
                  My Orders
                </NavLink>
              ) : (
                ""
              )}
              {data?.data?.data?.role !== "user" ? (
                <>
                  <NavLink className="nav-link ml-4 mb-3" to="/dashboard/books">
                    Books
                  </NavLink>

                  <NavLink
                    className="nav-link ml-4 mb-3"
                    to="/dashboard/coupons"
                  >
                    Coupons
                  </NavLink>

                  <NavLink
                    className="nav-link ml-4 mb-3"
                    to="/dashboard/orders"
                  >
                    Orders
                  </NavLink>
                </>
              ) : (
                ""
              )}

              {/* super admin */}
              {data?.data?.data?.role === "superAdmin" ? (
                <NavLink className="nav-link ml-4 mb-3" to="/dashboard/users">
                  Users
                </NavLink>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
