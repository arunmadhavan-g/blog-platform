import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Listing from "../components/listing"

const IndexPage = () => (
  <Layout className="dark">
    <Seo title="Home" />
    <Listing />
  </Layout>
)

export default IndexPage
