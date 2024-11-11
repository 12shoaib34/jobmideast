import { get, post, put,del } from "../../utils/httpService";

const SERVICE_URLS = {
  getConversation: (qs) => `/conversation/search-conversation${qs}`,
  postStartConversation: () => `/conversation`,
  deleteConversation: (id) => `/conversation/delet_conversation/${id}`,
  deleteConversationFiles: (id) => `/chat/delete_conversation_file/${id}`,
  getSentFiles: () => `/chat/sentFiles`,
  getReceivedFiles: () => `/chat/receivedFiles`,
  postMeeting: () => `/meetings`,
  getAppliedJobs: (id) => `/user/all-job/${id}`,
  getInterviewPanel: () => `/user/company-user`,
  getJobseekerRole: () => `/role/for-jobseeker`,
};

export const getConversation = (qs) => get(SERVICE_URLS.getConversation(qs));

export const postStartConversation = (body) =>
  post(SERVICE_URLS.postStartConversation(), body);

export const deleteConversation = (id) =>
  put(SERVICE_URLS.deleteConversation(id));

export const deleteConversationFiles = (id) => 
 del(SERVICE_URLS.deleteConversationFiles(id))

export const getSentFiles = (body) => post(SERVICE_URLS.getSentFiles(), body);
export const getRecievedFiles = (body) => post(SERVICE_URLS.getReceivedFiles(), body);

export const postMeeting = (body) => post(SERVICE_URLS.postMeeting(), body);

export const getAppliedJobs = (id) => get(SERVICE_URLS.getAppliedJobs(id));

export const getInterviewPanel = () => get(SERVICE_URLS.getInterviewPanel());

export const getJobseekerRole = () => get(SERVICE_URLS.getJobseekerRole());
