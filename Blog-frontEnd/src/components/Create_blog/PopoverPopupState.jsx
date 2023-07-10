import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { GoKebabVertical } from 'react-icons/go';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import { selectUser } from "../../redux/userSlice";
export default function PopoverPopupState(props) {

  const userDetails = useSelector(selectUser);
  const _id = userDetails && userDetails._id;

  console.log(_id);
  
    const {blogId} = props;
    const handelDelete = async() => {
        console.log(blogId)
        const deleteBlog = await axios.delete(`https://mern-blog-9lrx.vercel.app/blog/delete/${blogId}/${_id}`);

    }
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button {...bindTrigger(popupState)}>
            <GoKebabVertical />
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography >

                <div className='flex flex-col gap-2 '>
                    <div className='hover:bg-green-300 px-4 pt-2'>
                        <a href='#'>Edit</a>
                    </div>
                    <div className='hover:bg-red-300 px-4 pb-1'>
                        <button type='button' className='focus:outline-none' onClick={handelDelete}>
                        Delete
                        </button>
                    </div>
                    <div className='hover:bg-blue-300 px-4 pb-2'>
                        <a href='#'>Report</a>
                    </div>
                </div>

            </Typography>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}