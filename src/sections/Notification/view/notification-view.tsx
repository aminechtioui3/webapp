import type { UserAccount } from 'src/models/UserAccount';
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Card,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Autocomplete
} from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { Helmet } from "react-helmet-async";
import { CONFIG } from "../../../config-global";
import CustomAlert from "../../../components/Alert/CustomAlert";
import { createNotification, getAllNotifications } from "../../services/NotificationService";
import { NotificationModel } from "../../../models/NotificationModel";
import { MembershipModel } from "../../../models/MembershipModel";
import { getMemberships } from "../../services/MembershipService";
import { getAllAccounts } from "../../services/AccountService";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  header: z.string().min(1, "Header is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
  about: z.string(),
  receiversType: z.string().default("ALL"),
  receiversIds: z.union([z.string(), z.number()]).optional(),
});

export function NotificationView() {
  const [listOfNotifications, setListOfNotifications] = useState<NotificationModel[]>([]);
  const [memberships, setMemberships] = useState<MembershipModel[]>([]);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [receiversType, setReceiversType] = useState<string>("ALL");
  const [userSearchInput, setUserSearchInput] = useState("");
  const [alert, setAlert] = useState<{ show: boolean; type: "success" | "error" | "warning" | "info"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      receiversType: "ALL",
      receiversIds: ""
    }
  });

  const filteredUsers = useMemo(() =>
          users.filter(user =>
              `${user.firstName} ${user.lastName}`.toLowerCase().includes(userSearchInput.toLowerCase()) ||
              user.phone?.toLowerCase().includes(userSearchInput.toLowerCase()) ||
              user.email?.toLowerCase().includes(userSearchInput.toLowerCase())
          ),
      [users, userSearchInput]);

  useEffect(() => {
    if (receiversType === "MEMBERSHIP") {
      getMembershipList();
    } else if (receiversType === "USER") {
      getUserList();
    }
  }, [receiversType]);

  const handleReceiverTypeChange = (value: string) => {
    setReceiversType(value);
    setValue("receiversType", value);
    setValue("receiversIds", "");
    setUserSearchInput("");
  };

  const handleReceiversChange = (id: string | number) => {
    setValue("receiversIds", id);
  };

  const onSubmit = async (data: any) => {
    // Convert to number if needed
    if (typeof data.receiversIds === 'string' && data.receiversIds !== "") {
   //   data.receiversIds = Number(data.receiversIds);

    }

    const result = await createNotification(NotificationModel.fromJson(data));
    if (result.status) {
      await loadData();
      setAlert({ show: true, type: "success", message: "Notification sent successfully!" });
      setTimeout(() => setAlert({ ...alert, show: false }), 3000);
      reset();
    } else {
      setAlert({ show: true, type: "error", message: "Failed to send notification!" });
    }
  };

  const loadData = useCallback(async () => {
    const response = await getAllNotifications();
    if (response.status) setListOfNotifications(response.data!);
  }, []);

  const getMembershipList = useCallback(async () => {
    const response = await getMemberships();
    if (response.status) setMemberships(response.data!);
  }, []);

  const getUserList = useCallback(async () => {
    const response = await getAllAccounts();
    if (response.status) setUsers(response.data!);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  return (
      <DashboardContent>
        <Box display="flex" alignItems="center" mb={5}>
          <Typography variant="h4" flexGrow={1}>Notifications</Typography>
        </Box>

        <Card>
          <Helmet><title>{`Notifications - ${CONFIG.appName}`}</title></Helmet>
          <CustomAlert type={alert.type} message={alert.message} show={alert.show} />

          <Box p={4}>
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Send Notification</Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField fullWidth label="Title" margin="dense" {...register('title')} />
                <TextField fullWidth label="Header" margin="dense" {...register('header')} />
                <TextField
                    fullWidth
                    label="Description"
                    margin="dense"
                    multiline
                    rows={3}
                    {...register('description')}
                />
                <TextField fullWidth label="Image URL" margin="dense" {...register('image')} />
                <TextField fullWidth label="About" margin="dense" {...register('about')} />

                <FormControl fullWidth margin="normal">
                  <InputLabel>Receiver Type</InputLabel>
                  <Select
                      value={watch('receiversType')}
                      onChange={(e) => handleReceiverTypeChange(e.target.value)}
                      label="Receiver Type"
                  >
                    <MenuItem value="ALL">All Users</MenuItem>
                    <MenuItem value="USER">Specific Users</MenuItem>
                    <MenuItem value="MEMBERSHIP">Membership Groups</MenuItem>
                  </Select>
                </FormControl>

                {receiversType !== "ALL" && (
                    <FormControl fullWidth margin="normal">
                      {receiversType === "USER" ? (
                          <Autocomplete
                              options={filteredUsers}
                              getOptionLabel={(user) =>
                                  `${user.firstName} ${user.lastName} - ${user.phone} - ${user.email}`
                              }
                              inputValue={userSearchInput}
                              onInputChange={(_, newValue) => setUserSearchInput(newValue)}
                              value={users.find(user => user.id.toString() === watch('receiversIds')?.toString()) || null}
                              onChange={(_, newValue) =>
                                  handleReceiversChange(newValue?.id || '')
                              }
                              renderInput={(params) => (
                                  <TextField
                                      {...params}
                                      label="Search Users"
                                      placeholder="Name, phone, or email"
                                  />
                              )}
                              renderOption={(props, user) => (
                                  <MenuItem {...props} key={user.id}>
                                    <Box>
                                      <Typography>{user.firstName} {user.lastName}</Typography>
                                      <Typography variant="body2" color="text.secondary">
                                        {user.phone} • {user.email}
                                      </Typography>
                                    </Box>
                                  </MenuItem>
                              )}
                          />
                      ) : (
                          <>
                            <InputLabel>Select Memberships</InputLabel>
                            <Select
                                value={watch('receiversIds')?.toString()}
                                onChange={(e) => handleReceiversChange(Number(e.target.value))}
                                label="Select Memberships"
                            >
                              {memberships.map((membership) => (
                                  <MenuItem key={membership.id} value={membership.id.toString()}>
                                    {membership.title}
                                  </MenuItem>
                              ))}
                            </Select>
                          </>
                      )}
                    </FormControl>
                )}

                <DialogActions>
                  <Button type="submit" variant="contained" color="primary">
                    Send Notification
                  </Button>
                  <Button
                      className="bg-red-700 hover:bg-red-800 min-w-[250px] min-h-[40px]"
                      onClick={(event) => console.log(errors)}
                  >
                    DEBUG
                  </Button>
                </DialogActions>
              </form>
            </Card>
          </Box>
        </Card>
      </DashboardContent>
  );
}