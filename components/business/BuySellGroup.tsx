type OptionKey = "buy" | "sell" | "trade" | "rent";

type BuySellGroupProps = {
  selectedOptions: Record<OptionKey, boolean>;
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<Record<OptionKey, boolean>>
  >;
};

const BuySellGroup: React.FC<BuySellGroupProps> = ({
  setSelectedOptions,
  selectedOptions
}) => {

  const options = [
    {
      id: "buy",
      label: "Buy Instruments",
      description:
        "If the business buys instruments from customers (e.g. trade-ins or buying used instruments), select this service.",
    },
    {
      id: "sell",
      label: "Sell Instruments",
      description:
        "If the business sells new or used instruments, select this service.",
    },
    {
      id: "trade",
      label: "Trade Instruments",
      description:
        "If the business allows customers to trade in instruments for credit or other instruments, select this service.",
    },
    {
      id: "rent",
      label: "Rent Instruments",
      description:
        "If the business allows the customers to rent the instruments, select this service.",
    },
  ];

  const toggleOption = (id: OptionKey) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold">Buy / Sell / Trade / Rent</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-5">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-start space-x-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedOptions[option.id as OptionKey]}
              onChange={() => toggleOption(option.id as OptionKey)}
              className="mt-1 accent-teal-600 w-4 h-4"
            />
            <div>
              <div className="text-lg font-medium text-gray-900">
                {option.label}
              </div>
              <div className="text-sm text-gray-600">{option.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default BuySellGroup;
