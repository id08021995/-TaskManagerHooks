import {urls} from '../constants/const';

export default class TaskService {

	getAllTasksByProjectId = async (projectId) => {
		const baseUrl = urls.base;
		const url = urls.getAllTasksByProjectId;
		let res = await fetch(baseUrl + url + projectId);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}${projectId}` +
				`, received ${res.status}`);
		}
		return await res.json();
	}

	editTask = async (data) => {
		const baseUrl = urls.base;
		const url = urls.editTask;
		let res = await fetch(baseUrl + url, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {'Content-Type': 'application/json'}
		});
		if (res.ok) {
			const result = await res.json();
			return result;
		} else {
			console.log("Error in fetch")
		}
	}

	taskStatusUpdate = async (data) => {
		const baseUrl = urls.base;
		const url = urls.taskStatusUpdate;
		let res = await fetch(baseUrl + url, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {'Content-Type': 'application/json'}
		});
		if (res.ok) {
			const result = await res.json();
			return result;
		} else {
			console.log(res)
			console.log("Error in fetch")
		}
	}

	postNewTask = async (data) => {
		const baseUrl = urls.base;
		const url = urls.postNewTask;
		let res = await fetch(baseUrl + url, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {'Content-Type': 'application/json'}
		});
		if (res.ok) {
			const result = await res.json();
			return result;
		} else {
			console.log("Error in fetch")
		}
	}

	deleteTask = async (taskId) => {
		const baseUrl = urls.base;
		const url = urls.deleteTask;
		let res = await fetch(baseUrl + url + taskId, {
			method: "DELETE",
			body: JSON.stringify(taskId),
			headers: {'Content-Type': 'application/json'}
		});
		if (res.ok) {
			const result = await res.json();
			return result;
		} else {
			console.log("Error in fetch")
		}
	}
}