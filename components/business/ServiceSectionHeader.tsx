import React from "react";

const ServiceSectionHeader = () => {
  return (
    <div className="space-y-2">
      <h2 className="text-[28px] font-semibold">2. Services Offered</h2>
      <p className="text-[#485150] text-[16px]">
        Now, you can specify the services the business provides for each
        selected instrument family. This section helps the customers understand
        exactly what you offer.
      </p>
      <p className="text-[#485150] text-[16px]">
        In addition to repairs and adjustments, you can also offer services
        related to buying, selling, trading, and teaching instruments.
      </p>
      <p className="text-[#139a8e] text-[16px] lg:max-w-6xl">
        We encourage businesses to provide pricing information for better
        customer visibility and to improve search results. Pricing does not need
        to be exact and can be listed as estimates or ranges.
      </p>
    </div>
  );
};

export default ServiceSectionHeader;
