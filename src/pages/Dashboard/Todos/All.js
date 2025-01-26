import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Row, Space, Typography, Popconfirm } from "antd";
import { firestore } from "config/firebase";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "contexts/Auth";

const { Title } = Typography;

const All = () => {
    const { user } = useAuthContext();
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    const getTodos = useCallback(async () => {
        if (user.uid) {
            const q = query(
                collection(firestore, "todos"),
                where("uid", "==", user.uid)
            );

            const querySnapshot = await getDocs(q);

            const array = [];
            querySnapshot.forEach((doc) => {
                const document = doc.data();
                console.log("document", document);
                array.push(document);
            });
            setTodos(array);
        }
    }, [user.uid]);

    useEffect(() => {
        getTodos();
    }, [getTodos]);

    const handleUpdate = async (todo) => {
        console.log("todo", todo);

        const updatedData = { status: "completed", updatedAt: serverTimestamp() };
        try {
            await setDoc(doc(firestore, "todos", todo.id), updatedData, {
                merge: true,
            });
            window.notify("Todo updated successfully", "success");
        } catch (e) {
            window.notify("Error while updating todo", "error");
            console.error("Error adding document: ", e);
        }
    };

    const handleDelete = async (todo) => {
        console.log("todo", todo);
        try {
            await deleteDoc(doc(firestore, "todos", todo.id));
            window.notify("Todo deleted successfully", "success");
            setTodos((prev) => prev.filter((t) => t.id !== todo.id)); // Remove deleted todo from the state
        } catch (error) {
            window.notify("Error while deleting todo", "error");
            console.error("Error deleting document: ", error);
        }
    };

    return (
        <main className="p-5">
            <div className="container">
                <Row>
                    <Title className="text-center mb-5" level={2}>
                        All Todos
                    </Title>
                </Row>
                <div style={{ overflowX: "auto" }}>
                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            padding: "10px",
                            alignItems: "flex-start",
                        }}
                    >
                        {todos.map((todo, i) => (
                            <Card
                                key={i}
                                style={{
                                    width: "300px",
                                    flex: "0 0 auto",
                                    border: "1px solid #f0f0f0",
                                }}
                                title={`#${i + 1} - ${todo.title}`}
                                extra={<span>{todo.status}</span>}
                            >
                                <p>
                                    <strong>Location:</strong> {todo.location || "N/A"}
                                </p>
                                <p>
                                    <strong>Description:</strong> {todo.description || "N/A"}
                                </p>
                                <p>
                                    <strong>Image URL:</strong>{" "}
                                    <a href={todo.imageURL} target="_blank" rel="noopener noreferrer">
                                        {todo.imageURL || "N/A"}
                                    </a>
                                </p>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button
                                        type="primary"
                                        size="small"
                                        onClick={() => handleUpdate(todo)}
                                    >
                                        Mark as Complete
                                    </Button>
                                    <Popconfirm
                                        title="Are you sure to delete this todo?"
                                        onConfirm={() => handleDelete(todo)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type="primary" size="small" danger>
                                            Delete
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
                <Row justify="center" className="mt-4">
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => navigate("/dashboard/todos/add")}
                    >
                        Add Todo
                    </Button>
                </Row>
            </div>
        </main>
    );
};

export default All;
