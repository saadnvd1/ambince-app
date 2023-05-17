import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "auth/Signup";
import React from "react";
import RequireAuth from "auth/RequireAuth";
import Login from "auth/Login";
import Root from "Root";
import JournalView from "journal/JournalView";
import GratitudeView from "gratitude/GratitudeView";
import InspirationView from "inspiration/InspirationView";
import { ROUTE_MAP } from "constants";
import SupportView from "support/SupportView";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Root />
      </RequireAuth>
    ),
    children: [
      {
        path: ROUTE_MAP.journal.path,
        element: <JournalView />,
      },
      {
        path: ROUTE_MAP.gratitude.path,
        element: <GratitudeView />,
      },
      {
        path: ROUTE_MAP.inspiration.path,
        element: <InspirationView />,
      },
      {
        path: ROUTE_MAP.support.path,
        element: <SupportView />,
      },
      {
        path: "billing/success",
        element: <JournalView />,
      },
    ],
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

const Main = () => <RouterProvider router={router} />;
export default Main;
