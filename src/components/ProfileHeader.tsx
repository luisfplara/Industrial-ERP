'use client'


import { Avatar, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Stack, Typography } from "@mui/material";
import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';

export default function ProfileHeader() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div>
            <IconButton color="inherit" sx={{ p: 0.5 }} onClick={handleClick}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List>
                    <ListItem disablePadding>

                        <ListItemButton >
              
                            <ListItemText primary="Inbox" />


                            <ListItemIcon sx={{margin:0}}>
                                <LogoutIcon />
                            </ListItemIcon>
                 
                        </ListItemButton>
                    </ListItem>

             
                </List>

            </Popover>
        </div>
    )
}