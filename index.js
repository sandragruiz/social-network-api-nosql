const express = require('express');
const connectDB = require('./config/connection');
const routes = require('./routes');

connectDB();