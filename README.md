# Mission Audition

Authors: Elton Lucien,

Product Owner: Alliete Alfano

The Mission Audition is currently in its first version. It is designed for adults with
hearing loss who have received a hearing aid or cochlear implant and want to improve their hearing
via fun games and other listening activities.

---

### Project Structure

The following tree structure will be useful to visualize how the project is structured:

```

├── Code

│   └── mission-audition

│       ├── public (for images, icons etc.)

│       ├── node_modules (not in the repository, it will be created when you install all the dependencies)

│       └── src

│           ├── Components


```

Code/mission-audition is the directory that contains all of the code required to make app functional. If/When other directories are added, they will be used for documentation.

The mission-audition/src directory is where all the source code for the application lies. The main entrypoint of the application is through index.js, which is where the application is created, and immediately calls App.js where all other components that change the UI must be referenced.

### Installation & Running steps

The easiest way to get started with App Name is to install install Node.js. You can do that by going to :

```
https://nodejs.org/en/.
```

This will automatically install the Node Package Manager (NPM).

After Node.js is installed, you will need to clone the GitHub repository onto your local machine:

```

git clone https://github.com/Elton360/mission-audition.git or use the Desktop App by going to File, then clone repository.

```

Using your terminal, You can now install all the necessary dependencies for the node_modules folder by navigating to the directory folder, and running :

```

npm install

```

The app can now be started on your local machine by running:

```

npm start

```
