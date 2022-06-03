
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

export function IdlePage() {
    return (
      <Box
        m="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width={window.innerWidth}
        height={window.innerHeight}
        bgcolor="#c7c7c7"
        zIndex={-9000}
      >
        <Paper elevation={3} height={"100%"} width={"100%"}>
          <Box display="flex" height={"100%"} width={"100%"}>
            <Box p={3} width={"100%"}>
              <Typography>Configuration needs to be set up...</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }
