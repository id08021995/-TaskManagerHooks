import React, {useState} from 'react';
import TaskService from '../services/TaskService';
import TaskModalEdit from '../components/TaskModalEdit';
import Confirm from '../components/Confirm';
import '../css/task.min.css';

export default function Task (props) {
	const {task, usersOnProject} = props;

	const [id, setId] = useState(props.task.id);
	const [title, setTitle] = useState(props.task.id);
	const [projectId, setpPojectId] = useState(props.task.id);
	const [userId, setUserId] = useState(props.task.id);
	const [showDeveloper, setShowDeveloper] = useState(props.showDeveloper);
	const [showMoreInformation, setShowMoreInformation] = useState(false);
	const [taskHasBeenDeleted, setTaskHasBeenDeleted] = useState(false);
	const [showTaskModalEdit, setShowTaskModalEdit] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const getClassName = (taskStatus) => {
		switch(taskStatus) {
			case 1:
				return 'task task__backlog';
			case 2:
				return'task task__inProgress';
			case 3:
				return 'task task__done';
			default:
				return undefined;
			};
	}

	const deleteTask = async (e) => {
		const taskId = e.target.getAttribute('data-id');
		const taskService = new TaskService();
		const res =  await taskService.deleteTask(taskId);
		if (res) {
			setTaskHasBeenDeleted(true);
			setTimeout(() => {
				refreshDashBoard();
			}, 500)
		} else {
			console.log("Что-то пошло не туда")
		}
	};

	const refreshDashBoard = () => {
		props.refreshDashBoard();
	};

	const showMore = (e) => {
		const elem = e.target.parentNode.parentNode.parentNode;
		if (e.target.classList.contains('fa-arrow-down')) {
			e.target.classList.remove('fa-arrow-down')
			e.target.classList.add('fa-arrow-up');
			elem.classList.add('task__increased');
			setShowMoreInformation(true);
		} else {
				e.target.classList.remove('fa-arrow-up')
			e.target.classList.add('fa-arrow-down');
			elem.classList.remove('task__increased');
			setShowMoreInformation(false);
		}
	};

	const openTaskModalEdit = () => {
		setShowTaskModalEdit(true)
	}
	
	const closeTaskModalEdit = () => {
		setShowTaskModalEdit(false);
		refreshDashBoard();
	}

	const showConfirm = () => {
		setShowConfirmModal(true);
	}

	const closeConfirm = () => {
		setShowConfirmModal(false);
	}
	
	const userName = task.user ? task.user.firstName + ' ' + task.user.lastName : '';
	let taskClassName = getClassName(task.status);
	let taskText;
	if (!showMoreInformation && task.title.length > 100) {
		taskText = task.title.substring(0, 100) + '...';
	} else {
		taskText = task.title
	}

	let confirmClassName;
	showConfirm ? confirmClassName = 'confirm active' : confirmClassName = 'confirm';

	let taskModalClassName;
	showTaskModalEdit ? taskModalClassName = 'taskModalEdit active' : taskModalClassName = 'taskModalEdit';
	return (
		<>
			{showConfirmModal
			? <Confirm 
				confirmClassName={confirmClassName} 
				data={task.id}
				deleteTask={(e) => deleteTask(e)} 
				closeConfirm={() => closeConfirm()} />
			: null }
			{showTaskModalEdit
				? <TaskModalEdit 
					task={task} 
					usersOnProject={usersOnProject} 
					taskModalClassName={taskModalClassName} 
					closeTaskModalEdit={()=> closeTaskModalEdit()} 
					refreshDashBoard={() => refreshDashBoard()}/>
			: null}
			<div draggable={true}
			key={task.id}
			id={task.id}
			data-status={task.status}
			className={taskClassName}>
			<div className="task__text">
				{taskHasBeenDeleted? <div className="task__deleted">Task has been deleted</div> : <div className="task__title">{taskText}</div>}
				
				<div className="task__arrow">
					<i className="fa fa-arrow-down" aria-hidden="true" onClick={(e) => showMore(e)}></i>
				</div>
			</div>
			<div className="task__divider"></div>
			<div className="task__info">
				<div className="task__executor">
					{showDeveloper === true 
					? <div>
							<div className="task__subtitle">Исполнитель: {userName} </div> 
						</div>
					: null
					}
				</div>
				<div className="task__icons">
					<div className="task__edit">
						<i className="fa fa-pencil" data-id={task.id} data-status={task.status} onClick={() => openTaskModalEdit()} aria-hidden="true"></i>
					</div>
					<div className="task__delete">
						<i className="fa fa-trash" data-id={task.id} onClick={() => showConfirm()}  aria-hidden="true"></i>
					</div>
				</div>
			</div>
		</div>
		</>
	)
};
