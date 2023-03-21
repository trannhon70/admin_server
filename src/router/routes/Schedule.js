// ** React Imports
// eslint-disable-next-line no-unused-vars
import { lazy } from "react";
import { Navigate } from "react-router-dom";
const ScheduleKanboad = lazy(() => import("../../views/layouts/Kanban"));

const Todo = lazy(() => import("../../views/apps/todo"));
const CreateTask = lazy(() => import("../../views/apps/todo/create-task"));

const AppRoutes = [
  {
    element: <Todo />,
    path: "/cong-viec/danh-sach",
    meta: {
      appLayout: true,
      className: "todo-application",
    },
  },
  {
    element: <Todo />,
    path: "/cong-viec/danh-sach/:filter",
    meta: {
      appLayout: true,
      className: "todo-application",
    },
  },
  {
    element: <CreateTask />,
    path: "/cong-viec/tao-cong-viec",
    meta: {
      appLayout: true,
      className: "todo-application",
    },
  },
  {
    element: <ScheduleKanboad />,
    path: "/cong-viec/kanban",
    meta: {
      appLayout: true,
      className: "schudele-application",
    },
  },
];

export default AppRoutes;
