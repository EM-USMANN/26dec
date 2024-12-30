import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Row, Space, Typography } from 'antd'
import { firestore } from 'config/firebase'
import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from 'contexts/Auth'


const { Title } = Typography


const All = () => {

    const { user } = useAuthContext()

    const [todos, setTodos] = useState([])

    const navigate = useNavigate()


    const getTodos = useCallback(async () => {

        if (user.uid) {
            const q = query(collection(firestore, "todos"), where("uid", "==", user.uid));

            const querySnapshot = await getDocs(q);

            const array = []
            querySnapshot.forEach((doc) => {
                const document = doc.data()
                console.log("document", document)
                array.push(document)
            });
            setTodos(array)
        }

    }, [user.uid])


    useEffect(() => { getTodos() }, [getTodos])




    const handleUpdate = async (todo) => {
        console.log('todo', todo)

        const updatedData = { status: "completed", updatedAt: serverTimestamp() }
        try {
            await setDoc(doc(firestore, "todos", todo.id), updatedData, { merge: true })
            window.notify("Todo updated successfully", "success")
            // setState(initialState)

        } catch (e) {
            window.notify("Error while updating todo", "error")
            console.error("Error adding document: ", e);

        }
    }
    const handleDelete = async (todo) => {
        console.log('todo', todo)
        try {
            await deleteDoc(doc(firestore, "todos", todo.id));
            window.notify("Todo delete successfully", "success")
        } catch (error) {
            window.notify("Error while deleting todo", "error")
            console.error("Error deleted document: ", error);
        }

    }



    return (
        <main className='p-5'>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Title className='text-center mb-5' >All Todos</Title>
                    </Col>

                    <Col span={24}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th >#</th>
                                    <th >ID</th>
                                    <th >Image</th>
                                    <th >Title</th>
                                    <th >Location</th>
                                    <th >Description</th>
                                    <th >Status</th>
                                    <th >Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todos.map((todo, i) => {
                                    return <tr key={i}>
                                        <th>{i + 1}</th>
                                        <td>{todo.id}</td>
                                        <td>{todo.imageURL}</td>
                                        <td>{todo.title}</td>
                                        <td>{todo.location}</td>
                                        <td>{todo.description}</td>
                                        <td className='text-capitalize'>{todo.status}</td>
                                        <td>
                                            <Space>
                                                <Button type='primary' size='small' onClick={() => { handleUpdate(todo) }}>Edit</Button>
                                                <Button type='primary' size='small' danger onClick={() => { handleDelete(todo) }}>Delete</Button>
                                            </Space>
                                        </td>
                                    </tr>

                                })}

                            </tbody>
                        </table>
                    </Col>
                    <Col span={24} className='text-center'>
                        <Button type='primary' size='large' onClick={() => { navigate("/dashboard/todos/add") }}>Add Todo</Button>
                    </Col>
                </Row>

            </div>

        </main>
    )
}

export default All
