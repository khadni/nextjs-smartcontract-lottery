import Header from "../components/Header";
import LotteryEntrance from "../components/LotteryEntrance";

export default function Home() {
  return (
    <div>
      <div>
        <title>Smartcontract Lottery</title>
        <meta
          name="description"
          content="Smartcontract Lottery by KH DEV - FCC course"
        />
        <link rel="icon" href="/favicon.ico" />
      </div>
      <Header />
      <LotteryEntrance />
    </div>
  );
}
