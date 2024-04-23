export const getAllPhotos = async () => {
    const result = await fetch('http://localhost:3000/photos');

    if (!result.ok) {
        return console.log('Error fetching photos');
    }

    return result.json();

};