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
import RolesPage from "../Components/RolesPage";
import PermissionsModal from "../Components/PermissionModal";
import SuccessPopup from "../Components/SuccessPopup";
import Enquiry from "../Components/Enquiry";

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
    path: "/enquiry",
    element: <Enquiry/>,
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
    path: "/roles-page",
    element: <RolesPage />,
  },
  {
    path: "/permission-modal",
    element: <PermissionsModal initialPermissions={[]} onClose={function (): void {
      throw new Error("Function not implemented.");
    } } onSave={function (): void {
      throw new Error("Function not implemented.");
    } }/>,
  },
  {
    path: "/success-popup",
    element: <SuccessPopup role={""} onClose={function (): void {
      throw new Error("Function not implemented.");
    } }/>,
  },
  {
    path: "/edit-modal",
    element: <EditModal permissions={[]} onClose={function (): void {
      throw new Error("Function not implemented.");
    } } onSave={function (): void {
      throw new Error("Function not implemented.");
    } }/>,
  },

  
];

export default AppRoutes;
