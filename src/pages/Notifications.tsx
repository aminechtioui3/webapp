import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { CONFIG } from "src/config-global";
import { useRouter } from "../routes/hooks";
import { checkIfTokenExist } from "../sections/services/AccountService";
import { sendNotification, getNotifications, Notification } from "src/sections/services/NotificationService";
import type { UserAccount } from "src/models/UserAccount";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { DashboardContent } from "src/layouts/dashboard";
import { Iconify } from "src/components/iconify";
import { Scrollbar } from "src/components/scrollbar";
import { getUsers, startMembership } from "src/sections/services/UserService";

export default function NotificationsPage() {
    const [isTokenValid, setIsTokenValid] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [group, setGroup] = useState<string>("all");
    const [sentNotifications, setSentNotifications] = useState<Notification[]>([]);
    const [receivedNotifications, setReceivedNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
            const isValid = await checkIfTokenExist();
            if (!isValid) {
                router.push("/sign-in");
            }
            setIsTokenValid(isValid);
        };

        checkToken();
    }, [router]);

    useEffect(() => {
        if (isTokenValid) {
            fetchNotifications();
        }
    }, [isTokenValid]);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const { sent, received } = await getNotifications();
            setSentNotifications(sent);
            setReceivedNotifications(received);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
        setLoading(false);
    };

    const handleSendNotification = async () => {
        if (!message.trim()) return alert("Message cannot be empty.");
        
        setLoading(true);
        try {
            await sendNotification({ message, group });
            setMessage("");
            fetchNotifications();
        } catch (error) {
            console.error("Failed to send notification:", error);
        }
        setLoading(false);
    };

    if (!isTokenValid) return null;

    return (
        <>
            <Helmet>
                <title>{`Notifications - ${CONFIG.appName}`}</title>
            </Helmet>

            <div className="p-4 space-y-4">
                <Card className="p-4">
                    <Typography variant="h6" fontWeight="bold">
                        Send Notification
                    </Typography>
                    
                    <FormControl fullWidth className="mt-2">
                        <InputLabel>Group</InputLabel>
                        <Select
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                        >
                            <MenuItem value="all">All Users</MenuItem>
                            <MenuItem value="admins">Admins</MenuItem>
                            <MenuItem value="members">Members</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter notification message..."
                        className="mt-2"
                        multiline
                        rows={2}
                    />

                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSendNotification}
                        disabled={loading}
                        className="mt-4"
                    >
                        {loading ? "Sending..." : "Send"}
                    </Button>
                </Card>

                <Card className="p-4">
                    <Typography variant="h6" fontWeight="bold">
                        Sent Notifications (Last 48 Hours)
                    </Typography>
                    {loading ? (
                        <Typography>Loading...</Typography>
                    ) : (
                        <ul>
                            {sentNotifications.length ? (
                                sentNotifications.map((notif, index) => (
                                    <li key={index} className="border-b py-2">
                                        {notif.message} - {notif.timestamp}
                                    </li>
                                ))
                            ) : (
                                <Typography>No sent notifications.</Typography>
                            )}
                        </ul>
                    )}
                </Card>

                <Card className="p-4">
                    <Typography variant="h6" fontWeight="bold">
                        Received Notifications
                    </Typography>
                    {loading ? (
                        <Typography>Loading...</Typography>
                    ) : (
                        <ul>
                            {receivedNotifications.length ? (
                                receivedNotifications.map((notif, index) => (
                                    <li key={index} className="border-b py-2">
                                        {notif.message} - {notif.timestamp}
                                    </li>
                                ))
                            ) : (
                                <Typography>No new notifications.</Typography>
                            )}
                        </ul>
                    )}
                </Card>
            </div>
        </>
    );
}
