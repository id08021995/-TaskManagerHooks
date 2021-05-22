import React, {useState} from 'react';
import TaskService from '../services/TaskService';
import '../css/addingForm.min.css';

export default function AddingForm (props) {

	const [title, setTitle] = useState('');
	const [projectId, setProjectId] = useState(props.project[0].id);
	const [userId, setUserId] = useState(props.userId);
	const [usersOnProject, setUsersOnProject] = useState(props.usersOnProject);

	const onChangeHandler = (e) => {
		setTitle(e.target.value);
	}

	const onSelectHandler = (e) => {
		setUserId(e.target.value);
	}

	const addTask = async () => {
		const data = {
			title: title,
			projectId: projectId,
			userId: userId,
			status: 1
		};
		const taskService = new TaskService();
		const success = document.querySelector(".addingForm__success");
		const res = await taskService.postNewTask(data);
		if (res) {
			success.style.display = 'block';
		}
		setTimeout(() => {
			success.style.display = 'none';
			setTitle('');
			setUserId(null);
			closeModal();
		}, 1000);
	}
	
	const closeModal = () => {
		props.closeModal();
	}

	let developers = usersOnProject.filter(user => user.roleId === 3);
	developers = developers.map(user => {
		return {
			name: user.firstName + ' ' + user.lastName,
			id: user.id
		}
	});
	return (
		<div className={props.modalClassName}>
			<form className="addingForm__modal">
				<div className="addingForm__title">New Task</div>
				<div className="addingForm__textarea">
					<label htmlFor="textarea">Enter your task here</label>
					<textarea id="textarea" maxLength="200" onChange={(e)=> onChangeHandler(e)} type="text"></textarea>
					{title.length >= 200 ? <div className="addingForm__textAreaError">Max length is 200 characters</div> : null}
				</div>
				<div className="addingForm__select">
					<label htmlFor="select">Choose a developer</label>
					<select id="select" className="select"
						required
						onChange={(e)=> onSelectHandler(e)}>
							<option value={null}></option>
						{developers.map(developer => {
							return (
								<option key={developer.id} value={developer.id}>{developer.name}</option>
							)
						})}
					</select>
					<div className="addingForm__success">New Task has been added</div>
					<div className="addingForm__error">Something wrong</div>
				</div>
				<div className="addingForm__btns">
				<button onClick={()=> addTask()}
						type="button" 
						className="addingForm__btn">Add task</button>
					<button onClick={()=> closeModal()}
						type="button" 
						className="addingForm__btn">Cancel</button>
				</div>
			</form>
		</div>
	)
}