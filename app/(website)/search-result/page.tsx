import { Suspense } from "react";
import SearchComponent from "./_component/SearchComponent";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>

    <div className="container py-12">
      <SearchComponent />
    </div>
    </Suspense>
  );
};

export default page;
