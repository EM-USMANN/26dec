import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'config/firebase'

const { Title } = Typography

const initialStae = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Register = () => {


    const [state, setState] = useState(initialStae)

    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = e => {
        e.preventDefault()

        let { firstName, lastName, email, password, confirmPassword } = state

        firstName = firstName.trim()
        if (firstName.length < 3) { return window.notify("please enter your first name correctly", "error") }
        if (confirmPassword !== password) { return window.notify("password doesn't match", "error") }

        const userData = { firstName, lastName, email, password, confirmPassword }

        setIsProcessing(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log('user', user)
                createDocument({ ...userData, uid: user.uid })
                // ...
            })
            .catch((error) => {
                window.notify("Something went wrong while creating the user", "error")
                console.error(error)
                setIsProcessing(false)
            });


    }


    const createDocument = userData => {
        console.log('userData', userData)

        setTimeout(() => {
            setIsProcessing(false)
        }, 2000);
    }

    return (
        <main className='auth p-3 p-md-3 p-lg-4'>
            <div className="card p-3 p-md-3 p-lg-4">
                <Title className='text-center mb-5' >Register</Title>

                <Form layout='vertical'>
                    <Row gutter={15}>

                        <Col xs={24} md={12}>
                            <Form.Item label='First Name:' required>
                                <Input size='large' type='text' placeholder='Enter your first name' name='firstName' onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label='Last Name:'>
                                <Input size='large' type='text' placeholder='Enter your last name' name='lastName' onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col xs={24}>
                            <Form.Item label='Enter Your Email:' required>
                                <Input size='large' type='email' placeholder='Enter your email' name='email' onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label='Enter Your Password:' required>
                                <Input.Password size='large' placeholder='Enter your password' name='password' onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label='Confirm Password:' required>
                                <Input.Password size='large' placeholder='Enter your password' name='confirmPassword' onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Register</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    )
}

export default Register
