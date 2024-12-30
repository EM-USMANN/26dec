import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { firestore } from 'config/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from 'contexts/Auth'

const { Title } = Typography

const initialState = { title: "", location: "", description: "" }

const Add = () => {

    const { user } = useAuthContext();

    const [state, setState] = useState(initialState)

    const [isProcessing, setIsProcessing] = useState(false)


    const navigate = useNavigate()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = e => {
        e.preventDefault()

        let { title, location, description } = state

        title = title.trim()

        location = location.trim()

        if (title.length < 3) { return window.notify("please enter your title name correctly", "error") }

        const todo = { uid: user.uid, id: window.getRandomId(), title, location, description, status: "incompleted", createdAt: serverTimestamp() }

        setIsProcessing(true)

        createDocument(todo)

    }


    const createDocument = async (todo) => {


        try {
            await setDoc(doc(firestore, "todos", todo.id), todo)
            window.notify("Todo created successfully", "success")
            setState(initialState)

        } catch (e) {
            window.notify("Error while creating todo", "error")
            console.error("Error adding document: ", e);

        } finally {

            setIsProcessing(false)
        }



    }

    return (
        <main className='auth p-3 p-md-3 p-lg-4'>
            <div className="card p-3 p-md-3 p-lg-4">
                <Title className='text-center mb-5' >Add Todo</Title>

                <Form layout='vertical'>
                    <Row gutter={15}>

                        <Col xs={24} >
                            <Form.Item label='Title:' required>
                                <Input size='large' type='text' placeholder='Enter todo title' name='title' value={state.title} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item label='Location:' >
                                <Input size='large' type='text' placeholder='Enter todo location' name='location' value={state.location} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item label='Description:' >
                                <Input.TextArea size='large' placeholder='Enter todo description' name='description' value={state.description} style={{ minHeight: "150px", resize: "none" }} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Add</Button>
                        </Col>
                        <Col span={12}>
                            <Button type='primary' size='large' block onClick={() => { navigate("/dashboard/todos/all") }}>All Todos</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    )
}

export default Add
