var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

let items = [
    {id: 1, name: "Tinson", job: "boxer" },
    {id: 2, name: "Mc Laud", job:"warrior"},
    {id: 3, name: "Chiquito", job: "comico"},
];


// API ENDPOINTS //////////////////////////////


app.get('/api/items',(req, res)=>{

    res.status(200).json(items) // 201 HTTP CODE: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
});

app.post('/api/items',(req, res)=>{
    let params = req.body; // Assuming this has `role` and `name`

    // id is NOT provided by user but CALCULATED upon items length
    params.id = items.length + 1; // Add an `id` field to `params`


    items.push(params)  // Insert in our "db" which is an array
                        // y so we use .push() to add an element to items
    res.status(201).json(params) // 201 HTTP CODE: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
})

// WEB ENDPOINTS //////////////////////////
app.get('/', (req, res) => {
    let html = '<h1>Web de items</h1><br>' +
        '<a href="/items">Get all items</a> <br>' +
        '<a href="/insert_items">Insert items</a>'

    // should change it to  render index.ejs

    res.send(html)
});


// Show all items
app.get('/items', (req, res) => {

    // options are passed directly as a javascript object
    res.render('items',{
        title:'ITEMS',
        items:items
    })
})

// INsert items: renders insertion temmplate
// then results are sent to
app.get('/insert_items', (req,res)=>{
    const options ={
        title: 'insert item'
    }
    // options aree passed from  an already defined value
    res.render('insert_item',options)
});

app.post('/items', (req, res) => {

    let params  = req.body

})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
