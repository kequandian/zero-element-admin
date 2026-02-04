import { createModel } from 'zero-element/lib/Model';
import { query } from 'zero-element/lib/utils/request';
import { getToken } from 'zero-element/lib/utils/request/token';

interface Permission {
  identifier: string;
  perms?: Permission[];
}

interface GlobalState {
  permissions: Record<string, boolean> | null;
  requestCount: number;
}

interface GlobalEffects {
  setPerm(perm: Permission[]): void;
  clearPerm(): void;
  setRequestCount(value: number): void;
  getRequestCount(): number;
  queryPerm(): Promise<void>;
  getPerm(): Record<string, boolean>;
}

// Create a model context type that combines state and effects for 'this' in effects
type ModelContext = GlobalState & GlobalEffects;

const sleep = (ms: number): Promise<void> => new Promise(res => setTimeout(() => res(), ms));

createModel<GlobalState, GlobalEffects>({
  namespace: 'global',
  state: {
    permissions: null,
    requestCount: 0
  },
  effects: {
    setPerm(perm) {
      (this as ModelContext).permissions = formatPerms(perm);
    },
    clearPerm() {
      (this as ModelContext).permissions = {};
    },
    setRequestCount(value: number) {
      (this as ModelContext).requestCount = value;
    },
    getRequestCount(): number {
      return (this as ModelContext).requestCount;
    },
    async queryPerm() {
      if (getToken()) {
        if (process.env.NODE_ENV === 'development' && this.getRequestCount() >= 3) {
          return;
        } else if (process.env.NODE_ENV === 'production' && this.getRequestCount() >= 3) {
          return;
        }
        if (!(this as ModelContext).permissions || Array.isArray((this as ModelContext).permissions)) {
          query('/api/adm/users/self/permissions')
            .then(response => {
              if (response.status === 200) {
                const { perms } = response.data.data;
                this.setRequestCount(this.getRequestCount() + 1);
                this.setPerm(perms);
              }
            })
            .catch(() => {
              this.setRequestCount(this.getRequestCount() + 1);
              return sleep(5000).then(() => {
                this.clearPerm();
              });
            });
        }
      } else {
        sleep(5000).then(() => {
          this.clearPerm();
        });
      }
    },
    getPerm(): Record<string, boolean> {
      if (!(this as ModelContext).permissions || Array.isArray((this as ModelContext).permissions)) {
        return {};
      }
      return (this as ModelContext).permissions as Record<string, boolean>;
    }
  },
  useDefault: false,
});

function formatPerms(perms: Permission[]): Record<string, boolean> {
  const permsObj: Record<string, boolean> = {};

  if (!Array.isArray(perms)) {
    console.warn('非预期的权限数据格式: ', perms);
  } else {
    const permsFlat = arrayFlat(perms);
    permsFlat.forEach(perm => {
      permsObj[perm.identifier] = true;
    });
  }
  return permsObj;
}

function arrayFlat(arr: Permission[]): Permission[] {
  const stack = [...arr];
  const rst: Permission[] = [];

  while (stack.length) {
    const item = stack.shift()!;
    if (Array.isArray(item.perms)) {
      stack.push(...item.perms);
    }
    rst.push(item);
  }

  return rst;
}
