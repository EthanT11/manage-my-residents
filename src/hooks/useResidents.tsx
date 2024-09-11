import { useState } from 'react';

const useResidents = () => {
  const [residents] = useState([
    {
      name: "Bill Billington",
      age: "65",
      wing: "Left",
      room: "100"
    },
    {
      name: "Jill Jillington",
      age: "50",
      wing: "Right",
      room: "101"
    },
    {
      name: "Billy Billington",
      age: "93",
      wing: "Left",
      room: "102"
    },
    {
      name: "Jilly Jillington",
      age: "45",
      wing: "Right",
      room: "103"
    },
    {
      name: "Steve Stevenson",
      age: "87",
      wing: "Left",
      room: "104"
    }
  ]);

  return { residents };
};

export default useResidents;