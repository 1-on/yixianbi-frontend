import {genChartByAi} from '@/services/yixianbi/chartController';
import {UploadOutlined} from '@ant-design/icons';
import {Button, Card, Col, Divider, Form, Input, message, Row, Select, Space, Spin, Upload} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ReactECharts from 'echarts-for-react';
import React, {useState} from 'react';

/**
 * 添加图表页面
 * @constructor
 */
const AddChart: React.FC = () => {
  const [chart, setChart] = useState<API.BiResponse>();
  const [option, setOption] = useState<any>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    console.log('Success:', values.file.file.originFileObj);
    const params = {
      ...values,
      file: undefined,
    };
    try {
      const res = await genChartByAi(params, {}, values.file.file.originFileObj);
      if (!res?.data) {
        message.error('分析失败' + res.message);
        console.log(res.message);
      } else {
        message.success('分析成功');
        const jsonString = res.data.genChart ?? '';
        const cleanedString = jsonString.replace(/\\n/g, '').replace(/\\/g, '');
        console.log(cleanedString);
        const chartOption = JSON.parse(jsonString);
        console.log(chartOption);
        if (!chartOption) {
          // throw new Error('图表代码解析错误');
        } else {
          setChart(res.data);
          setOption(chartOption);
        }
      }
    } catch (e: any) {
      message.error('分析失败' + e.message);
      console.log(e.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="add-chart">
      <Row gutter={24}>
        <Col span={12}>
          <Card title="智能分析">
            <Form
              name="addChart"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
            >
              <Form.Item
                label="分析目标"
                name="goal"
                rules={[{ required: true, message: '请输入分析目标' }]}
              >
                <TextArea placeholder="请输入你的分析需求，比如：分许网站用户的增长情况" />
              </Form.Item>

              <Form.Item label="图表名称" name="name">
                <Input placeholder="请输入图表名称" />
              </Form.Item>

              <Form.Item name="chartType" label="图表类型">
                <Select>
                  <Select.Option value="柱状图">柱状图</Select.Option>
                  <Select.Option value="折线图">折线图</Select.Option>
                  <Select.Option value="堆叠图">堆叠图</Select.Option>
                  <Select.Option value="饼图">饼图</Select.Option>
                  <Select.Option value="雷达图">雷达图</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="file" label={'原始数据'}>
                <Upload name={'file'}>
                  <Button icon={<UploadOutlined />}>上传 CSV 文件</Button>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={submitting}
                  >
                    提交
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={'分析结论'}>
            <div>{chart?.genResult ?? <div>请先在左侧进行提交</div>}</div>
            <Spin spinning={submitting} />
          </Card>
          <Divider />
          <Card title={'可视化图表'}>
            <div>{option && <ReactECharts option={option} />}</div>
            <div>请先在左侧进行提交</div>
            <Spin spinning={submitting} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default AddChart;
