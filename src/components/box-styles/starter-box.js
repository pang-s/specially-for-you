import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import React from "react";

export function StarterBox(content) {
    return (
        <Box m="auto" width={900}>
            <Paper elevation={3} height={"100%"} width={"100%"}>
                <Box display="flex" height={"100%"} width={"100%"}>
                    <Box p={3} width={"100%"}>
                        {content}
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}