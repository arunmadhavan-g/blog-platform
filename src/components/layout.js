import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ children, isContent=false, showPrint=false }) => {
  
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div class="container mx-auto my-5">
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} isContent={isContent} showPrint={showPrint}/>
      <div>
        <main>{children}</main>
        <Footer/>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
