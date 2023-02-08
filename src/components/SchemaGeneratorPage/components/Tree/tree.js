import {Tree} from 'antd'

export default function(){
    // 定义图标
    // 文件夹未展开
    const FileViewIcon = <svg t="1619436088692" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18222" width="15" height="15"><path d="M974.99592797 774.77400863H49.00407203V220.36641817h857.08789887c38.11120672 0 69.04204115 30.93083443 69.04204115 69.04204115v485.36554931h-0.13808408zM627.71446098 220.36641817c0-63.9329301-51.78153086-115.71446098-115.71446098-115.71446098H49.00407203v115.71446098h578.71038895" fill="#dd9b04" p-id="18223"></path><path d="M164.718533 620.25792053V273.11453762h694.562934v347.14338291h-694.562934z" fill="#dd9b04" p-id="18224"></path><path d="M974.99592797 848.09665633V398.49488435c0-31.89742302-25.95980747-57.85723049-57.85723049-57.85723048H106.86130252c-31.89742302 0-57.85723049 25.95980747-57.85723049 57.85723048v449.4636879c0 39.35396347 31.89742302 71.38947055 71.38947055 71.38947056h783.35099891c39.35396347 0.13808409 71.25138647-31.89742302 71.25138648-71.25138648z" fill="#FFCD2C" p-id="18225"></path></svg>
    // 文件夹展开
    const FileViewOpenIcon =<svg t="1619436188446" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18353" width="15" height="15"><path d="M974.99592797 774.77400863H49.00407203V220.36641817h857.08789887c38.11120672 0 69.04204115 30.93083443 69.04204115 69.04204115v485.36554931h-0.13808408zM627.71446098 220.36641817c0-63.9329301-51.78153086-115.71446098-115.71446098-115.71446098H49.00407203v115.71446098h578.71038895" fill="#CE9F06" p-id="18354"></path><path d="M164.718533 620.25792053V273.11453762h694.562934v347.14338291h-694.562934z" fill="#FFFFFF" p-id="18355"></path><path d="M974.99592797 848.09665633V398.49488435c0-31.89742302-25.95980747-57.85723049-57.85723049-57.85723048H106.86130252c-31.89742302 0-57.85723049 25.95980747-57.85723049 57.85723048v449.4636879c0 39.35396347 31.89742302 71.38947055 71.38947055 71.38947056h783.35099891c39.35396347 0.13808409 71.25138647-31.89742302 71.25138648-71.25138648z" fill="#FFCD2C" p-id="18356"></path></svg>
    // 文件
    const FileIcon = <svg t="1619521467974" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6016" width="15" height="15"><path d="M735.744 0H128.950857a55.661714 55.661714 0 0 0-55.222857 55.881143v912.164571a55.661714 55.661714 0 0 0 55.222857 55.954286h772.315429a55.661714 55.661714 0 0 0 55.222857-55.881143V223.524571L735.744 0zM487.497143 325.778286a27.940571 27.940571 0 0 1 0 55.881143H321.974857a27.940571 27.940571 0 0 1 0-55.881143h165.522286zM321.974857 716.8a27.940571 27.940571 0 0 1 0-55.881143h386.194286a27.940571 27.940571 0 0 1 0 55.881143h-386.194286z m0-167.570286a27.940571 27.940571 0 0 1 0-55.881143h386.194286a27.940571 27.940571 0 0 1 0 55.881143h-386.194286z" fill="#47ABFF" p-id="6017"></path><path d="M956.489143 228.717714H787.017143a57.051429 57.051429 0 0 1-56.539429-57.197714V0l226.011429 228.717714z" fill="#CBE4FF" p-id="6018"></path></svg>

    const { DirectoryTree } = Tree
    // 定义树
    const TreeData = [
        {
            title:'文件夹1',
            key:'0-0',
            showLine:true,
            icon: ({ selected }) => (selected ?FileViewIcon:FileViewOpenIcon),
            children:[
                {
                    title:'leaf 0-0',
                    key:'0-0-0',
                    icon: FileIcon,
                    isLeaf:true //是否收起
                },
                {
                    title:'leaf 0-1',
                    key:'0-0-1',
                    icon: FileIcon,
                    isLeaf:true,
                },
            ]
        },
        {
            title: '文件夹 2',
            key: '0-1',
            showLine:true,
            icon: ({ selected }) => (selected ?FileViewIcon:FileViewOpenIcon),
            children: [
              {
                title: 'leaf 1-0',
                key: '0-1-0',
                showLine:true,
                icon: FileIcon,
                isLeaf: true,
              },
              {
                title: 'leaf 1-1',
                key: '0-1-1',
                showLine:true,
                icon: FileIcon,
                isLeaf: true,
              },
            ],
          },
    ]
    const onSelect = (keys,info) =>{
        console.log('Trigger Select',keys,info)
    };
    const onExpand = () =>{
        console.log('Trigger Expand');
    }
    return (
        <DirectoryTree
            multiple
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={TreeData}
        />
    )

}