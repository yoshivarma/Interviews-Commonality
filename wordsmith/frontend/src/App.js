import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import "./App.css";
import Button from "@mui/material/Button";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import AddIcon from "@mui/icons-material/Add";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

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

	return (
		// <div>
		<Container fixed>
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
						<input type="file" onChange={addFile} accept=".mp3, .wav" hidden />
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
				<Button variant="contained">Find Keywords</Button>
			</Box>
			{/* </div> */}
		</Container>
	);
};
export default App;
