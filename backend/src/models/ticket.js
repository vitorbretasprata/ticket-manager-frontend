const mongoose = require('mongoose')

var TicketSchema = new mongoose.Schema(
    {
        Title: {
            type: String,
            required: true,
            trim: true
        },
        Description: {
            type: String,
            required: true,
            trim: true
        },
        Importance: {
            type: String,
            required: true,
            trim: true
        },
        Author: {
            type: String,
            required: true,
            trim: true
        },
        Client: {
            type: String,
            required: true,
            trim: true
        },
        Term:{
            type: Date,
            required: true,
            default: Date.now           
        },
        DateCreated: {
            type: Date,            
            default: Date.now
        },
        State:{
            type: String,
            required: true            
        },
        Edited:{
            type: Boolean,
            default: false            
        },
        Comments:{
            type: Array,
            default: []
        }
})

module.exports = mongoose.model('Ticket', TicketSchema);