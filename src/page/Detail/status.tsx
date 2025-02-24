import { Card, Steps } from "antd"
import TextArea from "antd/es/input/TextArea"

import React from "react"

function Status() {
    return (
        <div className=" h-full">
            <Card className="h-full bg-blue-200">
                <h1 className="text-2xl font-bold text-center">Applovel</h1>
                <Card className="my-5">
                    <div className="flex justify-between">
                        <h1>John Doe</h1>
                        <p className="text-green-500">Submitted</p>
                    </div>
                    <div className="flex justify-between">
                        <h1>Jane Smith</h1>
                        <p className="text-orange-500">Pending</p>
                    </div>
                </Card>
                <h1 className="text-2xl font-bold text-center">Remark</h1>
                <TextArea
                    className='w-full'
                    // value={value}
                    // onChange={(e) => setValue(e.target.value)}
                    placeholder="ไห้ ไม่ไห้"
                    readOnly
                    autoSize={{ minRows: 3, maxRows: 5 }}
                />
                <Card className="my-3">
                    <Steps
                        className="py-5 w-full"
                        responsive={true}
                        progressDot
                        direction="vertical"
                        size="small"
                        current={1}
                        items={[
                            {
                                title: 'SubmitFrom',
                            },
                            {
                                title: 'Progress',
                                description: (
                                    <p className="truncate max-w-[150px]">
                                        ส่งของ project
                                    </p>
                                ),
                            },
                            {
                                title: 'Progress',
                                description: (
                                    <p className="truncate max-w-[150px]">
                                        ขนส่ง
                                    </p>
                                ),
                            },
                            {
                                title: 'Progress',
                                description: (
                                    <p className="truncate max-w-[150px]">
                                        เปิดบิล
                                    </p>
                                ),
                            },
                        ]}
                    />
                </Card>
            </Card>
        </div>
    )
}
export default Status