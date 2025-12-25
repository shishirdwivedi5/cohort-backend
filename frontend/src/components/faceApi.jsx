import React, { useRef, useEffect, useContext } from "react";
import * as faceapi from "face-api.js";
import "./faceapi.css";
import { API } from "../../Api/axiosApi";
import { SongContext } from "../../context/song";

function FaceExpressionApi() {
  const videoRef = useRef();

  const { Audio, setAudio } = useContext(SongContext);
  useEffect(() => {
    startVideo()
    

  }, [])
  

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Camera error:", err);
      });
    
    loadModels();
  };

  const loadModels = async () => {
    const MODEL_URL = "/models";

    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    console.log("Models loaded");

    // Start detecting expressions once models are loaded

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    // console.log(detections[0].expressions);

    if (!detections || detections.length === 0) {
      console.log("❌ Face not detected");
      alert("face expression not fetch");
    } else {
      alert("Sussess");
    }

    const expressions = detections[0].expressions;
 
    

    let maxvalue = 0; //0.9
    let maxvaluename = ""; //happy,sad,angry
    for (let exp in expressions) {
      if (expressions[exp] > 0.1) {
        (maxvalue = expressions[exp]), (maxvaluename = exp);
      }
    }
    


    API.get(`/song/mood?mood=${maxvaluename}`)
      .then((res) => {
        setAudio(res.data.song);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="camera-card">
      <div className="camera-box">
        <video ref={videoRef} autoPlay muted />
      </div>

      <button className="camera-btn" onClick={startVideo}>
        Start Camera
      </button>
    </div>
  );
}

export default FaceExpressionApi;
