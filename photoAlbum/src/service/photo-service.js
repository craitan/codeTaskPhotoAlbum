export const getAllPhotos = async (search) => {
    const result = await fetch(`http://localhost:3000/photos?search=${search}`)

    if (!result.ok) {
        return console.log('Something went wrong');
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

export const getPhoto = async (id) => {
    const result = await fetch(`http://localhost:3000/photos/${id}`);
  
    if (!result.ok) {
        return console.log('Error fetching photo');
    }

    return result.json();
};

export const deletePhoto = async (id) => {
    
    const result = await fetch(`http://localhost:3000/photos/${id}`, {
        method: "DELETE"
    });

    if (!result.ok) {
        return console.log('Error deleting photo');
    }
};

export const updatePhoto = async (photo, id) => {
    console.log(photo)
    const result = await fetch(`http://localhost:3000/photos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(photo)
    });

    if (!result.ok) {
        return console.log('Something went wrong');
    }
};