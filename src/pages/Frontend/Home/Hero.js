import React, { useState } from 'react'
import { useAuthContext } from 'contexts/Auth'
import { Button, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from 'config/firebase'
import heroImage from '../../../Assets/hero-background.jpg'
import chat from '../../../Assets/icons/chat.png'
import notes from '../../../Assets/icons/notes.png'
import study from '../../../Assets/icons/study.png'


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




                <section
                    style={{
                        backgroundImage: `url(${heroImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '700px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#fff'
                    }}
                >
                    <div className="container text-center">
                        <h2>Enhance Your Study Experience</h2>
                        <p>Access notes on any subject and collaborate with your classmates in real-time.</p>
                        <Link to="/auth/register">
                            <Button type="primary" size="large">
                                Join Now
                            </Button>
                        </Link>
                    </div>
                </section>











                {/* Features Section */}
                <section className="features py-5">
                    <div className="container">
                        <h2 className="text-center mb-4 text-primary">Key Features</h2>
                        <div className="row">
                            {/* Real-Time Collaboration */}
                            <div className="col-md-4 text-center">
                                <div className="feature-card p-4 border rounded shadow-lg">
                                    <h3 className="feature-title">Real-Time Collaboration</h3>
                                    <p className="feature-description">Collaborate with your classmates in real time. See each other's changes instantly.</p>
                                </div>
                            </div>
                            {/* Version Control */}
                            <div className="col-md-4 text-center">
                                <div className="feature-card p-4 border rounded shadow-lg">
                                    <h3 className="feature-title">Version Control</h3>
                                    <p className="feature-description">Track who made changes and when with version history. Never lose your work.</p>
                                </div>
                            </div>
                            {/* Notifications */}
                            <div className="col-md-4 text-center">
                                <div className="feature-card p-4 border rounded shadow-lg">
                                    <h3 className="feature-title">Instant Notifications</h3>
                                    <p className="feature-description">Get notified when someone comments or updates a note, so you're always in the loop.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>














                {/* CTA Section */}
                <section className="cta bg-dark text-light py-5 mt-5 mb-5">
                    <div className="container text-center">
                        <h2 className="cta-heading text-white">Start Collaborating Today!</h2>
                        <p className="cta-text">Join the collaborative study revolution. Share notes, discuss ideas, and study together in real-time. Let's make learning more interactive!</p>

                        <div className="row justify-content-center mb-4">
                            <div className="col-md-4 mb-3">
                                <img src={chat} alt="Notes Icon" className="cta-icon" />
                                <h4 className='text-white'>Share Notes</h4>
                                <p>Upload, share, and collaborate on notes with your peers in real-time.</p>
                            </div>
                            <div className="col-md-4 mb-3">
                                <img src={notes} alt="Chat Icon" className="cta-icon" />
                                <h4 className='text-white'>Instant Chat</h4>
                                <p>Discuss your ideas or ask questions with classmates instantly using the built-in chat feature.</p>
                            </div>
                            <div className="col-md-4 mb-3">
                                <img src={study} alt="Group Icon" className="cta-icon" />
                                <h4 className='text-white'>Study Groups</h4>
                                <p>Create or join study groups to collaborate on projects and assignments effectively.</p>
                            </div>
                        </div>

                        {/* <Link to={"/auth/register"}>
                            <Button type="primary" size="large" className="cta-btn">
                                Sign Up Now
                            </Button>
                        </Link> */}
                    </div>
                </section>












                {/* <h1 className='text-center py-5'>Home page</h1>
                <h1 className='text-center py-2'>First Name: {user.firstName}</h1>
                <h1 className='text-center py-2'>Last Name: {user.lastName}</h1>
                <h1 className='text-center py-2'>Email: {user.email}</h1>
                <h1 className='text-center py-2'>UID: {user.uid}</h1> */}


                {/* <div className="container">
                    <Row className='text-center py-5'  >
                        <Col span={24}>
                            <Button type='primary' onClick={handleUpdateProfile}>Update Profile</Button>
                        </Col>
                    </Row>
                </div> */}

            </main>
        </>
    )
}

export default Hero
