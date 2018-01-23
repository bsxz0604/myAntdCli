import * as React from 'react'
import { RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'antd'
const styles = require('./styles.less')

import { } from 'antd'

type P = RouteProps & {
  children: any
  location: any
  count: any
}

class DashBoardContainer extends React.Component<P> {
  render () {
    return (
      <div className={ styles.normal }>
        <a href='#/list'>
          <Button >Label to do</Button>
        </a>
      </div>
    )
  }
}

function mapStateToProps( { }: any) { return { } }

export default connect(mapStateToProps)(DashBoardContainer)
