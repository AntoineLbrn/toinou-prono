import { FC } from "react";
import AdminError from "../components/admin/AdminError";
import Role from "./Roles";
import { getRole } from "./session";

const AdminProvider: FC = (props) => {
    if (getRole() !== Role.ADMIN) return <AdminError message="Ton compte n'est pas (encore) admin !" />;
    return <>{props.children}</>;
}

export default AdminProvider;
