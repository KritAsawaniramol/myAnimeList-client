import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Button } from '@mui/material';
import { useThemeContext } from './theme/ThemeContextProvider';



export default function DeleteAnimeButton(props) {
    const { removeAnimeFn } = props
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDelete = () => {
        removeAnimeFn()
        setOpen(false)
    }
    const { theme } = useThemeContext();
    console.log(theme);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        borderRadius: theme.shape.borderRadius,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <IconButton color="error" sx={{ position: 'absolute' }} onClick={handleOpen}>
                <DeleteIcon />
            </IconButton>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h2" component="h2">
                            Are you sure?
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Do you really want to delete this anime from your list? This process cann't be undone.
                        </Typography>
                        <Box mt={'10px'} display={'flex'} justifyContent={'flex-end'}>

                        <Button variant="outlined" color="primary" onClick={handleClose}> 
                            Cancel
                        </Button>
                        <Button variant="contained" color="error" sx={{ml: '10px'}} onClick={handleDelete}>
                            DELETE
                        </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}


