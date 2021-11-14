import * as React from "react"
import PropTypes, { node } from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import Tags from "./tags"

const Listing = () => {

    const blogs = useStaticQuery(graphql`
    query MyQuery {
        allMultiGitSource {
          edges {
            node {
              pageInfo {
                title
                tags
                publishedOn
                pagePath
                description
                location
              }
            }
          }
        }
      }
    `).allMultiGitSource.edges.map(x=> x.node.pageInfo);
    console.log(blogs);

    return blogs.map(x => 
        <div className="lg:m-5 sm:m-2 border-b">
            <div className="flex sm:flex-col md:flex-col lg:flex-row my-1">
                <div className="text-black font-bold flex-auto">
                    <Link to={x.location}>{x.title}</Link>
                </div>
                <div className="text-sm text-gray-500">{x.publishedOn}</div>
            </div>
            <div className="text-sm text-gray-600 my-1">{x.description}</div>
            <Tags tags={x.tags} /> 
        </div>
    )
}

export default Listing