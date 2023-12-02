import { Outlet } from "react-router-dom"
import Wrapper from "../../assets/wrappers/SharedLayout"
import { SmallSiderbar, BigSidebar, Navbar } from "../../components"

export const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSiderbar/>
        <BigSidebar/>
        <div>
          <Navbar/>
          <div className="dashboard-page">
            <Outlet/>
          </div>
        </div>
      </main>
    </Wrapper>
  )
}
 