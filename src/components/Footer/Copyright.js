import { Row, Col, Typography } from 'antd'
import React from 'react'


const { Paragraph } = Typography

const Copyright = () => {

    const year = new Date().getFullYear

    return (
        <>
            <div className="container-fluid bg-dark">
                <Row>
                    <Col span={24}>
                        <Paragraph className='text-center p-2 mb-0 text-white'>
                            &copy; {year}. All Rights Reserved
                        </Paragraph>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Copyright
