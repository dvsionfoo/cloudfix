import React from "react";

export function FooterCompact({
  today,
  footerClasses,
  footerContainerClasses,
}) {
  return (
    <>
      {/* begin::Footer */}
      <div
        className={`footer bg-white py-4 d-flex flex-lg-column  ${footerClasses}`}
        id="kt_footer"
      >
        {/* begin::Container */}
        <div
          className={`${footerContainerClasses} d-flex flex-column flex-md-row align-items-center justify-content-between`}
        >
          {/* begin::Copyright */}
          <div className="text-dark order-2 order-md-1">
            <span className="text-muted font-weight-bold mr-2">
            &copy; {today} - CloudFix
            </span>
          </div>
          {/* end::Copyright */}
          {` `}
        </div>
        {/* end::Container */}
      </div>
      {/* end::Footer */}
    </>
  );
}
