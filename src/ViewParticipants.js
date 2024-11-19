// src/ViewParticipants.js
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const ViewParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const [newWishlistItem, setNewWishlistItem] = useState(""); // State for new wishlist item
  const [selectedParticipantId, setSelectedParticipantId] = useState(null); // Track selected participant

  // Function to fetch participants
  const fetchParticipants = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "participants"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Include document ID for updates
        ...doc.data(),
      }));
      setParticipants(data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  // Function to add a wishlist item to a participant
  const addWishlistItem = async () => {
    if (!newWishlistItem) return; // Don't add if the input is empty

    try {
      const participantDoc = doc(db, "participants", selectedParticipantId); // Get reference to the participant document
      await updateDoc(participantDoc, {
        wishlist: arrayUnion(newWishlistItem), // Add the new item to the wishlist array
      });
      setNewWishlistItem(""); // Clear the input field after adding
      fetchParticipants(); // Refresh the list of participants
    } catch (error) {
      console.error("Error adding wishlist item:", error);
    }
  };

  // Function to delete a wishlist item
  const deleteWishlistItem = async (participantId, item) => {
    try {
      const participantDoc = doc(db, "participants", participantId); // Get reference to the document
      await updateDoc(participantDoc, {
        wishlist: arrayRemove(item), // Remove the specific item from the array
      });
      // Refresh the participants list after deletion
      fetchParticipants();
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    }
  };

  // Function to delete a participant
  const deleteParticipant = async (participantId) => {
    try {
      const participantDoc = doc(db, "participants", participantId); // Get reference to the participant document
      await deleteDoc(participantDoc); // Delete the participant document
      fetchParticipants(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting participant:", error);
    }
  };

  // Fetch participants when the component loads
  useEffect(() => {
    fetchParticipants();
  }, []);
  return (
    <div>
      {/* Header for the participants section */}
      <h2>Participants</h2>
  
      {/* Button to manually refresh the list of participants */}
      <button onClick={fetchParticipants}>Refresh Participants</button>
  
      {/* Unordered list to display all participants */}
      <ul>
        {/* Iterate through the participants array to render each participant */}
        {participants.map((participant) => (
          <li key={participant.id}>
            {/* Display the participant's name; clicking on the name selects the participant */}
            <strong onClick={() => setSelectedParticipantId(participant.id)}>
              {participant.name}
            </strong>
  
            {/* Button to delete the entire participant record from the database */}
            <button onClick={() => deleteParticipant(participant.id)}>
              Delete Participant
            </button>
  
            {/* Unordered list to display the wishlist items for the current participant */}
            <ul>
              {/* Iterate through the wishlist array to render each item */}
              {participant.wishlist.map((item, index) => (
                <li key={index}>
                  {/* Display the wishlist item */}
                  {item}{" "}
                  {/* Button to delete the specific wishlist item */}
                  <button onClick={() => deleteWishlistItem(participant.id, item)}>
                    Delete Wishlist Item
                  </button>
                </li>
              ))}
            </ul>
  
            {/* Conditional rendering: Show input to add a wishlist item if this participant is selected */}
            {selectedParticipantId === participant.id && (
              <div>
                {/* Input field to enter a new wishlist item */}
                <input
                  type="text"
                  value={newWishlistItem}
                  onChange={(e) => setNewWishlistItem(e.target.value)}
                  placeholder="Add a new wishlist item"
                />
                {/* Button to add the entered wishlist item to the selected participant */}
                <button onClick={addWishlistItem}>Add Item</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default ViewParticipants;
