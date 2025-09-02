import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Admin from "../pages/admin/Admin";
import Checkpoint from "../pages/checkpoint/Checkpoint";
import Gate from "../pages/gate/[gateId]";

import Error from "../pages/errorPage/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/gate/gate_1" replace />,
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <Error />,
  },
  {
    path: "/checkpoint",
    element: <Checkpoint />,
    errorElement: <Error />,
  },
  {
    path: "/gate/:gateId",
    element: <Gate />,
    errorElement: <Error />,
    loader: ({ params }) => {
      const { gateId } = params;
      if (typeof gateId !== "string" || !/^gate_\d+$/.test(gateId)) {
        throw new Response("Bad Request", {
          status: 404,
          statusText: "Gate Not Found",
        });
      }
      return true;
    },
  },
  {
    path: "*",
    element: <Error />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
