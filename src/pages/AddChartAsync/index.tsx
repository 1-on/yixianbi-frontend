import {genChartByAi, genChartByAiAsyncMq} from '@/services/yixianbi/chartController';
import {UploadOutlined} from '@ant-design/icons';
import {Button, Card, Form, Input, message, Select, Space, Upload} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, {useState} from 'react';
import {useForm} from "antd/es/form/Form";

/**
 * 添加图表页面
 * @constructor
 */
const AddChartAsync: React.FC = () => {
  const [form] = useForm();
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
      const res = await genChartByAiAsyncMq(params, {}, values.file.file.originFileObj);
      if (!res?.data) {
        message.error('分析失败' + res.message);
        console.log(res.message);
      } else {
        message.success('分析任务提交成功，稍后请在我的图表页面查看');
        form.resetFields();
      }
    } catch (e: any) {
      message.error('分析失败' + e.message);
      console.log(e.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="add-chart-async">
      <Card title="智能分析">
        <Form
          form={form}
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
            <TextArea placeholder="请输入你的分析需求，比如：分析网站用户的增长情况" />
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
              <Button icon={<UploadOutlined />}>上传 EXCEL 文件</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                提交
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default AddChartAsync;
