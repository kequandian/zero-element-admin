export default function () {  
    var date = new Date(1398250549490);
    const Y = date.getFullYear() + '-'; 
    const M = (date.getMonth()+1 > 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'; 
    const D = date.getDate(); 
    const h = date.getHours(); 
    const m = date.getMinutes(); 
    const s = date.getSeconds();
    return <h1>
        {M}月
    </h1>
}