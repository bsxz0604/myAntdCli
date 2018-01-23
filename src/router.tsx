import React from 'react'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import { Layout, Icon } from 'antd'
import Menu from './components/menu'
import { initList, initLog , initDash } from './routes'
import { RouterProps } from 'components/interface/router-interface'
import { withRouter } from 'react-router'

const styles = require('./index.less')
const { Content, Header } = Layout

class HomeContainer extends React.PureComponent<any> {

  state = {
    collapsed: false,
  }

  private toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  get renderDefault() {
    if ( !initDash ) {
      return <div/>
    }
    const props = {
      exact: true,
      path: '/',
      render: () => <Redirect to={ initDash.path } />
    }
    return <Route { ...props }/>
  }

  get renderHeader() {
    const type = this.state.collapsed ? 'menu-unfold' : 'menu-fold'
    return (
      <Header className={ styles.header }>
        <Icon
          className={ styles.trigger }
          type={ type }
          onClick={ this.toggle }
        />
      </Header>
    )
  }

  get renderAllRoute() {
    const comList = initList
      .filter((x: any) => !!x)
      .map((item: RouterProps) => {
      return (
        <Route
          key={ item.path  }
          path={ item.path }
          component={ item.component }
        />
      )
    })
    return (
      <Content className={ styles.content }>
        { this.renderDefault }
        { comList }
      </Content>
    )
  }

  render() {
    const menuProps = {
      location: this.props.location,
      collapsed: this.state.collapsed,
      toggle: this.toggle,
    }
    return (
      <Switch>
        <Route path={ initLog.path } exact={ true } component={ initLog.component } />
        <Route>
          <Layout className={ styles.layout } >
            <Menu { ...menuProps }/>
            <Layout>
                { this.renderHeader }
                { this.renderAllRoute }
            </Layout>
          </Layout>
        </Route>
      </Switch>
    )
  }
}

const HomeContainerWithRoter = withRouter(HomeContainer)

export default function ({ history }: any) {
  return (
    <Router history={ history }>
      <HomeContainerWithRoter />
    </Router>
  )
}
