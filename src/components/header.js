import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from "@fortawesome/free-solid-svg-icons"

const print = () => {
  document.getElementById("header").style.display = "none"
  document.getElementById("footer").style.display = "none"
  document.getElementById("phone").style.display = "block"
  document.getElementsByTagName("body")[0].style.margin = "-25px 0 0 0"

  window.print()

  document.getElementById("header").style.display = "block"
  document.getElementById("footer").style.display = "block"
  document.getElementById("phone").style.display = "none"
  document.getElementsByTagName("body")[0].style.margin = "0"
}

const Header = ({ isContent = false, showPrint = false }) => (
  <header id="header" className="border-b flex justify-between">
    <div>
      <p className={`cursor-pointer my-1 font-semibold ${isContent ? "text-base" : "lg:text-3xl md:text-2xl sm:text-2xl"}`}>
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
    { showPrint && 
      (<div>
        <FontAwesomeIcon icon={faPrint} onClick={() => print()} className="cursor-pointer"/>
      </div>)
    }
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
