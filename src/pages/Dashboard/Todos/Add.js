import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { firestore } from 'config/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from 'contexts/Auth'
import supabase from '../../../config/supabaseClient'

const { Title } = Typography

const initialState = { title: "", location: "", description: "" }

const Add = () => {
    const { user } = useAuthContext()
    const [state, setState] = useState(initialState)
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()

        let { title, location, description } = state
        title = title.trim()
        location = location.trim()

        if (title.length < 3) {
            return window.notify("please enter your title name correctly", "error")
        }

        const todo = {
            uid: user.uid,
            id: window.getRandomId(),
            title,
            location,
            description,
            imageURL: '',
            status: "incompleted",
            createdAt: serverTimestamp()
        }

        setIsProcessing(true)

        if (file) {
            // Upload the image and get the URL before creating the document
            const imageURL = await handleUpLoadImage(file)
            if (imageURL) {
                todo.imageURL = imageURL
                createDocument(todo)
            } else {
                setIsProcessing(false)
                window.notify("Error uploading image", "error")
            }
        } else {
            createDocument(todo)
        }
    }

    const handleUpLoadImage = async (file) => {
        if (!file) {
            alert('Please select a file!');
            return null
        }

        try {
            const filePath = `profile_images/${Date.now()}-${file.name}`; // Unique file name
            const { data, error } = await supabase.storage
                .from('bucket') // Replace 'bucket' with your Supabase bucket name
                .upload(filePath, file)

            if (error) {
                console.error('Error uploading image:', error)
                alert('Error uploading image!')
                return null
            }

            // Get the public URL of the uploaded image
            const publicUrl = supabase.storage
                .from('bucket') // Same storage bucket name
                .getPublicUrl(filePath).publicURL

            return publicUrl
        } catch (error) {
            console.error('Error uploading file:', error)
            alert('Error uploading file!')
            return null
        }
    }

    const createDocument = async (todo) => {
        try {
            await setDoc(doc(firestore, "todos", todo.id), todo)
            window.notify("Todo created successfully", "success")
            setState(initialState)
        } catch (e) {
            window.notify("Error while creating todo", "error")
            console.error("Error adding document: ", e)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <main className='auth p-3 p-md-3 p-lg-4'>
            <div className="card p-3 p-md-3 p-lg-4">
                <Title className='text-center mb-5'>Add Todo</Title>

                <Form layout='vertical'>
                    <Row gutter={15}>
                        <Col xs={24}>
                            <Form.Item label='Title:' required>
                                <Input size='large' type='text' placeholder='Enter todo title' name='title' value={state.title} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item label='Location:'>
                                <Input size='large' type='text' placeholder='Enter todo location' name='location' value={state.location} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item label='Description:'>
                                <Input.TextArea size='large' placeholder='Enter todo description' name='description' value={state.description} style={{ minHeight: "100px", resize: "none" }} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item label='Image:'>
                                <Input type='file' className='form-control' onChange={e => setFile(e.target.files[0])} />
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
