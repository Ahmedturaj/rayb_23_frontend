import Image from "next/image";
import Link from "next/link";

const Categories = () => {
  const categories = [
    {
      link: "/",
      image: "/images/strings.png",
      title: "Strings",
      width: "50px",
      height: "100px",
    },
    {
      link: "/",
      image: "/images/woodwinds.png",
      title: "Woodwinds",
      width: "200px",
      height: "20px",
    },
    {
      link: "/",
      image: "/images/percussions.png",
      title: "Percussions",
      width: "100px",
      height: "100px",
    },
    {
      link: "/",
      image: "/images/brass.png",
      title: "Brass",
      width: "200px",
      height: "80px",
    },
    {
      link: "/",
      image: "/images/Keyboard.png",
      title: "Keyboard",
      width: "100px",
      height: "100px",
    },
    {
      link: "/",
      image: "/images/others.png",
      title: "Other",
      width: "100px",
      height: "100px",
    },
  ];

  return (
    <section className="bg-[#f0f9f9] py-16">
      <div className="container lg:max-w-[1100px]">
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
              <div className="bg-white  flex flex-col justify-center items-center py-5 shadow-[0px_2px_12px_0px_#003D3914] rounded-lg h-[180px]">
                <div className="h-[100px] flex flex-col justify-center items-center">
                  <Image
                    src={category.image}
                    alt="category-img"
                    width={6000}
                    height={6000}
                    className={`w-[${category.width}] h-[${category.height}]`}
                  />
                </div>

                <h1 className="mt-3 font-semibold">{category.title}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
