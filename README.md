# Youtube Clone React

## 📌  Live Demo
https://youtube-clone-react.onrender.com/

## WARNING
<strong> if the app does not load anything or the search function doesn't work, it is very likely the daily YouTube API quota has exceeded. There are only 5000 daily quotas for free usage, and each search costs 100 quotas.Thats why I used local Storage to avoid this problem</strong>

## 😎 What does this app do?

- It is a clone of YouTube.
- HomePage displays the most popular videos of the selected category by querying data from the YouTube API.
- HomePage utilizes infinite-scroll feature, so new videos thumbnails will load when the user keeps scrolling down the page.
- Typing a word and clicking on search does a real search on YouTube API, 12 results are displayed on the SearchPage.
- The kinds of result is video,channel and playlist
- The user can watch videos and see realated videos
- The user can see playlist and channel details

## 🚀 What technologies were used?

- react.js (create-react-app)
- react-dom-router
- axios
- tailwindcss
- Material-UI
- state management using Context API

## ✨ Why use localStorage to save query results from YouTube ?

In the process of development I needed to load the SearchPage again and again, as each search action costs 100 quotas, daily limit quickly runs out.

## How can you clone and tweak this project?

From your command line, first clone this repo:

```
# Clone this repository
$ https://github.com/0mar-helal/youtube-clone-react.git

# Go into the repository
$ cd youtube-clone-react

# Remove current origin repository
$ git remote remove origin

```

Then you can install the dependencies using NPM:

```
# Install dependencies
$ npm install

# Start development server
$ npm start
```
👨‍💻 Happy coding!
---
