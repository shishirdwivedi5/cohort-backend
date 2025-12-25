import React, { useContext, useRef, useState } from "react";
import "./song.css";
import { SongContext } from "../../context/song";

const Song = () => {
  const { Audio } = useContext(SongContext);
  const audioRef = useRef([]);
  const [playingIndex, setPlayingIndex] = useState(null);

  const SongTongel = (index) =>{

   if (playingIndex !== null && playingIndex !== index) {
  audioRef.current[playingIndex].pause();
  setPlayingIndex(null)
}

    if (playingIndex  === index){
  
        audioRef.current[index].pause()
        setPlayingIndex(null)

     
      
    }else{
     
      audioRef.current[index].play()
      setPlayingIndex(index)
    }

  }

  return (
    <div className="songdiv">
      <h3 className="songtitle">Recommended Songs</h3>

      <ul className="songul">
        {Audio.map((e, index) => (
          <li className="songitem" key={index}>
            <div className="songinfo">
              <h2>{e.title}</h2>
             
            </div>

            <div className="songaction">
            <audio  src={e.song} ref={(el) => audioRef.current[index] = el}></audio>
            <button onClick={()=> SongTongel(index)}>
          {playingIndex === index ? <i className="ri-pause-line"></i>  : <i className="ri-play-line"></i>  }
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Song;










  // <audio
  //               src={e.song} ref={(el) => (audioRef.current[index] = el)}
  //             />
  //             <button onClick={() => togglePlay(index)}>
  //               {playingIndex === index ? (
  //                 <i className="ri-pause-line"></i>
  //               ) : (
  //                 <i className="ri-play-line"></i>
  //               )}
  //             </button>






// const togglePlay = (index) => {
//     // Agar koi aur song already play ho raha ho
//     if (playingIndex !== null && playingIndex !== index) {
//       audioRef.current[playingIndex].pause();
//     }

//     // Same song pause/play
//     if (playingIndex === index) {
//       audioRef.current[index].pause();
//       setPlayingIndex(null);
//     } else {
//       audioRef.current[index].play();
//       setPlayingIndex(index);
//     }
//   };