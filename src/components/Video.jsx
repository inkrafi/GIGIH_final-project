import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player/youtube';

const Video = () => {
  const { id } = useParams()
  const [video, setVideo] = useState(null); // Single video data
  const [error, setError] = useState(null)
  
  const getVideo = useCallback(async () => {
    try {
      if (id) {
        const url = `${import.meta.env.VITE_VIDEOS}/${id}`;
        const data = await fetch(url);
        const res = await data.json();
        setVideo(res);
      } else {
        setError("Video ID not available");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  }, [id]);

  useEffect(() => {
    getVideo();
  }, [getVideo]);

  return (
    <div className='Video'>
      <h1>Video</h1>
      <div>
        {video ? (
          <div>
            <ReactPlayer className='youtube' controls={true} url={video.videoUrl} />
            <h3>{video.videoTitle}</h3>
          </div>
        ) : (
          <h2>Please wait...</h2>
        )}
        {error && <div>{error}</div>}
      </div>
    </div>
  )
};

export default Video;
