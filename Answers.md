<!-- Answers to the Short Answer Essay Questions go here -->

* 1. Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.
Answer:
* Middleware: Middleware is basically a function which help with intercepting request and response objects and operating on them. Middleware functions can be chained together and are invoked by the Express.js routing layer before the final request handler is invoked.
Few types of middlewares:
    Application-level middleware
    Router-level middleware
    Error-handling middleware
    Built-in middleware
    Third-party middleware 

* Sessions: In web applications, developers need a way to store some runtime state that is accessible across requests. Session is a way to store the application state that needs to be accessed access across requests. Sessions can store their information in different ways. The popular ways to store session data is: application memory, cookie, memory cache and database.

* Bcrypt: Web applications need to encrypt sensitive data (e.g. passwords) before storing it into the database. The bcrypt library makes it easy to hash and compare such sensitive data in Node.

* JWT: JSON Web Token defines a secure protocol for transmitting private information. This is often used to send information that can be verified and trusted by means of a digital signature.  In a typical scenario, clients asks server for a signed token, server generates a token and sends to the client, client then sends that token to the server with every other request so that server can authenticate the client.

* 2. What does bcrypt do in order to prevent attacks?
Answer: Bcrypt hashes a password multiple times. The more number of times something is hashed, the harder it becomes to crack the code. Bcrypt provides options that can be used to make it hash even more number of times as computing power used by attackers increases with time.

* 3. What are the three parts of the JSON Web Token?
Answer: JSON Web Tokens consist of three parts: Header, Payload and Signature, separated by dots ( . ).

