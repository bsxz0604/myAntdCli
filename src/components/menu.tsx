import * as React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import { Layout, Menu, Icon, Badge, Dropdown } from 'antd'
const navList = require('./menuMap.json')
const styles = require('./style')
const { Sider } = Layout

type P = {
  children?: any
  collapsed?: any
  location?: any
  user: any
  login: any
  dispatch: any
}

class MenuContainer extends React.PureComponent<P> {
  private handleClickMenu = () => {
    this.props.dispatch({
      type: 'login/logoutAction'
    })
  }

  get menuListRender () {
    const { pathname } = this.props.location
    const list = navList || []
    return list.map((nav: any) => {
      const cs = classnames({
        [styles.showRed]: pathname === nav.to
      })
      return (
        <Menu.Item key={ nav.to } className={ cs }>
          <Icon type={ nav.icon } />
          <span>{ nav.text }</span>
          <NavLink to={ nav.to } />
        </Menu.Item>
      )
    })
  }
  get logoutRender () {
    return (
      <Menu className='header-menu' onClick={ this.handleClickMenu }>
        <Menu.Item key='logout'>
          <Icon type='logout' />Logout
        </Menu.Item>
      </Menu>
    )
  }

  get smallRender () {
    const { user, collapsed } = this.props
    if (collapsed) {
      return (
        <span
          style={ { textAlign: 'center', display: 'block' } }
          className={ styles.nameSmall }
        >
          <Badge status='success' />
        </span>
      )
    } else {
      return (
        <span className={ styles.name }>
          <Badge status='success' />
            { user ? user.name : 'Guest' }
        </span>
      )
    }
  }

  render() {
    return (
      <Sider
        trigger={ null }
        collapsible={ true }
        collapsed={ this.props.collapsed }
      >
        <div className={ styles.navbarLogo }>
          <img
            className={ styles.navbarLogoImg }
            src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=406270584,2276569185&fm=27&gp=0.jpg'
            alt='此处有张图~~~'
          />
        </div>
          <div className={ styles.userinfo }>
            <Dropdown overlay={ this.logoutRender } trigger={ ['click', 'hover'] }>
              { this.smallRender }
            </Dropdown>
          </div>
        <Menu
          mode='inline'
          theme='dark'
        >
          { this.menuListRender }
        </Menu>
      </Sider>
    )
  }
}

function mapStateToProps(props: any) {
  const { gobalModel, login } = props
  return {
    user: gobalModel.userInfo,
    login,
  }
}

export default connect(mapStateToProps)(MenuContainer)
