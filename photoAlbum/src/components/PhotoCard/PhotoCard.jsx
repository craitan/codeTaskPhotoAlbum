import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
/**
 * 
 * @param {{title: string, description: string, imgUrl: string, id:string}} param
 */
const PhotoCard = ({ title, description, imgUrl, id }) => {

    const navigate = useNavigate()

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl border border-white mr-10 ml-10">
            <figure>
                <img className="h-48 w-full object-cover" src={imgUrl} alt={title} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => navigate(`/photos/${id}`)}>Open Now</button>
                </div>
            </div>
        </div>
    )
};


PhotoCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    imgUrl: PropTypes.string,
    id: PropTypes.string,
}


export default PhotoCard;
