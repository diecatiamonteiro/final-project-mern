import React from "react";

const Privacy = () => {
  return (
    <section className="mb-24 px-6 py-12 bg-white text-gray-800">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center">
          Privacy Policy (Totally Legit, We Swear)
        </h2>

        <p>
          Welcome to <strong>The Greenroom</strong>! We take your privacy as
          seriously as we take our morning coffee, meaning we definitely think
          about it, but don't expect perfection.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold"> Data Collection</h3>
            <p>
              We may or may not collect cookies, your IP address, and your last
              three embarrassing Google searches. Just kidding!{" "}
              <em>(Or are we?)</em>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold"> How We Use Your Data</h3>
            <p>
              Mostly to stare at fancy graphs and pretend we understand
              analytics.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold"> Third-Party Sharing</h3>
            <p>
              We only share data with super top-secret organizations... like our
              mums, who just want to know what we’re up to.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold"> Security Measures</h3>
            <p>
              We have the strongest passwords, like <code>password123</code> and{" "}
              <code>admin</code>. Just try and hack us.{" "}
              <strong>(Actually, please don’t.)</strong>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold"> Your Rights</h3>
            <p>
              You have the right to pretend this privacy policy is legally
              binding, even though we both know it's just here for show.
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="mt-20 italic">
          By using this site, you agree to these terms,or at least to scrolling
          past them without reading, like everyone else does.
        </p>
      </div>
    </section>
  );
};

export default Privacy;
