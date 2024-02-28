# React MVP

### Purpose
- The purpose of this project is to build a minimally viable full product in the form of a full stack application that can receive, process, and respond to RESTful API requests for CRUD operations on a deployed database, from user input on a webpage. 

### Main files
- This app's entry point is the html file, which contains the mounting point for the React components
- This app's UI is structured on the web browser using jsx
- The jsx is styled by css
- The server.js is a RESTful API that receives HTTP requests from and sends HTTP responses to the jsx components, and sends SQL queries to and receives JSON objects from the PostgreSQL database
- The sql files are used to create and seed the datacards table in the database

### Expected behavior
- The browser should load all datacards's titles on screen by default
- Users enter a title and an optional description in the Navbar input fields, which posts that title and description to the browser upon clicking on the post button
- Users click on an individual card in order to replace the display of all datacards with just the selected datacard's title and desciption
- Users enter a title and description and click patch in order to change the data in the currently selected datacard, and redisplay all datacard titles including the patched datacard
- Users click delete to delete currently selected datacard and display all remaining datacard titles