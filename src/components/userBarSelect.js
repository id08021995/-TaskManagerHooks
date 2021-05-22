import React, {useState} from 'react';
import '../css/userbar.min.css'

export default function UserBarSelect (props) {
	const [project, setProject] = useState(props.project);
	const [selectedId, setSelectedId] = useState(props.project);

	const selectProjectId = (selectedId) => {
		props.selectProjectId(selectedId);
	}

	const onSelectHandler = (e) => {
		selectProjectId(e.target.value);
		setSelectedId(selectedId);
	}

	return (
		<form className="userbar__select">
			<select onChange={(e) => onSelectHandler(e)}>
			<option value={null}></option>
				{project.map(currentProject => {
					return <option key={currentProject.id} value={currentProject.id}>{currentProject.name}</option>
				})}
			</select>
		</form>
	)
}