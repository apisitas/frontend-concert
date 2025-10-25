// interface MyReservation {
//   concert: string;
//   seatNumber: number;
// }

// export default function MyReservations({ reservations }: { reservations: MyReservation[] }) {
//   const handleCancel = (concert: string) => {
//     console.log('Cancel reservation for concert:', concert);
//   };

//   return (
//     <div>
//       <h3>My Reservations</h3>
//       <ul className="list-group">
//         {reservations.map((r, idx) => (
//           <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
//             {r.concert} - Seat {r.seatNumber}
//             <button className="btn btn-danger btn-sm" onClick={() => handleCancel(r.concert)}>Cancel</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
