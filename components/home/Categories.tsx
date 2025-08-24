import Image from "next/image";
import Link from "next/link";

const Categories = () => {
  const categories = [
    {
      link: "/search-result?instrumentFamily=Strings",
      image: "/images/strings.png",
      title: "Strings",
    },
    {
      link: "/search-result?instrumentFamily=Woodwinds",
      image: "/images/woodwinds.png",
      title: "Woodwinds",
    },
    {
      link: "/search-result?instrumentFamily=Percussions",
      image: "/images/percussions.png",
      title: "Percussions",
    },
    {
      link: "/search-result?instrumentFamily=Brass",
      image: "/images/brass.png",
      title: "Brass",
    },
    {
      link: "/search-result?instrumentFamily=Keyboard",
      image: "/images/Keyboard.png",
      title: "Keyboard",
    },
    {
      link: "/search-result?instrumentFamily=Other",
      image: "/images/others.png",
      title: "Other",
    },
  ];

  return (
    <section className="bg-[#f0f9f9] py-20">
      <div className="container">
        <div className="text-center">
          <h1 className="text-[40px] text-gray-700 font-semibold">
            Instrument Families
          </h1>
          <p className="text-[20px] text-gray-600">
            Explore the six major families of instruments and find out where
            your instrument belongs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {categories.map((category, index) => (
            <Link key={index} href={category.link}>
              <div className="bg-white flex flex-col justify-center items-center py-5 shadow-[0px_2px_12px_0px_#003D3914] rounded-lg h-[250px]">
                <div className="w-[150px] h-[150px] relative">
                  <Image
                    src={category.image}
                    alt={`${category.title} Image`}
                    fill
                    className="object-contain"
                  />
                </div>

                <h1 className="mt-4 font-semibold text-gray-700">
                  {category.title}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
