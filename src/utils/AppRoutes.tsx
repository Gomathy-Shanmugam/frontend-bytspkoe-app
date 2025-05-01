import { Navigate, RouteObject } from "react-router-dom";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Resetpassword from "../Components/Resetpassword";
import Forgotpassword from "../Components/Forgotpassword";
import Verifyotp from "../Components/Verifyotp";
import Crud from "../Components/Crud";
import Master from "../Components/Master";
import EnquiryMasterList from "../Components/Enquirymasterlist";
import Masterlistview from "../Components/Masterlistview";
import Mastertitle from "../Components/Mastertitle";
import ProductItemMasterList from "../Components/ProductItemMasterList";
import CostingTitle from "../Components/CostingTitle";
import CostingMasterListView from "../Components/CostingMasterListView";
import EditModal from "../Components/EditModel";

const AppRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/reset-password",
    element: <Resetpassword />,
  },
  {
    path: "/forgot-password",
    element: <Forgotpassword />,
  },
  {
    path: "/verifyotp",
    element: <Verifyotp />,
  },
  {
    path: "/crud",
    element: <Crud />,
  },
  {
    path: "/master",
    element: <Master />,
  },
  {
    path: "/master-list",
    element: <EnquiryMasterList />,
  },
  {
    path: "/masterlistview",
    element: <Masterlistview />,
  },
  {
    path: "/master-title",
    element: <Mastertitle />,
  },
  {
    path: "/productitem-list",
    element: <ProductItemMasterList />,
  },
  {
    path: "/costing-title",
    element: <CostingTitle />,
  },
  {
    path: "/costingmaster-list",
    element: <CostingMasterListView />,
  },
  {
    path: "/edit-modal",
    element: <EditModal/>,
  },
];

export default AppRoutes;
