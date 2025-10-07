import { Suspense } from "react";
import SearchComponent from "./_component/SearchComponent";

const page = () => {
  return (
    <Suspense>
      <div className="container py-12">
        <SearchComponent />
      </div>
    </Suspense>
  );
};

export default page;
