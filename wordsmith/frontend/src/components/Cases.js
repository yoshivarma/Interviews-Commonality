import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
	Alert,
	Box,
	Collapse,
	Container,
	Divider,
	Fab,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	TextField,
	Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

// const Cases = ( { agentCases } ) =>
const Cases = () => {
	const [agentCases, setAgentCases] = useState([]);
	const [textInput, setTextInput] = useState("");
	const [open, setOpen] = useState(false);

	const getAgentCases = async () => {
		const config = {
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		};

		try {
			let result = await axios.get("http://localhost:8000/api/", config);
			setAgentCases(result.data);
			console.log(result.data);
		} catch (error) {
			console.error(error); // NOTE - use "error.response.data` (not "error")
		}
	};

	useEffect(() => {
		getAgentCases();
	}, []);

	const deleteCase = async (id) => {
		await axios.delete("http://localhost:8000/api/cases/" + id);

		getAgentCases();
	};

	const handleTextInputChange = (event) => {
		setTextInput(event.target.value);
	};

	const addAgentCase = async () => {
		const agentCase = { name: textInput };

		const config = {
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		};

		try {
			let result = await axios.post(
				"http://localhost:8000/api/cases",
				agentCase,
				config
			);
			// setAgentCases(result.data);
			// console.log(result.data);
		} catch (error) {
			console.error(error); // NOTE - use "error.response.data` (not "error")
		}
	};

	return (
		<Container
			fixed
			sx={{ textAlign: "start", alignContent: "center", marginTop: 5 }}
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
					Write a name first!
				</Alert>
			</Collapse>
			<Box>
				<TextField
					required
					hiddenLabel
					id="filled-hidden-label-small"
					size="small"
					placeholder="Case Name"
					variant="filled"
					sx={{
						input: { color: "white" },
						label: { color: "orange" },
						background: "#80768D",
						borderRadius: 1,
					}}
					onChange={handleTextInputChange}
					value={textInput}
				/>
				<Fab
					variant="contained"
					component="label"
					sx={{
						background: "#DF8633",
						marginLeft: 1,
						height: "40px",
						width: "40px",
					}}
					onClick={() => {
						if (textInput.length === 0) {
							setOpen(true);
						} else {
							addAgentCase().then(() => getAgentCases());
						}
					}}
				>
					<AddIcon fontSize="large" sx={{ color: "white" }} />
				</Fab>
				<Typography variant="h4" sx={{ color: "white", marginTop: 2 }}>
					Cases
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
					{agentCases.map((a, index) => {
						return (
							<li key={index}>
								<ul>
									<ListItem>
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
												{/* <Container sx={{ display: "flex", flexWrap: "wrap" }}>
													{a.keywords.slice(0,3).map((keyword) => {
														return (
															<Typography
																variant="h6"
																sx={{
																	color: "#DF8633",
																	fontSize: "12px",
																	marginTop: -1,
																	marginLeft: 1,
																}}
															>
																{keyword}
															</Typography>
														);
													})}
												</Container> */}
											</Container>
											<Fab
												variant="contained"
												component="label"
												sx={{
													background: "none",
													height: "40px",
													width: "40px",
												}}
												onClick={() => deleteCase(a.id)}
											>
												<DeleteIcon fontSize="large" sx={{ color: "white" }} />
											</Fab>
											<Link to={"/case/" + a.id}>
												<Fab
													variant="contained"
													component="label"
													sx={{
														background: "none",
														height: "40px",
														width: "40px",
													}}
												>
													<ChevronRightIcon
														fontSize="large"
														sx={{ color: "white" }}
													/>
												</Fab>
											</Link>
										</ListItemButton>
									</ListItem>
									<Divider sx={{ background: "#9F9F9F" }} />
								</ul>
							</li>
						);
					})}
				</List>
			</Box>
		</Container>
	);
};

export default Cases;
