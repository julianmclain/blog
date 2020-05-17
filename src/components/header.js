import { Link } from "gatsby"
import React from "react"
import { Location } from "@reach/router"
import avatar from "../images/avatar.jpg"

const Header = () => (
  <header className="logo">
    <Location>
      {({ location }) => {
        return location.pathname === "/" ? (
          <div>
            <Link to="/about/">
              <img src={avatar} className="logo-avatar" />
            </Link>
            <span className="logo-prompt code">About me</span>
          </div>
        ) : (
          <div>
            <Link to="/">
              <img src={avatar} className="logo-avatar" />
            </Link>
            <span className="logo-prompt code">Back Home</span>
          </div>
        )
      }}
    </Location>
  </header>
)

export default Header
