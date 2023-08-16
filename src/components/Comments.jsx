import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Axios from 'axios';
import io from 'socket.io-client'

const socket = io.connect('https://gigihmid-term-production.up.railway.app/')

const Comments = () => {
  const { id } = useParams()
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null)

  const getComments = useCallback(async () => {
    try {
      if (id) {
        const url = `${import.meta.env.VITE_VIDEOS}/${id}/comments`;
        const data = await fetch(url);
        const res = await data.json();
        setComments(res);
      } else {
        setError("Commments not available");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  }, [id]);

  useEffect(() => {
    getComments();
  }, [getComments]);
  
  // Comment Form
  const [flashMessage, setFlashMessage] = useState("");
  const urlPostComment = `${import.meta.env.VITE_VIDEOS}/comment`
  const [data, setData] = useState({
    username: "",
    comment: ""
  })

  function submit(e) {
    e.preventDefault()
    Axios.post(urlPostComment, {
      username: data.username,
      comment: data.comment,
      videoId: id
    })
    .then(async() => {
      // Set pesan flash dan reset form input
      setFlashMessage("Comment sent successfully!");
      setData({
        username: "",
        comment: "",
      });
      // Emit event to send comment to server using Socket.io
      socket.emit('send_comment', { comment: data.comment });
      window.location.reload();
    })
  }

  function handle(e) {
    const newData = {...data}
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  useEffect(() => {
    // Hapus pesan flash setelah 3 detik
    const timeout = setTimeout(() => {
      setFlashMessage("");
    }, 3000);
  
    // Cleanup saat komponen unmount
    return () => clearTimeout(timeout);
  }, [flashMessage]);

  // Send and Receive Comments via Socket.io
  useEffect(() => {
    socket.on('receive_comment', (data) => {
      // When a new comment is received, update the comments state
      setComments((prevComments) => [...prevComments, data]);
    });
  }, []);

  return (
    <>
      <div className='Comments'>
        <h1>Comments</h1>
        <div className="commentForm">
          <h2>Input Comment</h2>
          {flashMessage && <p className="flash">{flashMessage}</p>}
          <form onSubmit={(e) => submit(e)}>
            <div>
              <label htmlFor="username">Name: </label>
              <input onChange={(e)=>handle(e)} id="username" value={data.username} type="text" />
            </div>
            <div>
              <label htmlFor="comment">Comment: </label>
              <textarea onChange={(e)=>handle(e)} value={data.comment} name="comment" id="comment" cols="30" rows="3"></textarea>
            </div>
            <button>Submit</button>
          </form>
        </div>
        <div className="comment">
          {comments && comments.map((comment, i) =>
          <div className="commentCard" key={i}>
            <p>Name: {comment.username}</p>
            <p>Comment: {comment.comment}</p>
          </div>
          )}
          {error && <div>{error}</div>}
        </div>
        
      </div>
    </>
  )
};

export default Comments;