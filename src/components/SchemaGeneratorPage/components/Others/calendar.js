
import { Calendar } from 'antd';

export default function (){

    return (       
    <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4, }}>
        <Calendar fullscreen={false} onPanelChange={(value, mode)=>console.log(value, mode)} />
    </div>
    )
}