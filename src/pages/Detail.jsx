import '../assets/Detail.css';
import Video from '../components/Video';
import Products from '../components/Products';
import Comments from '../components/Comments';

const Detail = () => {
    return(
        <div className='Detail'>
            <Products />
            <Video />
            <Comments />
        </div>
    )
}

export default Detail