import { useState } from "react"
import axios from "axios"
import "./App.css"

function App() {
	const [name, setName] = useState("")
	const [picture, setPicture] = useState("")
	const [pictures, setPictures] = useState([])

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			// const userPicture = { name, picture }

			const fd = new FormData()
			fd.append("name", name)
			fd.append("picture", picture)

			const response = await axios.post("http://localhost:5005/api", fd)

			setPictures((current) => [...current, response.data])

			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}
	console.log(picture)
	return (
		<>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>Required</legend>
					<label htmlFor="name">Name: </label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</fieldset>
				<fieldset>
					<legend>Extra</legend>
					<label htmlFor="picture">Picture: </label>
					<input
						type="file"
						id="picture"
						// multiple={true}
						onChange={(e) => setPicture(e.target.files[0])}
					/>
				</fieldset>

				<button>Create</button>
			</form>

			{pictures.map(({ _id, name, picture }) => {
				return (
					<div key={_id}>
						<p>{name}</p>
						<img src={picture} width={100} />
					</div>
				)
			})}
		</>
	)
}

export default App
