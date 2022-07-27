import React from "react";
import Input from '@mui/material/Input';

function LabelModal() {
  return (
    <div className="flex justify-center relative">
      <div className="w-96 h-60 absolute mt-[150px] z-10 shadow-2xl rounded-lg">
        <div className="p-5 ">Create Label</div>
        <Input placeholder="" className="m-10 w-[300px]" />
        <div className="flex justify-end text-blue-600">
        <button className=" mr-3 bg-white w-[70px] h-8 rounded  text-sm font-semibold hover:bg-gray-100">Cancel</button>
        <button className=" mr-3 bg-white w-16 h-8 rounded  text-sm font-semibold hover:bg-gray-100">Save</button>
        </div>
     </div>
    </div>
  );
}

export default LabelModal;
