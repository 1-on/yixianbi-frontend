import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: '一弦智能 BI',
          title: '一弦智能 BI',
          href: 'https://github.com/1-on',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/1-on',
          blankTarget: true,
        },
        {
          key: '一弦智能 BI',
          title: '一弦智能 BI',
          href: 'https://github.com/1-on',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
