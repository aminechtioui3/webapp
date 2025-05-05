import {useCallback, useEffect, useState} from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Stack, Button, Dialog, TextField, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { _tasks, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';
import {getAllProductCategories} from "../../services/shopService";
import {applyFilter, getComparator} from "../../Product Category/utils";
import {getGymMoneyTransactionHistory, getGymStatistics} from "../../services/GymService";
import {GymStatistics} from "../../../models/GymStatistics";
import {getHistory} from "../../services/HistoryService";
import {HistoryModel} from "../../../models/HistoryModel";
import {MoneyTransactionHistory} from "../../../models/MoneyTransactionHistory";

export function OverviewAnalyticsView() {
  const [isAuth, setIsAuth] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [password, setPassword] = useState('');
  const correctPassword = '1234';
  const [statistics, setStatistics] = useState<GymStatistics | null>(null);
  const [history, setHistory] = useState<HistoryModel[] >([]);
  const [moneyTransactionHistory, setMoneyTransactionHistory] = useState<MoneyTransactionHistory[]>([]);

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setIsAuth(true);
      setOpenDialog(false);
    } else {
      alert('Incorrect password!');
    }
  };

    const loadData = useCallback(async () => {
        const model = await getGymStatistics();
        console.log(model);

        if (model.status) {
            setStatistics(model.data!);
            console.log(model.data!);
        } else {
            setStatistics(null);
        }
    }, []); // ✅ Dependencies are properly managed

    const loadHistory = useCallback(async () => {
        const model = await getHistory();
        console.log(model);

        if (model.status) {
            setHistory(model.data!);

        } else {
            setHistory([]);
        }
    }, []);

    const loadMoneyTransaction = useCallback(async () => {
        const model = await getGymMoneyTransactionHistory();
        console.log(model);

        if (model.status) {
            setMoneyTransactionHistory(model.data!);

        } else {
            setHistory([]);
        }
    }, []);

    useEffect(() => {
        loadData();
        loadHistory();
        loadMoneyTransaction();
    }, [ loadData,loadHistory,loadMoneyTransaction]); // ✅ No more infinite re-renders

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
          <AnalyticsWidgetSummary title="Members" percent={2.6} total={isAuth ? statistics? statistics.totalMembers:"error" : '****'}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />} chart={{ series: [22, 8, 35, 50] ,categories:[]}} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="Valid subscriptions" percent={-0.1} total={isAuth ? statistics? statistics.totalActiveMembers:"error" : '****'} color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />} chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [12, 12, 6, 13, 10, 6, 23, 54],
            }} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="Invalid subscriptions" percent={2.8} total={isAuth ? statistics? statistics.totalInactiveMembers:"error" : '****'} color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />} chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="Orders" percent={3.6} total={isAuth ? statistics? statistics.totalOfOrders:"error" : '****'} color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}  chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }} />
        </Grid>


        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="new Members last week" percent={2.6} total={isAuth ? statistics? statistics.newSubscriptionLastMonth:"error" : '****'}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />} chart={{ series: [22, 8, 35, 50] ,categories:[]}} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="new Members last month" percent={-0.1} total={isAuth ? statistics? statistics.newSubscriptionLastMonth:"error" : '****'} color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />} chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [12, 12, 6, 13, 10, 6, 23, 54],
            }} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="new Members this year" percent={2.8} total={isAuth ? statistics? statistics.newSubscriptionThisYear:"error" : '****'} color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />} chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="new Members last year" percent={3.6} total={isAuth ? statistics? 0:"error" : '****'} color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}  chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }} />
        </Grid>



          <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="Estimated incomes" percent={2.6} total={isAuth ? statistics? statistics.totalEstimatedIncomesFromMembershipsThisMonth:"error" : '****'}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />} chart={{ series: [22, 8, 35, 50] ,categories:[]}} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="subscription about to expire" percent={-0.1} total={isAuth ? statistics? statistics.membershipsAboutToExpireThisMonth:"error" : '****'} color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />} chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [12, 12, 6, 13, 10, 6, 23, 54],
            }} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="Products" percent={2.8} total={isAuth ? statistics? statistics.totalProductsInTheShop:"error" : '****'} color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />} chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }} />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="new orders" percent={3.6} total={isAuth ? statistics? statistics.ordersWaitingForConfirmation:"error" : '****'} color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}  chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }} />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits title="Subscription types"  chart={{
              series: statistics? statistics.totalMembershipsTypesStatisticsModel.map((value, index, array) => ({ label: value.name, value: value.numberOfMembers }),
              ):[]}} />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits title="Last months' incomes"  chart={{
              categories:  statistics? statistics.totalIncomesThisYear.map(value =>value.month.toString() ):[],
              series: [
                  { name: 'income', data: statistics? statistics.totalIncomesThisYear.map(value =>value.incomes ):[]},

                  { name: 'expense', data: statistics? statistics.totalIncomesThisYear.map(value =>value.expenses ):[]},

              ],
            }} />
        </Grid>

          <Grid xs={12} md={12} lg={8}>
          <AnalyticsWebsiteVisits title="This month incomes"  chart={{
              categories:  statistics? statistics.totalIncomesThisMonth.map(value =>value.day.toString() ):[],
              series: [
                { name: 'income', data: statistics? statistics.totalIncomesThisMonth.map(value =>value.incomes ):[]},
                { name: 'expense', data: statistics? statistics.totalIncomesThisMonth.map(value =>value.expenses ):[]},
              ],
            }} />
        </Grid>
       { /* <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates title="Male to female reports"  chart={{
              categories: ['Family gym souani', 'Family gym R4'],
              series: [
                { name: 'male', data: [44, 55] },
                { name: 'female', data: [53, 32] },
              ],
              
            }} />
        </Grid> */ }
        {/* <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Order timeline" historyList={history} isHistory moneyTransactionHistoryList={[]} />
        </Grid> */}

          <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="History" historyList={[]} isHistory={false} moneyTransactionHistoryList={moneyTransactionHistory} />
        </Grid>
        { /* <Grid xs={12} md={6} lg={4}>
          <AnalyticsTrafficBySite title="Traffic by site" list={isAuth ? [ {value:"5", label: 'Google', total: 341212 } ] : []} />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AnalyticsTasks title="Tasks" list={_tasks} />
        </Grid> */ }
      </Grid>
    </DashboardContent>
  );
}

