/**
 * 返回url的参数字典
 * @returns URL 查询参数对象
 */
interface QueryParams {
  [key: string]: string;
}

export default function useQuery(): QueryParams {
  const params = new URLSearchParams(window.location.search);
  const result: QueryParams = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}
