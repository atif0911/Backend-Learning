import React, { useEffect, useState } from "react";
import "./player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import {useNavigate, useParams} from 'react-router-dom'

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjg2ZjUxYzhiNzhhYTliMGQwODYxYWNmNjIzZjJhYyIsIm5iZiI6MTc1NzY5NTQ5Mi42MTYsInN1YiI6IjY4YzQ0ZTA0MTAxOGVhZGM1ZWUwMTdlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.61Ie-2rX-jlsR64CoyqB5dDFoe_YxKYP16Gd8k6ukks",
    },
  };

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0])) //setApiData(res.results[0])
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={() => {
        navigate("/")
      }}/>
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
