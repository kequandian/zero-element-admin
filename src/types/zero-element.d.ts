declare module 'zero-element' {
  import { ComponentType } from 'react';

  interface ZEleConfig {
    layout?: string;
    title?: string;
    items: Array<{
      component: string;
      config: any;
    }>;
  }

  interface ZEleProps {
    namespace: string;
    config: ZEleConfig;
  }

  const ZEle: ComponentType<ZEleProps>;
  export default ZEle;
}

declare module 'zero-element/lib/Model' {
  export function getModel(namespace: string): {
    getPerm(): Record<string, boolean>;
    setPerm(perm: any[]): void;
    queryPerm(): Promise<void>;
  };
}

declare module 'zero-element/lib/config/global' {
  export function set(config: {
    router?: (path: string) => void;
    goBack?: () => void;
    Unauthorized?: (data: any) => void;
    getPerm?: () => Record<string, boolean>;
    RequestError?: (props: { data?: any }) => void;
  }): void;
}

declare module 'zero-element/lib/config/APIConfig' {
  export function set(config: Record<string, string>): void;
}

declare module 'zero-element/lib/utils/request' {
  export function query(url: string, options?: any): Promise<any>;
}

declare module 'zero-element/lib/utils/request/endpoint' {
  export function get(): string;
  export function set(endpoint: string): void;
}

declare module 'zero-element/lib/utils/request/token' {
  export function saveToken(token: any): void;
  export function removeToken(): void;
}

declare module 'zero-element/lib/config/layout' {
  export function set(config: Record<string, any>): void;
}

declare module 'zero-element/lib/config/container' {
  export function set(config: Record<string, any>): void;
}

declare module 'zero-element/lib/config/listAction' {
  export function set(config: Record<string, any>): void;
}

declare module 'zero-element/lib/config/formItemType' {
  export function set(config: Record<string, any>): void;
}

declare module 'zero-element/lib/config/actionItemType' {
  export function set(config: Record<string, any>): void;
}

declare module 'zero-element/lib/config/valueType' {
  export function set(config: Record<string, any>): void;
}

declare module 'zero-element-antd' {
  export function init(): void;
}
