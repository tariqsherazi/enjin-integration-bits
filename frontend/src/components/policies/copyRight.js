import React from "react";
import "./css/index.css";
const CopyRightComp = () => {
  return (
    <div className="text-info" style={{ maxHeight: "300px", overflow: "auto" }}>
      <div>
        <h1>Copyright Policy</h1>
        <p>
          We respect the copyright and other intellectual property rights of
          others and expect our users to do the same. In accordance with the
          Digital Millennium Copyright Act of 1998 (DMCA), we will respond
          promptly to claims of copyright infringement that are reported to us.
          And we will remove user content that violates this copyright policy.
          Furthermore, we may terminate the account of any user that repeatedly
          infringes on another user or third party’s rights.
          <br />
          <br />
          If you are a user or a third party (or a designated agent) and you
          believe that any user content on our website, including any media, NFT
          art, and the like, infringes upon your copyright, you may submit a
          notification of such infringement by providing us with the following
          information:
        </p>
      </div>

      <div className="mt-3">
        <h1>Takedown notice procedure</h1>
        <p>
          You or your designated agent may send your takedown notice to us at{" "}
          <a href="">info@bitsnft.io</a> and include the information below:
        </p>
        <br />

        <ul>
          <li>
            Detailed information about the user content that is infringed on,
            including the part of the website it exists on (the URL link will
            suffice).
          </li>
          <li>
            Your contact information that we may respond to (this may include
            your name, mailing address, and/or phone number).
          </li>

          <li>
            Include the statement “I declare that I have a good faith belief the
            alleged infringer was not authorized to use the infringed content”
            in the takedown notice.
          </li>

          <li>
            Include the statement “I declare, under penalty of perjury, that the
            information I have provided in this takedown notice is accurate and
            true” in the takedown notice. If you are an agent, include “I
            declare that I am authorized by the copyright owner to make this
            takedown notice.”
          </li>

          <li>
            A physical or electronic signature of the reporter (this may be the
            owner of the alleged infringing content or their designated agent).
          </li>
        </ul>

        <p>
          Please note that under Section 512(f) of the DMCA, if you knowingly
          misrepresent that the user content is infringing, you may be subject
          to liability.
          <br />
          <br />
          Please, also note that due to the nature of blockchain technology, if
          we take down any user content on the website, the material may still
          exist on the blockchain.
          <br />
          <br /> We reserve the right to remove user content alleged to be
          infringing without prior notice, at our sole discretion, and without
          liability to you. In appropriate circumstances, we will also terminate
          the accounts of users who are repeat infringers.
          <br />
          <br />
          If you have any questions about your rights or obligations under
          copyright law, we recommend that you consult with an attorney.
        </p>
      </div>

      <div className="mt-3">
        <h1>Counter-notice procedure</h1>
        <p>
          If you are a user whose user content has been removed due to a
          copyright infringement notice, you may send a counter-notice if you
          believe your user content was removed by misidentification using the
          procedures and sending the information described below:
        </p>
        <br />
        <ul>
          <li>
            Your name and contact information, including your phone number,
            mailing address, and/or email address.
          </li>

          <li>
            The description of the user content that we removed due to copyright
            infringement notice.
          </li>

          <li>
            Include the statement “I consent to the jurisdiction of Federal
            District Court for the judicial district where my address is, and I
            will accept service process from the individual who provided the
            infringement notification or their authorized agent” or if you are
            located outside of the United States, “I consent to the jurisdiction
            of the Federal Court of Arizona, and I will accept service process
            from the individual who provided the infringement notification or
            their authorized agent.”
          </li>

          <li>
            Include the statement “I declare, under penalty of perjury, that I
            have a good faith belief that the content was removed as a result of
            misidentification or mistake.”
          </li>

          <li>Your physical or electronic signature.</li>
        </ul>

        <p>
          When we receive your notice, we will contact the person who initiated
          the infringement notice and give them 10 days to respond. If they do
          not respond within 10 days, we may, at our discretion, restore the
          content on BITS NFT.{" "}
        </p>
      </div>
    </div>
  );
};

export default CopyRightComp;
