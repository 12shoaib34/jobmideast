import React, { useState } from 'react';
import moment from "moment";
import {
  selectEmployerProfile,
  selectIsMainAdmin
} from "../../features/auth/slice";
import { useAppSelector } from "../../store/hooks";
import { HiOutlineChevronRight } from "react-icons/hi";
import { createMarkup } from "../../utils/helper";


const ProfileNotes = ({ note, i, getTeamNoteForEditFunction, showConfirm }) => {
  const employerProfile = useAppSelector(selectEmployerProfile);
  const isMainAdmin = useAppSelector(selectIsMainAdmin);
  const [accordion, setAccordion] = useState(false);
  return (
    <>
      <div key={i} className="connection">
        <div className="connection-details">
          <div className="connection-image">
            <img
              src={note?.user?.employerProfiles?.profilePhoto}
              alt=""
            />
          </div>
          <span className="pl-3">
            <span>
              <h1 className="connectons-name">
                {note?.user?.firstName}
              </h1>
              <p className="connections-job-title">
                {note?.user?.employerProfiles?.jobTitle?.title}
              </p>
              <p className="date">
                {moment(note?.updatedAt).format("DD/MM/YYYY")}
              </p>
            </span>
            <span className="edit-delete">
              {note?.userId === employerProfile?.userId && (
                <span
                  className="cursor-pointer"
                  onClick={() => getTeamNoteForEditFunction(note.id)}
                >
                  Edit
                </span>
              )}
              {(note?.userId === employerProfile?.userId ||
                isMainAdmin) && (
                  <span
                    className="cursor-pointer delete"
                    onClick={() => showConfirm(note.id)}
                  >
                    Delete
                  </span>
                )}
            </span>
          </span>
        </div>
        <div
          onClick={() => setAccordion(!accordion)}
          className={`tab-accordions-close ${accordion ? "tab-accordions-open" : null
            }`}
        >
          <HiOutlineChevronRight
            className={`right-icon-close ${accordion ? "right-icon-open" : null
              }`}
          />
          <p
            style={{
              wordBreak: "break-word",
              wordWrap: "break-word",
            }}
            dangerouslySetInnerHTML={createMarkup(note?.comment)}
            className={`tex-content-hide ${accordion ? "tex-content-show" : null
              }`}
          ></p>
        </div>
      </div>
    </>
  )
}

export default ProfileNotes