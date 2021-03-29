import React, { useState, useEffect } from 'react';
import { PageHeader } from 'antd';
import SchemaGeneratorPage from '../SchemaGeneratorPage';

import promiseAjax from '@/utils/promiseAjax';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';

export default (props) => {

    let apiUrl = '/api/ali/byTableJSON';
    const [activityId, setActivityId] = useState('');
    const [data, setData ] = useState('');

    useEffect(() => {
        const searchList = location.search.split('=');
        const id = searchList[1];
        if (id) {
            apiUrl = `${getEndpoint()}${apiUrl}/${id}`;
            setActivityId(id);
            handleRequest(apiUrl);
        }

    }, []);

    function handleRequest() {
        promiseAjax(apiUrl, {}, {})
            .then(resp => {
                if (resp && resp.code === 200) {
                    setData(resp.data)
                } else {
                    console.warn('获取数据失败 = ', resp.message);
                }
            })
    }

    const config = {
        subData: {
            ...data,
            API: { updateAPI: `${apiUrl}/(id)` },
            custActivityId: activityId
        }
    }

    return <PageHeader
        title="设计表单"
        ghost={false}
        onBack={() => window.history.back()}
    >
        <SchemaGeneratorPage {...config} />
    </PageHeader>
}
