import React, {useState, useEffect} from 'react';
import StatusList from './StatusList.js';
import UserBar from './UserBar';
import TaskService from '../services/TaskService';
import ProjectService from '../services/ProjectService';
import '../css/dashboard.min.css';


export default function DashBoard ({dashboardProps}) {
	const taskService = new TaskService();
	const [currentUser, setCurrentUser] = useState(dashboardProps.currentUser);
	const [tasks, setTasks] = useState(dashboardProps.tasks);
	const [project, setProject] = useState(dashboardProps.project);
	const [usersOnProject, setUsersOnProject] = useState(dashboardProps.usersOnProject);
	const [taskIdToChange, setTaskIdToChange] = useState('');

	

	const refreshDashBoard = async () => {
		if (currentUser.roleId !== 1) {
			const projectId = project[0].id;
			const newTasks = await taskService.getAllTasksByProjectId(projectId);
			if (newTasks !== tasks) {
				setTasks(newTasks);
				const localData = JSON.parse(localStorage.getItem("localData"));
				if (localData) {
					localData.tasks = newTasks;
					localStorage.setItem("localData", JSON.stringify(localData));
				}
			} else {
				console.log('Error with refreshing dashboard')
			}
		} else {
			const projectService = new ProjectService();
			const allProjects = await projectService.getAllProjects();
			let arr = [];
			allProjects.map(async (project) => {
				let id = project.id
				let allTasks = await taskService.getAllTasksByProjectId(id);
				arr.push(...allTasks);
			});
			if (arr !== tasks) {
				setTasks(arr);
				const localData = JSON.parse(localStorage.getItem("localData"));
				if (localData) {
					localData.tasks = arr;
					localStorage.setItem("localData", JSON.stringify(localData));
				}
			} else {
				console.log('Error with refreshing dashboard')
			}
		}
	}

	const dragStartHandler = (e) => {
		setTaskIdToChange(e.target.id);
	}

	const updateTask = async (newStatus) => {
		const data = {
			"taskId": taskIdToChange,
			"status": newStatus
		};
		const update = await taskService.taskStatusUpdate(data);
		if (update === 1) {
			refreshDashBoard();
		} else {
			console.log("Error with updating");
		}
	}

	const dragOverHandler = (e) => {
		e.preventDefault();
		e.currentTarget.style.background = '#a0a0a062';
	}

	const dragLeaveHandler = (e) => {
		e.currentTarget.style.background = 'none'
	}

	const dropHandler = (e) => {
		e.preventDefault();
		const newStatus = e.currentTarget.getAttribute('data-id');
		e.currentTarget.style.background = 'none';
		e.currentTarget.childNodes.forEach(item => {
			item.style.display = ''
		});
		updateTask(newStatus);
	}

	const logout = () => {
		dashboardProps.logout();
	}
	const selectProjectId = (index) => {
		dashboardProps.selectProjectId(index);
	}
	const tasksToShow = currentUser.roleId === 3 
	? tasks.filter(task => task.userId === currentUser.id)
	: tasks;

	let statusListProps = {
		tasks: tasksToShow,
		currentUser: currentUser,
		project: project,
		usersOnProject: usersOnProject,
		refreshDashBoard: () => refreshDashBoard(),
		dragStartHandler:  (e) => dragStartHandler(e),
		dropHandler: (e) => dropHandler(e),
		dragOverHandler: (e) => dragOverHandler(e),
		dragLeaveHandler: (e) => dragLeaveHandler(e)
	}
	return (
		<>
			<div className="container">
				<UserBar 
					currentUser={currentUser} 
					logout={logout} usersOnProject={usersOnProject} 
					project={project}
					refreshDashBoard={() => refreshDashBoard()}
					selectProjectId={(index) => selectProjectId(index)}/>
				<div className="dashBoard">
					<div className="dashBoard__wrapper">
						<StatusList key="1"  statusListProps={statusListProps} tasks={tasksToShow} statusId={ 1 }/>
						<StatusList key="2"  statusListProps={statusListProps} tasks={tasksToShow} statusId={ 2 }/>
						<StatusList key="3"  statusListProps={statusListProps} tasks={tasksToShow} statusId={ 3 }/>
					</div>
				</div>
			</div>
		</>
	)
}