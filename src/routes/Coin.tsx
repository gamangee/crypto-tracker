import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface RouteParams {
  coinId: string;
}
interface RouteState {
  state: {
    name: string;
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<keyof RouteParams>();
  const { state } = useLocation() as RouteState;
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      const infoResponse = await fetch('/data/bitcoinInfo.json');
      const infoJson = await infoResponse.json();
      setInfo(infoJson);
      const priceResponse = await fetch('/data/bitcoinPrice.json');
      const priceJson = await priceResponse.json();
      setPriceInfo(priceJson);
      setLoading(false);
    })();
  }, []);
  // console.log('info', info);
  // console.log('price', priceInfo);

  return (
    <Container>
      <Header>
        <Title>{state?.name || 'Loading...'}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
      {!loading && (
        <div>
          <div>info.id</div>
          <div>price.name</div>
        </div>
      )}
    </Container>
  );
}
export default Coin;
