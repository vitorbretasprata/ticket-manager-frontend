const express = require('express')
const Ticket = require('../models/ticket')

const router = express();

router.get('/getTickets', (req, res) => {

    Ticket.find({}, (err, tickets) => {
        if(err){
            return res.status(500).send({ error: err});
        }

        return res.status(200).send({ Tickets: tickets});
    })
})

router.get('/getTicket/:id', (req, res) => {

    Ticket.findById(req.params.id,
        (err, Ticket) => {
            if(err){
            return res.status(500).send({ error: err });
        }

        return res.status(200).send({ Ticket: Ticket });
    })
})

router.post('/createTicket', (req, res) => {

    Ticket.create({
        Title: req.body.Title,
        Description: req.body.Description,
        Importance: req.body.Importance,
        Author: req.body.Author,
        Client: req.body.Client,
        Term: req.body.Term,
        State: req.body.State,
        Category: req.body.Category,
        Comments: []
    }, (err, Ticket) => {
        if(err){
            return res.status(500).send({ Error: err })
        }

        return res.status(200).send({ Ticket: Ticket })
    })
})

router.put('/addComment/:id', (req, res) => {

    let Comment = {    
        Description: req.body.Description,
        User: req.body.User              
    }

    Ticket.findByIdAndUpdate(req.params.id, 
    {
        $push: {
            Comments: [{
                Comment: Comment 
            }]            
        }
    }, { new: true } ,
    (err, Ticket) => {
        if(err){
            return res.status(500).send({ error: err })
        }  
        return res.status(200).send({ Comments: Ticket.Comments });               
    });    
});

router.get('/filter', (req, res) => {

    Ticket.find({
        Title: { $in: req.body.Title },
        Client: { $in: req.body.Client },
        Occupation: req.body.Occupation,
        Author: req.body.Author,
    })
})

router.delete('/deleteTicket/:id',  (req, res) => {

    Ticket.findByIdAndDelete(req.params.id, (err, Ticket) => {
        if(err){
            return res.status(500).send({ error: err })
        }

        return res.status(200).send({ Ticket: Ticket })
    });
});

router.delete('/deleteTickets', (req, res) => {
    Ticket.deleteMany({}, (err, ticket) => {
        if(!err){
            res.status(200).send({ Tickets: ticket });
        }
        else{
            throw err;
        }
    });
});

router.put('/alterTicket/:id', (req, res) => {

    Ticket.findByIdAndUpdate(req.params.id, {

        Title: req.body.Title,
        Description: req.body.Description,
        Importance: req.body.Importance,
        Author: req.body.Author,
        Client: req.body.Client,
        Term: req.body.Term,
        State: req.body.State,
        Category: req.body.Category
     }, { new: true } , (err, Ticket) => {
        if(err){
            return res.status(500).send({ error: err });
        }
        return res.status(200).send({ Ticket: Ticket }) ;    
    });    
});

module.exports = router