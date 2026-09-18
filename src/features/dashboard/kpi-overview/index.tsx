import type { KpiOverviewResponseDto } from '@/api/generated';
import { Card } from '@/components/ui/card';
import {
  Bar,
  BarColumn,
  BarLabel,
  ChartRow,
  ErrorTypeCount,
  ErrorTypeFill,
  ErrorTypeName,
  ErrorTypeRow,
  ErrorTypeTrack,
  Grid,
  Section,
  SectionTitle,
  Tile,
  TileLabel,
  TileValue,
} from './index.styles';

interface KpiOverviewProps {
  data: KpiOverviewResponseDto;
}

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'short',
});

export function KpiOverview({ data }: KpiOverviewProps) {
  const maxDailyCount = Math.max(
    1,
    ...data.eventsLast7Days.map((day) => day.count),
  );
  const maxErrorTypeCount = Math.max(
    1,
    ...data.topErrorTypes.map((item) => item.count),
  );

  return (
    <>
      <Grid>
        <Tile>
          <TileLabel>Sistemas</TileLabel>
          <TileValue>{data.totalSystems}</TileValue>
        </Tile>
        <Tile>
          <TileLabel>Issues abertas</TileLabel>
          <TileValue>{data.openIssues}</TileValue>
        </Tile>
        <Tile>
          <TileLabel>Issues resolvidas</TileLabel>
          <TileValue>{data.resolvedIssues}</TileValue>
        </Tile>
        <Tile>
          <TileLabel>Total de issues</TileLabel>
          <TileValue>{data.totalIssues}</TileValue>
        </Tile>
      </Grid>

      <Section>
        <Card>
          <SectionTitle>Eventos nos últimos 7 dias</SectionTitle>
          <ChartRow>
            {data.eventsLast7Days.map((day) => (
              <BarColumn key={day.date}>
                <Bar
                  css={{ height: `${(day.count / maxDailyCount) * 100}%` }}
                  title={`${day.count} eventos em ${day.date}`}
                />
                <BarLabel>
                  {WEEKDAY_FORMATTER.format(new Date(`${day.date}T00:00:00`))}
                </BarLabel>
              </BarColumn>
            ))}
          </ChartRow>
        </Card>

        <Card>
          <SectionTitle>Top tipos de erro</SectionTitle>
          {data.topErrorTypes.map((item) => (
            <ErrorTypeRow key={item.type}>
              <ErrorTypeName title={item.type}>{item.type}</ErrorTypeName>
              <ErrorTypeTrack>
                <ErrorTypeFill
                  css={{ width: `${(item.count / maxErrorTypeCount) * 100}%` }}
                />
              </ErrorTypeTrack>
              <ErrorTypeCount>{item.count}</ErrorTypeCount>
            </ErrorTypeRow>
          ))}
        </Card>
      </Section>
    </>
  );
}
