export const ROUTE_LIST = () => "/";

export const ROUTE_DETAILS = (id?: string) => `/show/${id || ":id"}`;
