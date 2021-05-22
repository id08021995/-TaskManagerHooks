import {urls} from '../constants/const';

export default class UserService {

		getAllUsers= async () => {
			const baseUrl = urls.base;
			const url = urls.getAllUsers;
			let res = await fetch(baseUrl + url);
			if (!res.ok) {
				throw new Error(`Could not fetch ${url}` +
					`, received ${res.status}`);
			}
			return await res.json();
		}

		getUserById = async (userId) => {
			const baseUrl = urls.base;
			const url = urls.getUserProject;
			let res = await fetch(baseUrl + url + userId);
			if (!res.ok) {
				throw new Error(`Could not fetch ${url}${userId}` +
					`, received ${res.status}`);
			}
			return await res.json();
		}
		getUserProject = async (projectId) => {
			const baseUrl = urls.base;
			const url = urls.getUserProject;
			let res = await fetch(baseUrl + url + projectId);
			if (!res.ok) {
				throw new Error(`Could not fetch ${url}${projectId}` +
					`, received ${res.status}`);
			} else {
				const result = await res.json();
				return result;
			}
		}

		userLogin = async (data) => {
				const baseUrl = urls.base;
				const url = urls.userLogin;
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

		userAssign = async (data) => {
			const baseUrl = urls.base;
			const url = urls.assign;
			let res = await fetch(baseUrl + url, {
				method: "POST",
				body: JSON.stringify(data),
				headers: {'Content-Type': 'application/json'}
			});
			if (!res.ok) {
				throw new Error(`Could not fetch ${url}` +
					`, received ${res.status}`);
			} else {
				const result = await res.json();
				return result;
			}
		}
}