# React Ace python editor
*Using Judge0 as compiler*

This codebase uses Ace Editor and Judge0

## Workflow
Once the content is gotten from the editor, a request is made to the `/submissions` endpoint which returns a `token`. This token is used to make a new request to the get-submissions routes `/submissions/:token` which would return the a result with a status code.

A new request is made to the same `/submissions/:token` endpoint if the status indicates that the compiler is still processing the input.

See the documentation for the status codes and their meanings.

[See Judge0 API Documentation](https://ce.judge0.com/)


To run this code, you need to either host Judge0 compiler on your server or modify the code to support making request to Judge0's Rapid API server.
