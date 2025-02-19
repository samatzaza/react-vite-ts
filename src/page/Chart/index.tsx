import ReactECharts from 'echarts-for-react';

const MyChart = () => {
    // Generate 100,000 random data points
    const data = Array.from({ length: 100000 }, (_, i) => [i, Math.random() * 100]);

    const option = {
        xAxis: { type: 'value' },
        yAxis: { type: 'value' },
        series: [
            {
                type: 'scatter',
                symbolSize: 2, // Reduce point size for better performance
                data,
                progressive: 5000, // Renders 5,000 points at a time
            },
        ],
    };

    return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default MyChart;
