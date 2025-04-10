import DynamicPage from '@/components/DynamicPage';
import setting from './config/checkfiles-setting.json';
// const setting = require('./config/checkfiles-setting.json');
import PublicPage from '@/components/PublicPage';

export default () => {
  // return <DynamicPage pageConfigData={setting} />
  return <PublicPage />;
};
