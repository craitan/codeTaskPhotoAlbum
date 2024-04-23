import { useEffect, useState } from "react";
import { getAllPhotos } from "../../service/photo-service";

const AllPhotos = () => {

    const [photos, setPhotos] = useState([]);

    console.log(photos)
    
    useEffect(() => {
        getAllPhotos().then(setPhotos)
    }, [])

    return (
        <h1>Here you can see all of your photos</h1>
    )

};


export default AllPhotos;
