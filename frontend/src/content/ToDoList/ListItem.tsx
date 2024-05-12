import React, { useState, useCallback, useMemo } from "react";
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
import {
  CancelTwoTone,
  CheckCircleTwoTone,
  EditTwoTone,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { formatDate } from "../../utils/formatters";
import ActivityForm from "./ActivityForm";
import If from "../../components/If";
import { GetActivityDto } from "../../../generated/api/models/GetActivityDto";

interface Props {
  activity: GetActivityDto;
  onDelete: (id: any) => Promise<void>;
  onComplete: (id: any) => Promise<void>;
  onUncomplete: (id: any) => Promise<void>;
}

const ListItem = React.memo(
  ({ activity, onDelete, onComplete, onUncomplete }: Props) => {
    const theme = useTheme();
    const [isEditing, setIsEditing] = useState(false);

    const handleToggleEdit = useCallback(() => {
      setIsEditing((prev) => !prev);
    }, []);

    const handleClose = useCallback(() => {
      setIsEditing(false);
    }, []);

    return (
      <Card
        sx={{
          backgroundColor: theme.palette.background.default,
          marginBottom: 2,
        }}
      >
        <If
          condition={isEditing}
          then={
            <Box sx={{ display: isEditing ? 'block' : 'none', width: "100%", px: 3, py: 2 }}>
              <ActivityForm
                handleClose={handleClose}
                activityId={activity.id}
              />
            </Box>
          }
        />
        <Stack
          direction="row"
          sx={{
            display: isEditing ? "none" : "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 1,
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Tooltip
              title={
                activity.isComplete ? "Mark as incomplete" : "Mark as complete"
              }
            >
              <span>
                <Checkbox
                  icon={<RadioButtonUnchecked />}
                  checkedIcon={<CheckCircleTwoTone color="success" />}
                  checked={activity.isComplete}
                  onChange={() => {
                    if (activity.isComplete) {
                      onUncomplete(activity.id);
                    } else {
                      onComplete(activity.id);
                    }
                  }}
                  inputProps={{
                    "aria-label": activity.isComplete
                      ? "Uncomplete activity"
                      : "Complete activity",
                  }}
                />
              </span>
            </Tooltip>
            <Stack py={1}>
              <Typography
                sx={{
                  textDecoration: activity.isComplete ? "line-through" : "none",
                }}
              >
                {activity.title}
              </Typography>
              <Typography
                sx={{
                  textDecoration: activity.isComplete ? "line-through" : "none",
                }}
              >
                {formatDate(activity.createdOn)}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems={"center"}>
            <Tooltip
              title={
                activity.isComplete
                  ? "Cannot edit a completed item"
                  : "Edit item"
              }
            >
              <span>
                <IconButton
                  color="info"
                  onClick={handleToggleEdit}
                  disabled={activity.isComplete}
                >
                  <EditTwoTone />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={"Delete item"}>
              <IconButton onClick={() => onDelete(activity.id)}>
                <CancelTwoTone color="error" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Card>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.activity.id === nextProps.activity.id &&
      prevProps.activity.isComplete === nextProps.activity.isComplete &&
      prevProps.activity.title === nextProps.activity.title
    );
  }
);

export default ListItem;
