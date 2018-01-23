import * as React from 'react'
import { RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'
const styles = require('./styles.less')

import { } from 'antd'

type P = RouteProps & {
  children: any
  location: any
  count: any
}

class ListContainer extends React.Component<P> {
  render () {
    console.info(this.props)
    return (
      <div className={ styles.normal }>
        This is List Page
      </div>
    )
  }
}

function mapStateToProps( { list }: any) { return { ...list } }

export default connect(mapStateToProps)(ListContainer)
