[//]: # (title: KeySpot Portable Secrets Manager)
[//]: # (date: 2021-08-12)
[//]: # (hero: https://keyspot.app/logo.png)
[//]: # (description: For my first dev diary I'm going to be going over KeySpot, a secrets manager designed to remove the need for .env files for any project.)

# KeySpot Portable Secrets Manager

For the past few months I've been developing web applications almost non-stop. With each new web app, I've found myself using a lot of time managing environment variables for my applications' different environments. I consider my laptop to be my dev environment which has a .env file for each project, then I have my test and prod environments which usually exist as Docker containers in the cloud. To access application secrets in these cloud environments I have to deal with the secrets manager associated with the cloud provider I happen to be using. After too many mistakes mixing up my .env files or not being able to port my secrets from one cloud to another, I decided to develop my own secrets manager named KeySpot. 

For three weeks I've been building KeySpot with the aim of making it portable to any programming language and any system as well as having an easy to use interface that stores all of a developer's application secrets in one centralized location. Check it out at [keyspot.app](https://keyspot.app)! I'm still developing the tool, but in its current state it is completely usable by any software developer or team of developers.

## Usage

In KeySpot, environment variables are stored in collections called records. You can create records on the web app's records section. Once created, a record's environment variables can be injected into a program's environment through one of our programming language packages or in the future through a command line tool I'm currently developing.

I started by developing packages for several languages to provide an easy interface to access KeySpot's API. So far, I've built packages for Node.js, Python, and Go. You can see a Node.js tutorial in this video.

[![video](https://img.youtube.com/vi/RmNm8rJ_AO0/0.jpg)](https://www.youtube.com/watch?v=RmNm8rJ_AO0)

Below is an example of our Node.js package. As you can see, it's pretty easy to access the environment variables in as little as two lines of code!

```javascript
const keyspot = require('keyspot');

const record = await keyspot('61045a6e389ee691f945fd34');

// the record's secrets also get stored as environment variables in process.env
console.log(record);
```

```bash
$ npm i keyspot
$ node index.js

{
    apiKey: asi12mdkKAWS21d,
    environment: prod
}
```

See more at [keyspot.app](https://keyspot.app).

## Next Diary

I quickly realized that trying to build a package for each language is pretty time consuming and instead I started building a CLI tool to inject the environment variables into a program's environment before running it. In the next diary, I will be going over the command line tool's usage and how I built it.