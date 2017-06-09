import React from "react"

import { connect } from "react-redux"

class Graph extends React.Component {
    render() {
        return(
            <div></div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Graph)
