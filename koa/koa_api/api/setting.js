let json = require("./setting.json")
let config = require('../config')
let axios = require("axios")

let getJson = async(ctx,next)=>{
    ctx.body = {status:1,msg:"获取参数成功",data:json}
}

let getMainPage = async(ctx) =>{
    let url = ctx.originalUrl
    let query = url.indexOf("?id=")!==-1?"/"+url.split("?id=")[1]:""
    let ActionModal = await new Promise((resolve,reject)=>{
        axios.get(config.globalConfig.endpoint+"/api/crud/modalItemBasic/modalItemBasics")
        .then((response)=>{
            resolve(response.data.data.records)
        })
    })

    let opeartionModal = await new Promise((resolve,reject)=>{
        axios.get(config.globalConfig.endpoint+"/api/crud/modalItemBasicA/modalItemBasicAs")
        .then((response)=>{
            resolve(response.data.data.records)
        })
    })


    // console.log(modal)
    let res = await new Promise((resolve,reject)=>{
        axios.get(config.globalConfig.endpoint+"/api/pageconfig/lowMainPage/lowMainPages"+query)
        .then((response)=>{
            let returnData = response.data;
            if(response.data.lowActionss!==[]){
                let action = returnData.data.lowActionss
                action.map((item,i)=>{
                    item["items"]=[]
                    ActionModal.map((modalItem,mo)=>{
                        // console.log(modalItem.modalId,item.id)
                        // console.log(modalItem.modalId==item.id)
                        if(modalItem.modalId==item.id){
                            item["items"].push(modalItem)
                            // console.log(item)
                        }
                    })
                })
                returnData.data.lowActionss = action
            }

            if(response.data.lowOperationss!==[]){
                let operation = returnData.data.lowOperationss
                operation.map((item,i)=>{
                    item["items"]=[]
                    opeartionModal.map((modalItem,mo)=>{
                        // console.log(modalItem.modalId,item.id)
                        // console.log(modalItem.modalId==item.id)
                        if(modalItem.modalId==item.id){
                            item["items"].push(modalItem)
                            // console.log(item)
                        }
                    })
                })
                returnData.data.lowOperationss = operation
            }
            resolve(returnData)
        })
        .catch((err)=>{
            resolve({code:404,msg:"获取页面错误，请检查是否有该页面"})
        })
    })
    // console.log(res)
    ctx.response.body=res
}

let postNav = async(ctx) =>{
    let header = ctx.request.header
    let body = ctx.request.body
    axios.post(body.endpoint,)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err); 
    })
}

module.exports = {getJson,getMainPage}