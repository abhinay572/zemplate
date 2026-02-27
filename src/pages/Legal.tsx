import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";

export function Legal() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO 
        title="Privacy Policy | Zemplate.ai"
        description="Privacy Policy for Zemplate.ai. Learn how we collect, use, and protect your personal information."
        canonical="https://zemplate.ai/legal"
      />
      <Navbar />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-white/60 text-lg">
            Last updated: October 24, 2023
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none text-white/80">
          <p>
            At Zemplate.ai, accessible from https://zemplate.ai, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Zemplate.ai and how we use it.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Information We Collect</h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Account Information:</strong> When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</li>
            <li><strong>Usage Data:</strong> We collect information on how the Service is accessed and used. This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
            <li><strong>Generated Content:</strong> Images and text prompts you submit to our AI models are processed to provide the service. We do not use your private generations to train our public models without explicit consent.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect in various ways, including to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Log Files</h2>
          <p>
            Zemplate.ai follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Cookies and Web Beacons</h2>
          <p>
            Like any other website, Zemplate.ai uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. GDPR Data Protection Rights</h2>
          <p>
            We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>The right to access – You have the right to request copies of your personal data.</li>
            <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
            <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">6. Indian IT Act Compliance</h2>
          <p>
            Zemplate.ai complies with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. We employ reasonable security practices and procedures to protect your sensitive personal data or information.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            Email: hello@zemplate.ai
            <br />
            Address: VIIONR INFOTECH PVT LTD, India
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
