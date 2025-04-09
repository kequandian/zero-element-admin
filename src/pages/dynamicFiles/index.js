import DynamicPage from '@/components/DynamicPage';
import setting from './config/checkfiles-setting.json';
// const setting = require('./config/checkfiles-setting.json');

export default () => {
  return <DynamicPage pageConfigData={setting}/>
};
