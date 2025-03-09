// Profile.tsx

import { useState, useEffect } from "react";
import { Avatar, Box, Button, Card, Grid, TextField, Typography, Switch, FormControlLabel } from "@mui/material";
import { getProfile, updateProfile } from "../sections/services/ProfileService";

interface Profile {
  id: string;
  name: string;
  lastname: string;
  email: string;
  mobile: string;
  subscriptionType: string;
  status: "paid" | "expired";
  picture: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [banned, setBanned] = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProfile() {
      const data = await getProfile("12345");
      setProfile(data);
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const handleChange = (field: keyof Profile, value: string) => {
    if (profile) {
      setProfile({ ...profile, [field]: value });
    }
  };

  const handleSave = async () => {
    if (profile) {
      await updateProfile(profile.id, profile);
      alert("Profile updated successfully!");
    }
  };

  if (loading || !profile) return <Typography>Loading...</Typography>;

  return (
    <Box p={4}>
      <Card sx={{ p: 4, maxWidth: 800, margin: "auto" }}>
        <Grid container spacing={3}>
          {/* Profile Picture */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Avatar src={profile.picture} sx={{ width: 120, height: 120, margin: "auto" }} />
            <Typography variant="caption" display="block" gutterBottom />
            <FormControlLabel control={<Switch checked={banned} onChange={() => setBanned(!banned)} />} label="Banned" />
            <FormControlLabel control={<Switch checked={emailVerified} onChange={() => setEmailVerified(!emailVerified)} />} label="Email Verified" />
          </Grid>
          
          {/* Profile Details */}
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={6}><TextField fullWidth label="Full Name" value={profile.name} onChange={(e) => handleChange("name", e.target.value)} /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Last Name" value={profile.lastname} onChange={(e) => handleChange("lastname", e.target.value)} /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Email Address" value={profile.email} onChange={(e) => handleChange("email", e.target.value)} /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Phone Number" value={profile.mobile} onChange={(e) => handleChange("mobile", e.target.value)} /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Subscription Type" value={profile.subscriptionType}  /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Status" value={profile.status}  /></Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box mt={3} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleSave}>Save Changes</Button>
          <Button variant="contained" color="error" onClick={handleSave}>Delete </Button>
        </Box>
      </Card>
    </Box>
  );
}
