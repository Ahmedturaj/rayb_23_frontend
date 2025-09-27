'use client'
import { useFilterStore } from "@/zustand/stores/search-store";
import Image from "next/image";
import Link from "next/link";

const Categories = () => {
  const categories = [
    {
      link: "/search-result",
      image: "/images/strings.svg",
      title: "Strings",
    },
    {
      link: "/search-result",
      image: "/images/woodwinds.svg",
      title: "Woodwinds",
    },
    {
      link: "/search-result",
      image: "/images/percussions.svg",
      title: "Percussions",
    },
    {
      link: "/search-result",
      image: "/images/brass.svg",
      title: "Brass",
    },
    {
      link: "/search-result",
      image: "/images/Keyboard.svg",
      title: "Keyboard",
    },
    {
      link: "/search-result",
      image: "/images/others.svg",
      title: "Other",
    },
  ];

  const { setFamilyTag } = useFilterStore();

  return (
    <section className="bg-[#f0f9f9] py-20">
      <div className="container">
        <div className="text-center">
          <h1 className="text-[40px] font-bold">Instrument Families</h1>
          <p className="text-[20px] text-gray-600 font-medium">
            Explore the six major families of instruments and find out where
            your instrument belongs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.link}
              onClick={() => setFamilyTag(category.title)}
            >
              <div className="bg-white flex flex-col justify-center items-center py-5 shadow-[0px_2px_12px_0px_#003D3914] rounded-lg h-[250px]  hover:scale-105 transition-all duration-200">
                <div className="w-[150px] h-[150px] relative">
                  <Image
                    src={category.image}
                    alt={`${category.title} Image`}
                    fill
                    className="object-contain"
                  />
                </div>

                <h1 className="mt-4 font-semibold">{category.title}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
