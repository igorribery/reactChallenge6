import React from 'react';

type Props = {
  data: string
}

const PageTitle = ({ data }: Props) => {
  return <div className='page-title'>{data || '{insira um titulo}'}</div>;
};

export default PageTitle;
