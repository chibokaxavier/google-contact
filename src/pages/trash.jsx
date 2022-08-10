import React from "react";
import { contactService } from "../services/contacts.service";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { clearTrash } from "../store/slices/contacts.slice";

export function Trash() {
  let trashContacts = useSelector((state) => state.contacts.trash);
  let user = useSelector((state) => state.authentication.user);
  const d = new Date();
  const dispatch = useDispatch();

  const emptyTrash = async () => {
    await contactService.clearTrash(user.uid, trashContacts);
    dispatch(clearTrash());
  }; 
  return (
    <>
      <div className="w-[99%] h-[55px] bg-gray-100 pl-0 rounded-lg flex justify-center text-sm">
        {" "}
        <p className="mt-5 mr-9">
          Contacts that have been in Trash more than 30 days will be deleted
          forever
        </p>
        <button
          onClick={async () => {
            await emptyTrash();
          }}
          className="mt-[14px] text-blue-500 hover:bg-gray-200 rounded px-4 h-9 "
        >
          Empty Trash Now
        </button>
      </div>
      <div className="text-sm bg-white pl-5">
        <div className=" ">
          <div className="grid grid-cols-3  border-b border-b-gray-600/50">
            <div className="py-3 font-normal">Name</div>
            <div className="py-3 font-normal pl-3">Why in Trash?</div>
            <div className="py-3 font-normal pl-3">Date Deleted</div>
          </div>

          <div className="">
            <div className="text-[11px] mt-5 mb-3">
              <span className="text-[11px]">TRASH</span> ({trashContacts.length}
              )
            </div>

            {trashContacts.map((contact) => (
              <div
                key={contact.id}
                className="py-3 gap-6  grid grid-cols-3 hover:bg-gray-200  relative"
              >
                <div className="flex gap-2">
                  <div className="">{contact.firstName}</div>
                </div>
                <div>
                  <p>Deleted on Ios Device</p>
                </div>
                <div className="">jul 24</div>
                <NavLink
                  className="absolute w-full h-full left-0 top-0 z-1"
                  to={`/Trash/${contact.id}`}
                ></NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
