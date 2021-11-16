import * as React from "react"
import _ from "lodash"
import PropTypes from "prop-types"

const Tags = ({ tags, color="yellow" }) => (
    !_.isEmpty(tags) &&
    (<div className="flex justify-start mb-2 flex-wrap">
        {
            tags.map(x => (
                <div className={`bg-${color}-100 flex italic mr-2 p-1.5 rounded text-xs mb-1 mr-1`}>{x}</div>
            ))
        }
    </div>)
)

export default Tags;