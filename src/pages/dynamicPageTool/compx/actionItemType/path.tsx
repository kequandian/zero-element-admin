import React from 'react';
import { Button } from 'antd';
// Remove umi history import
// import { history, withRouter } from 'umi';

// Define types for location query params
interface LocationQuery {
  [key: string]: string;
}

interface LocationType {
  query: LocationQuery;
}

interface QueryType {
  [key: string]: string;
}

interface OptionsType {
  path: string;
  query?: QueryType;
}

interface ActionOnPathProps {
  title: string | React.ReactNode;
  options: OptionsType;
  className?: string;
  location: LocationType;
}

function ActionOnPath(props: ActionOnPathProps): React.ReactElement {
  const { title, options, className, location } = props;
  const { query = {} } = options;

  function handleClick(): void {
    const data: Record<string, string> = {};
    Object.keys(query).forEach(toKey => {
      const formKey = query[toKey];
      data[toKey] = location.query[formKey] || formKey;
    });

    // Remove umi history.push call
    // history.push({
    //   pathname: options.path,
    //   query: data,
    // });

    // Alternative: Use window.location or React Router if available
    if (options.path) {
      const queryString = new URLSearchParams(data).toString();
      const url = queryString ? `${options.path}?${queryString}` : options.path;
      window.location.href = url;
    }
  }

  return <>
    <Button onClick={handleClick} className={className}>
      {title}
    </Button>
  </>
}

// Remove withRouter HOC as it's umi-specific
// export default withRouter(ActionOnPath);
export default ActionOnPath;
