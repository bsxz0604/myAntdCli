import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Input, Button } from 'antd'
import { ButtonProps } from 'antd/lib/button/button'
import { default as Form, FormComponentProps, FormProps } from 'antd/lib/form/Form'
const styles = require('./styles.less')
const { Item } = Form

export interface LoginProps {
  username: string
  password: string
  login: boolean
  dispatch: any
}

interface State {
  loading: boolean
  login: boolean
}

type Props = LoginProps & FormComponentProps & State

export class LoginCom extends PureComponent<Props> {
  state = {
    loading: false,
    login: true
  }
  componentWillReceiveProps(props: any) {
    const { login } = props
    if (login) {
      this.setState({ loading: login })
    }
  }
  private handleSubmit= (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { dispatch } = this.props
    const { validateFields } = this.props.form
    validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true })
        const { username, password } = values
        dispatch({
          type: 'login/loginAction',
          payload: {
            username,
            password
          }
        })
      }
    })
    setTimeout(() => { this.setState({ loading: false }) }, 3000)
  }

  get logoImg() {
    return(
      <Item className={ styles.formItem }>
        <img src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=406270584,2276569185&fm=27&gp=0.jpg' />
      </Item>
    )
  }

  get inputName() {
    const { getFieldDecorator } = this.props.form
    const input = getFieldDecorator('username', {
      rules: [{ required: true, message: 'Please input your Username!' }],
    })(
      <Input type='user name' placeholder='Your name'/>
    )
    return(
      <Item className={ styles.formItem }>
        { input }
      </Item>
    )
  }

  get password() {
    const { getFieldDecorator } = this.props.form
    const input = getFieldDecorator('password', {
      rules: [{ required: true, message: 'Please input your Password!' }],
    })(
      <Input type='password' placeholder='Your password'/>
    )
    return(
      <Item className={ styles.formItem }>
        { input }
      </Item>
    )
  }

  get submit() {
    const { loading, login } = this.state
    const props: ButtonProps = {
      loading,
      htmlType: 'submit',
      type: 'primary',
      className: styles.submit
    }
    const btnValue = login ? 'LOGIN' : 'login failed...'
    return(
      <Item className={ styles.formItem }>
        <Button { ...props }>{ btnValue }</Button>
      </Item>
    )
  }

  render() {
    const formProps: FormProps = {
      layout: 'horizontal',
      onSubmit: ( e: React.FormEvent<HTMLFormElement>) => this.handleSubmit(e),
      className: styles.form
    }
    return (
      <div className={ styles.loginBg }>
        <Form { ...formProps }>
          { this.logoImg }
          { this.inputName }
          { this.password }
          { this.submit }
        </Form>
      </div>
    )
  }
}

const mapStateToProps = ({ login }: any) => ({ ...login })

export default connect(mapStateToProps)(Form.create()(LoginCom))
