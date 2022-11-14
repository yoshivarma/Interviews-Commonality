import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MicIcon from "@mui/icons-material/Mic";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Alert,
	Chip,
	Collapse,
	Container,
	Divider,
	Fab,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import getBlobDuration from "get-blob-duration";
import * as React from "react";
import { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useParams } from "react-router-dom";

const Recordings = () => {
	const [audio, setAudio] = useState("");
	const [audios, setAudios] = useState([]);
	const [audioName, setAudioName] = useState([]);
	const [audioDuration, setAudioDuration] = useState([]);

	const [keywords, setKeywords] = useState([]);
	const [caseName, setCaseName] = useState("");
	const [recordings, setRecordings] = useState([]);

	const [open, setOpen] = useState(false);

	const { id } = useParams();

	let selected_audios = [];
	let selected_audio_names = [];
	let selected_audio_durations = [];

	const getCaseDetails = async () => {
		const config = {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"content-type": "multipart/form-data",
				"cache-control": "no-store"
			},
		};

		try {
			let result = await axios.get(
				"http://localhost:8000/api/cases/" + id,
				config
			);
			setKeywords(result.data.case_data.keywords);
			setCaseName(result.data.case_data.name);
			setRecordings(result.data.recordings);
			console.log(result.data);
		} catch (error) {
			console.error(error); // NOTE - use "error.response.data` (not "error")
		}
	};

	useEffect(() => {
		getCaseDetails();
	}, []);

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

	const addRecording = async (e) => {
		Array.from(e.target.files).forEach(async (file) => {
			if (file) {
				const recording_name =
					file.name.split(".")[0].charAt(0).toUpperCase() +
					file.name.split(".")[0].slice(1);

				const formData = new FormData();
				formData.append("recording_file", file, file.name);

				const config = {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				};

				try {
					let result = await axios.post(
						"http://localhost:8000/api/cases/" + id + "/recordings",
						formData,
						config
					);
					console.log(result.data);
				} catch (error) {
					console.error(error); // NOTE - use "error.response.data` (not "error")
				}
			}
		});
	};


	const deleteRecording = async (r_id) => {
		await axios.delete("http://localhost:8000/api/cases/" + id + "/recordings/"+ r_id );

		getCaseDetails();
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
		<Container
			fixed
			sx={{ textAlign: "center", alignContent: "center", marginTop: 5 }}
		>
			<Collapse in={open}>
				<Alert
					severity="error"
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setOpen(false);
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
					sx={{ mb: 2 }}
				>
					Add Recordings First!
				</Alert>
			</Collapse>
			<form>
				<Box
					component="span"
					sx={{
						"& > :not(style)": { m: 1 },
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
					noValidate
					autoComplete="off"
				>
					<Link to={"/"}>
						<Fab
							variant="contained"
							component="label"
							sx={{ background: "none", height: "40px", width: "40px" }}
							onClick={() => console.log("Go back to cases!")}
						>
							<ChevronLeftIcon fontSize="large" sx={{ color: "white" }} />
						</Fab>
					</Link>
					<TextField
						hiddenLabel
						id="filled-hidden-label-small"
						size="small"
						placeholder="Recording Title"
						variant="filled"
						sx={{
							input: { color: "white" },
							label: { color: "orange" },
							background: "#80768D",
							borderRadius: 1,
						}}
					/>

					<Fab
						variant="contained"
						component="label"
						sx={{ background: "#DF8633", height: "40px", width: "40px" }}
					>
						<MicIcon fontSize="large" sx={{ color: "white" }} />
					</Fab>
					<Fab
						variant="contained"
						component="label"
						sx={{
							background: "#DF8633",
							marginLeft: 1,
							height: "40px",
							width: "40px",
						}}
					>
						<AddIcon fontSize="large" sx={{ color: "white" }} />
						<input
							type="file"
							onChange={(e) => {
								addRecording(e).then(() => getCaseDetails())
							}}
							accept=".mp3, .wav"
							hidden
						/>
					</Fab>
				</Box>
				<Typography variant="h4" sx={{ color: "white" }}>
					Case {caseName} Keywords
				</Typography>
				{keywords.length !== 0 ? (
					keywords.length < 4 ? (
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "space-around",
								p: 5,
								m: 1,
								maxWidth: 600,
								borderRadius: 1,
							}}
						>
							{keywords.map((data, index) => {
								return (
									// <ListItem key={index}>
									<Chip
										key={index}
										onClick={() => handleClick(data)}
										label={data}
										sx={{ background: "#DF8633", color: "white", m: 0.5 }}
									/>
									// </ListItem>
								);
							})}
						</Box>
					) : (
						<>
							{/* <Box
									sx={{
										display: "flex",
										flexWrap: "wrap",
										justifyContent: "space-around",
										p: 5,
										m: 1,
										maxWidth: 600,
										borderRadius: 1,
									}}
								>
									{keywords.slice(0,3).map((data, index) => {
										return (
											// <ListItem key={index}>
											<Chip
												key={index}
												onClick={() => handleClick(data)}
												label={data}
												sx={{ background: "#DF8633", color: "white", m: 0.5 }}
											/>
											// </ListItem>
										);
									})}
								</Box> */}
							<Accordion
								sx={{
									backgroundColor: "#1A0B23",
									border: "none",
								}}
							>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography sx={{ color: "white" }}>
										View All {keywords.length} Keywords
									</Typography>
								</AccordionSummary>
								<AccordionDetails
									sx={{
										display: "flex",
										flexWrap: "wrap",
										justifyContent: "space-around",
										// p: 5,
										// m: 1,
										maxWidth: 400,
										borderRadius: 1,
									}}
								>
									{keywords.map((data, index) => {
										return (
											<Chip
												key={index}
												onClick={() => handleClick(data)}
												label={data}
												sx={{ background: "#DF8633", color: "white", m: 0.5 }}
											/>
										);
									})}
								</AccordionDetails>
							</Accordion>
						</>
					)
				) : (
					<Typography variant="p" sx={{ color: "#DF8633" }}>
						No keywords yet
					</Typography>
				)}
				<Box>
					<Typography variant="h4" sx={{ color: "white" }}>
						Recordings
					</Typography>
					<List
						sx={{
							width: "100%",
							maxWidth: 400,
							bgcolor: "background.deepPurple[500]",
							position: "relative",
							overflow: "auto",
							maxHeight: 450,
							"& ul": { padding: 0 },
						}}
						subheader={<li />}
					>
						{recordings.map((a, index) => {
							return (
								<li key={index}>
									<ul>
										<ListItem
											onClick={() => setAudio(a.recording_link.toString())}
										>
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
													<Container sx={{display: "flex", flexDireciton: "row"}}>
														<ListItemText
															disableTypography
															primary={a.name}
															sx={{
																color: "white",
																fontSize: "20px",
																marginLeft: 1,
																fontWeight: "bold",
															}}
														/>
														<Fab
															variant="contained"
															component="label"
															sx={{
																background: "none",
																height: "40px",
																width: "40px",
															}}
															onClick={() => deleteRecording(a.id)}
														>
															<DeleteIcon
																fontSize="large"
																sx={{ color: "white" }}
															/>
														</Fab>
													</Container>
													<Typography
														variant="h6"
														sx={{
															color: "#DF8633",
															fontSize: "12px",
															marginTop: -1,
															marginLeft: 1,
														}}
													>
														{audioDuration[index]}
													</Typography>
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
						onClick={() => {
							if (audios.length === 0) {
								setOpen(true);
							} else {
								findKeywords();
							}
						}}
					>
						Find Keywords
					</Button>
				</Box>
			</form>
		</Container>
		// </ThemeProvider>
	);
};
export default Recordings;
