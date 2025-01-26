import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from 'config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Typography, Button } from 'antd';

const { Title, Paragraph } = Typography;

const ViewNotePage = () => {
    const { noteId } = useParams(); // Get the noteId from the URL
    const [note, setNote] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const noteRef = doc(firestore, "notes", noteId);
                const noteSnapshot = await getDoc(noteRef);

                if (noteSnapshot.exists()) {
                    setNote(noteSnapshot.data());
                } else {
                    // Handle note not found
                    console.error("Note not found");
                }
            } catch (error) {
                console.error("Error fetching note:", error);
            }
        };

        fetchNote();
    }, [noteId]);

    if (!note) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-5">
            <div className="card p-3 p-md-3 p-lg-4">
                <Title className="text-center mb-5">Collaborative Study Notes App</Title>

                {/* Table Layout */}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Field</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Title</strong></td>
                            <td>{note.title}</td>
                        </tr>
                        <tr>
                            <td><strong>Subject</strong></td>
                            <td>{note.subject}</td>
                        </tr>
                        <tr>
                            <td><strong>Description</strong></td>
                            <td>{note.description}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="text-center mt-4">
                    <Button
                        type="primary"
                        onClick={() => window.location.href = "https://www.youtube.com/"}
                    >
                        Go to YouTube
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ViewNotePage;
