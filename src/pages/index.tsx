import dynamic from 'next/dynamic'

const Chat = dynamic(() => import("../components/Chat"), { ssr: false })

const Home = ()  => {
  return (
    <Chat />
  );
}

export default Home;
