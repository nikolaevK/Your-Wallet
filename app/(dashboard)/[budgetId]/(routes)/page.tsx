import React from "react";
import Categories from "./components /categories";

type Props = {};

export default function Dashboard({}: Props) {
  return (
    <div className="w-full pt-6 px-4">
      <Categories />
    </div>
  );
}
