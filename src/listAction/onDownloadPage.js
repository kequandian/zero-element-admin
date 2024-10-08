import { message as msg } from 'antd';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
import promiseAjax from '@/utils/promiseAjax';
const endpoint = getEndpoint()


export default function onDownloadPage(props) {
  const {
    options,
    record
  } = props;
  const {
    API='',
    toConfigAPI='/toconfig',
    message = '操作成功',
    query = {
      id: 'id'
    }
  } = options;

  // console.log(data)
  
  function getPageConfig() {
    msg.info('正在处理数据')
    // const apiUrl = `https://api.mock.smallsaas.cn/data`;
    let endpoint = getEndpoint()
    const apiUrl = `${endpoint}${toConfigAPI}`; //转换地址
    const pageUrl = `${endpoint}${API}`;
    // const pageUrl = `${endpoint}${pageEndpoint}`;//页面api获取地址
    promiseAjax(pageUrl, {/* id:id */ })
      .then(resp => {
        if (resp && resp.code === 200) {
          const Listdata = resp.data;

          let options = {
            method: "post"
          }
          promiseAjax(apiUrl, Listdata, options)
            .then(value => {
              // console.log(value,"VALUE")
              if (value.code === 200) {
                const data = value.data;
                // console.log(' 页面配置信息 = ', data)
                handleDownloadPage(data)
              } else {
                msg.error('获取页面配置信息失败')
              }
            })
            .catch(value => {

            })
        } else {
          msg.error('获取页面配置信息失败')
        }
      }).catch(err => {
        msg.error('获取页面配置信息失败 = ', err)
      })
  }

  function handleDownloadPage(data) {
    const cutString = data.createAPI
    const fileName = cutString.substring(cutString.lastIndexOf('/')+1, cutString.length)
    const apiUrl = `${getEndpoint()}/api/lc/lowMainPage/pageConfig/${fileName}`; //转换地址
    let options = {
      method: "post"
    }
    return promiseAjax(endpoint+ apiUrl, data, options)
    .then(value => {
      // console.log(value,"VALUE")
      if (value.code === 200) {
        msg.info('数据处理完成')
        const data = value.data;
        downloadFileAction(data)
        console.log(' 下载地址 = ', data)
      } else {
        msg.error('下载失败')
      }
    })
    .catch(value => {

    })
  }

  function downloadFileAction (content) {
    let path = `${getEndpoint()}/${content}`
    const w = window.open('about:blank');
    w.location.href = path
  }


  return getPageConfig(); 
}
