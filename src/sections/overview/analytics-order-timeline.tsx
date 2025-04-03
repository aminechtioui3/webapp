import type { CardProps } from '@mui/material/Card';
import type { TimelineItemProps } from '@mui/lab/TimelineItem';

import Card from '@mui/material/Card';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';

import { fDateTime } from 'src/utils/format-time';
import {HistoryModel} from "../../models/HistoryModel";
import {MoneyTransactionHistory} from "../../models/MoneyTransactionHistory";

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  isHistory: boolean;
  historyList: HistoryModel[];
  moneyTransactionHistoryList: MoneyTransactionHistory[];
};

export function AnalyticsOrderTimeline({ title, subheader, historyList,moneyTransactionHistoryList, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Timeline
        sx={{
          m: 0,
          p: 3,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {historyList.map((item, index) => (
          <Item key={item.id} item={item} isHistory lastItem={index === historyList.length - 1} />
        ))}
          {moneyTransactionHistoryList.map((item, index) => (
          <Item key={item.id} element={item} isHistory={false} lastItem={index === historyList.length - 1} />
        ))}
      </Timeline>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = TimelineItemProps & {
  lastItem: boolean;
  item?: Props['historyList'][number];
  element?: Props['moneyTransactionHistoryList'][number];
  isHistory: boolean;
};

function Item({ item,element,isHistory, lastItem, ...other }: ItemProps) {
  return (
    <TimelineItem {...other}>
      <TimelineContent>

        <Typography variant="subtitle2">{isHistory? item!.title!:element?.note}</Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {fDateTime(isHistory?item!.date:element?.date)}
        </Typography>
          {!isHistory?<Typography variant="caption" sx={{ color: 'text.disabled' }}>
              {element?.category}
          </Typography>:null}

      </TimelineContent>
    </TimelineItem>
  );
}
