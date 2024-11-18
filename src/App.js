// src/App.js
import React from "react";
import Login from "./Login";
import AddParticipant from "./AddParticipant";
import ViewParticipants from "./ViewParticipants";
import AssignSanta from "./AssignSanta";

//nothing special, just the files shown on the main screen
const App = () => {
  return (
    <div>
      <h1>Secret Santa App</h1>
      <Login />
      <AddParticipant />
      <ViewParticipants />
      <AssignSanta />
    </div>
  );
};

export default App;
