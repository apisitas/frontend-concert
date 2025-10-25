// 'use client';
// interface Concert {
//   id: number;
//   name: string;
//   description: string;
//   seatsLeft: number;
// }

// export default function UserConcertList({ concerts }: { concerts: Concert[] }) {
//   const handleReserve = (id: number) => {
//     // Call backend API to reserve seat
//     console.log('Reserve concert', id);
//   };

//   return (
//     <div>
//       <h1>Concerts</h1>
//       {concerts.map(c => (
//         <div key={c.id} className="card mb-3 p-3">
//           <h5>{c.name}</h5>
//           <p>{c.description}</p>
//           <p>Seats left: {c.seatsLeft}</p>
//           <button className="btn btn-success" disabled={c.seatsLeft === 0} onClick={() => handleReserve(c.id)}>Reserve</button>
//         </div>
//       ))}
//     </div>
//   );
// }
