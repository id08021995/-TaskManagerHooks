import React, {Component} from 'react';
import '../css/confirm.min.css';

export default class Confirm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showConfirm: false
		}
	}
	deleteTask = (e) => {
		this.props.deleteTask(e);
	};

	closeConfirm = () => {
		this.props.closeConfirm();
	}

	render() {
		const {data} = this.props;
		return (
			<div className={this.props.confirmClassName}>
					<div className="confirm__modal">
						<div className="confirm__title">
							Delete task?
						</div>
						<div className="confirm__btns">
							<button data-id={data} onClick={(e) => this.deleteTask(e)}
								type="button" 
								className="confirm__btn">Delete</button>
							<button onClick={()=> this.closeConfirm()}
								type="button" 
								className="confirm__btn">Cancel</button>
						</div>
					</div>
			</div>
		)
	}
}