
const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());

    const videos =[
        {id:100, name:'Zindagi Na Milegi Doobara', genre: 'Adventure'},
        {id:200,name:'3 Idiots', genre: 'Motivational'},
        {id:300,name:'Lord Of the Rings', genre:'Action'}
    ];

// Handling Get Requests

    app.get('/vidly/videos',(req,res)=>{
        res.send(videos);
    });    

    app.get('/vidly/videos/:id',(req,res)=>{
        const video = videos.find(v => v.id === parseInt(req.params.id));
        if(!video) return res.status(404).send('Video Not Found');
        res.send(video);
    });

// Handling Delete Request

    app.delete('/vidly/videos/:id',(req,res)=>{
        const video = videos.find(v => v.id === parseInt(req.params.id));
        if(!video) return res.status(404).send('Video Not Found');

            const index = videos.indexOf(video);
            videos.splice(index,1);

                res.send(video);
    });

// Handling Post Request

    function genreValidate(video){
        const schema = {
            name: Joi.string().min(8).required(),
            genre: Joi.string().min(5).required()
        };
        return Joi.validate(video,schema);
    }

    app.post('/vidly/videos',(req,res)=>{

            const validity = genreValidate(req.body);
            if(validity.error){
                return res.status(400).send(validity.error.details[0].message);
            }

                const video = {
                    id: (videos.length +1)*100,
                    name: req.body.name,
                    genre: req.body.genre
                }
                videos.push(video);
                res.send(video);
    });

// Handling Put request

app.put('/vidly/videos/:id',(req,res)=>{
    const video = videos.find(v => v.id === parseInt(req.params.id));
    if(!video) return res.status(404).send('Video Not Found');

        const validity = genreValidate(req.body);
        if(validity.error){
            return res.status(400).send(validity.error.details[0].message);
        }
            video.name= req.body.name;
            video.genre = req.body.genre ;
            res.send(video);
});

// Creating a Dynamic plus local port

    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log( `Listening on port: ${port}`));