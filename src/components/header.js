import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ isContent = false }) => (
  <header className="border-b">
    <div>
      <p className={`cursor-pointer my-1 font-semibold ${isContent ? "text-base" : "text-3xl"}`}>
        <Link to="/">
          TechMusings.dev
        </Link>
      </p>
      {!isContent &&
        (<p className="text-base my-1">
          Personal blog by <Link className="cursor-pointer text-blue-900 underline" to="/About">Arun Madhavan</Link>
        </p>)
      }
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
