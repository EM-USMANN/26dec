import React, { useEffect, useState } from "react";
import { Button, Modal, Popconfirm, Typography } from "antd";
import { firestore } from "config/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useAuthContext } from "contexts/Auth";
import { useNavigate } from "react-router-dom";
import Header from "components/Header";

const { Title } = Typography;

const ViewNotes = () => {
    const { user } = useAuthContext();
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({})
    const [isModal, setIsModal] = useState(false)
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, "notes"));
                const sharedNotes = [];

                querySnapshot.docs.forEach((doc) => {
                    // Check if the user's uid is included in the sharedNotes array
                    if (doc.data().createdBy.sharedNotes && doc.data().createdBy.sharedNotes.includes(user.uid)) {
                        let data = doc.data();
                        data.key = doc.id; // Store the document ID as a key for rendering
                        sharedNotes.push(data); // Push the document data into sharedNotes array
                    }
                });
                setNotes(sharedNotes);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes();
    }, [user.uid]);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(firestore, "notes", id));
            setNotes((prev) => prev.filter((note) => note.id !== id));
            window.notify("Note deleted successfully!", "success");
        } catch (error) {
            console.error("Error deleting note:", error);
            window.notify("Error deleting note.", "error");
        }
    };

    const handleShareNote = async () => {
        try {
            // Step 1: Fetch the user by email
            const userSnapshot = await getDocs(collection(firestore, "users"));
            let userFound = null;

            userSnapshot.docs.forEach((doc) => {
                if (doc.data().email === email) {
                    userFound = doc.data();
                }
            });

            if (!userFound) {
                window.notify("User not found with this email", "error");
                return;
            }

            // Step 2: Check if the note exists and push the user's UID into the sharedNotes array
            const noteRef = doc(firestore, "notes", note.id);
            const noteSnapshot = await getDoc(noteRef);
            if (noteSnapshot.exists()) {
                const noteData = noteSnapshot.data();
                if (!noteData.createdBy.sharedNotes.includes(userFound.uid)) {
                    noteData.createdBy.sharedNotes.push(userFound.uid); // Add the user's UID
                    await updateDoc(noteRef, {
                        "createdBy.sharedNotes": noteData.createdBy.sharedNotes,
                    });
                    window.notify("Note shared successfully!", "success");
                } else {
                    window.notify("Note already shared with this user", "info");
                }
            } else {
                window.notify("Note not found", "error");
            }
        } catch (error) {
            console.error("Error sharing note:", error);
            window.notify("Error sharing note", "error");
        } finally {
            setIsModal(false); // Close the modal after sharing
        }
    };

    const generateShareableLink = (noteId) => {
        return `${window.location.origin}/view-note/${noteId}`;
    };

    return (

        <>
            <Header />

            <main className="p-5">
                <div className="card p-3 p-md-3 p-lg-4">
                    <Title className="text-center mb-5">Your Notes</Title>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Description</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note, index) => (
                                <tr key={note.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{note.title}</td>
                                    <td>{note.subject}</td>
                                    <td>{note.description}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button
                                                type="button"
                                                className="btn btn-primary btn-sm"
                                                onClick={() => navigate(`/edit-notes/${note.id}`)} // Pass the note's ID here
                                            >
                                                Edit
                                            </Button>

                                            {/* Share Button */}
                                            <Button
                                                type="button"
                                                className="btn btn-info btn-sm"
                                                onClick={() => { setNote(note); setIsModal(true) }}
                                            >
                                                Share
                                            </Button>

                                            <Popconfirm
                                                title="Are you sure to delete this note?"
                                                onConfirm={() => handleDelete(note.id)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button type="button" className="btn btn-danger btn-sm">
                                                    Delete
                                                </Button>
                                            </Popconfirm>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-center">
                        <Button type="primary" size="large" onClick={() => navigate("/add-note")}>
                            Add Notes
                        </Button>
                    </div>
                </div>

                <Modal open={isModal} footer={false} onClose={() => setIsModal(false)} onCancel={() => setIsModal(false)} title='Share Note with Email'>
                    <input
                        type='email'
                        className='form-control mb-3'
                        placeholder='Enter email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        type='primary'
                        onClick={() => { handleShareNote() }}
                    >
                        Share
                    </Button>
                </Modal>
            </main>
        </>
    );
};

export default ViewNotes;
