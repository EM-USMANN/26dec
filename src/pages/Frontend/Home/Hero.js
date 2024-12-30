import React, { useState } from 'react'
import { useAuthContext } from 'contexts/Auth'
import { Button, Col, Row } from 'antd'
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from 'config/firebase'

const Hero = () => {

    const { user } = useAuthContext()

    const [isProcessing, setIsProcessing] = useState(false)

    const handleUpdateProfile = async () => {
        setIsProcessing(true)
        try {
            await setDoc(doc(firestore, "users", user.uid), { status: "inactive" }, { merge: true });
            window.notify("User Profile updated successfully", "success")

        } catch (e) {
            window.notify("Error while updating user profile", "error")
            console.error("Error updated document: ", e);

        } finally {

            setIsProcessing(false)
        }

    }


    return (
        <>
            <main>
                <h1 className='text-center py-5'>Home page</h1>
                <h1 className='text-center py-2'>First Name: {user.firstName}</h1>
                <h1 className='text-center py-2'>Last Name: {user.lastName}</h1>
                <h1 className='text-center py-2'>Email: {user.email}</h1>
                <h1 className='text-center py-2'>UID: {user.uid}</h1>


                <div className="container">
                    <Row className='text-center py-5'  >
                        <Col span={24}>
                            <Button type='primary' onClick={handleUpdateProfile}>Update Profile</Button>
                        </Col>
                    </Row>
                </div>

            </main>
        </>
    )
}

export default Hero
