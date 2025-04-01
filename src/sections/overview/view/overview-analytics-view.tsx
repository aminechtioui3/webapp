import { useState } from 'react';
import { _tasks, _timeline } from 'src/_mock';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { DashboardContent } from 'src/layouts/dashboard';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';
import { Stack, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

export function OverviewAnalyticsView() {
  const [isAuth, setIsAuth] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [password, setPassword] = useState('');
  const correctPassword = '1234';

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setIsAuth(true);
      setOpenDialog(false);
    } else {
      alert('Incorrect password!');
    }
  };

  return (
    <DashboardContent maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: { xs: 3, md: 5 } }}>
        <Typography variant="h4">Hi, Welcome Coach 🏋️</Typography>
        <Button variant="contained" color="inherit" startIcon={<VisibilityIcon />} onClick={() => setOpenDialog(true)}>
          View statistics
        </Button>
      </Stack>
      
      {/* Password Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Enter Password</DialogTitle>
        <DialogContent>
          <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handlePasswordSubmit} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>
      
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="Income" percent={2.6} total={isAuth ? 12000 : 'login'}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />} chart={{ series: [22, 8, 35, 50] }} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="New subscriptions" percent={-0.1} total={isAuth ? 120 : '****'} color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />} chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [12, 12, 6, 13, 10, 6, 23, 54],
            }} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="Total subscriptions" percent={2.8} total={isAuth ? 398 : '****'} color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />} chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="Unpaid subscriptions" percent={3.6} total={isAuth ? 23 : '****'} color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}  chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }} />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits title="Subscription types"  chart={{
              series: [
                { label: 'Free access', value: 90 },
                { label: 'Private coaching', value: 12 },
                { label: 'specific courses', value: 32 },
                
              ],
            }} />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits title="Last months' incomes"  chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'income', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                { name: 'expense', data: [10, 20, 11, 0, 11, 5, 12, 33, 5] } 
              ],
            }} />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates title="Male to female reports"  chart={{
              categories: ['Family gym souani', 'Family gym R4'],
              series: [
                { name: 'male', data: [44, 55] },
                { name: 'female', data: [53, 32] },
              ],
              
            }} />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Order timeline" list={_timeline} />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AnalyticsTrafficBySite title="Traffic by site" list={isAuth ? [ { label: 'Google', total: 341212 } ] : []} />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AnalyticsTasks title="Tasks" list={_tasks} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
