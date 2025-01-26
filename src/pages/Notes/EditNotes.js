import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { firestore } from "config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

const { Title } = Typography;

const EditNotes = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const docSnap = await getDoc(doc(firestore, "notes", id));
                if (docSnap.exists()) {
                    setNote(docSnap.data());
                } else {
                    window.notify("Note not found.", "error");
                    navigate("/view-notes");
                }
            } catch (error) {
                console.error("Error fetching note:", error);
                window.notify("Error fetching note.", "error");
            }
        };

        fetchNote();
    }, [id, navigate]);

    const handleChange = (e) =>
        setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleUpdate = async () => {
        setIsProcessing(true);
        try {
            await updateDoc(doc(firestore, "notes", id), note);
            window.notify("Note updated successfully!", "success");
            navigate("/view-notes");
            navigate("/viewNotes");
        } catch (error) {
            console.error("Error updating note:", error);
            window.notify("Error updating note.", "error");
        } finally {
            setIsProcessing(false);
        }
    };

    if (!note) return <p>Loading...</p>;

    return (
        <main className="auth p-3 p-md-3 p-lg-4">
            <div className="card p-3 p-md-3 p-lg-4">
                <Title className="text-center mb-5">Edit Note</Title>
                <Form layout="vertical">
                    <Row gutter={15}>
                        <Col xs={24}>
                            <Form.Item label="Title:" required>
                                <Input
                                    size="large"
                                    name="title"
                                    value={note.title}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item label="Subject:">
                                <Input
                                    size="large"
                                    name="subject"
                                    value={note.subject}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item label="Description:">
                                <Input.TextArea
                                    size="large"
                                    name="description"
                                    value={note.description}
                                    onChange={handleChange}
                                    style={{ minHeight: "100px", resize: "none" }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Button
                                type="primary"
                                size="large"
                                block
                                loading={isProcessing}
                                onClick={handleUpdate}
                            >
                                Update Note
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    );
};

export default EditNotes;
