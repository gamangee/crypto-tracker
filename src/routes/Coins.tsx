import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styled from 'styled-components';
import { fetchCoins } from '../api';

interface ICoin {
  id?: string;
  name?: string;
  symbol?: string;
}

export default function Coins() {
  const { isLoading: loading, data } = useQuery<ICoin[]>(
    'allCoins',
    fetchCoins
  );

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>Crypto Currency</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>Crypto Currency</Title>
      </Header>
      {loading && <Loader>Loading...</Loader>}
      {!loading && (
        <CoinsList>
          {data?.slice(0, 96).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                <CoinName>{coin.name}</CoinName>
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  margin-top: 20px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 35px;
  font-weight: 700;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const CoinsList = styled.ul`
  background-color: ${(props) => props.theme.listBgColor};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 30px 0 50px;
  padding: 30px;
  border-radius: 10px;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.25);
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
`;

const Coin = styled.li`
  color: ${(props) => props.theme.listTextColor};
  width: 47%;
  margin-bottom: 25px;
  border-radius: 10px;
  background-color: #ffffff;
  transition: transform 0.2s ease-in;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
  }
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    color: #ffffff;
    transform: translateY(-5px);
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const CoinName = styled.span`
  font-size: 18px;
`;
