export const getAllPhotos = async () => {
    const result = await fetch('http://localhost:3000/photos');

    if (!result.ok) {
        return console.log('Error fetching photos');
    }

    return result.json();

};


export const addPhoto = async (photo) => {
    const result = await fetch("http://localhost:3000/photos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(photo)
    });

    if (!result.ok) {
        return console.log('Something went wrong');
    }
};