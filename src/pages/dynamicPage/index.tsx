import React from 'react';
import DynamicPage from '@/components/DynamicPage';

export default (): React.ReactElement => {
  return <DynamicPage pageConfigApi='/api/crud/lowMainPage/lowMainPages/config?id=49'/>;
};
