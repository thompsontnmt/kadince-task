import React, { useState } from "react";
import {
  Box,
  Card,
  Checkbox,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { CancelTwoTone, CheckCircleTwoTone, EditTwoTone, RadioButtonUnchecked } from "@mui/icons-material";
import { formatDate } from "../../utils/formatters";
import ActivityForm from "./ActivityForm";
import If from "../../components/If";
import { GetActivityDto } from "../../../generated/api/models/GetActivityDto";

interface Props {
  activity: GetActivityDto,
  onDelete: (id: any) => Promise<void>
  onComplete: (id: any) => Promise<void>
}

const ListItem = ({ activity, onDelete, onComplete }: Props) => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.default,
        marginBottom: 2,
      }}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", px: 3 }}
      >
        <If
          condition={isEditing}
          then={
            <Box sx={{ alignItems: "center", width: "100%", pb: 2 }}>
              <ActivityForm
                handleClose={() => setIsEditing(false)}
                initialValues={{ title: activity.title }}
                activityId={activity.id}
              />
            </Box>
          }
          else={
            <>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 4,
                }}
              >
              <Tooltip title={activity.isComplete ? 'Activity complete!' : 'Complete item'}>
                <span>
                <Checkbox
                icon={<RadioButtonUnchecked />}
                checkedIcon={<CheckCircleTwoTone color="success" />}
                checked={activity.isComplete}
                onChange={() => onComplete(activity.id)}
                inputProps={{ "aria-label": "Complete activity" }}
                disabled={activity.isComplete}
                />
                </span>
                </Tooltip>
                <Stack py={1}>
                  <Typography
                    sx={{
                      textDecoration: activity.isComplete
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {activity.title}
                  </Typography>
                  <Typography
                    sx={{
                      textDecoration: activity.isComplete
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {formatDate(activity.createdOn)}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems={"center"}>
              <Tooltip title={activity.isComplete ? 'Cannot edit a completed item' : 'Edit item'}>
                <span>
                <IconButton
                  color="info"
                  onClick={handleToggleEdit}
                  disabled={!!activity.isComplete}
                  >
                  <EditTwoTone />
                </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title={'Delete item'}>
                <IconButton onClick={() => onDelete(activity.id)}>
                  <CancelTwoTone color="error" />
                </IconButton>
                </Tooltip>
              </Stack>
            </>
          }
        />
      </Stack>
    </Card>
  );
};

export default ListItem;
