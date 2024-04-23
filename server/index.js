import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

let photos = [

    {
        id: 1,
        title: 'Photo 1',
        description: 'This is a photo of a tennis racket',
        url: 'https://firebasestorage.googleapis.com/v0/b/tennis-forum-12fa0.appspot.com/o/avatars%2FAceChaser?alt=media&token=ba32691e-cbc2-4768-979a-5ecd463afac7'
    },

    {
        id: 2,
        title: 'Photo 2',
        description: 'This is a photo of a tennis player',
        url: 'https://firebasestorage.googleapis.com/v0/b/tennis-forum-12fa0.appspot.com/o/avatars%2FAndreescuAdmirer?alt=media&token=57198108-3dd5-4c7a-92ff-a3c44c4d243b'
    },

    {
        id: 3,
        description: 'This is a photo of a female tennis player',
        title: 'Photo 3',
        url: 'https://firebasestorage.googleapis.com/v0/b/tennis-forum-12fa0.appspot.com/o/avatars%2FFedererFollower?alt=media&token=6e1fbfad-557c-46c5-9326-6b06eafab172'
    }
]

let nextPhotoId = 4

app.post('/photos', (req, res) => {
    
    const photo = {
        id: nextPhotoId,
        title: req.body.title,
        description: req.body.description,
        url: req.body.url
    };

    nextPhotoId++;
    photos.push(photo);
    res.json(photo);
});

app.get('/photos', (req, res) => {
    res.json(photos)
});

app.get('/photos/:id', (req, res) => {
    const photo = photos.find(photo => photo.id === +req.params.id);
    if (!photo) {
        res.sendStatus(404);
        return
    }

    res.json(photo)
})

app.delete('/photos/:id', (req, res) => {

    const index = photos.findIndex(photo => photo.id === +req.params.id);

    if (index === -1) {
        res.sendStatus(404);
        return
    }

    photos.splice(index, 1);
    nextPhotoId--;
    
    res.sendStatus(204)

})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });

app.put('/photos/:id', (req, res) => {

    const photo = photos.find(photo => photo.id === +req.params.id);

    if (!photo) {
        res.sendStatus(404);
        return
    }

    if (req.body.title) {
        photos.title = req.body.title
    }

    if (req.body.description) {
        photos.description = req.body.description
    }

    if (req.body.url) {
        photos.url = req.body.url
    }

    res.json(photo)
});