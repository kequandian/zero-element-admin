declare module 'zero-element' {
  import { ComponentType } from 'react';

  interface ZEleConfigItem {
    component: string;
    config?: any;
  }

  interface ZEleConfig {
    layout?: string;
    title?: string;
    items: ZEleConfigItem[];
  }

  interface ZEleProps {
    namespace: string;
    config: ZEleConfig;
  }

  const ZEle: ComponentType<ZEleProps>;
  export default ZEle;
}

declare module 'zero-element/lib/Model' {
  export interface Model<S = any, E = any> {
    namespace: string;
    state: S;
    effects: E;
  }

  // Helper type to represent 'this' context in effects (state + effects combined)
  export type ModelContext<S, E> = S & E;

  export function createModel<S = any, E = any>(
    options: {
      namespace: string;
      state?: S;
      effects?: E;
      auto?: boolean;
      recyclable?: boolean;
      useDefault?: boolean;
    }
  ): Model<S, E>;

  export function getModel<S = any, E = any>(namespace: string): Model<S, E> & {
    getPerm(): Record<string, boolean>;
    setPerm(perm: any[]): void;
    queryPerm(): Promise<void>;
    permissions?: Record<string, boolean>;
    requestCount?: number;
    setRequestCount(value: number): void;
    getRequestCount(): number;
  };

  export function useModel<S = any, E = any>(namespace: string): Model<S, E>;
}

declare module 'zero-element/lib/config/global' {
  export function set(config: {
    router?: (path: string) => void;
    goBack?: () => void;
    Unauthorized?: (data: any) => void;
    getPerm?: () => Record<string, boolean>;
    RequestError?: (props: { data?: any }) => void;
  }): void;

  export const goBack: () => void;
}

declare module 'zero-element/lib/config/APIConfig' {
  export function set(config: Record<string, string>): void;
}

declare module 'zero-element/lib/utils/request' {
  export function query(url: string, data?: any, options?: any): Promise<any>;
  export function post(url: string, data?: any, options?: any): Promise<any>;
  export function update(url: string, data?: any, options?: any): Promise<any>;
  export function remove(url: string, data?: any, options?: any): Promise<any>;
}

declare module 'zero-element/lib/utils/request/endpoint' {
  export function get(): string;
  export function set(endpoint: string): void;
}

declare module 'zero-element/lib/utils/request/token' {
  export function saveToken(token: any): void;
  export function removeToken(): void;
  export function getToken(): string | undefined;
  export function getAccount(): string | undefined;
  export function getUserId(): string | undefined;
  export function setAvatar(avatar: string): void;
  export function getAvatar(): string | undefined;
  export function setUserName(userName: string): void;
  export function getUserName(): string | undefined;
  export function getExtra(): any;
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

declare module 'zero-antd-dep/*' {
  const value: any;
  export default value;
}

declare module 'zero-antd-dep/layout/*' {
  const value: any;
  export default value;
}

declare module 'zero-antd-dep/container/*' {
  const value: any;
  export default value;
}

declare module 'zero-antd-dep/config/*' {
  const value: any;
  export default value;
}

declare module 'zero-antd-dep/formItemType/*' {
  const value: any;
  export default value;
}

declare module 'zero-antd-dep/actionItemType/*' {
  const value: any;
  export default value;
}

declare module 'zero-antd-dep/valueType/*' {
  const value: any;
  export default value;
}

declare module 'zero-element/lib/utils/window' {
  const value: any;
  export default value;
}

declare module 'zero-element/lib/utils/hooks/lifeCycle' {
  export function useDidMount(cb: any): void;
  export function useForceUpdate(): any;
  export function useWillUnmount(cb: any): void;
}

declare module 'zero-element/lib/helper/form/useBaseForm' {
  export function useBaseForm(options: any): any;
  export default function useBaseForm(options: any): any;
}

declare module 'zero-element-antd/lib/container/Form/utils/useFormHandle' {
  export function useFormHandle(options: any): any;
  export default function useFormHandle(options: any): any;
}

declare module 'umi' {
  export interface history {
    push(path: string): void;
    goBack(): void;
  }
  const history: history;
}

declare module '*.less' {
  const content: any;
  export default content;
}

declare module '*.css' {
  const content: any;
  export default content;
}
