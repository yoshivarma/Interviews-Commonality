import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
	Box,
	Container,
	Divider,
	Fab,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// const Cases = ( { agentCase } ) =>
const Cases = () => {
	// const [agentCase, setAgentCase] = useState([]);
	let agentCase = [
		{
			name: "Case 1",
			id: 1,
			keywords: ["apple", "namama"],
		},
		{
			name: "Case 2",
			id: 2,
			keywords: ["apple", "namama"],
		},
		{
			name: "Case 3",
			id: 3,
			keywords: ["apple", "namama"],
		},
		{
			name: "Case 4",
			id: 4,
			keywords: ["apple", "namama"],
		},
	];
	// <Link to={"/case/" + user.id}> {user.id}</Link>

	return (
		<Container
			fixed
			sx={{ textAlign: "center", alignContent: "center", marginTop: 5 }}
		>
			{" "}
			<Box>
				<Typography variant="h4" sx={{ color: "white" }}>
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
					{agentCase.map((a, index) => {
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
												<Typography
													variant="h6"
													sx={{
														color: "#DF8633",
														fontSize: "12px",
														marginTop: -1,
														marginLeft: 1,
													}}
												>
													{a.keywords}
												</Typography>
											</Container>
											<Link to={"/case/"+a.id}>
												{" "}
												<Fab
													variant="contained"
													component="label"
													sx={{
														background: "none",
														height: "40px",
														width: "40px",
													}}
													onClick={() => console.log("Go back to cases!")}
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
