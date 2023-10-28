import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

function Privacy() {
  return (
    <>
      <Header />
      <div className="afriseller-container my-5">
        <h3 className="text-center">Afrisellers Privacy Policy</h3>
        <p>
          At Afrisellers, we value your privacy and are committed to protecting
          your personal information. This Privacy Policy explains how we
          collect, use, disclose, and protect your data when you use our
          e-commerce platform. By using Afrisellers, you consent to the
          practices described in this policy.
        </p>
        <ol type="1">
          <li>
            <b>Information We Collect:</b>
            <p>
              We may collect the following types of information:{" "}
              <ul>
                <li>
                  Personal Information: This includes your name, email address,
                  shipping address, and phone number.
                </li>
                <li>
                  Payment Information: We collect payment details when you make
                  a purchase through our platform. This may include credit card
                  information.
                </li>
                <li>
                  Transaction Information: Details of your transactions on our
                  platform, including order history.
                </li>
                <li>
                  Communication: Correspondence between you and Afrisellers when
                  you contact us or use our messaging tools.
                </li>
                <li>
                  User Content: Any content you provide, such as product reviews
                  and ratings.
                </li>
                <li>
                  Device and Usage Information: Information about how you access
                  and use our platform, including your IP address, browser type,
                  and operating system.
                </li>
                <li>
                  Cookies and Tracking Technologies: We use cookies and similar
                  technologies to collect information about your interactions
                  with our platform.
                </li>
              </ul>
            </p>
          </li>
          <li>
            <b>How We Use Your Information:</b>
            <p>
              We use your information for the following purposes:
              <ul>
                <li>
                  To Provide Services: To provide and improve our e-commerce
                  services, including processing orders and ensuring a safe and
                  secure shopping experience.
                </li>
                <li>
                  Customer Support: To respond to your requests, comments, or
                  questions.
                </li>
                <li>
                  Communications: To keep you updated about your orders,
                  promotions, and offers.
                </li>
                <li>
                  Analytics: To analyze and understand how users interact with
                  our platform.
                </li>
                <li>
                  Security: To detect and prevent fraudulent activities,
                  unauthorized access, and other illegal activities.
                </li>
              </ul>
            </p>
          </li>
          <li>
            <b>Information Sharing:</b>
            <p>
              We do not sell your personal information to third parties.
              However, we may share your information in the following
              situations:
              <ul>
                <li>
                  Service Providers: We share information with trusted service
                  providers who assist us in delivering our services.
                </li>
                <li>
                  Legal Compliance: We may share information in response to a
                  legal request or to protect our rights and the rights of
                  others.
                </li>
                <li>
                  Business Transfers: If we are involved in a merger,
                  acquisition, or sale of assets, your information may be
                  transferred as part of that transaction.
                </li>
              </ul>
            </p>
          </li>
          <li>
            <b>Data Security:</b>
            <p>
              We employ appropriate security measures to protect your data from
              unauthorized access and disclosure.
            </p>
          </li>
          <li>
            <b>Your Choices:</b>
            <p>
              You may update your account information and communication
              preferences at any time. You can opt out of receiving marketing
              communications from us.
            </p>
          </li>
          <li>
            <b>Data Retention:</b>
            <p>
              We will retain your personal information for as long as necessary
              to fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required by law.
            </p>
          </li>
          <li>
            <b>Amendments:</b>
            <p>
              We may update this Privacy Policy as needed. The effective date
              will be revised accordingly.
            </p>
          </li>
        </ol>
        <p>
          Sincerely,
          <br />
          The Afrisellers Team
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Privacy;
