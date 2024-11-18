// src/ViewParticipants.js
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, doc, updateDoc, arrayUnion,arrayRemove } from "firebase/firestore";

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

  // Fetch participants when the component loads
  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <div>
      <h2>Participants</h2>
      <button onClick={fetchParticipants}>Refresh Participants</button>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id}>
            <strong onClick={() => setSelectedParticipantId(participant.id)}>
              {participant.name}
            </strong>
            <ul>
              {participant.wishlist.map((item, index) => (
                <li key={index}>
                  {item}{" "}
                  <button onClick={() => deleteWishlistItem(participant.id, item)}>
                    Delete = delete docs
                  </button>
                </li>
              ))}
            </ul>
            {/* Show input for adding wishlist item if this participant is selected */}
            {selectedParticipantId === participant.id && (
              <div>
                <input
                  type="text"
                  value={newWishlistItem}
                  onChange={(e) => setNewWishlistItem(e.target.value)}
                  placeholder="Add a new wishlist item = going into a doc"
                />
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
