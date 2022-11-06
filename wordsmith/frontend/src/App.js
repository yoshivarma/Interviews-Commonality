import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cases from "./components/Cases";
import Recordings from "./components/Recordings";

const darkTheme = createTheme({
	palette: {
		background: {
			default: "#1A0B23",
		},
	},
});

const App = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />

			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Cases />} />
						<Route path="/case/:id" element={<Recordings />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</BrowserRouter>
			</div>
		</ThemeProvider>
	);
};

export default App;
