import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { firestore } from "config/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuthContext } from "contexts/Auth";
import { useNavigate } from 'react-router-dom'

const { Title } = Typography;

const AddNotes = () => {
  const { user } = useAuthContext();
  const [note, setNote] = useState({ title: "", subject: "", description: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) =>
    setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, subject, description } = note;

    if (title.trim().length < 3) {
      return window.notify("Please enter a valid title.", "error");
    }

    const newNote = {
      id: window.getRandomId(),
      uid: user.uid,
      title: title.trim(),
      subject: subject.trim(),
      description: description.trim(),
      createdAt: serverTimestamp(),
    };

    newNote.createdBy = {
      uid: user.uid,
      sharedNotes: [user.uid],
    }

    setIsProcessing(true);
    try {
      await setDoc(doc(firestore, "notes", newNote.id), newNote);
      window.notify("Note added successfully!", "success");
      setNote({ title: "", subject: "", description: "" });
    } catch (error) {
      console.error("Error adding note:", error);
      window.notify("Error adding note.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="auth p-3 p-md-3 p-lg-4">
      <div className="card p-3 p-md-3 p-lg-4">
        <Title className="text-center mb-5">Add Note</Title>
        <Form layout="vertical" onSubmit={handleSubmit}>
          <Row gutter={15}>
            <Col xs={24}>
              <Form.Item label="Title:" required>
                <Input
                  size="large"
                  placeholder="Enter note title"
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
                  placeholder="Enter note subject"
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
                  placeholder="Enter note description"
                  name="description"
                  value={note.description}
                  onChange={handleChange}
                  style={{ minHeight: "100px", resize: "none" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button
                type="primary"
                size="large"
                block
                loading={isProcessing}
                onClick={handleSubmit}
              >
                Add Note
              </Button>
            </Col>
            <Col span={12}>
              <Button type='primary' size='large' block onClick={() => { navigate("/viewNotes") }}>View Notes</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  );
};

export default AddNotes;
