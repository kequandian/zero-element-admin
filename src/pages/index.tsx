import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IndexPage(): React.ReactElement {
  const navigate = useNavigate();

  useEffect(() => {
    // history.push('/checkfiles');
    navigate('/dynamicFiles');
    // history.push('/dynamicPageManage');
  }, [navigate]);

  return <div></div>;
}
