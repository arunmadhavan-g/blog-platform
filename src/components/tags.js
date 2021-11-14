import * as React from "react"
import PropTypes from "prop-types"

const Tags = ({tags}) => (
<div className="flex justify-start mb-2">
    {
        tags.map(x => (
            <div className="bg-yellow-100 flex italic mr-2 p-1.5 rounded text-xs">{x}</div>
        ))
    }
</div>
)

export default Tags;