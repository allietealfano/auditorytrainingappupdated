# Auditory Training App

Authors:

Capstone 2: Eric Segura, Juan Sanchez, Miguel Pacillo, Joshua Yaques, Brandon Castano, 
 
Capstone 1: Andrew Andersen, Lyn Quintana, Leandro Alvarez, Tatiana Summerrall, Fares Amamou, Alex Rodriguez 

Product Owner: Alliete Alfano

The Auditory Training App is currently in its second version. It is designed for adults with
hearing loss who have received a hearing aid or cochlear implant and want to improve their hearing
via fun games and other listening activities.

---

### Project Structure

The following tree structure will be useful to visualize how the project is structured:

```
mission-audition/
┣ node_modules/
┣ public/
┃ ┣ favicon.ico
┃ ┣ index.html
┃ ┣ logo192.png
┃ ┣ logo512.png
┃ ┣ manifest.json
┃ ┗ robots.txt
┣ src/
┃ ┣ assets/
┃ ┃ ┣ icons/
┃ ┃ ┗ images/
┃ ┣ components/
┃ ┃ ┣ activities/
┃ ┃ ┣ activity/
┃ ┃ ┣ auth/
┃ ┃ ┣ cardDB/
┃ ┃ ┣ cardsLatest/
┃ ┃ ┣ Completed/
┃ ┃ ┣ custHooks/
┃ ┃ ┣ forumComp/
┃ ┃ ┣ Game Option/
┃ ┃ ┣ Game Options/
┃ ┃ ┣ homepage-sects/
┃ ┃ ┣ lingDetection/
┃ ┃ ┣ lingDiscrimination/
┃ ┃ ┣ lingIdentification/
┃ ┃ ┣ nav/
┃ ┃ ┣ Option/
┃ ┃ ┣ options/
┃ ┃ ┣ playButton/
┃ ┃ ┣ pop/
┃ ┃ ┣ progressBar/
┃ ┃ ┗ store/
┃ ┣ helpers/
┃ ┃ ┣ allActivities.js
┃ ┃ ┣ allDashboardOptions.js
┃ ┃ ┗ allDetectionGames.js
┃ ┣ pages/
┃ ┃ ┣ activityPage/
┃ ┃ ┣ auth/
┃ ┃ ┣ dashboard/
┃ ┃ ┣ forum/
┃ ┃ ┣ gamePage/
┃ ┃ ┣ homePage/
┃ ┃ ┣ ling/
┃ ┃ ┣ myProfile/
┃ ┃ ┣ reset/
┃ ┃ ┗ settings/
┃ ┣ App.js
┃ ┣ firebase-config.js
┃ ┣ index.css
┃ ┗ index.js
┣ .env
┣ .gitattributes
┣ .gitignore
┣ package-lock.json
┣ package.json
┗ README.md
```

Code/Auditory Training App is the directory that contains all of the code required to make app functional. If/When other directories are added, they will be used for documentation.

The Auditory Training App/src directory is where all the source code for the application lies. The main entrypoint of the application is through index.js, which is where the application is created, and immediately calls App.js where all other components that change the UI must be referenced.

### Installation & Running steps

The easiest way to get started with Auditory Training App is to install install Node.js. You can do that by going to :

```
https://nodejs.org/en/.
```

This will automatically install the Node Package Manager (NPM).

It is also necessary to be able to run git commands in your terminal (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), or use the dektop app (https://desktop.github.com/).

After Node.js is installed, and you can run git commands/or the app, you will need to clone the GitHub repository to your local machine:

```

git clone https://github.com/Elton360/mission-audition.git or use the Desktop App by going to File, then clone repository.

```

Using your terminal, You can now install all the necessary dependencies for the node_modules folder by navigating to the directory folder, and running :

```

npm install

```

It is necessary to have the firebase key, which is a file that should be plced in the src folder :

The app can now be started on your local machine by running:

```

npm start

```
