import NavLink from "@/Components/NavLink";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function Authenticated({ header, children }) {
    const user = usePage().props.auth.user;
    // useEffect(() => {
    //     console.log(user);
    // }, []);
    return (
        <div className="container-fluid ">
            <div className="row">
                <div className="col-md-2 bg-light vh-100 d-flex flex-column">
                    <div className="sidebar p-3">
                        <h5 className="border-bottom pb-2 mb-3">Menu</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-10 ">
                    <header className="bg-white shadow-sm mb-4 p-3">
                        <div className="d-flex justify-content-between align-items-center" >

                        
                        {header}
                        <div className="d-flex align-item-center">
                            <span className="me-3">{user.name}</span>
                            <NavLink
                                className="btn btn-outlined-primary me-2"
                                href={route("profile.edit")}
                            >
                                Profile
                            </NavLink>

                            <NavLink
                                className="btn btn-outlined-danger "
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Log out
                            </NavLink>
                        </div>
                        </div>
                    </header>
                    <main className="p-3 bg-light rounded">{children}</main>
                </div>
            </div>
        </div>
    );
}
