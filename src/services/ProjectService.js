import {urls} from '../constants/const';

export default class ProjectService {

	getAllProjects = async () => {
		const baseUrl = urls.base;
		const url = urls.getAllProjects;
		let res = await fetch(baseUrl + url);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}` +
				`, received ${res.status}`);
		}
		return await res.json();
	}
	
	getAllInformationAboutProject= async (projectId) => {
		const baseUrl = urls.base;
		const url = urls.getAllInformationAboutProject;
		let res = await fetch(baseUrl + url + projectId);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}` +
				`, received ${res.status}`);
		}
		return await res.json();
	}
}