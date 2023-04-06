import React, {FC, ReactNode, useState} from 'react';
import {Box, Button, IconButton, Modal, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 250,
    bgcolor: 'background.paper',
    border: '2px  #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
};
type Props = {
    label: ReactNode
    children: ReactNode
    title: string
    type: 'button' | 'icon'
}
export const BasicModal: FC<Props> = ({label, children, title, type}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {type === 'button' ? <Button variant={"contained"} onClick={handleOpen}>{label}</Button>
                : <IconButton onClick={handleOpen}>{label}</IconButton>}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {title}
                        </Typography>
                        <CloseIcon sx={{cursor: 'pointer'}} onClick={handleClose}/>
                    </div>
                    {children}
                </Box>
            </Modal>
        </>
    );
};