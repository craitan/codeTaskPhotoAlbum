import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePhoto, getPhoto, updatePhoto } from "../../service/photo-service";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase-config";

const SinglePhoto = () => {

    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedPhoto, setEditedPhoto] = useState({
        title: '',
        description: '',
        url: '',
    });
    const navigate = useNavigate();
    const fileInput = useRef();
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    useEffect(() => {
        getPhoto(id).then((photo) => {
            setPhoto(photo);
            setEditedPhoto(photo);
        });
    }, [id, isEditing]);


    const handleDelete = (id) => {
        deletePhoto(id).then(() => {
            alert('Photo deleted successfully');
            navigate('/photos');
        });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {
            let url = '';
            if (file) {
                const storageReference = storageRef(storage, `photos/${editedPhoto.title}`);
                await uploadBytes(storageReference, file);
                url = await getDownloadURL(storageReference);
            }

            const updatedPhotoData = {
                ...editedPhoto,
                url
            };

            await updatePhoto(updatedPhotoData, id);


        } catch (error) {
            console.error('Failed to update photo:', error);
        }

        navigate('/photos')

    };

    return (
        <>
            {photo && isEditing ? (
                <form onSubmit={handleSubmit}>
                    <input className="input input-bordered w-full max-w-xs mr-5"
                        placeholder={photo.title}
                        type="text"
                        value={editedPhoto.title}
                        onChange={(e) => setEditedPhoto({ ...editedPhoto, title: e.target.value })}
                    />
                    <input className="input input-bordered w-full max-w-xs"
                        placeholder={photo.description}
                        type="text"
                        value={editedPhoto.description}
                        onChange={(e) => setEditedPhoto({ ...editedPhoto, description: e.target.value })}
                    />
                    <img className="edited-photo mt-5" src={previewUrl ||editedPhoto.url} alt={photo.title} />
                    <input
                        className="file-input file-input-bordered w-full max-w-xs mt-5"
                        type="file"
                        ref={fileInput}
                        onChange={handleFileChange}
                    />
                    <button className="btn btn-accent ml-5" type="submit">Save</button>
                </form>
            ) : (
                <div className="flex flex-col">
                    <div className="hero min-h-screen bg-base-200">
                        <div className="hero-content flex-col lg:flex-row">
                            <img src={photo?.url} className="max-w-sm rounded-lg" />
                            <div>
                                <h1 className="text-5xl font-bold">{photo?.title}</h1>
                                <p className="py-6">{photo?.description}</p>
                                <div id='buttons'>
                                    <button className="btn btn-primary mr-5" onClick={() => setIsEditing(!isEditing)}>Edit</button>
                                    <button className="btn btn-error" onClick={() => handleDelete(id)}>Delete</button>
                                </div>
                            </div>
                        </div >
                    </div >
                </div>
            )
            }
        </>

    )
};

export default SinglePhoto;