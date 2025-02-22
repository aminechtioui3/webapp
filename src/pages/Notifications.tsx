import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { CONFIG } from "src/config-global";
import { useRouter } from "../routes/hooks";
import { checkIfTokenExist } from "../sections/services/AccountService";
import { sendNotification, getNotifications } from "src/sections/services/NotificationService";
import CustomAlert from "../../src/components/Alert/CustomAlert";
import {
  Box,
  Card,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";

interface Notification {
  message: string;
  sentTo: string;
  sentAt: string;
  sender: string;
}

export default function NotificationsPage() {
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [group, setGroup] = useState<string>("all");
  const [subGroup, setSubGroup] = useState<string>("all members");
  const [sentNotifications, setSentNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ show: boolean; type: "success" | "error" | "warning" | "info"; message: string }>(
    { show: false, type: "success", message: "" }
  );

  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await checkIfTokenExist();
      if (!isValid) router.push("/sign-in");
      setIsTokenValid(isValid);
    };
    checkToken();
  }, [router]);

  useEffect(() => {
    if (isTokenValid) fetchNotifications();
  }, [isTokenValid]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const { sent } = await getNotifications();
      setSentNotifications(sent);
    } catch (error) {
      setAlert({ show: true, type: "error", message: "Failed to fetch notifications!" });
    }
    setLoading(false);
  };

  const handleSendNotification = async () => {
    if (!message.trim()) {
      setAlert({ show: true, type: "warning", message: "Message cannot be empty!" });
      return;
    }
    setLoading(true);
    try {
      await sendNotification({ message, group: `${group} - ${subGroup}` });
      setMessage("");
      fetchNotifications();
      setAlert({ show: true, type: "success", message: "Notification sent successfully!" });

      setTimeout(() => {
        setAlert({ show: false, type: "success", message: "" });
      }, 3000);
    } catch (error) {
      setAlert({ show: true, type: "error", message: "Failed to send notification!" });
    }
    setLoading(false);
  };

  if (!isTokenValid) return null;

  return (
    <>
      <Helmet>
        <title>{`Notifications - ${CONFIG.appName}`}</title>
      </Helmet>

      <CustomAlert type={alert.type} message={alert.message} show={alert.show} />

      <Box p={4}>
        <Card sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Send Notification
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Group</InputLabel>
                <Select value={group} onChange={(e) => setGroup(e.target.value)}>
                  <MenuItem value="all">All Users</MenuItem>
                  <MenuItem value="specific_course">Specific Course</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>{group === "all" ? "Sub Group" : "Course"}</InputLabel>
                <Select value={subGroup} onChange={(e) => setSubGroup(e.target.value)}>
                  {group === "all" ? (
                    <MenuItem value="all members">All Members</MenuItem>
                  ) : (
                    ["Boxing", "Accès Libre", "Football Team", "Yoga"].map((course) => (
                      <MenuItem key={course} value={course}>{course}</MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <TextField
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter notification message..."
            multiline
            rows={2}
            sx={{ mb: 2 }}
          />

          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendNotification}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Notification"}
            </Button>
          </Box>
        </Card>

        <Card sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Sent Notifications
          </Typography>
          {sentNotifications.length === 0 ? (
            <Typography>No notifications sent yet.</Typography>
          ) : (
            sentNotifications.map((notif, index) => (
              <Card key={index} sx={{ p: 2, mb: 2 }}>
                <Typography><strong>To:</strong> {notif.sentTo}</Typography>
                <Typography><strong>Message:</strong> {notif.message}</Typography>
                <Typography variant="caption"><strong>Sent At:</strong> {notif.sentAt}</Typography>
              </Card>
            ))
          )}
        </Card>
      </Box>
    </>
  );
}
