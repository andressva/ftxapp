import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';

interface IOwnProps {
  label: string
  value: number
  color: string
  icon: any
}

export const TotalItems = ({ label, value, color, icon }: IOwnProps) => (
  <Card >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            {label}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {value}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: color,
              height: 56,
              width: 56
            }}
          >
            {icon}
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
