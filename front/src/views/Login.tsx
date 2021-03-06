import React from 'react'
import {FormGroup, Label, InputGroup,  Button, Tooltip, Intent} from "@blueprintjs/core"
import '../css/form.scss'
import eventBus from '../utils/eventBus'
import AuthenticationService from '../services/authentication'
import { RouteComponentProps, Link } from 'react-router-dom'

interface LoginGroupState {
  username: string;
  password: string;
  showPassword: boolean;
  disabled: boolean;
  isOnLoad: boolean;
}


class Login extends React.PureComponent<RouteComponentProps, LoginGroupState> {

    public state: LoginGroupState = {
      username: '',
      password: '',
      showPassword: false,
      disabled: false,
      isOnLoad: false
    }


    render() {

      const { showPassword, disabled } = this.state;

      const lockButton =  (
        <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`} disabled={disabled}>
            <Button
                disabled={disabled}
                icon={showPassword ? "unlock" : "lock"}
                intent={Intent.WARNING}
                minimal={true}
                onClick={this.handleLockClick}
            />
        </Tooltip>
    )
    const {isOnLoad} = this.state
      return (
        
        
        <section className="login-register">
          <div id="logo">
              <Link to="/"><img src={require('../assets/logo_white_h.svg')} alt="Logo"/></Link>
          </div>
          <FormGroup disabled={isOnLoad}>
          <div className="bp3-card">
              <h1>로그인</h1>
              <Label className="input-wrapper">
                  <strong>아이디 or Email</strong>
                  <InputGroup placeholder="아이디 or Email을 입력하세요."
                  onChange={ (e: React.ChangeEvent<HTMLInputElement>)  => this.setState({ username: e.target.value})} />
              </Label>
              <Label className="input-wrapper">
              <strong>비밀번호</strong>
              </Label>
                  <InputGroup
                    disabled={disabled}
                    placeholder="비밀번호를 입력하세요."
                    rightElement={lockButton}
                    type={showPassword ? "text" : "password"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value})}
                    onKeyPress={this.handleKeyPress}
                />
              
              <Button large id="login-button" onClick={this.handleAuthenticate} disabled={!this.SubmitPreventer()} loading={isOnLoad} className="bp3-fill"> 로그인 </Button><br/>
              <Link to="/register">회원가입</Link><br />
              <a href="/help">아이디/비밀번호 찾기</a> 
          </div>
          </FormGroup>
        </section>
      )
    }
    
    handleAuthenticate = () => {
      const f = new FormData()
      f.append('username', this.state.username)
      f.append('password', this.state.password)
      this.setState({isOnLoad:true})
      const json = JSON.stringify(Object.fromEntries(f))
        AuthenticationService.login(json).then(() => {
          alert('로그인 성공')
          AuthenticationService.fetchUser()
          this.props.history.push('/')
        }).catch((error) => {
          alert('로그인 실패, 이유: '+error.message)
          this.setState({isOnLoad:false})
        })
      }

    handleKeyPress = (e: any) => {
      if(e.key === 'Enter'){
        this.handleAuthenticate()
      }
    }

      

    componentDidMount = () => {
      eventBus.dispatch('headerFooter', { message: false })
    }

    componentWillUnmount = () => {
      eventBus.dispatch('headerFooter', {message: true})
      eventBus.remove('headerFooter')
    }

    SubmitPreventer = () => {
      return this.state.username.length >= 2 && this.state.password.length >= 8
    }

    handleLockClick = () => this.setState({ showPassword: !this.state.showPassword })
  }
  
  export default Login