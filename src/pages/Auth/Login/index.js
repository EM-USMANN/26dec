import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'config/firebase'

const { Title } = Typography

const initialStae = { email: '', password: '' }

const Login = () => {


    const [state, setState] = useState(initialStae)

    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = e => {
        e.preventDefault()

        let { email, password } = state


        setIsProcessing(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('user', user)
            })

            .catch((error) => {
                window.notify("Something went wrong while login the user ", "error")
                console.error(error)
            })
            .finally(() => {

                setIsProcessing(false)
            })


    }




    return (
        <main className='auth p-3 p-md-3 p-lg-4'>
            <div className="card p-3 p-md-3 p-lg-4">
                <Title className='text-center mb-5 mt-2' >Register</Title>

                <Form layout='vertical'>
                    <Row gutter={15}>


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
                            <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Register</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    )
}

export default Login
