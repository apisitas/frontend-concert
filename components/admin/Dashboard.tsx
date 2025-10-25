// import { useState } from 'react';

// export default function ConcertForm() {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [seats, setSeats] = useState('');

//   const handleSubmit = () => {
//     // Call API to create concert
//     console.log({ name, description, seats });
//   };

//   return (
//     <div className="card p-4 mb-4">
//       <h3>Create Concert</h3>
//       <div className="mb-3">
//         <label className="form-label">Name</label>
//         <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Description</label>
//         <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Total Seats</label>
//         <input type="number" className="form-control" value={seats} onChange={e => setSeats(e.target.value)} />
//       </div>
//       <button className="btn btn-primary" onClick={handleSubmit}>Create Concert</button>
//     </div>
//   );
// }
