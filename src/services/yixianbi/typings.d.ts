declare namespace API {
  type BiResponse = {
    genChart?: string;
    genResult?: string;
    chartId?: number;
  };

  type Chart = {
    id?: number;
    name?: string;
    goal?: string;
    chartData?: string;
    chartType?: string;
    genChart?: string;
    genResult?: string;
    userId?: number;
    status?: string;
    execMessage?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type ChartAddDTO = {
    name?: string;
    goal?: string;
    chartData?: string;
    chartType?: string;
  };

  type ChartEditDTO = {
    id?: number;
    name?: string;
    goal?: string;
    chartData?: string;
    chartType?: string;
  };

  type ChartQueryDTO = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    name?: string;
    goal?: string;
    chartType?: string;
    userId?: number;
  };

  type ChartUpdateDTO = {
    id?: number;
    name?: string;
    goal?: string;
    chartData?: string;
    chartType?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type genChartByAiAsyncMqParams = {
    name?: string;
    goal?: string;
    chartType?: string;
  };

  type genChartByAiParams = {
    name?: string;
    goal?: string;
    chartType?: string;
  };

  type getChartByIdParams = {
    id: number;
  };

  type LoginUserVO = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
    token?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageChart = {
    records?: Chart[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageChart;
    searchCount?: PageChart;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type ResultBiResponse = {
    code?: number;
    message?: string;
    data?: BiResponse;
  };

  type ResultBoolean = {
    code?: number;
    message?: string;
    data?: boolean;
  };

  type ResultChart = {
    code?: number;
    message?: string;
    data?: Chart;
  };

  type ResultLoginUserVO = {
    code?: number;
    message?: string;
    data?: LoginUserVO;
  };

  type ResultLong = {
    code?: number;
    message?: string;
    data?: number;
  };

  type ResultPageChart = {
    code?: number;
    message?: string;
    data?: PageChart;
  };

  type UserLoginDTO = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterDTO = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
  };
}
