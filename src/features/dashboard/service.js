import { post, get, put, del } from "../../utils/httpService";

const SERVICE_URLS = {
  getTasks: () => `/task`,
  updateProfileDesc: () => `/jobseeker/profile/description`,
  updateTask: (id) => `/task/edit/${id}`,
  getTask: (id) => `/task/${id}`,
  deleteTasks: () => `/task`,
  createTask: () => `/task/create`,
  getCounter: () => `/dashboard/counter`,
  getTeamMembers: () => `/dashboard/employer-profile`,
  getCompanyRole: () => `/company-role`,
  updateRole: (id, query) =>
    `/dashboard/updaterole/${id}?companyRoleId=${query}`,
  addTeamMember: () => `/dashboard/invite-new-user`,
  deleteTeamMember: (id) => `/dashboard/updaterole/${id}`,
  getNewProfiles: () => `/dashboard/new-profile?page=1&limit=100`,
  getJobTitle: () => `/jobtitle?page=1&limit=100&title=`,
  getQualification: () => `/qualification`,
  getFamilyStatus: () => `/family-status`,
  getTeamNotes: (id) => `/note/${id}`,
  getNoteTags: () => `/tag`,
  addTeamNote: () => `/note/create`,
  deleteTeamNote: (id) => `/note/${id}`,
  updateTeamNote: (id) => `note/edit/${id}`,
  filterTeamNote: (id, query) => `/note/tag/${id}?jobseekerId=${query}`,
  getBranches: () => `/dashboard/branches?page=1&limit=5`,
  completeTask: () => `/task/complete/id`,
  addConnectByEmployer: () => `connect/by-employer`,
  getConnects: () => `connect/getConnectsMyCompany`,
};

export const getTasks = () => get(SERVICE_URLS.getTasks());
export const getConnects = () => get(SERVICE_URLS.getConnects());

export const getTask = (id) => {
  return get(SERVICE_URLS.getTask(id));
};

export const editTask = (id, body) => {
  return put(SERVICE_URLS.updateTask(id), body);
};

export const deleteTasks = (body) => {
  return del(SERVICE_URLS.deleteTasks(), body);
};

export const addConnectByEmployer = (body) => {
  return post(SERVICE_URLS.addConnectByEmployer(), body);
};

export const createTask = (body) => {
  return post(SERVICE_URLS.createTask(), body);
};

export const getCounter = () => get(SERVICE_URLS.getCounter());

export const getTeamMembers = () => get(SERVICE_URLS.getTeamMembers());

export const getCompanyRole = () => get(SERVICE_URLS.getCompanyRole());

export const updateRole = (id, query) =>
  put(SERVICE_URLS.updateRole(id, query));

export const addTeamMember = (body) => post(SERVICE_URLS.addTeamMember(), body);

export const getNewProfiles = () => get(SERVICE_URLS.getNewProfiles());

export const getJobTitle = () => get(SERVICE_URLS.getJobTitle());

export const getQualification = () => get(SERVICE_URLS.getQualification());

export const getFamilyStatus = () => get(SERVICE_URLS.getFamilyStatus());

export const getTeamNotes = (id) => get(SERVICE_URLS.getTeamNotes(id));

export const getNoteTags = () => get(SERVICE_URLS.getNoteTags());

export const addTeamNote = (body) => post(SERVICE_URLS.addTeamNote(), body);

export const updateTeamNote = (id, body) =>
  put(SERVICE_URLS.updateTeamNote(id), body);

export const filterTeamNote = (id, query) =>
  get(SERVICE_URLS.filterTeamNote(id, query));

export const getBranches = () => get(SERVICE_URLS.getBranches());

export const deleteNote = (id) => del(SERVICE_URLS.deleteTeamNote(id));

export const deleteTeamMember = (id) => del(SERVICE_URLS.deleteTeamMember(id));

export const completeTask = (body) => put(SERVICE_URLS.completeTask(), body);
