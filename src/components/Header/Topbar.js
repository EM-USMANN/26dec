import React from 'react'
import { Row, Col, Typography } from 'antd'


const { Paragraph } = Typography

const Topbar = () => {

    return (

        <>
            <div className="container-fluid bg-dark">
                <Row>
                    <Col span={24} >
                        <Paragraph className='text-center mb-0 p-2 text-white'>
                            10% off on advance payments
                        </Paragraph>
                    </Col>
                </Row>
            </div>

        </>
    )
}


export default Topbar
