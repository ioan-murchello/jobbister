import Wrapper from "../assets/wrappers/Navbar"
import { FaAlignLeft, FaUserCircle, FaCaretDown} from 'react-icons/fa'
import Logo from "./Logo"
import { useDispatch, useSelector } from "react-redux"
import { toggleSidebar, clearStore } from "../features/userSlice"
import { useState } from "react"


const Navbar = () => {
    const [showLogout, setShowLogout] = useState(false)

    const dispatch = useDispatch()
    const {user} = useSelector(store => store.user)

    const toggle = () => {
        dispatch(toggleSidebar())
    }
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={toggle}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
        onClick={() => setShowLogout(showLogout => !showLogout)}
          >
            <FaUserCircle />
            {user?.name || 'Guest'}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown": "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(clearStore('Logging out...'))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Navbar