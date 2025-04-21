// import DynamicPage from '@/components/DynamicPage';
import PublicPage from '@/components/PublicPage';
// const pageConfigApi = '/forms?id=12100'

export default () => {
  // return <DynamicPage pageConfigNs={1010} pageConfigApi={pageConfigApi} />
  return <PublicPage pageServer={'/forms'} />;
};
