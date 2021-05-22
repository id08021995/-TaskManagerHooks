import React, {useState} from 'react';
import UserBarSelect from '../components/userBarSelect';
import AddingForm from '../components/AddingForm';
import '../css/userbar.min.css';

export default function UserBar (props) {
	const [currentUser, setCurrentUser] = useState(props.currentUser);
	const [project, setProject] = useState(props.project);
	const [usersOnProject, setUsersOnProject] = useState(props.usersOnProject);
	const [showModal, setShowModal] = useState(false);

	if(props.project !== project){
		setProject(props.project)
	}

	const selectProjectId = (i) => {
		props.selectProjectId(i);
	}

	const openModal = () => {
		setShowModal(true);
	}

	const closeModal = () => {
		setShowModal(false);
		props.refreshDashBoard();
	}

	const {logout} = props;
	let modalClassName;
	showModal ? modalClassName = 'addingForm active' : modalClassName = 'addingForm';
	return (
		<div className="userbar">
			{showModal
			? <AddingForm 
				usersOnProject={usersOnProject} 
				project={project}
				modalClassName={modalClassName} 
				closeModal={()=> closeModal()}></AddingForm>
			: null}
			<div className="container">
				<div className="userbar__content">
					<div className ="userbar__user">
						<div className="userbar__img">
						<img src="https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png" alt="user_pic"/>
						</div>
						<h3 className="userbar__name">{currentUser.firstName} {currentUser.lastName}</h3>
					</div>
					{currentUser.roleId === 1 
					? <UserBarSelect selectProjectId={(index) => selectProjectId(index)} project={project}/>
					: null}
					<div className="userbar__btns">
					{currentUser.roleId !== 3 
					? <button 
						onClick={()=> openModal()}
						type="button" 
						className="userbar__btn">New Task</button> 
					: null}
						<button 
							onClick={logout}
							type="button" 
							className="userbar__btn">Log Out</button>
					</div>
				</div>
			</div>
		</div>
	)
}