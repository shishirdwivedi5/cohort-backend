import React, { useContext, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { SongContext } from "../context/song";
import { API } from "../api/songApi";
import { toast } from "react-toastify";
import "remixicon/fonts/remixicon.css";
const FaceExpression = () => {
  const { Song, setSong } = useContext(SongContext);

  let expName = "";
  let expValue = "0";
  const videoRef = useRef(null);
  const [mood, setMood] = useState("Detecting...");
  const [Audio, setAudio] = useState('null');

  const audioRef = useRef([]);
  const audioFun = (index) => {



    if (Audio === index ) {
       audioRef.current[index].pause();
      setAudio();
      
    } else {
     audioRef.current[index].play();
      setAudio(index);
    }
  };

  // 🎥 Start Camera
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    loadModels();
    console.log("loadModel");
  };

  // 🤖 Load Models
  const loadModels = async () => {
    const MODEL_URL = "/models";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ]);
    detectExpression();
  };

  // 😀 Detect Expression
  const detectExpression = () => {
    setTimeout(async () => {
      if (!videoRef.current) return;

      const detection = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();

      if (!detection) {
        console.log("EXPRESSION NOT MATCH");
        toast.error("Expression not match", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        console.log("EXPRESSION  match");
        toast.success("Expression match success ", {
          position: "top-right",
          autoClose: 2000,
        });
      }

      const expression = detection.expressions;
      for (let key in expression) {
        if (expression[key] > 0.5) {
          expName = key;
          expValue = expression[key];
          setMood(key);
        } else {
          console.log("daat not match");
        }
      }
      console.log(expName, "+", expValue);

      API.get(`/song/mood?mood=${expName}`)
        .then((res) => {
          setSong(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err, "song nhi aaya RE");
        });

      console.log(Song);

      // if (detection) {
      //   const expressions = detection.expressions;
      //   const detectedMood = Object.keys(expressions).reduce((a, b) =>
      //     expressions[a] > expressions[b] ? a : b
      //   );

      //   setMood(detectedMood);
      //   getSong(detectedMood);
      //   console.log(detectedMood)
      // }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white flex flex-col items-center py-10">
      {/* 🔥 Heading */}
      <h1 className="text-3xl font-bold mb-6">
        🎭 Face Expression Based Song Recommender
      </h1>

      {/* 🎥 Camera Section */}
      <div className="bg-gray-800 p-4 rounded-2xl shadow-lg">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="rounded-xl w-105 border-4 border-indigo-500"
        />
        <p className="text-center mt-3 text-lg">
          Detected Mood:{" "}
          <span className="text-indigo-400 font-semibold">
            {!mood ? "expressio not found" : mood}
          </span>
        </p>
        <button
          onClick={startCamera}
          className="cursor-pointer bg-linear-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-slate-500 text-white font-medium group ml-[36%] mt-4"
        >
          <div className="relative overflow-hidden">
            <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
              Button
            </p>
            <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
              Button
            </p>
          </div>
        </button>
      </div>

      {/* 🎵 Song Section */}

      {Song.map((e, index) => {
        return (
          <div
            key={index}
            className="mt-8 bg-gray-800 w-105 p-6 rounded-2xl shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-3 text-indigo-400">
              🎵 Recommended Song
            </h2>
            <ul className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium">{e.title}</p>
                <p className="text-sm text-gray-400 mb-4">{e.auther}</p>
              </div>

              <audio
                className="w-full rounded-lg"
                src={e.song}
                ref={(el) => audioRef.current[index] = el}
              />
              <button
                onClick={() => audioFun(index)}
                className="px-3 py-2 pointer bg-white text-black rounded cursor-pointer"
              >
                {Audio === index ? (
                 
                  <i className="ri-pause-line"></i>
                ) : (
                   <i className="ri-play-line"></i>
                )}
              </button>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default FaceExpression;
{
  /* <i className="ri-pause-line"></i>
<i className="ri-play-line"></i> */
}
