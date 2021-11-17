import React, { useEffect } from "react"
import Tags from "../components/tags"
import Layout  from "../components/layout"
import {Link} from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from "@fortawesome/free-brands-svg-icons"


const checkForURL = val => {
    const regex = new RegExp(
      "^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$",
    )
    return regex.test(val)
  }

const updateSrc = (tagName, property, pagePath) => {
    const elems = document.getElementById("preview").getElementsByTagName(tagName)
  
    for (let i = 0; i < elems.length; i++) {
      const elementValue = elems[i].getAttribute(property)
      if (!checkForURL(elementValue)) {
        elems[i][property] = `https://github.com/${pagePath}/${elementValue}`
      }
    }
  }


const Content = ({ pageContext }) => {
    
    useEffect(() => {
        updateSrc("img", "src", `${pageContext.owner}/${pageContext.repo}/raw/master`)
        updateSrc("a", "href", `${pageContext.owner}/${pageContext.repo}/blob/master`)
        updateSrc("li", "class", `mb-0`)
        updateSrc("ul", "class", `list-disc`)
    })

    return (
        <Layout isContent>
            <div className="mt2">
                <div className="text-3xl">{pageContext.title}</div>
                <div className="flex justify-between">
                    <div className="mb-1.5 text-gray-500 text-sm">Published On: {pageContext.publishedOn}</div>
                    <div className="cursor-pointer">
                        <Link to={`https://github.com/${pageContext.owner}/${pageContext.repo}/blob/master/${pageContext.file}`}>
                            <FontAwesomeIcon icon={faGithub}/>
                        </Link>
                    </div>
                </div>
                <Tags tags={pageContext.tags} />
                <div className="border-t py-4 htmlContent" id="preview" dangerouslySetInnerHTML={{ __html: pageContext.content }} />
            </div>
        </Layout>
    )
}

export default Content