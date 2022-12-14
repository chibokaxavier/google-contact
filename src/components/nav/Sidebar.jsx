import React, { useContext, useEffect, useState, useRef } from "react";
import { fileService } from "../../services/file.service";
import { SidebarContext } from "../../context/Sidebar";
import { contactService } from "../../services/contacts.service";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { authService } from "../../services/auth.service";

import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../../store/slices/counter.slice";
import Input from "@mui/material/Input";
import { labelService } from "../../services/labels.service";
import { addLabel, getLabels, setLabels } from "../../store/slices/label.slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "9px",
  height: 0,
  boxShadow: 24,
  pt: 0,
  px: 0,
  pb: 0,
};
export function Sidebar(props) {
  const contacts = useSelector((state) => state.contacts.value);
  const context = useContext(SidebarContext);
  const [openModal, SetOpenModal] = useState(false);
  const [activeLabel, setActiveLabel] = useState({});
  const [goLeft, setGoLeft] = useState(false);
  const [Importopen, setImportOpen] = React.useState(false);
  const [CreateLabelopen, setCreateLabelOpen] = React.useState(false);
  const [Exportopen, setExportOpen] = React.useState(false);
  const [Printopen, setPrintOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openLabel, setOpenLabel] = useState(false);
  const inputFileRef = useRef();
  const [label, setLabel] = useState("");
  const [delLabels, setDelLabels] = useState([]);
  const labelList = useSelector((state) => state.labelList.value);
  const logged_in = useSelector((state) => state.authentication.logged_in);
  const [editLabel, setEditLabel] = useState(false);
  const [Labelopen, setLabelOpen] = React.useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [appliedLabels, setAppliedLabels] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const uid = useSelector((state) => state.authentication.user.uid);
  const user = useSelector((state) => state.authentication.user);
  const [exportType, setExportType] = useState("all_contacts");
  const [printType, setPrintType] = useState("all_contacts");


  const handleLogout = async () => {
    await authService.logout();
  };
  const handleLabelSubmit = () => {
    const newLabel = { title: label };
    labelService.saveLabel(newLabel, user.uid);
    // dispatch(addLabel(newLabel));
    dispatch(getLabels(user.uid));
    setOpenLabel(false);
    setLabel("");
    handleCreateLabelClose();
  };

  const handleLabel = () => {
    setOpenLabel(!openLabel);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePrintOpen = () => {
    setPrintOpen(true);
  };
  const handlePrintClose = () => {
    setPrintOpen(false);
  };

  const handleImportOpen = () => {
    setImportOpen(true);
  };
  const handleImportClose = () => {
    setImportOpen(false);
  };
  const handleExportOpen = () => {
    setExportOpen(true);
  };
  const handleExportClose = () => {
    setExportOpen(false);
  };

  const handleCreateLabelOpen = () => {
    setCreateLabelOpen(true);
  };
  const handleCreateLabelClose = () => {
    setCreateLabelOpen(false);
  };
  const editLabelOpen = (label) => {
    setActiveLabel(label);
    setEditLabel(true);
  };
  const editLabelClose = () => {
    setEditLabel(false);
  };

  const handleEditLabel = async (label_id, new_name) => {
    await labelService.updateLabel(label_id, new_name, uid);
  };

  const exportChange = (event) => {
    setExportType(event.target.value);
    console.log(event.target.value);
  };
  const printChange = (event) => {
    setPrintType(event.target.value);
    console.log(event.target.value);
  };

  const handleLabelOpen = () => {
    setLabelOpen(true);
  };

  const handleLabelClose = () => {
    setLabelOpen(false);
  };
  const manageLabels = (id) => {
    let label_exists = selectedLabels.includes(id);
    if (label_exists) {
      // del label
      setSelectedLabels(selectedLabels.filter((x) => x != id));
      return;
    }
    setSelectedLabels([...selectedLabels, id]);
  };
  const applyLabels = () => {
    setAppliedLabels(
      selectedLabels.map((x) => labelList.find((label) => label.id == x))
    );
  };
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const deleteLabel = async (id) => {
    await contactService.delLabel(uid, id);
    setDelLabels(labelList.filter((contact) => contact.id !== id));
    console.log("i received the  delete label click");
    // dispatch(setMessage("Contact Deleted Sucessfully"));
  };
  const handleSubmitExport = () => {
    let contact_content;
    handleExportClose();
    switch (exportType) {
      case "all_contacts":
        contact_content = contacts;
        console.log("printing all contacts");
        fileService.exportToCSV(contact_content, "exported-contacts.csv");
        break;
      default:
        contact_content = contacts.filter((person) => {
          let labels = person.labels || [];
          return labels.includes(exportType);
        });
        console.log("printing all contacts with this label");
        fileService.exportToCSV(contact_content, "exported-contacts.csv");
    }
  };
  const handlePrint = () => {
    let contact_content;
    handlePrintClose();
    switch (printType) {
      case "all_contacts":
        contact_content = contacts;
        console.log("printing all contacts");
        fileService.printAsPdf(contact_content);
        break;
      default:
        contact_content = contacts.filter((person) => {
          let labels = person.labels || [];
          return labels.includes(printType);
        });
        console.log("printing all contacts with this label");
        fileService.printAsPdf(contact_content);
    }
  };
  const selectInputFile = () => {
    handleImportClose();
    let file = inputFileRef.current.files[0];
    if (inputFileRef.current.files && inputFileRef.current.files[0]) {
      var csvFile = inputFileRef.current.files[0];
      var reader = new FileReader();
      reader.onload = async function (e) {
        // parse this text to json
        // foreach record, create in firebase
        let json = fileService.exportToJSON(e.target.result);
        await contactService.saveMany(json,uid)
      };
      reader.readAsText(csvFile);
    }
  };

  return (
    <>
      {props.open ? (
        <aside
          className={`font-product_bold transition-all duration-500 come-from-left col-span-1 grid grid-cols-10 w-full md:static left-0 top-0 z-10 md:left-auto md:top-auto md:z-auto md:w-full min-h-screen md:shadow-none max-h-screen ${
            goLeft ? "ml-[-500px]" : "ml-0"
          } `}
          // style={{ height: "calc(100vh - 100%)" }}
        >
          {logged_in ? (
            <div className="min-h-screen">
              <section className="fixed bg-white-400 col-span-7 md:col-span-10 max-h-[90%] p-2 overflow-y-scroll">
                <div className="">
                  {/* <Tooltip title="Add New Contact" placement="bottom"> */}
                  <button
                    className="w-48 h-12 rounded-3xl bg-white text-sm hover:cursor-pointer hover:shadow-2xl shadow-md hover:text-blue-500 relative"
                    id="fade-button"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <div className="pr-2">
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36 "
                        className="absolute left-3 top-1 "
                      >
                        <path fill="#34A853" d="M16 16v14h4V20z"></path>
                        <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
                        <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
                        <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
                        <path fill="none" d="M0 0h36v36H0z"></path>
                      </svg>
                    </div>
                    <div className="pl-8">Create contact</div>
                  </button>
                  <Menu
                    className=""
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <NavLink
                      to="/createcontact"
                      className={({ isActive }) =>
                        `${
                          isActive ? "text-blue-400" : "text-black-400"
                        } transition-all duration-1000`
                      }
                    >
                      <MenuItem onClick={handleClose}>
                        <PermIdentityIcon className="opacity-50 mr-4 p-[1px] mb-1" />
                        <span className="text-sm">Create a Contact</span>
                      </MenuItem>
                    </NavLink>

                    <MenuItem onClick={handleClose}>
                      <SupervisorAccountOutlinedIcon className="opacity-50 mr-4 p-[1px] mb-1" />{" "}
                      <span className="text-sm">Create Multiple Contacts</span>{" "}
                    </MenuItem>
                  </Menu>
                  {/* </Tooltip> */}
                </div>

                <div>
                  <div className="mt-8 ml-6">
                    <div className="pb-4">
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-blue-400" : "text-black-400"
                          } transition-all duration-1000`
                        }
                      >
                        <PermIdentityIcon />
                        <span className="text-sm pl-6   font-normal">
                          Contacts{" "}
                          <span className="pl-16">{contacts.length}</span>
                        </span>
                      </NavLink>
                    </div>
                    <div>
                      <NavLink
                        to="/FreqContacted"
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-blue-400" : "text-black-400"
                          } transition-all duration-1000`
                        }
                      >
                        <HistoryIcon />
                        <span className="text-sm pl-6  ">
                          Frequently Contacted
                        </span>
                      </NavLink>
                    </div>
                    <div className="py-4 cursor-pointer">
                      <NavLink
                        to="/Merge"
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-blue-400" : "text-black-400"
                          } transition-all duration-1000`
                        }
                      >
                        <PermIdentityIcon />
                        <span className="text-sm pl-6  ">Merge & Fix</span>
                      </NavLink>
                    </div>
                  </div>
                  <hr />
                  <div className="mt-3 ml-6">
                    <div className="pb-4 cursor-pointer" onClick={handleLabel}>
                      {openLabel ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />}

                      <span className="text-sm pl-6  ">Labels</span>
                    </div>
                    <div>
                      {labelList.map((item) => {
                        const { name, id } = item;
                        return (
                          <NavLink
                            to={`/labels/${item.id}`}
                            key={id}
                            className={({ isActive }) =>
                              `${
                                isActive
                                  ? "text-blue-400 hover:bg-blue-400"
                                  : "text-black-400 hover:bg-gray-400"
                              } transition-all duration-1000`
                            }
                          >
                            {openLabel ? (
                              <div
                                className=" mb-4 flex cursor-pointer hover:bg-gray-200"
                                key={id}
                                onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}
                              >
                                <div className="flex">
                                  <div>
                                    <svg
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      className="ml-1 opacity-70"
                                    >
                                      <path
                                        fill="none"
                                        d="M0 0h24v24H0V0z"
                                      ></path>
                                      <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
                                    </svg>
                                  </div>

                                  <div className="ml-7">{name} </div>
                                  {isHovering && (
                                    <div>
                                      {labelList.map((label) => {
                                        const { id } = item;
                                        return (
                                          <div className="absolute right-3 z-50">
                                            <EditIcon
                                              className="z-50 opacity-50"
                                              onClick={() =>
                                                editLabelOpen(label)
                                              }
                                            />
                                            <DeleteOutlineIcon
                                              className="z-50"
                                              onClick={() => deleteLabel(id)}
                                            />
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                    {openLabel ? (
                      <div
                        className="pb-4 cursor-pointer"
                        onClick={handleCreateLabelOpen}
                      >
                        <AddIcon />
                        <span className="text-sm pl-6  ">Create Labels</span>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <hr />
                  <div className="mt-3 ml-6">
                    <div
                      className="pb-4 cursor-pointer"
                      onClick={handleImportOpen}
                    >
                      {/* {openModal&& <ImportModal />} */}
                      <PermIdentityIcon />
                      <span className="text-sm pl-6  ">Import</span>
                    </div>

                    <div className="cursor-pointer" onClick={handleExportOpen}>
                      <CloudDownloadOutlinedIcon />
                      <span className="text-sm pl-6  ">Export</span>
                    </div>
                    <div
                      className="py-4 cursor-pointer"
                      onClick={handlePrintOpen}
                    >
                      <PrintIcon />
                      <span className="text-sm pl-6  ">Print</span>
                    </div>
                  </div>
                  <hr />
                  <div className="mt-3 ml-6">
                    <div className="cursor-pointer">
                      <NavLink
                        to="/Other"
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-blue-400" : "text-black-400"
                          } transition-all duration-1000`
                        }
                      >
                        <ArchiveOutlinedIcon />
                        <span className="text-sm pl-6  ">Other Contacts</span>
                      </NavLink>
                    </div>
                    <div className="py-4 cursor-pointer">
                      <NavLink
                        to="/trash"
                        className={({ isActive }) =>
                          `${
                            isActive ? "text-blue-400" : "text-black-400"
                          } transition-all duration-1000`
                        }
                      >
                        <DeleteOutlineIcon />
                        <span className="text-sm pl-6  ">Trash</span>
                      </NavLink>
                    </div>
                  </div>
                </div>

                <button onClick={handleLogout}>
                  <div className="text-red-400">Log out</div>
                </button>
              </section>
              {/* import  modal */}
              <Modal
                open={Importopen}
                onClose={handleImportClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box sx={{ ...style, width: 430, height: 280, pt: 4, pl: 3 }}>
                  <h2 id="parent-modal-title"></h2>
                  <div className="flex">
                    <p
                      id="parent-modal-description"
                      className=" font-semibold text-base"
                    >
                      Import contacts
                    </p>
                    <div
                      onClick={handleLabelOpen}
                      className="flex border-2 ml-8 rounded-[25px] w-[120px] pl-4 h-[32px] pt-[2px] cursor-pointer hover:bg-gray-100"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="opacity-50 mt-[1px]"
                      >
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
                      </svg>
                      <div>
                        {appliedLabels.map((lab) => (
                          <p key={lab.id}>{lab.name}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 text-sm">
                    To import contacts, select a CSV or vCard file.{" "}
                    <a href="#" className="text-blue-500">
                      Learn more
                    </a>
                  </p>
                  <label className="">
                    <div className="mt-6">
                      <Button
                        variant="contained"
                        onClick={() => inputFileRef.current.click()}
                      >
                        Select File
                      </Button>
                    </div>
                    <input
                      type="file"
                      className="mt-5"
                      hidden
                      ref={inputFileRef}
                      onChange={selectInputFile}
                    />
                    {/* {inputFileRef.current.value && inputFileRef.current.value.split(/(\\|\/)/g).pop()} */}
                  </label>
                  <p className="mt-5 text-sm">
                    No CSV or vCard file?{" "}
                    <a href="#" className="text-blue-500">
                      Create Multiple Contacts{" "}
                    </a>{" "}
                    instead.
                  </p>
                  <div className="flex justify-end text-blue-500 mt-4 mr-5">
                    <button
                      onClick={handleImportClose}
                      className=" mr-3 bg-white w-[70px] h-8 rounded  text-sm font-normal hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button className=" mr-4 bg-white w-16 h-8 rounded text-gray-200 text-sm font-normal hover:bg-gray-100">
                      Import
                    </button>
                  </div>
                </Box>
              </Modal>
              {/* edit label modal */}
              <Modal
                open={editLabel}
                onClose={editLabelClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box sx={{ ...style, width: 350, height: 210, pt: 4, pl: 3 }}>
                  <p>Rename Label</p>
                  <Input
                    placeholder={label}
                    className="mt-8  w-[300px]"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                  />
                  <div className="mt-16 pl-[] flex justify-end mr-10">
                    <button
                      onClick={editLabelClose}
                      className="mr-5 hover:bg-gray-100 p-2 rounded-md text-blue-300"
                    >
                      Cancel
                    </button>
                    <div>
                      <button
                        onClick={() => handleEditLabel(activeLabel.id, label)}
                        className="hover:bg-gray-100 p-2 rounded-md text-blue-300"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Box>
              </Modal>
              {/* create Label modal */}
              <Modal
                open={CreateLabelopen}
                onClose={handleCreateLabelClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box sx={{ ...style, width: 380, height: 200, pt: 2 }}>
                  <h2 id="parent-modal-title"></h2>
                  <p id="parent-modal-description" className="pl-5">
                    Create Label
                  </p>
                  <Input
                    placeholder=""
                    className="mt-8 ml-9 w-[300px]"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                  />
                  <div className="flex justify-end text-blue-500 mt-10">
                    <button
                      onClick={handleCreateLabelClose}
                      className=" mr-3 bg-white w-[70px] h-8 rounded  text-sm font-semibold hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLabelSubmit}
                      className=" mr-4 bg-white w-16 h-8 rounded  text-sm font-semibold hover:bg-gray-100"
                    >
                      Save
                    </button>
                  </div>
                </Box>
              </Modal>
              {/* Export modal */}
              <Modal
                open={Exportopen}
                onClose={handleExportClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box sx={{ ...style, width: 400, height: 380, pt: 2 }}>
                  <h2 id="parent-modal-title"></h2>
                  <p
                    id="parent-modal-description"
                    className="pl-5 font-semibold"
                  >
                    Export Contacts
                  </p>

                  <div className="pl-4 ">
                    <div className="pt-10">
                      <div className="flex">
                        <input
                          type="radio"
                          name="radnaame"
                          className="h-5 w-5 opacity-50"
                        />{" "}
                        <p className="pl-5 opacity-50">Selected Contacts (0)</p>
                      </div>
                      <div className="flex ">
                        <input
                          type="radio"
                          name="radnaame"
                          className="h-5 w-5 mt-2"
                        />{" "}
                        <div className="text-sm">
                          <FormControl
                            variant="standard"
                            sx={{ ml: 3, minWidth: 120 }}
                          >
                            <Select
                              // labelId="demo-simple-select-standard-label"
                              // id="demo-simple-select-standard"
                              value={exportType}
                              onChange={exportChange}
                              label="Age"
                            >
                              <MenuItem value={"all_contacts"}>
                                Contacts ({contacts.length})
                              </MenuItem>

                              <hr />
                              <p className="opacity-50 pl-5 pt-5">Labels</p>

                              {labelList.map((onelabel) => {
                                const { id, name } = onelabel;
                                return (
                                  <MenuItem value={onelabel.id}>
                                    <div>{name}</div>
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                    <div className="pb-8"></div>
                    <p className="text-sm font-semibold pb-7">Export as</p>
                    <div className="flex ">
                      <input type="radio" name="radname" className="h-5 w-5" />{" "}
                      <p className="pl-5">Google CSV</p>
                    </div>
                    <div className="flex">
                      <input type="radio" name="radname" className="h-5 w-5" />{" "}
                      <p className="pl-5">Outlook CSV</p>
                    </div>
                    <div className="flex">
                      <input type="radio" name="radname" className="h-5 w-5" />{" "}
                      <p className="pl-5">vCard (for iOS Contacts)</p>
                    </div>
                  </div>
                  <div className="flex justify-end text-blue-400 mt-10">
                    <button
                      onClick={handleExportClose}
                      className=" mr-3 bg-white w-[70px] h-8 rounded  text-sm font-medium hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitExport}
                      className=" mr-4 bg-white w-16 h-8 rounded  text-sm font-medium hover:bg-gray-100"
                    >
                      Export
                    </button>
                  </div>
                </Box>
              </Modal>
              {/* Print modal */}
              <Modal
                open={Printopen}
                onClose={handlePrintClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box sx={{ ...style, width: 380, height: 230, pt: 2 }}>
                  <h2 id="parent-modal-title"></h2>
                  <p id="parent-modal-description" className="pl-5 pb-7">
                    Print Contacts
                  </p>
                  <div className="pl-5">
                    <div className="flex">
                      <input
                        type="radio"
                        name="radnaame"
                        className="h-5 w-5 opacity-50"
                      />{" "}
                      <p className="pl-5 opacity-50">Selected Contacts (0)</p>
                    </div>
                    <div className="flex ">
                      <input
                        type="radio"
                        name="radnaame"
                        className="h-5 w-5 mt-2"
                      />

                      <FormControl
                        variant="standard"
                        sx={{ ml: 3, minWidth: 120 }}
                        className=""
                      >
                        <Select
                          // labelId="demo-simple-select-standard-label"
                          // id="demo-simple-select-standard"
                          //  value={}
                          value={printType}
                              onChange={printChange}
                          label="Age"
                        >
                          <MenuItem value={"all_contacts"}>
                            Contacts ({contacts.length})
                          </MenuItem>
                          
                          
                          <hr />
                          <p className="opacity-50 pl-5 pt-5">Labels</p>
                          {labelList.map((oneprintlabel)=>{
                            const {id,name}=oneprintlabel
                            return(   
                            <MenuItem value={oneprintlabel.id}>
                            {name}
                          </MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="flex justify-end text-blue-500 mt-10">
                    <button
                      onClick={handlePrintClose}
                      className=" mr-3 bg-white w-[70px] h-8 rounded  text-sm font-semibold hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button  onClick={handlePrint} className=" mr-4 bg-white w-16 h-8 rounded  text-sm font-semibold hover:bg-gray-100">
                      Print
                    </button>
                  </div>
                </Box>
              </Modal>

              <Modal
                open={Labelopen}
                onClose={handleLabelClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box sx={{ ...style, width: 300, height: 300, pt: 2 }}>
                  <h2 id="parent-modal-title"></h2>
                  <p
                    id="parent-modal-description"
                    className="pl-7 pb-5 text-sm"
                  >
                    Manage Labels
                  </p>
                  {labelList.map((item) => {
                    const { name, id } = item;
                    return (
                      <div className=" mb-4 flex cursor-pointer ml-5" key={id}>
                        {/* <NavLink
                  to={`/labels/${item.id}`}
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-blue-400" : "text-black-400"
                    } transition-all duration-1000`
                  }
                > */}
                        <div className="flex" onClick={() => manageLabels(id)}>
                          <div>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              className="ml-1 opacity-70"
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
                        {/* </NavLink> */}
                      </div>
                    );
                  })}
                  <hr />
                  {selectedLabels.length != appliedLabels.length ? (
                    <div
                      onClick={() => {
                        applyLabels();
                        handleLabelClose();
                      }}
                      className="cursor-pointer"
                    >
                      <span className="ml-7 pt-4">Apply</span>
                    </div>
                  ) : (
                    <div className="cursor-pointer">
                      {" "}
                      <span className="ml-7 pt-4 h-10 w-10">+</span>
                      <span className="ml-7 pt-4">Create Label</span>{" "}
                    </div>
                  )}
                </Box>
              </Modal>

              <section
                className="col-span-3 min-w-full bg-none block md:hidden"
                onClick={() => context.toggleSidebar(false)}
              ></section>
            </div>
          ) : (
            <div className="py-8 col-span-7 md:col-span-10">Please Log IN</div>
          )}
        </aside>
      ) : (
        <></>
      )}
    </>
  );
}
