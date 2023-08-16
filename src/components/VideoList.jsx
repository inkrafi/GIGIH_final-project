import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const url = `${import.meta.env.VITE_VIDEOS}`

const VideoList = () => {
  const [videos, setVideos] = useState([])
  const [error, setError] = useState(null)
  
  const navigate = useNavigate()

  async function getVideos() {
    try {
      const data = await fetch(url)
      const res = await data.json()
      setVideos(res, data)
    } catch (error) {
      setError("Something went wrong")
    }
  }

  useEffect(() => {
    getVideos()
  }, [])

  return (
    <div className='Home'>
      <h1>SGNR</h1>
      <h2>Video List</h2>
      <div className="videoWrapper">
        {videos && videos.map((video, i) =>
          <div onClick={() => navigate(`/detail/${video._id}`)} className="videoCard" key={i}>
            <img src={video.imageUrl} alt={video.videoTitle} />
            <h4>{video.videoTitle}</h4>
          </div>
        )}
        {error && <div>{error}</div>}
      </div>
    </div>
  )
};

export default VideoList