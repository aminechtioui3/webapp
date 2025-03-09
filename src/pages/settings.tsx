import React, { useState } from "react";
import { Container, FormGroup, FormControlLabel, Switch, Typography, Button, Paper } from "@mui/material";

const Settings = () => {
  const [settings, setSettings] = useState({
    comments: false,
    answers: false,
    follows: false,
    blogDigest: false,
    productUpdates: true,
  });

  const handleToggle = (event :any) => {
    setSettings({ ...settings, [event.target.name]: event.target.checked });
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          Notification Settings
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={settings.comments} onChange={handleToggle} name="comments" />}
            label="Email me when someone comments on my article"
          />
          <FormControlLabel
            control={<Switch checked={settings.answers} onChange={handleToggle} name="answers" />}
            label="Email me when someone answers on my form"
          />
          <FormControlLabel
            control={<Switch checked={settings.follows} onChange={handleToggle} name="follows" />}
            label="Email me when someone follows me"
          />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            News and Announcements
          </Typography>
          <FormControlLabel
            control={<Switch checked={settings.blogDigest} onChange={handleToggle} name="blogDigest" />}
            label="Weekly blog digest"
          />
          <FormControlLabel
            control={<Switch checked={settings.productUpdates} onChange={handleToggle} name="productUpdates" />}
            label="Weekly product updates"
          />
        </FormGroup>
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleSave}>
          Save Changes
        </Button>
      </Paper>
    </Container>
  );
};

export default Settings;
