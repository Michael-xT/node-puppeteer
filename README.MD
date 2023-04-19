<p align="center"><img src="https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png" height="250px"></p>

<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/michael-xt/node-puppetter/deploy.yaml?style=for-the-badge">
</p>

<h1 align="center">Puppeteer HTML To PDF Docker Image</h1>

This Docker Image contains a node app which is using the following stack: NodeJS + Express + Puppeteer

# So... how can I use this image?

In some environments, like Cloud Foundry, I could not install in a easy way `apt` dependecies used by Puppeteer, so I created this docker image in order to make a simple uService that does just that. It installs all the dependecies required and makes a Puppeteer server which sends back a PDF file from HTML input. <a href="https://pptr.dev/">More about Puppeteer here.</a>

# Usage:

## 1) Shell Command

To get started just run the Docker image as follows:

```sh
docker run -d -p 3000:3000 --name node-pupp ghcr.io/michael-xt/node-puppeteer:master
```

## 2) Docker Compose:

```
services:
  nodepupp:
    container_name: node-pupp
    image: ghcr.io/michael-xt/node-puppeteer:master
    ports:
      - "3000:3000"
    restart: always
version: '3'
```

## 3) CloudFoundry:

<a href="https://docs.cloudfoundry.org/devguide/deploy-apps/push-docker.html">(more about that here)</a>

```sh
cf push node-pupp --docker-image ghcr.io/michael-xt/node-puppeteer:master
```


#

# API

As soon as your app is fully running you can use the following route:

-> POST: `/generatePDF` - which returns the PDF.

# Axios Request Example:

```js
const containerPath = 'https://my-container-path.com';
const pdf = await axios.post(
    `${containerPath}/generatePDF`,
    {
        html, // <- Here is the HTML input
        options, // <- Here are the Options
    },
    {
        responseType: 'arraybuffer',
        responseEncoding: 'binary',
        headers: {
            'Content-Type': 'application/json',
        },
    }
);

//Now in pdf you have the file you can use.
```

For the Options field, you can find more <a href="https://pptr.dev/api/puppeteer.pdfoptions/">here</a>.
