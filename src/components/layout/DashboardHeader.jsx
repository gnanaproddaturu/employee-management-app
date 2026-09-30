import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";

import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

export default function DashboardHeader() {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
    >
      <Toolbar
        sx={{
          minHeight: "76px !important",
          px: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            mr: 1.5,
          }}
        >
          <GroupsRoundedIcon />
        </Avatar>

        <Box>
          <Typography
            fontWeight={900}
            fontSize={20}
          >
            EmployeeHub
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Employee management dashboard
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}