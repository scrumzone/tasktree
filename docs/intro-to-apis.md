
# Intro To Apis
APIs are how we interface an application with external ones. Whenever we need to interface with a database, we use an API.

  
  

To call an API, you make a “request.” There are a few basic types: GET, POST, PUT, DELETE (generally don’t use the other ones), all pretty straightforward. More on those [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). To make a request, send the following information:

-   Route (Required)
    

-   Essentially a ‘path’ to an API. How the backend knows what code to run.
    
-   Ex. www.fakegame.com/users/. You can surmise this route deals with users. If we had something like www.fakegame.com/users/{userId} you can substitute {userId} for a specific users’s ID to deal with a specific user
    

-   Request method (Required)    
	- GET (Get data)
	-   POST (Create data)
	-   PUT (Update data)
	-   DELETE (Delete data)
    

-   Query parameters
	-   Extra information passed in the url  
	-   Ex. www.fakegame.com/users?sortby=name&count=100.
	 -   ?sortby=name&count=100 constitute the query params. There are two of them: sortby and count. You can keep chaining query params by adding more &
    -   If this was a GET request, it’d likely return the first 100 users sorted by their name.
    

-   Headers
    -   Just more information passed to the API. This typically gives the API context about the caller, such as authorization information.
    

-   Body
    -   The bulk of the request. Typically used in POST and PUT requests. If you wanted to create a new document in a database, you’d make a POST request and put the new document in JSON in the body.
    

  

# Making an API request

This will later triggered by a frontend action, but for testing purposes, here is how to manually make an API call

  

1.  Run the backend locally
    *  If you haven’t already, install Visual Studio (not VSCode)
    *   Open the .sln solution file using Visual Studio. This is /backend/TaskTree.sln
    *  To start the service, run “docker compose up backend” which starts the database and backend.
    *  Open the “swagger” page at [http://localhost:5000/swagger/index.html](http://localhost:5000/swagger/index.html) . This page is automatically generated and outlines all of our API routes, and also shows all of our schemas that are used to give information to the APIs
    

1.  Make a request
    *  On the swagger page, select a route (POST /api/Users is a good example one to get your feet wet)
    * Click “Try it out”
    *  You’ll see the request body. For this route, the username has to be unique, so make sure to change that and any other fields you want to.
    *  Click “Execute”
    *  You’ll see two things.
	    * A cURL statement which is what is ACTUALLY sent to the API
	    *  The server response, which will have a body, headers, and an [http status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
    

1.  Let’s make another request
    *  On the swagger page, select the GET /api/Users route
    *  Click “Try it out”
    *  Enter in the ID that was returned in the POST response body from step 2.e.ii
    *  Click “Execute”
    *  In the response body, you will see the document that you previously created with the POST request
