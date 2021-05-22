import React, {useState} from 'react';
import TaskService from '../services/TaskService';
import '../css/taskModalEdit.min.css';

export default function TaskModalEdit (props) {

	const [task, setTask] = useState(props.task);
	const [title, setTitle] = useState(props.task.title);
	const [projectId, setProjectId] = useState(props.task.projectId);
	const [userId, setUserId] = useState(props.task.userId);
	const [status, setStatus] = useState(props.task.status);
	const [usersOnProject, setUsersOnProject] = useState(props.usersOnProject);
	const [taskDeveloper, setTaskDeveloper] = useState({});
	const [confirm, setConfirm] = useState(false);

	const onChangeHandler = (e) => {
		setTitle(e.target.value);
	}

	const onSelectHandler = (e) => {
		setUserId(e.target.value);
	}

	const saveChanges = async () => {
		const data = {
			id: task.id,
			title: title,
			projectId: projectId,
			userId: userId,
			status: status
		};
		const service = new TaskService();
		const success = document.querySelector(".taskModalEdit__success");
		const error = document.querySelector(".taskModalEdit__error");
		const res = await service.editTask(data);
		if (res) {
			success.style.display = 'block';
			setTimeout(() => {
				success.style.display = 'none';
				setTask('');
				setTitle('');
				setUserId(null);
				closeTaskModalEdit();
			}, 1000);
		} else {
			error.style.display = 'block';
		}
	}
	
	const closeTaskModalEdit = () => {
		props.closeTaskModalEdit();
	}

	const justDevelopers = usersOnProject.filter(user => user.roleId === 3);

	let selectedDeveloper;
	let selectedDeveloperId;
	let otherDevelopers;
	let selectedDeveloperName;
	if (userId) {
		selectedDeveloper = justDevelopers.filter(user => user.id === userId)[0]
		selectedDeveloperId = selectedDeveloper.id;
		otherDevelopers = justDevelopers.filter(user => user.id !== selectedDeveloperId);
		selectedDeveloperName = selectedDeveloper.firstName + ' ' + selectedDeveloper.lastName;
	} else {
		selectedDeveloper = null;
		selectedDeveloperId = null;
		selectedDeveloperName = null;
		otherDevelopers = justDevelopers;
	}

	return (
		<div className={props.taskModalClassName}>
			<form className="taskModalEdit__modal">
				<div className="taskModalEdit__title">Task Editor</div>
				<div className="taskModalEdit__textarea">
					<label htmlFor="textarea">Task</label>
					<textarea value={title} id="textarea" maxLength="200" onChange={(e)=> onChangeHandler(e)} type="text"></textarea>
					{title.length >= 200 ? <div className="taskModalEdit__textAreaError">Max length is 200 characters</div> : null}
				</div>
				<div className="taskModalEdit__select">
					<label htmlFor="select">Developer</label>
					<select id="select" className="select"
						required
						onChange={(e)=> onSelectHandler(e)}>
							<option value={selectedDeveloperId}>{selectedDeveloperName}</option>
						{otherDevelopers.map(developer => {
							return (
								<option key={developer.id} value={developer.id}>{developer.firstName} {developer.lastName}</option>
							)
						})}
					</select>
					<div className="taskModalEdit__success">Task was successfully changed</div>
					<div className="taskModalEdit__error">Something wrong</div>

				</div>
				<div className="taskModalEdit__btns">
				<button onClick={() => saveChanges()}
						type="button" 
						className="taskModalEdit__btn">Save changes</button>
					<button onClick={()=> closeTaskModalEdit()}
						type="button" 
						className="taskModalEdit__btn">Cancel</button>
				</div>
			</form>
		</div>
	)
}