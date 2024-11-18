// src/AddParticipant.js
import { useState } from "react";
//get the data base from your firebase file
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const AddParticipant = () => {
  const [name, setName] = useState("");
  const [wishlist, setWishlist] = useState("");

  //code that happens when you press add participant
  const handleAddParticipant = async () => {
    try {
      // Split the wishlist input by commas and create an array 
      const wishlistArray = wishlist.split(",").map((item) => item.trim());

      //this will go into the collection named "participants" and then add the name and wishlist the user filled out
      await addDoc(collection(db, "participants"), {
        name,
        wishlist: wishlistArray, // Save wishlist as an array
      });
      alert("Participant added!");
      setName("");
      setWishlist("");
    } catch (error) {
      console.error(error);
      alert("Error adding participant.");
    }
  };

  return (
    <div>
      <h2>Add Participant = add docs</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Wishlist (comma separated)"
        value={wishlist}
        onChange={(e) => setWishlist(e.target.value)}
      />
      <button onClick={handleAddParticipant}>Add</button>
    </div>
  );
};

export default AddParticipant;
