// src/AssignSanta.js
import { useState } from "react";
//get database from firebase file
import { db } from "./firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const AssignSanta = () => {
  const [assignments, setAssignments] = useState([]);

  const assignSantas = async () => {
    //gets and makes a copy in the code to reference the entire collection of participants
    const querySnapshot = await getDocs(collection(db, "participants"));
    //gets all the participants and puts them into an array
    //.map() is very important it'll be your way of going through each item in the collection
    const participants = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));

    //all of this is just logic for assigning the people for secret santa
    if (participants.length < 2) {
      alert("Need at least 2 participants!");
      return;
    }

    const shuffled = participants.sort(() => Math.random() - 0.5);
    const result = shuffled.map((participant, index) => ({
      giver: participant.name,
      receiver: shuffled[(index + 1) % shuffled.length].name,
    }));

    setAssignments(result);

    //loops through all the assignments and then finds the name of person and then creates a new document in 
    //the id of the person that says "assignedTo: "
    for (const { giver, receiver } of result) {
      const participantRef = doc(db, "participants", participants.find((p) => p.name === giver).id);
      await updateDoc(participantRef, { assignedTo: receiver });
    }
  };

  return (
    <div>
      <button onClick={assignSantas}>Assign Secret Santas</button>
      {assignments.length > 0 && (
        <ul>
          {assignments.map((assignment, index) => (
            <li key={index}>
              {assignment.giver} → {assignment.receiver}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignSanta;
