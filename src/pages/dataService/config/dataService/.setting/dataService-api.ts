interface APISettings {
  pageName: string;
  listAPI: string;
  deleteAPI: string;
  getAPI: string;
  createAPI: string;
  updateAPI: string;
}

const apiSettings: APISettings = {
  pageName: "",
  listAPI: "/api/cfg/data/services",
  deleteAPI: "/api/cfg/data/services/(id)",
  getAPI: "/api/cfg/data/services/[id]",
  createAPI: "/api/cfg/data/services",
  updateAPI: "/api/cfg/data/services/(id)"
};

export default apiSettings;
