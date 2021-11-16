//asyncErrorBoundary() returns an express handler or middleware function which is eventually called by Express in place of the delegate function
//delegate: an async/await handler or middleware function to be called by asyncErrorBoundary()
//defaultStatus: optional status code to use if the delegate throws an error

function asyncErrorBoundary(delegate, defaultStatus) {
    return (request, response, next) => {
        //promise to make sure the delegate function is called in a promise chain so that the returned value is gurateed to have a catch() method, even if delegate isnt async
      Promise.resolve()
        .then(() => delegate(request, response, next))
        //default error to {} in case of undefined error
        .catch((error = {}) => {
          const { status = defaultStatus, message = error } = error;
          next({
            status,
            message,
          });
        });
    };
  }
  
  module.exports = asyncErrorBoundary;