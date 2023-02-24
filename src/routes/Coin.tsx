import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Outlet, useLocation, useParams, useMatch } from 'react-router';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface RouteParams {
  coinId: string;
}

interface RouteState {
  state: {
    name: string;
  };
}

interface InfoData {
  id?: string;
  name: string;
  symbol?: string;
  rank?: number;
  is_new?: boolean;
  is_active?: boolean;
  type?: string;
  description?: string;
  message?: string;
  open_source?: boolean;
  started_at?: string;
  development_status?: string;
  hardware_wallet?: boolean;
  proof_type?: string;
  org_structure?: string;
  hash_algorithm?: string;
  first_data_at?: string;
  last_data_at?: string;
}

interface PriceData {
  id?: string;
  name?: string;
  symbol?: string;
  rank?: number;
  circulating_supply?: number;
  total_supply?: number;
  max_supply?: number;
  beta_value?: number;
  first_data_at?: string;
  last_updated?: string;
  quotes?: {
    USD?: {
      ath_date?: string;
      ath_price?: number;
      market_cap?: number;
      market_cap_change_24h?: number;
      percent_change_1h?: number;
      percent_change_1y?: number;
      percent_change_6h?: number;
      percent_change_7d?: number;
      percent_change_12h?: number;
      percent_change_15m?: number;
      percent_change_24h?: number;
      percent_change_30d?: number;
      percent_change_30m?: number;
      percent_from_price_ath?: number;
      price?: number;
      volume_24h?: number;
      volume_24h_change_24h?: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<keyof RouteParams>();
  const { state } = useLocation() as RouteState;
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId!)
  );

  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 5000,
    }
  );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>
            {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
          </title>
        </Helmet>
      </HelmetProvider>
      <Link to='/crypto-tracker'>
        <Nav>이전으로 돌아가기 ↩</Nav>
      </Link>
      <Header>
        <Title>
          {state?.name
            ? state.name.toUpperCase()
            : loading
            ? 'Loading...'
            : infoData?.name}
        </Title>
      </Header>
      {loading && <Loader>Loading...</Loader>}
      {!loading && (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Type</span>
              <span>{infoData?.type?.toUpperCase()}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Price</span>
              <span>${tickersData?.quotes?.USD?.price?.toFixed(2)}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Total Suply</span>
              <span>{tickersData?.total_supply?.toLocaleString()}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply</span>
              <span>{tickersData?.max_supply?.toLocaleString()}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/coin/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link
                to={`/coin/${coinId}/price`}
                state={{ priceData: tickersData }}
              >
                Price
              </Link>
            </Tab>
          </Tabs>
          <Outlet context={coinId} />
        </>
      )}
    </Container>
  );
}
export default Coin;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
  color: #95a5a6;
  font-weight: 800;

  &:hover {
    cursor: pointer;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  text-align: center;
  font-size: 45px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const OverviewItem = styled.div`
  background-color: ${(props) => props.theme.listBgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  padding: 30px;
  border-radius: 10px;
  word-break: break-all;

  span:first-child {
    color: ${(props) => props.theme.accentColor};
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  span:last-child {
    font-size: 25px;
    font-weight: 800;
  }
`;
const Description = styled.p`
  margin: 20px 0px 50px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  background-color: ${(props) => props.theme.listBgColor};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  padding: 20px 0px;
  border-radius: 10px;
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 400;

  a {
    display: block;
  }
`;
