// ** Icons Import
import { CheckSquare, Calendar, List } from "react-feather";

export default [
  {
    header: "CÔNG VIỆC",
  },
  {
    id: "todo",
    title: "Danh sách",
    icon: <List size={20} />,
    navLink: "/cong-viec/danh-sach",
  },
  {
    id: "calendar",
    title: "Lịch biểu",
    icon: <Calendar size={20} />,
    navLink: "/cong-viec/lich-bieu",
  },
  {
    id: "kanban",
    title: "Kanban",
    icon: <CheckSquare size={20} />,
    navLink: "/cong-viec/kanban",
  },
];
