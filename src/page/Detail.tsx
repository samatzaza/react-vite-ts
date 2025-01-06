import { Col, Row } from 'antd'
import React from 'react'

const Detail = () => {
    return (
        <div>
            <h1>Details</h1>
            <Row>
                <Col span={16} className='bg-red-500 p-5'>col-8</Col>
                <Col span={8} className='bg-blue-500 p-5'>col-8</Col>
            </Row>
        </div>
    )
}

export default Detail
