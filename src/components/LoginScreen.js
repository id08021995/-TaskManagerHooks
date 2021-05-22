import React, {Component} from 'react';
import '../css/loginScreen.min.css';

export default class LoginScreen extends Component {
	constructor (props) {
			super(props);

			this.state = {
					login: '',
					password: ''
			}
	}

	changeLog = (e) => {
			this.setState({
				login: e.target.value
			});
	}
	changePass = (e) => {
		this.setState({
			password: e.target.value
		});
	}
	sendData = () => {
		let data = {
			login: this.state.login,
			password: this.state.password
		};
		this.props.sendData(data);
	}
	onHandleKeyPress = (event) => {
		if (event.key === 'Enter') {
				this.sendData();
		}
	}
		
	render() {
		return (
			<div className="login">
				<div className="login__content">
					<h1 className="login__title">best task manager in the world</h1>
					<div className="login__wrapper" onKeyPress={this.onHandleKeyPress}>
						<input 
							onChange={this.changeLog}
							className="login__input" 
							placeholder="Login"></input>
						<input 
							onChange={this.changePass}
							className="login__input" 
							placeholder="Password"></input>
						<button 
							onClick={() => this.sendData()}
							type="button" 
							className="login__btn">Log in</button>
					</div>
				</div>
			</div>
		)
	}
};