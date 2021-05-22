import React, {useState, useEffect} from 'react';
import '../css/statusList.min.css';
import Task from './Task.js';

export default function StatusList ({statusListProps, statusId}) {
	const [currentUser] = useState(statusListProps.currentUser);
	const [tasks, setTasks] = useState(statusListProps.tasks);
	const [usersOnProject, setUsersOnProject] = useState(statusListProps.usersOnProject);
	
	if (statusListProps.tasks !== tasks) {
		setTasks(statusListProps.tasks);
	}

	const refreshDashBoard = () => {
		statusListProps.refreshDashBoard();
	}
	const dragStartHandler = (e) => {
		statusListProps.dragStartHandler(e)
	}
	const dragOverHandler = (e) => {
		statusListProps.dragOverHandler(e)
	}
	const dragLeaveHandler = (e) => {
		statusListProps.dragLeaveHandler(e)
	}
	const dropHandler = (e) => {
		statusListProps.dropHandler(e)
	}
	
	let filteredTasks;
	let statusListClassName;
	let statusListTitleName;
	switch (statusId) {
		case 1: 
			filteredTasks = tasks.filter(task => task.status === 1);
			statusListClassName = 'statusList statusList__backlog';
			statusListTitleName = "BACKLOG";
		break;
		case 2:
			filteredTasks = tasks.filter(task => task.status === 2);
			statusListClassName = 'statusList statusList__inProgress'
			statusListTitleName = "IN PROGRESS"
		break;
		case 3:
			filteredTasks = tasks.filter(task => task.status === 3);
			statusListClassName = 'statusList statusList__done'
			statusListTitleName = "DONE"
		break;
		default:
		return undefined;
	}
	const role = currentUser.roleId;
	let showDeveloper;
	role !== 3 ? showDeveloper = true : showDeveloper = false;
	return (
		<div
			onDragStart={(e) => dragStartHandler(e)}
			onDragLeave={(e) => dragLeaveHandler(e)}
			onDragOver={(e) => dragOverHandler(e)}
			onDrop={(e) => dropHandler(e)}
			data-id = {statusId}
			className={statusListClassName}>
				<div className="statusList__title">{statusListTitleName}</div>
				{filteredTasks.map(task => {
					return <Task 
						key={task.id} 
						task={task}
						showDeveloper={showDeveloper}
						usersOnProject={usersOnProject}
						refreshDashBoard={() => refreshDashBoard()}/>
				})}
		</div>
	)
}