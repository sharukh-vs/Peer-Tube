import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ListSubheader } from "@mui/material";
// import { FixedSizeList } from "react-window";

const notifications = [
  {
    creator: "0x379....7892",
    title: "I'll be in your neighborhood doing errands this",
  },
  {
    creator: "0x379....7892",
    title: "I'll be in your neighborhood doing errands this",
  },
  {
    creator: "0x379....7892",
    title: "I'll be in your neighborhood doing errands this",
  },
  {
    creator: "0x379....7892",
    title: "I'll be in your neighborhood doing errands this",
  },
  {
    creator: "0x379....7892",
    title: "I'll be in your neighborhood doing errands this",
  },
];

export default function NotificationList() {
  return (
    <List
      height={400}
      width={360}
      overscanCount={5}
      sx={{
        width: "100%",
        maxWidth: 360,
        backgroundColor: "#0F0F0F",
        boxShadow: 7,
        color: "white",
      }}
    >
      <ListSubheader sx={{ backgroundColor: "#0F0F0F" }}>
        <ListItem>
          <ListItemText>
            <Typography fontSize={20} color={"white"}>
              Notifications
            </Typography>
          </ListItemText>
        </ListItem>
      </ListSubheader>
      <Divider sx={{ backgroundColor: "#808080" }} />
      {notifications.map(({ creator, title }) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={`${creator} uploaded :`}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="white"
                  >
                    {title}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider
            variant="middle"
            component="li"
            sx={{ backgroundColor: "#808080" }}
          />
        </>
      ))}
    </List>
  );
}
