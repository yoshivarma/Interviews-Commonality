import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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

// var a;
// const App = () => {
// 	const [buttonName, setButtonName] = useState("Play");

// 	const [audio, setAudio] = useState();
// 	// const [audioName, setAudioName] = useState([]);
// 	const [audioName, setAudioName] = useState();
// 	const [isVisible, setIsVisible] = useState(false);

// 	useEffect(() => {
// 		if (a) {
// 			a.pause();
// 			a = null;
// 			setButtonName("Play");
// 		}
// 		if (audio) {
// 			a = new Audio(audio);
// 			a.onended = () => {
// 				setButtonName("Play");
// 			};
// 			setIsVisible(true);
// 		}
// 	}, [audio]);

// 	const handleClick = () => {
// 		if (buttonName === "Play") {
// 			a.play();
// 			setButtonName("Pause");
// 		} else {
// 			a.pause();
// 			setButtonName("Play");
// 		}
// 	};

// 	const addFile = (e) => {
// 		if (e.target.files[0]) {
// 			setAudio(URL.createObjectURL(e.target.files[0]));
// 			setAudioName(e.target.files[0].name);
// 			// setAudioName([...audioName, e.target.files[0].name]);
// 		}
// 	};

// 	return (
// 		<div>
// 			<input type="file" onChange={addFile} accept=".mp3, .wav" />
// 			{/* <input type="file" onChange={addFile} accept=".mp3, .wav" multiple /> */}
// 				<div className="audios">
// 					<p>{audioName}</p>
// 					{isVisible && <button onClick={handleClick}>{buttonName}</button>}
// 				</div>
// 		</div>
// 	);
// };

const App = () => {
	const [audio, setAudio] = useState("");
	const [audios, setAudios] = useState([]);
	const [audioName, setAudioName] = useState([]);

	let selected_audios = [];
	let selected_audio_names = [];

	// useEffect(() => {
	// 	if (a) {
	// 		a.pause();
	// 		a = null;
	// 		setButtonName("Play");
	// 	}
	// 	if (audio) {
	// 		a = new Audio(audio);
	// 		a.onended = () => {
	// 			setButtonName("Play");
	// 		};
	// 		setIsVisible(true);
	// 	}
	// }, [audio]);

	// const handleClick = () => {
	// 	if (buttonName === "Play") {
	// 		a.play();
	// 		setButtonName("Pause");
	// 	} else {
	// 		a.pause();
	// 		setButtonName("Play");
	// 	}
	// };

	const addFile = (e) => {
		// if (e.target.files[0]) {
		// 	setAudio(URL.createObjectURL(e.target.files[0]));
		// 	setAudioName([...audioName, e.target.files[0].name]);
		// }
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
		<div>
			<div>
				{/* <input type="file" onChange={addFile} accept=".mp3, .wav" /> */}
				<input type="file" onChange={addFile} accept=".mp3, .wav" multiple />
				{/* <div className="audios">
					<p>{audioName}</p>
					{isVisible && <button onClick={handleClick}>{buttonName}</button>}
				</div> */}
			</div>
			<div>
				<ReactAudioPlayer src={audio} autoPlay controls />
			</div>
			<div className="audios">
				{audios?.map((a, index) => {
					return (
						<p key={index} onClick={() => setAudio(a.toString())}>
							{audioName[index]}
						</p>
					);
				})}
			</div>
			<div>
				<button id="find-keywords">Find Keywords</button>
			</div>
		</div>
	);
};
export default App;
