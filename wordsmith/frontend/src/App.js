import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";

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
	const [buttonName, setButtonName] = useState("Play");

	const [audio, setAudio] = useState();
	// const [audioName, setAudioName] = useState([]);
	const [audioName, setAudioName] = useState();
	const [isVisible, setIsVisible] = useState(false);

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
		if (e.target.files[0]) {
			setAudio(URL.createObjectURL(e.target.files[0]));
			setAudioName(e.target.files[0].name);
			// setAudioName([...audioName, e.target.files[0].name]);
		}
	};

	return (
		<div>
			<div>
				<input type="file" onChange={addFile} accept=".mp3, .wav" />
				{/* <input type="file" onChange={addFile} accept=".mp3, .wav" multiple /> */}
				{/* <div className="audios">
					<p>{audioName}</p>
					{isVisible && <button onClick={handleClick}>{buttonName}</button>}
				</div> */}
			</div>
			<ReactAudioPlayer src={audio} autoPlay controls />
		</div>
	);
};
export default App;
