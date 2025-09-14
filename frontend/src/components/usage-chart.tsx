import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ArticleUsageData {
  name: string;
  v1: number;
  v2: number;
}

export function ArticleUsage({ data }: { data: ArticleUsageData[] }) {
  const chartHeight = 300;

  const bars = [
    {
      name: "This year",
      dataKey: "v1",
      color: "#13a4ec",
    },
    {
      name: "Last year",
      dataKey: "v2",
      color: "#1e6d94",
    },
  ];

  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: "grey.100",
        borderRadius: 2,
        p: 6,
        bgcolor: "white",
        boxShadow: 1,
      }}
    >
      <CardHeader title={"Product usage"} />
      <CardContent>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
          <Stack
            spacing={3}
            sx={{
              flex: "0 0 auto",
              justifyContent: "space-between",
              width: "240px",
            }}
          >
            <Stack spacing={2}>
              <Typography color="primary" variant="h2">
                15%
              </Typography>
              <Typography>
                increase in this product usage with{" "}
                <Typography color="primary" fontWeight={700} component="span">
                  15%
                </Typography>{" "}
                than last month.
              </Typography>
            </Stack>
          </Stack>
          <Stack divider={<Divider />} spacing={2} sx={{ flex: "1 1 auto" }}>
            <ResponsiveContainer height={chartHeight}>
              <BarChart
                barGap={-32}
                data={data}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="2 4" vertical={false} />
                <XAxis
                  axisLine={false}
                  dataKey="name"
                  tickLine={false}
                  type="category"
                  xAxisId={0}
                />
                <XAxis
                  axisLine={false}
                  dataKey="name"
                  hide
                  type="category"
                  xAxisId={1}
                />
                <YAxis
                  axisLine={false}
                  domain={[0, 50]}
                  hide
                  tickCount={6}
                  type="number"
                />
                {bars.map((bar, index) => (
                  <Bar
                    animationDuration={300}
                    barSize={32}
                    dataKey={bar.dataKey}
                    fill={bar.color}
                    key={bar.name}
                    name={bar.name}
                    radius={[5, 5, 5, 5]}
                    xAxisId={index}
                  />
                ))}
                <Tooltip
                  animationDuration={50}
                  content={(props) => <TooltipContent {...props} />}
                  cursor={false}
                />
              </BarChart>
            </ResponsiveContainer>
            <Legend />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function Legend() {
  const bars = [
    {
      name: "This year",
      dataKey: "v1",
      color: "#7578ff",
    },
    {
      name: "Last year",
      dataKey: "v2",
      color: "#3725ae",
    },
  ];

  return (
    <Stack direction="row" spacing={2}>
      {bars.map((bar) => (
        <Stack
          direction="row"
          key={bar.name}
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <Box
            sx={{
              bgcolor: bar.color,
              borderRadius: "2px",
              height: "4px",
              width: "16px",
            }}
          />
          <Typography color="text.secondary" variant="caption">
            {bar.name}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

interface TooltipEntry {
  name: string;
  value: number;
  fill: string;
}

function TooltipContent({
  active,
  payload,
}: {
  active: boolean;
  payload: TooltipEntry[];
}) {
  if (!active) {
    return null;
  }

  return (
    <Paper
      sx={{
        border: "1px solid gray",
        boxShadow: 2,
        p: 1,
      }}
    >
      <Stack spacing={2}>
        {payload?.map((entry: TooltipEntry) => (
          <Stack
            direction="row"
            key={entry.name}
            spacing={3}
            sx={{ alignItems: "center" }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: "center", flex: "1 1 auto" }}
            >
              <Box
                sx={{
                  bgcolor: entry.fill,
                  borderRadius: "2px",
                  height: "8px",
                  width: "8px",
                }}
              />
              <Typography sx={{ whiteSpace: "nowrap" }}>
                {entry.name}
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {new Intl.NumberFormat("en-US").format(entry.value)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
