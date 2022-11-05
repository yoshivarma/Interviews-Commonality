import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AddIcon from "@mui/icons-material/Add";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import "./App.css";
import axios from "axios";

// function App() {
// 	const [recording, setRecording] = useState([]);

// 	useEffect(() => {
// 		axios.get("/api").then((res) => setRecording(res.data));
// 	}, []);
// 	return recording.map((r, index) => {
// 		return <p key={index}>
// 			{r.id} {r.name} {r.keywords}
// 		</p>;
// 	});
// }

const App = () => {
	const [audio, setAudio] = useState("");
	const [audios, setAudios] = useState([]);
	const [audioName, setAudioName] = useState([]);
	const [keywords, setKeywords] = useState([]);

	let selected_audios = [];
	let selected_audio_names = [];

	const addFile = (e) => {
		Array.from(e.target.files).forEach((file) => {
			if (file) {
				selected_audios.push(URL.createObjectURL(file));
				selected_audio_names.push(file.name);
				setAudio(URL.createObjectURL(file));
			}
		});

		setAudios([...audios, selected_audios]);
		setAudioName([...audioName, selected_audio_names]);
	};

	const findKeywords = async () => {
		const formData = new FormData();

		audios.forEach((ad) => {
			formData.append("audios", ad);
		});

		const config = {
			headers: {
				"content-type": "multipart/form-data",
				"Access-Control-Allow-Origin": "*",
			},
		};
		try {
			let result = await axios.post(
				"http://localhost:8000/findkeywords",
				formData,
				config
			);
			setKeywords([...keywords, result.data])
			console.log(result.data);
		} catch (error) {
			console.error(error); // NOTE - use "error.response.data` (not "error")
		}

		// const requestOptions = {
		// 	method: "POST",
		// 	body: formData,
		// };

		// fetch("http://localhost:8000/findkeywords", requestOptions)
		// 	.then((response) => response.json())
		// 	.then(function (response) {
		// 		console.log(response);
		// 	});
	};

	return (
		<Container fixed>
			<form>
				<Box
					component="span"
					sx={{
						"& > :not(style)": { m: 1 },
					}}
					noValidate
					autoComplete="off"
				>
					<div>
						{/* <TextField
						id="outlined-basic"
						label=""
						variant="outlined"
						sx={{ width: "200px"}}
					/>

					<Button
						variant="contained"
						component="label"
					>
						<RadioButtonCheckedIcon />
					</Button> */}
						<Button variant="contained" component="label">
							<AddIcon />
							<input
								type="file"
								onChange={addFile}
								accept=".mp3, .wav"
								hidden
							/>
						</Button>
					</div>
				</Box>
				<Box>
					<List
						sx={{
							width: "100%",
							maxWidth: 360,
							bgcolor: "background.deepPurple[500]",
							position: "relative",
							overflow: "auto",
							maxHeight: 300,
							"& ul": { padding: 0 },
						}}
						subheader={<li />}
					>
						{keywords.map((a, index) => {
							return (
								<li key={index}>
									<ul>
										<ListItem>
												<ListItemText primary={a} />
										</ListItem>
									</ul>
								</li>
							);
						})}
					</List>
				</Box>
				<Box>
					<List
						sx={{
							width: "100%",
							maxWidth: 360,
							bgcolor: "background.deepPurple[500]",
							position: "relative",
							overflow: "auto",
							maxHeight: 300,
							"& ul": { padding: 0 },
						}}
						subheader={<li />}
					>
						{audios.map((a, index) => {
							return (
								<li key={index}>
									<ul>
										<ListItem onClick={() => setAudio(a.toString())}>
											<ListItemButton>
												<ListItemText primary={audioName[index]} />
											</ListItemButton>
										</ListItem>
									</ul>
								</li>
							);
						})}
					</List>
				</Box>

				<Box
					component="span"
					sx={{
						"& > :not(style)": { m: 1 },
					}}
					noValidate
					autoComplete="off"
				>
					<ReactAudioPlayer src={audio} autoPlay controls />
				</Box>
				<Box
					component="span"
					sx={{
						"& > :not(style)": { m: 1 },
					}}
					noValidate
					autoComplete="off"
				>
					<Button variant="contained" onClick={() => findKeywords()}>
						Find Keywords
					</Button>
				</Box>
			</form>
		</Container>
	);
};
export default App;
