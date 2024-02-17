import {listMyChartByPage} from '@/services/yixianbi/chartController';
import {useModel} from '@@/exports';
import {Avatar, Card, List, message} from 'antd';
import Search from 'antd/es/input/Search';
import ReactECharts from 'echarts-for-react';
import React, {useEffect, useState} from 'react';

/**
 * 我的图表页面
 * @constructor
 */
const MyChartPage: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 4,
  };
  const [searchParams, setSearchParams] = useState<API.ChartQueryDTO>({ ...initSearchParams });
  // 当前用户信息
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  // 图表
  const [chartList, setChartList] = useState<API.Chart>();
  const [total, setTotal] = useState();
  // 加载状态，用来控制页面是否加载，默认正在加载
  const [loading, setLoading] = useState<boolean>(true);
  /**
   * 加载数据
   */
  const loadData = async () => {
    // 获取数据中,还在加载中,把loading设置为true
    setLoading(true);
    try {
      const res = await listMyChartByPage(searchParams);
      if (res.data) {
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
        if (res.data.records) {
          res.data.records.forEach((data) => {
            const chartOption = JSON.parse(data.genChart ?? '{}');
            chartOption.title = undefined;
            data.genChart = JSON.stringify(chartOption);
          });
        }
      } else {
        message.error('获取图表失败' + res.message);
      }
    } catch (e: any) {
      message.error('获取我的图表失败,' + e.message);
    }
    // 获取数据后，加载完毕，设置为false
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <div className="my-chart-page">
      <Search
        placeholder="请输入图表名称"
        enterButton
        loading={loading}
        onSearch={(value) => {
          // 设置搜索条件
          setSearchParams({
            // 原始搜索条件
            ...initSearchParams,
            // 搜索次
            name: value,
          });
        }}
      />
      <div className="margin-16" />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...initSearchParams,
              current: page,
              pageSize,
            });
          },
          // 显示当前页数
          current: searchParams.current,
          // 页面参数改成自己的
          pageSize: searchParams.pageSize,
          // 总数设置成自己的
          total: total,
        }}
        loading={loading}
        dataSource={chartList}
        renderItem={(item: any) => (
          <List.Item key={item.id}>
            <Card>
              <List.Item.Meta
                avatar={<Avatar src={currentUser && currentUser.userAvatar} />}
                title={item.name ? item.name : '无'}
                description={item.chartType ? '图表类型：' + item.chartType : undefined}
              />
              {'分析目标:' + item.goal}
              {/* 在元素的下方增加16像素的外边距 */}
              <div className="margin-16" />
              <ReactECharts option={JSON.parse(item.genChart ?? '{}')} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default MyChartPage;
