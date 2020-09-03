# Caching in NodeJS Express app (using **REDIS**)

## Why use caching?

- To improve the response time of our application by upto 1000 times, and in turn we make our application super fast.
  > And for the purpose of this example we will be using the **SPACE X** api to get the list of rockets used by them.

## When to use caching?

- The simple answer is that you should cache data which is NOT frequently changing, and never for data that keeps changing frequently.
  > So in this example we'll get the list of rockets from the spaceX api, the information about rockets do not change frequently so we can use caching, therefore, instead of hitting the API again n again for every request coming from client, we can cache data of previous request and we can use that cached data to send a response back to the new request.

## Author

- [**Truly Mittal**](https://trulymittal.com)

## Contribute

You can fork this repo and send me a PR.

## License

This project is licensed under the MIT License.
