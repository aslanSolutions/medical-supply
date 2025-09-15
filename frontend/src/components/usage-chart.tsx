import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { TransformedUsage } from "@/types/articleUsage";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { calculateWeekChange } from "@/util/article-usage-calc";

export function ArticleUsage({ data }: { data: TransformedUsage[] | null }) {
  if (!data) return "No data available for this article.";

  const weekChange = calculateWeekChange(data);
  const isIncrease = weekChange >= 0;

  const bars = [
    { name: "This week", dataKey: "v1", color: "#13a4ec" },
    { name: "Last week", dataKey: "v2", color: "#1e6d94" },
  ];

  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: "grey.100",
        borderRadius: 2,
        p: { xs: 2, sm: 6 },
        bgcolor: "white",
        boxShadow: 1,
      }}
    >
      <CardHeader
        title={<h2 className="font-bold mb-4 text-[22px]">Product usage</h2>}
      />
      <CardContent>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 3, sm: 4 }}
          alignItems={{ xs: "stretch", sm: "flex-start" }}
        >
          {/* Stats */}
          <Stack
            spacing={2}
            sx={{
              flex: { xs: "1 1 auto", sm: "0 0 240px" },
              justifyContent: "space-between",
              mb: { xs: 3, sm: 0 },
            }}
          >
            <Typography
              color={isIncrease ? "success.main" : "error.main"}
              variant="h3"
            >
              {weekChange}%
            </Typography>
            <Typography variant="body2">
              <Typography
                component="span"
                color={isIncrease ? "success.main" : "error.main"}
                fontWeight={700}
              >
                {weekChange}%
              </Typography>{" "}
              {isIncrease ? "increase" : "decrease"} in this product usage
              compared to last week.
            </Typography>
          </Stack>

          {/* Chart */}
          <Stack divider={<Divider />} spacing={2} sx={{ flex: "1 1 auto" }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                barGap={-24}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="2 4" vertical={false} />
                <XAxis axisLine={false} dataKey="name" tickLine={false} />
                <YAxis axisLine={false} hide type="number" />
                {bars.map((bar) => (
                  <Bar
                    key={bar.name}
                    dataKey={bar.dataKey}
                    fill={bar.color}
                    radius={[5, 5, 5, 5]}
                  />
                ))}
                <Tooltip
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
    { name: "This week", color: "#13a4ec" },
    { name: "Last week", color: "#1e6d94" },
  ];

  return (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      {bars.map((bar) => (
        <Stack
          key={bar.name}
          direction="row"
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
  payload?: TooltipEntry[];
}) {
  if (!active || !payload) return null;

  return (
    <Paper sx={{ border: "1px solid gray", boxShadow: 2, p: 1 }}>
      <Stack spacing={1}>
        {payload.map((entry) => (
          <Stack
            key={entry.name}
            direction="row"
            spacing={2}
            sx={{ alignItems: "center" }}
          >
            <Box
              sx={{
                bgcolor: entry.fill,
                borderRadius: "2px",
                height: "8px",
                width: "8px",
              }}
            />
            <Typography sx={{ whiteSpace: "nowrap", flex: 1 }}>
              {entry.name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {new Intl.NumberFormat("en-US").format(entry.value)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
