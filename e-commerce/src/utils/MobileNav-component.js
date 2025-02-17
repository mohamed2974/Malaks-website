'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import Menu from '@mui/icons-material/Menu';
import { FaGear } from "react-icons/fa6";

export default function DrawerMobileNavigation({ array = [], boxes = [] }) {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <IconButton
                variant="plain"
                sx={{
                    color: 'var(--text-primary)',
                    '&:hover': { background: 'var(--text-primary)', color: 'var(--background-primary)' }
                }}
                onClick={() => setOpen(true)}
            >
                <Menu />
            </IconButton>
            <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
                {/* Schließen-Button */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto', mt: 1, mr: 2 }}>
                    <Typography component="label" htmlFor="close-icon" sx={{ fontSize: 'sm', fontWeight: 'lg', cursor: 'pointer' }}>
                        Close
                    </Typography>
                    <ModalClose id="close-icon" sx={{ position: 'initial' }} />
                </Box>

                {/* Navigation */}
                <List
                    size="lg"
                    component="nav"
                    sx={{
                        paddingTop: 5,
                        flex: 'none',
                        fontSize: 'lg',
                        '& > div': { justifyContent: 'center' },
                    }}
                >
                    {array.map((item, index) => (
                        <ListItemButton onClick={handleClose} key={index} sx={{ fontWeight: 'lg' }}>
                            {item}
                        </ListItemButton>
                    ))}
                </List>

                {/* Weitere Links - Modern & Kompakt */}
                {boxes.length > 0 && (
                    <Box sx={{ padding: 2, marginBottom: 2, textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                            <span className='flex justify-center items-center'>
                                <FaGear className='mr-3'/> Weitere Funktionen
                            </span>
                        </Typography>
                        <div className="flex justify-center gap-4 mt-5">
                            {boxes.map((item, index) => (
                                <ListItemButton
                                    onClick={handleClose}
                                    key={index}
                                    sx={{ fontWeight: 'lg', display: 'flex', alignItems: 'center', gap: 1 }}
                                >
                                    {item}
                                </ListItemButton>
                            ))}
                        </div>
                    </Box>
                )}
            </Drawer>
        </React.Fragment>
    );
}
