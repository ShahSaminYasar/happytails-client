"use client";

import { use } from "react";

const FeaturedPets = ({ petsPromise }) => {
  const data = use(petsPromise);

  console.log("HERE:", data);

  return <div>FeaturedPets</div>;
};
export default FeaturedPets;
