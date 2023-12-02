import { NavLink } from "react-router-dom";
import links from "../utils/links";

const NavlinksComponent = ({toggleSr}) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            className={({ isAcitve }) =>
              isAcitve ? "nav-link active" : "nav-link"
            }
            onClick={toggleSr}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavlinksComponent;
