// ** React Imports
import { Link } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem } from "reactstrap";

const OptionTask = (props) => {
  // ** Props
  const { handleChooseOption, chosen } = props;

  return (
    <div className={"sidebar-left"}>
      <div className="sidebar">
        <div className="sidebar-content todo-sidebar">
          <div className="todo-app-menu">
            <PerfectScrollbar
              className="sidebar-menu-list"
              options={{ wheelPropagation: false }}
            >
              <ListGroup tag="div" className="list-group-filters">
                <ListGroupItem
                  action
                  active={chosen === "information"}
                  onClick={() => handleChooseOption("information")}
                  className="cursor-pointer"
                >
                  <span className="align-middle">Thông tin chung</span>
                </ListGroupItem>
                <ListGroupItem
                  active={chosen === "rule"}
                  onClick={() => handleChooseOption("rule")}
                  action
                  className="cursor-pointer"
                >
                  <span className="align-middle">Cài đặt quyền</span>
                </ListGroupItem>
                <ListGroupItem
                  active={chosen === "relation"}
                  onClick={() => handleChooseOption("relation")}
                  action
                  className="cursor-pointer"
                >
                  <span className="align-middle">Đối tượng liên quan</span>
                </ListGroupItem>
              </ListGroup>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionTask;
