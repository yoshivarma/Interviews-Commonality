import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AddIcon from "@mui/icons-material/Add";
import MicIcon from "@mui/icons-material/Mic";

import {
	Chip,
	Container,
	Divider,
	Fab,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import getBlobDuration from "get-blob-duration";
import * as React from "react";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import "./App.css";

const darkTheme = createTheme({
	palette: {
		background: {
			default: "#1A0B23",
		},
	},
});

const CssTextField = styled(TextField)({
	"& label.Mui-focused": {
		color: "green",
	},
	input: {
		color: "white",
	},
	floatingLabelFocusStyle: {
		color: "white",
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "green",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "red",
			color: "red",
		},
		"&:hover fieldset": {
			borderColor: "yellow",
		},
		"&.Mui-focused fieldset": {
			borderColor: "green",
		},
	},
	marginRight: 10,
});

const App = () => {
	const [audio, setAudio] = useState("");
	const [audios, setAudios] = useState([]);
	const [audioName, setAudioName] = useState([]);
	const [audioDuration, setAudioDuration] = useState([]);
	const [keywords, setKeywords] = useState([]);

	let selected_audios = [];
	let selected_audio_names = [];
	let selected_audio_durations = [];

	const convertToMinsAndSecs = (d) => {
		var h = Math.floor(d / 3600);
		var m = Math.floor((d % 3600) / 60);
		var s = Math.floor((d % 3600) % 60);

		var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
		var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
		var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
		var final_duration = hDisplay.concat(mDisplay).concat(sDisplay);
		return final_duration;
	};

	const addFile = (e) => {
		Array.from(e.target.files).forEach(async (file) => {
			if (file) {
				selected_audios.push(URL.createObjectURL(file));
				selected_audio_names.push(
					file.name.split(".")[0].charAt(0).toUpperCase() +
						file.name.split(".")[0].slice(1)
				);
				const duration = await getBlobDuration(URL.createObjectURL(file));
				const str_duration = convertToMinsAndSecs(Math.floor(duration));
				selected_audio_durations.push(str_duration);
				setAudio(URL.createObjectURL(file));
			}
		});

		setAudios([...audios, selected_audios]);
		setAudioName([...audioName, selected_audio_names]);
		setAudioDuration([...audioDuration, selected_audio_durations]);
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

			setKeywords([...keywords, ...result.data]);
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

	const handleClick = (keyword) => {
		console.log(audio.duration + " clicked");
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />

			<Container fixed sx={{ textAlign: "center", alignContent: "center" }}>
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
								sx={{
									width: "200px",
									"& .MuiOutlinedInput-root": { borderColor: "red" },
								}}
							/> */}
							<CssTextField
								label="Recording Title"
								id="custom-css-outlined-input"
							/>

							<Fab
								variant="contained"
								component="label"
								sx={{ background: "#DF8633" }}
							>
								<MicIcon fontSize="large" sx={{ color: "white" }} />
							</Fab>
							<Fab
								variant="contained"
								component="label"
								sx={{ background: "#DF8633", marginLeft: 1 }}
							>
								<AddIcon fontSize="large" sx={{ color: "white" }} />
								<input
									type="file"
									onChange={addFile}
									accept=".mp3, .wav"
									hidden
								/>
							</Fab>
						</div>
					</Box>
					<Typography variant="h4" sx={{ color: "white" }}>
						Case 1 Keywords
					</Typography>
					{keywords.length !== 0 ? (
						<Stack direction="row" spacing={1}>
							{keywords.map((data, index) => {
								return (
									<ListItem key={index}>
										<Chip
											onClick={() => handleClick(data)}
											label={data}
											sx={{ background: "#DF8633" }}
										/>
									</ListItem>
								);
							})}
						</Stack>
					) : (
						<Typography variant="p" sx={{ color: "#DF8633" }}>
							No keywords yet
						</Typography>
					)}
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
													<Box
														component="span"
														sx={{
															width: 70,
															height: 60,
															backgroundColor: "#636363",
															borderRadius: 4,
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
														}}
													>
														<Typography
															variant="h5"
															sx={{ color: "white", fontWeight: "bold" }}
														>
															{index + 1}
														</Typography>
													</Box>
													<Container
														fixed
														sx={{ display: "flex", flexDirection: "column" }}
													>
														<div>
															<ListItemText
																disableTypography
																primary={audioName[index]}
																sx={{
																	color: "white",
																	fontSize: "20px",
																	marginLeft: 1,
																	fontWeight: "bold",
																}}
															/>
														</div>
														<div>
															<ListItemText
																disableTypography
																primary={audioDuration[index]}
																sx={{
																	color: "#DF8633",
																	fontSize: "12px",
																	marginTop: -1,
																	marginLeft: 1,
																}}
															/>
														</div>
													</Container>
												</ListItemButton>
											</ListItem>
											<Divider sx={{ background: "#9F9F9F" }} />
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
						<Button
							sx={{ background: "#DF8633" }}
							variant="contained"
							onClick={() => findKeywords()}
						>
							Find Keywords
						</Button>
					</Box>
				</form>
			</Container>
		</ThemeProvider>
	);
};
export default App;
