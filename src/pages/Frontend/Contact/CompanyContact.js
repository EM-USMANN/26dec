import React from 'react'

const CompanyContact = () => {
    return (
        <>
            <main>

                <div style={styles.pageContainer}>
                    <div style={styles.content}>
                        <h1 style={styles.heading}>Contact Us</h1>
                        <p style={styles.paragraph}>
                            We are a team of passionate individuals dedicated to enhancing the collaborative study experience.
                            Our platform allows students to share and collaborate on study notes, making learning more effective and fun.
                        </p>
                        <p style={styles.paragraph}>
                            Our mission is to empower students by providing a seamless and interactive platform to study together, track their progress, and stay updated.
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}

const styles = {
    pageContainer: {
        padding: '50px 20px',
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        width: '100%',
    },
    heading: {
        fontSize: '2.5rem',
        color: '#333',
        textAlign: 'center',
        marginBottom: '20px',
    },
    paragraph: {
        fontSize: '1.1rem',
        color: '#666',
        lineHeight: '1.6',
        textAlign: 'center',
        marginBottom: '15px',
    },
};

export default CompanyContact
