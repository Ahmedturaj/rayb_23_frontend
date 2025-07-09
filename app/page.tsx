import BannerHome from "@/components/home/banner";
import Categories from "@/components/home/Categories";
import Popular from "@/components/home/Popular";

export default function Home() {
  return (
    <div>
      <BannerHome />
      <Categories />
      <Popular />
    </div>
  );
}
