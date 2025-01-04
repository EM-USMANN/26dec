import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'config/firebase'

const { Title } = Typography

const initialStae = { email: '', }

const ForgotPassword = () => {


    const [state, setState] = useState(initialStae)

    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = e => {
        e.preventDefault()

        let { email } = state


        setIsProcessing(true)

        sendPasswordResetEmail(auth, email)
            .then(() => {
                window.notify("Email send scuucessfully")
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
                <Title className='text-center mb-5 mt-2' >Forgot Password</Title>

                <Form layout='vertical'>
                    <Row gutter={15}>


                        <Col xs={24}>
                            <Form.Item label='Enter Your Email:' required>
                                <Input size='large' type='email' placeholder='Enter your email' name='email' onChange={handleChange} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Forgot Pasword</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </main>
    )
}

export default ForgotPassword
