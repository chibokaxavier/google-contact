import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { contactService } from "../services/contacts.service";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PrintIcon from "@mui/icons-material/Print";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import Input from "@mui/material/Input";

const style = {
  position: "absolute",
  top: "60%",
  left: "80%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 0,
  height: 0,
  boxShadow: 24,
  pt: 0,
  px: 0,
  pb: 0,
};

export function Contacts() {
  const [activeContact, setActiveContact] = useState({});
  const allContacts = useSelector((state) => state.contacts.value);
  const uid = useSelector((state) => state.authentication.user.uid);
  const [isHovering, setIsHovering] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [CreateLabelopen, setCreateLabelOpen] = React.useState(false);
  const user = useSelector((state) => state.authentication.user);
  const LabelUser = useSelector((state) => state.labelList.value);
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();
  const [trashContact, setTrashContact] = useState([]);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleCreateLabelOpen = (contact) => {
    setActiveContact(contact)
    setCreateLabelOpen(true);
  };
  const handleCreateLabelClose = () => {
    setCreateLabelOpen(false);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  useEffect(() => {
    setContacts(allContacts);
  }, [allContacts]);
  const deleteContact = async (contact) => {
    await contactService.delContact(uid,contact );
    setContacts(contacts.filter((c) => c.id !== contact.id));
    console.log("i received the click");
    dispatch(setMessage("Contact Deleted Sucessfully"));
    dispatch(getTrashContacts(user.uid));
  };
  const [selectedLabels, setSelectedLabels] = useState([]);
  const manageLabels = (id) => {
    let label_exists = selectedLabels.includes(id);
    if (label_exists) {
      // del label
      setSelectedLabels(selectedLabels.filter((x) => x != id));
      return;
    }
    setSelectedLabels([...selectedLabels, id]);
  };
  const handleCheckBox = () => {};

  return (
    <>
      <div className="text-sm bg-white pl-5">
        <div className=" ">
          <div className="grid grid-cols-5  border-b border-b-gray-600/50">
            <div className="py-3 font-normal">Name</div>
            <div className="py-3 font-normal pl-3">Email</div>
            <div className="py-3 font-normal pl-3">Phone Number</div>
            <div className="py-3 font-normal pl-3">Job title & Company</div>
          </div>

          <div className="">
            <div className="text-[11px] mt-5 mb-3">
              <span className="text-[11px]">CONTACTS</span>
              <span className="ml-3">{contacts.length}</span>
            </div>

            {contacts.map((item) => {
              const { id } = item;
              return (
                <div
                  key={item.id}
                  className="py-3 gap-6  grid grid-cols-5 hover:bg-gray-200   relative"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <div className="flex gap-2">
                    {isHovering && (
                      <div className="z-10">
                        {" "}
                        <input type="checkbox" className="h-5 w-5"></input>
                      </div>
                    )}

                    {/* <img src={contact.image} className="w-10 h-10 rounded-full" /> */}
                    <div className="hover:bg-blue-500 flex">
                      <div></div>
                      {item.firstName} {item.lastName}
                    </div>
                  </div>
                  <div></div>
                  <div className="">{item.phone}</div>
                  <div>{item.company}</div>
                  {isHovering && (
                    <div className="z-10 flex ">
                      <div className="mx-2 cursor-pointer">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className="NSy2Hd cdByRd RTiFqe P5kiYb opacity-50 hover:opacity-100"
                        >
                          <path fill="none" d="M0 0h24v24H0V0z"></path>
                          <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
                        </svg>
                      </div>
                      <div className="mx-2 cursor-pointer">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className="NSy2Hd cdByRd RTiFqe P5kiYb opacity-50 hover:opacity-100"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none"></path>
                          <path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L3 16.82V21h4.18L20.41 7.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path>
                        </svg>
                      </div>
                      <div
                        className="mx-2 cursor-pointer"
                        onClick={()=>handleCreateLabelOpen(item)}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          className="NSy2Hd cdByRd RTiFqe P5kiYb opacity-50 hover:opacity-100"
                        >
                          <path fill="none" d="M0 0h24v24H0V0z"></path>
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                        </svg>
                      </div>
                    </div>
                  )}

                  <NavLink
                    className="absolute w-full h-full left-0 top-0 z-1"
                    to={`/contacts/${item.id}`}
                  ></NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        open={CreateLabelopen}
        onClose={handleCreateLabelClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 250, height: 450, pt: 2 }}>
          <h2 id="parent-modal-title"></h2>

          <p
            id="parent-modal-description"
            className="pl-5"
            //
          ></p>
          <div className="ml-5 ">
            <div className="flex cursor-pointer ">
              {" "}
              <PrintIcon className="opacity-50 mr-3" />
              <span>Print</span>
            </div>
            <div className="flex cursor-pointer pt-5">
              {" "}
              <CloudDownloadOutlinedIcon className="opacity-50 mr-3" />
              <span>Export</span>
            </div>

            <div className="flex cursor-pointer pt-5">
              {" "}
              <ArchiveOutlinedIcon className="opacity-50 mr-3" />
              <span>Hide From Contacts</span>
            </div>
                <div
                  className="flex cursor-pointer pt-5 pb-5 "
                  onClick={() => deleteContact(activeContact)}
                >
                  <DeleteOutlineIcon className="opacity-50 mr-3" />
                  <span>Delete</span>
                </div>
            <hr className="mr-4" />
            <p className="my-4 ">Change Labels</p>
            <div>
              {LabelUser.map((item) => {
                const { name, id } = item;
                return (
                  <div key={id}>
                    <div className=" mb-4 flex cursor-pointer " key={id}>
                      <div className="flex" onClick={() => manageLabels(id)}>
                        <div>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            className="ml- opacity-70"
                          >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
                          </svg>
                        </div>
                        <div className="ml-7">{name}</div>
                        {selectedLabels.includes(id) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 stroke-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
