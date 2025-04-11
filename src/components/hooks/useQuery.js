/**
 * //用来把传入的路径参数转化为字典格式的工具
 * 返回url的pathname及query参数map对像
 * @param {*} props 参数可以是location字符串，也可以是location对象, 也可以是封装了location属性的对象
 * @returns 
 */

export default function useQuery(props) {

    function useQuery(queryStringAfterQuestionMark) {
        if (queryStringAfterQuestionMark) {
            const res = {}
            if (queryStringAfterQuestionMark.indexOf('&') != -1) {
                // console.log('queryStringAfterQuestionMark ==', queryStringAfterQuestionMark)
                const dsArray = queryStringAfterQuestionMark.split('&')
                dsArray.map(item => {
                    const dsItemArray = item.split('=')
                    res[dsItemArray[0]] = dsItemArray[1]
                })
            } else {
                const dString = queryStringAfterQuestionMark.split('=')
                res[dString[0]] = dString[1]
            }
            return res
        } else {
            return {}
        }
    }


    // start main
    console.log("window.location.search=", window.location)
    const pageId = window.location.search.replace('?', '').split("=")[1];

    const searching = (typeof props == 'object' ) ? (props.search || props.location.search) : props  //pure location string
    const pathname = (typeof props === 'object') ?  (props.pathname || props.location.pathname) : undefined

    const res = {}
    if (searching) {
        if (searching.indexOf('?') != -1) {
            // with/? means pure location string
            const seps = searching.split('?')
            res.pathname = seps[0]
            res.query = useQuery(seps[1])
        } else {
            res.pathname = pathname
            res.query = useQuery(searching)
        }
        return res
    } else {
        return {}
    }
}
