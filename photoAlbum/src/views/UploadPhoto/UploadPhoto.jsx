import { useRef, useState } from "react";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase-config";
import { addPhoto } from "../../service/photo-service";

const UploadPhoto = () => {

    const [form, setForm] = useState({
        title: '',
        description: '',
    })

    const [file, setFile] = useState(null);

    const handleInputChange = (prop) => (e) => {
        setForm({
            ...form,
            [prop]: e.target.value,
        });
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const fileInput = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (form.title.length < 4 || form.title.length > 40) {
            alert('Title must be between 4 and 40 characters')
            return
        }

        if (form.description.length < 4 || form.description > 1000) {
            alert('Description must be between 4 and 1000 characters')
            return
        }

        try {
            let url = ''
            if (file) {
                const storageReference = storageRef(storage, `photos/${form.title}`);
                await uploadBytes(storageReference, file);
                url = await getDownloadURL(storageReference)
            }

            const updatedForm = {
                ...form,
                url
            }

            await addPhoto(updatedForm).then(() => setForm({
                title: '',
                description: '',
                url: ''
            }))

        } catch (error) {
            console.error('Failed to upload photo:', error)
        }

    }

    return (
        <div className="relative w-full flex flex-col justify-center h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-gray border border-amber-950 rounded-md shadow-2xl shad ring-2 ring-white lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-white-700">Upload New Photo</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mt-5">
                        <label htmlFor="title">Title: </label>
                        <input className="w-full input input-bordered mt-2" type="text" name="title" id="title" value={form.title} onChange={handleInputChange('title')} />
                    </div>
                    <div className="mt-5 flex flex-col">
                        <label htmlFor="title">Description: </label>
                        <textarea className="textarea textarea-bordered w-full mt-2" name="description" value={form.description} onChange={handleInputChange('description')} />
                    </div>
                    <div className="mt-5">
                        <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" id="photo" name="photo" ref={fileInput} onChange={handleFileChange} />
                    </div>
                    <div className="mt-5">
                        {form.url && <img className="preview-image" src={form.url} alt="Preview" />}
                        <button className="btn btn-primary" type="submit">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    )
};


export default UploadPhoto;
