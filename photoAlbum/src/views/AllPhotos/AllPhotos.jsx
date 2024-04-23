import { useEffect, useState } from "react";
import { getAllPhotos } from "../../service/photo-service";
import PhotoCard from "../../components/PhotoCard/PhotoCard";

const AllPhotos = () => {

    const [photos, setPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [photosPerPage] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (searchTerm !== '') {
            getAllPhotos().then(result => setPhotos(result.filter(el => el.title.toLowerCase().includes(searchTerm.toLowerCase()))))
        }
        else { getAllPhotos().then(setPhotos) }

    }, [searchTerm])


    const totalPages = Math.ceil(photos.length / photosPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const indexOfLastPhotos = currentPage * photosPerPage;
    const indexOfFirstPhotos = indexOfLastPhotos - photosPerPage;
    const currentPhotos = photos.slice(indexOfFirstPhotos, indexOfLastPhotos);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="mt-10 flex flex-col items-center justify-center">
            <input className="input input-bordered w-full max-w-xs" type="text" placeholder="Search photos" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
            {photos.length > 0 ? (
                <>
                    <div className="flex flex-wrap justify-center">
                        {currentPhotos.map((photo, index) =>
                            <div className="w-1/3 p-4" key={index}>
                                <PhotoCard title={photo.title} imgUrl={photo.url} id={photo.id} description={photo.description} />
                            </div>
                        )}
                    </div>

                    <div className="justify-center flex mt-5">
                        {currentPage > 1 && <button className="join-item btn btn-outline mr-1" onClick={() => paginate(currentPage - 1)}>Previous</button>}
                        {pageNumbers.map(number => (
                            <button key={number} className={`join-item btn mr-1 ${number === currentPage ? 'btn-primary' : ''}`} onClick={() => paginate(number)}>{number}</button>
                        ))}
                        {currentPage < totalPages && <button className="join-item btn btn-outline" onClick={() => paginate(currentPage + 1)}>Next</button>}
                    </div>
                </>
            ) : (
                <h1>You have no photos for now </h1>
            )}
        </div>
    )

};


export default AllPhotos;