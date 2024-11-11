import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConsistentData } from "../../utils/helper";

import {
  getTasks as getTasksAPI,
  editTask as editTaskAPI,
  deleteTasks as deleteTasksAPI,
  createTask as createTaskAPI,
  getTask as getTaskAPI,
  getConnects as getConnectsAPI,
  getCounter as getCounterAPI,
  getTeamMembers as getTeamMembersAPI,
  getCompanyRole as getCompanyRoleAPI,
  updateRole as updateRoleAPI,
  addTeamMember as addTeamMemberAPI,
  getNewProfiles as getNewProfilesAPI,
  getJobTitle as getJobTitleAPI,
  getQualification as getQualificationAPI,
  getFamilyStatus as getFamilyStatusAPI,
  getTeamNotes as getTeamNotesAPI,
  getNoteTags as getNoteTagsAPI,
  addTeamNote as addTeamNoteAPI,
  updateTeamNote as updateTeamNoteAPI,
  filterTeamNote as filterTeamNoteAPI,
  getBranches as getBranchesAPI,
  deleteNote as deleteNoteAPI,
  deleteTeamMember as deleteTeamMemberAPI,
  completeTask as completeTaskAPI,
  addConnectByEmployer as addConnectByEmployerAPI,
} from "./service";

export const getTasks = createAsyncThunk("tasks/get", async () => {
  const response = await getTasksAPI();
  return response.data;
});

export const getConnects = createAsyncThunk("connects/get", async () => {
  const response = await getConnectsAPI();
  return response.data;
});
export const getTask = createAsyncThunk("task-detail/get", async (id) => {
  const response = await getTaskAPI(id);
  return response.data;
});
export const editTask = createAsyncThunk("task/edit", async ({ id, task }) => {
  const response = await editTaskAPI(id, task);
  return response.data;
});
export const deleteTasks = createAsyncThunk(
  "task/delete",
  async ({ payload }) => {
    const response = await deleteTasksAPI(payload);
    return response.data;
  }
);

export const createTask = createAsyncThunk(
  "task/create",
  async ({ payload }) => {
    const response = await createTaskAPI(payload);
    return response.data;
  }
);
export const addConnectByEmployer = createAsyncThunk(
  "connect/by-employer",
  async ({ body }) => {
    console.log("thunk called");
    const response = await addConnectByEmployerAPI(body);
    console.log(response.data);
    return response.data;
  }
);

export const getCounter = createAsyncThunk("counter/get", async () => {
  const response = await getCounterAPI();
  return response.data;
});

export const getTeamMembers = createAsyncThunk("team-members/get", async () => {
  const response = await getTeamMembersAPI();
  return response.data;
});

export const getCompanyRole = createAsyncThunk("company-role/get", async () => {
  const response = await getCompanyRoleAPI();
  return response.data;
});

export const updateRole = createAsyncThunk(
  "update-role/get",
  async ({ userId, roleId }) => {
    const response = await updateRoleAPI(userId, roleId);
    return response.data;
  }
);
export const deleteTeamMember = createAsyncThunk(
  "delete-team-member/del",
  async (id) => {
    const response = await deleteTeamMemberAPI(id);
    return response.data;
  }
);

export const addTeamMember = createAsyncThunk(
  "add-team-member/post",
  async ({ payload }) => {
    const response = await addTeamMemberAPI(payload);
    return response.data;
  }
);

export const getNewProfiles = createAsyncThunk("new-profiles/get", async () => {
  const response = await getNewProfilesAPI();
  return response.data;
});

export const getJobTitle = createAsyncThunk(
  "dashboard/get-jobtitle",
  async () => {
    const response = await getJobTitleAPI();
    return response.data;
  }
);

export const getQualification = createAsyncThunk(
  "dashboard/get-qualification",
  async () => {
    const response = await getQualificationAPI();
    return response.data;
  }
);

export const getFamilyStatus = createAsyncThunk(
  "dashboard/get-family-status",
  async () => {
    const response = await getFamilyStatusAPI();
    return response.data;
  }
);
export const getTeamNotes = createAsyncThunk(
  "dashboard/get-team-notes",
  async (id) => {
    const response = await getTeamNotesAPI(id);
    return response.data;
  }
);
export const getNoteTags = createAsyncThunk(
  "dashboard/get-note-tags",
  async (id) => {
    const response = await getNoteTagsAPI();
    return response.data;
  }
);

export const addTeamNote = createAsyncThunk(
  "dashboard/add-team-note-post",
  async ({ payload }) => {
    const response = await addTeamNoteAPI(payload);
    return response.data;
  }
);

export const updateTeamNote = createAsyncThunk(
  "dashboard/team-note-put",
  async ({ id, body }) => {
    const response = await updateTeamNoteAPI(id, body);
    return response.data;
  }
);
export const filterTeamNote = createAsyncThunk(
  "dashboard/get-filtered-team-notes",
  async ({ id, jobseekerId }) => {
    const response = await filterTeamNoteAPI(id, jobseekerId);
    return response.data;
  }
);

export const getBranches = createAsyncThunk(
  "dashboard/branches-get",
  async () => {
    const response = await getBranchesAPI();
    return getConsistentData(response);
  }
);

export const deleteNote = createAsyncThunk(
  "dashboard/team-note-delete",
  async (id) => {
    const response = await deleteNoteAPI(id);
    return response.data;
  }
);
export const completeTask = createAsyncThunk(
  "dashboard/complete-task",
  async ({ body }) => {
    const response = await completeTaskAPI(body);
    return response.data;
  }
);
