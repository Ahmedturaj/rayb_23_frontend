interface ReviewModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const VerifyBusinessEmail: React.FC<ReviewModalProps> = ({
  setIsModalOpen,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 min-h-screen">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 ">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="text-center text-xl font-semibold">
              Enter Your Business Email
            </div>

            <div>
              <input
                type="email"
                className="border border-gray-200 bg-gray-50 h-[48px] w-full rounded-lg my-5 focus:outline-none p-4"
                placeholder="Enter your business email"
                name="email"
              />
            </div>

            <div>
              <button
                type="submit"
                onClick={() => setIsModalOpen(false)}
                className="h-[48px] bg-teal-600 w-full text-center rounded-lg text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyBusinessEmail;
