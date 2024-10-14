import RoomCard from '@/components/RoomCard';
import Heading from '@/components/Heading';
// import rooms from '@/data/rooms.json';
import getAllRooms from './actions/getAllRooms';
export default async function Home() {
  const rooms = await getAllRooms();
  return (
    <>
      <Heading title={`Available rooms`} />
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard key={room.$id} room={room} />)
      ) : (
        <p>No rooms available at the moment</p>
      )}
    </>
  );
}
